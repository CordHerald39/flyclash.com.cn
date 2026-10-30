---
title: "sing-box Windows 多网卡 DNS 泄漏排查：strict_route 与虚拟网卡兼容性"
category: "tutorials"
description: "依据 sing-box 官方 TUN 文档，检查 Windows 多网卡 DNS 解析为何绕行，以及 strict_route 与 VirtualBox 等应用的兼容性和回退步骤。"
date: "2026-10-30"
updated: "2026-10-30"
author: "FlyClash 中文指南编辑部"
draft: false
---

Windows 同时启用有线、Wi-Fi 或虚拟网卡时，DNS 请求可能受系统多宿主解析行为影响。sing-box 官方 TUN 文档明确说明，`strict_route` 在 Windows 上用于防止这一类 DNS 泄漏；排查范围是多网卡解析绕行及兼容性，不能只凭开关已打开就断言所有 DNS 都经过代理。

## 先留下能比较的现场

保存可用配置，记录 Windows 版本、sing-box 内核版本、活动网卡和出问题的域名。打开系统网络设置，核对有线、Wi-Fi、VPN、Hyper-V 或 VirtualBox 网卡的 DNS 地址；不要直接删除虚拟网卡，也不要一次改掉所有 DNS。

先确认 TUN 已启动，并且当前使用的配置开启 `auto_route`。只有系统代理生效、TUN 没有运行时，这里的字段不能解决问题。通用路由接管步骤见 [sing-box TUN auto_route 检查](/articles/sing-box-tun-auto-route-check/)。

## 把 strict_route 放在现有 TUN 入站中

下面只展示需要核对的字段，保留原入站的地址、接口和其他必要配置，不能把它作为完整配置文件运行：

```json
{
  "type": "tun",
  "auto_route": true,
  "strict_route": true
}
```

官方文档把严格路由的生效条件写为 `auto_route` 开启。Windows 下还会让不受支持的网络不可达，并指出某些情况下可能影响 VirtualBox 等应用。不要把 Linux 的 `auto_redirect` 行为套用到 Windows。

## 用相同域名比较两组结果

1. 在配置目录执行 `sing-box check`，通过后再重启当前客户端使用的内核。
2. 保持活动网卡、DNS 地址和目标域名相同，比较开启前后的系统解析结果及 sing-box DNS 日志。
3. 若有抓包条件，检查目标查询是否仍从预期之外的网卡发往 DNS 服务器。只看网页能打开或出口 IP 改变，不能验证 DNS 请求路径。
4. 同时测试虚拟机联网、局域网服务和原先正常的应用，记录新增故障。

如果开关启用后 DNS 仍异常，继续检查 DNS 服务器路由、缓存和 TUN 的 DNS 接管；不要通过关闭证书校验来处理解析问题。域名解析策略另见 [sing-box DNS strategy](/articles/sing-box-dns-strategy/)。

## 出现兼容问题时回退

恢复配置备份并重启内核，再用同一网卡和域名复测。若只有启用 `strict_route` 时虚拟机断网，应保留这组对照结果，结合虚拟网卡路由继续定位；不要把回退后的“可以上网”记录为 DNS 泄漏已经修复。

## 官方来源

- [对应字段官方文档](https://sing-box.sagernet.org/configuration/inbound/tun/)
- [配置检查命令](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-10-30。
