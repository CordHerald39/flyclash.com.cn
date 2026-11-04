---
title: "sing-box TUN strict_route：多网卡下路由绕过怎么查"
category: "tutorials"
description: "依据 sing-box 官方 TUN 入站文档，检查 strict_route、auto_route、路由表和 DNS 接管，区分 TUN 创建成功与系统路由实际绕过。"
date: "2026-11-04"
updated: "2026-11-04"
author: "FlyClash 中文指南编辑部"
draft: false
---

多网卡环境启用 TUN 后出现部分流量绕过，先检查 `strict_route` 与 `auto_route` 的组合，再核对系统路由表和实际出口。TUN 网卡存在并不等于所有应用都使用它。

## 记录 TUN 入站字段

保存现有配置，查看 interface_name、auto_route、strict_route 和 stack 的实际值。局部示意：

```json
{
  "type": "tun",
  "auto_route": true,
  "strict_route": true
}
```

示例只展示字段关系，接口名、地址和 route table 应按当前系统保留。strict_route 不能替代防火墙或应用自身的代理设置。

## 分离路由与 DNS 问题

1. 执行 `sing-box check`，确认 TUN 入站能启动。
2. 查看系统路由和 DNS 接管状态，记录有线、无线和 VPN 接口。
3. 对同一目标分别测试浏览器、命令行和已知直连应用。
4. 只调整 strict_route 做对比，出现断网时立即恢复备份。

不要同时修改 MTU、DNS 和网卡优先级。可继续参考 [TUN 自动路由](/articles/sing-box-tun-auto-route-check/) 与 [多网卡 DNS](/articles/sing-box-windows-multihomed-dns-strict-route/)。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/inbound/tun/)

来源核验日期：2026-11-04。
