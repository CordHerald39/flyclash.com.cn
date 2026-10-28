---
title: "sing-box ip_is_private：私有地址规则与内网访问"
category: "tutorials"
description: "依据 sing-box Route Rule 官方文档检查 ip_is_private 的匹配对象、规则顺序和内网访问结果。"
date: "2026-10-28"
updated: "2026-10-28"
author: "FlyClash 中文指南编辑部"
draft: false
---

需要让局域网地址走直连或单独策略时，sing-box Route Rule 的 ip_is_private 可以作为目标 IP 条件。它只负责匹配私有地址，最终行为仍由 action、出站和本地网络决定。

## 先确认目标地址

备份配置，记录域名解析结果、IPv4/IPv6 地址、规则顺序和预期出站。同一域名可能解析出公网与私有地址，结果会随解析而变化。

## 用窄规则做对照

在路由规则中临时增加私有地址条件，示意：

{
  "ip_is_private": true,
  "action": "route",
  "outbound": "direct"
}

先运行配置检查，再用明确的内网目标发起新连接，观察命中规则和实际出站。不要同时改 DNS 劫持、TUN 或防火墙。

## 验收范围与回滚

1. 测试一个私有地址目标，再测试一个公网地址目标。
2. 对比两次请求的规则命中和出站标签。
3. 私有地址命中但无法访问时，检查局域网服务、防火墙和端口。
4. 删除新增规则并重新加载原配置。

需要组合端口条件时，可参考 [sing-box port_range 端口范围](/articles/sing-box-route-port-range/)。

## 官方来源

- [sing-box Route Rule](https://sing-box.sagernet.org/configuration/route/rule/)

来源核验日期：2026-10-28。

