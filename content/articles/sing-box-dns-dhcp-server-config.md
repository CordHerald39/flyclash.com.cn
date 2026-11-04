---
title: "sing-box DNS DHCP：系统 DNS 已变化但代理仍不解析怎么查"
category: "tutorials"
description: "依据 sing-box 官方 DHCP DNS 服务器文档，检查 DHCP 接口、规则选择与上游响应，区分系统拿到 DNS 地址和 sing-box 实际使用该服务器。"
date: "2026-11-04"
updated: "2026-11-04"
author: "FlyClash 中文指南编辑部"
draft: false
---

需要使用当前网络通过 DHCP 下发的 DNS 时，先确认 DNS 规则是否真的选中了 `dhcp` 服务器。系统网卡显示了 DNS 地址，不代表每个 sing-box 请求都会走这个服务器。

## 对照服务器对象

保存现有 DNS 配置，查看服务器类型和 tag，并确认路由规则引用的 tag 存在。局部结构：

```json
{"type": "dhcp", "tag": "lan-dhcp"}
```

该片段只说明字段关系，不创建接口或改变系统网络。多网卡环境还要确认实际查询使用的是哪一条链路。

## 分层验证解析

1. 运行 `sing-box check`，确认 DHCP DNS 服务器配置可解析。
2. 查看当前接口的 DHCP 租约与 DNS 地址，记录变化时间。
3. 发起新查询并核对 DNS 规则、服务器 tag 和响应。
4. 若服务器无响应，先回退到已知可用的 DNS，再查接口、路由和防火墙。

不要同时清空缓存和重写所有 DNS 规则。可继续参考 [DNS server detour](/articles/sing-box-dns-server-detour-check/) 与 [规则策略](/articles/sing-box-dns-strategy/)。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/dns/server/dhcp/)

来源核验日期：2026-11-04。
