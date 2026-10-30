---
title: "sing-box UDP DNS 服务器迁移：server、端口与默认出站差异"
category: "tutorials"
description: "对照 sing-box 官方 UDP DNS 文档，迁移 type udp 配置，检查 server_port、域名引导解析和新旧默认出站行为，定位迁移后的解析失败。"
date: "2026-10-30"
updated: "2026-10-30"
author: "FlyClash 中文指南编辑部"
draft: false
---

把旧 DNS 服务器写法改为 `type: "udp"` 后仍可能解析失败，因为新旧 UDP DNS 服务器的默认出站行为并不相同。先检查运行内核是否支持当前官方文档的格式，再分别核对服务器地址、端口和连接路径，避免只改字段名就覆盖原配置。

## 备份服务器条目及引用关系

保存完整配置，记录旧 DNS 服务器的标签、解析规则和出站设置。迁移时保持标签一致，可以减少其他 DNS 规则引用失效的风险。官方页面标注 typed UDP 服务器自 sing-box 1.12.0 提供；旧内核应查阅对应版本资料，不能直接照搬当前结构。

## 先用 IP 地址核对结构

下例采用真实公共 DNS 地址说明字段位置，端口 53 是文档默认值；是否使用该服务由实际网络和隐私要求决定。这是单个 DNS 服务器片段，须合并到已有配置：

```json
{
  "dns": {
    "servers": [
      {
        "type": "udp",
        "tag": "udp-upstream",
        "server": "1.1.1.1",
        "server_port": 53
      }
    ]
  }
}
```

若使用新的 `udp-upstream` 标签，应同步核对现有 DNS 规则和最终服务器引用。UDP DNS 查询本身不加密，解析成功不代表已经使用 DoH 或 DoT。

## 迁移时最容易漏掉的两处

官方说明：旧 UDP 服务器未指定 `detour` 时默认使用默认出站；新服务器像普通出站一样使用 dialer，默认等价于空的 direct 出站。因此，原先依赖代理出站才能访问的 DNS，不一定在新配置下保持相同路径。需要代理时，应按现有出站标签检查 Dial Fields 的 `detour`，不要随意填写不存在的标签。

如果 `server` 填域名，官方要求同时设置 `domain_resolver` 以取得服务器 IP。旧字段 `address_resolver`、`address_strategy` 对应的新位置分别是 Dial Fields 中的 `domain_resolver`、`domain_strategy`，不要把旧字段继续混入 typed server。引导解析相关步骤见 [sing-box DNS address_resolver 排查](/articles/sing-box-dns-address-resolver-check/)。

## 按三步复测并保留回退

1. 在配置目录执行 `sing-box check`，先处理字段和标签错误，再启动内核。
2. 使用同一测试域名，观察 DNS 日志中的服务器标签、超时或响应结果。若 IP 形式正常而域名形式失败，优先检查引导解析依赖是否形成循环。
3. 若仅更改出站路径后失败，恢复原路径做对照；仍不能定位时还原整份备份，保留错误日志及版本信息。

服务器必须经代理访问时，可继续看 [sing-box DNS server detour](/articles/sing-box-dns-server-detour-check/)。不要为了测试一个服务器而一次替换整份 DNS 规则。

## 官方来源

- [对应字段官方文档](https://sing-box.sagernet.org/configuration/dns/server/udp/)
- [配置检查命令](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-10-30。
