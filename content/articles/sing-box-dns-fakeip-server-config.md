---
title: "sing-box DNS fakeip 配置：地址池与域名排除怎么检查"
category: "tutorials"
description: "根据 sing-box 官方 FakeIP DNS 服务器文档，核对 inet4/inet6 地址池、排除域名和规则选择，区分返回 FakeIP 与真实连接失败。"
date: "2026-11-02"
updated: "2026-11-02"
author: "FlyClash 中文指南编辑部"
draft: false
---

启用 FakeIP 后，解析结果变成地址池中的虚拟地址是预期行为；应用仍然无法连接时，应先确认 DNS 规则选中了 fakeip 服务器，再检查地址池和排除范围。

## 核对服务器对象

保存当前配置，确认 DNS 服务器类型是 `fakeip`，并记录实际运行版本。局部结构只用于定位字段：

```json
{
  "type": "fakeip",
  "tag": "fakeip",
  "inet4_range": "198.18.0.0/15",
  "inet6_range": "fc00::/18"
}
```

示例网段不是所有环境的最终选择；不要与真实内网网段重叠。

## 逐层检查规则与回退

1. 执行 `sing-box check` 并确认 DNS 规则引用该 tag。
2. 查询一个明确走代理的域名，记录返回地址是否落在配置池内。
3. 对不适合 FakeIP 的域名使用排除规则，避免把管理网段映射成虚拟地址。
4. 直接 IP 访问失败时，分别查路由、缓存和目标服务。

不要为了消除虚拟地址而清空全部 DNS 规则；保留备份并在单一变量下回退。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/dns/server/fakeip/)

来源核验日期：2026-11-02。
