---
title: "sing-box query_type 规则：按 DNS 查询类型选择服务器怎么检查"
category: "tutorials"
description: "解释 sing-box DNS query_type 的类型名称、组合条件和版本兼容范围，以 A 与 AAAA 查询对照核对服务器选择、缓存和后续连接。"
date: "2026-10-22"
updated: "2026-10-22"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 需要让不同 DNS 查询类型使用不同服务器时，可以在 DNS 规则中核对 query_type。官方说明该字段接受查询类型名称字符串或整数；它匹配的是 DNS 查询类型，不是连接采用 TCP 还是 UDP，也不是直接判断当前应用能否使用 IPv6。先查看实际查询，再决定条件与目标 DNS 服务器。

## 分清 A、AAAA 与连接结果

备份原配置，记录核心版本、正在使用的 DNS 服务器和目标域名。A 与 AAAA 查询分别请求 IPv4 与 IPv6 地址记录，应用还可能查询其他类型。即使一次 AAAA 查询收到地址，也不能据此断言到该 IPv6 地址的连接可达；解析与后续路由要分开验收。

如果当前问题是服务器连接失败，应先检查[HTTPS DNS 路径](/articles/sing-box-dns-https-server-path/)与服务器地址解析。本页只处理已经进入 DNS 规则判断的查询类型条件，不会通过改一个字段自动修复上游网络。

## 在已有 DNS 规则中加入类型条件

下面是一条应加入现有 dns.rules 的示意规则，不是完整配置。example.com 是示例域名；dns-existing 必须替换为已在 dns.servers 中定义、且本身可用的服务器标签。

```json
{
  "domain": ["example.com"],
  "query_type": ["AAAA"],
  "action": "route",
  "server": "dns-existing"
}
```

该示例同时限定域名和查询类型。发给另一个域名的 AAAA 查询，或同一域名的 A 查询，不满足这组条件。只希望在某个域名上核对行为时，保留这个小范围；不要为了验证字段，把全站 DNS 规则一起替换。

官方允许类型名字符串与整数。初次核对可用容易阅读的类型名，避免把网络端口号、IP 版本号或其他配置中的数值错当查询类型。保存后先运行适合当前版本的配置检查，再重载；检查失败则恢复原配置并处理具体错误。

## 核对版本与旧格式兼容范围

当前官方文档对 sing-box 1.14.0 有专门变更说明：query_type 也适用于没有指定具体 DNS 服务器的内部域名解析所触发的规则判断，例如未设置 server 的 resolve 路由动作。不要把这项新增适用范围直接套到所有旧版本，也不要把流量路由规则中的 resolve 与本例 DNS route 动作混为一谈。

文档还说明，设置 query_type 会与同一份 DNS 配置中的旧地址过滤字段、旧 strategy DNS 规则动作选项及旧 rule_set_ip_cidr_accept_empty 规则项产生兼容限制。需要组合地址过滤时，当前文档指向 evaluate 与 match_response。存在这些旧配置时，应先按自己版本对应的迁移说明处理，不能把新旧示例直接拼在一起。

## 用两种查询做对照

针对同一目标分别发起 A 与 AAAA 查询，确认查询实际进入 sing-box；仅在外部工具里直接向某个上游查询，无法验证本地 DNS 规则。记录查询类型、命中规则、服务器标签、应答与错误，预期只有满足条件的查询按本规则选择服务器。

已有缓存可能让请求没有重新访问上游，因此不能只凭上游日志里缺少一次请求判断类型匹配失败。需要排除缓存时，按[DNS 缓存检查](/articles/sing-box-dns-disable-cache-check/)限定目标进行对照，不必清空整个客户端状态。

若 DNS 规则已经命中而连接仍失败，应继续检查地址族与后续出口，参考[路由 IP 版本检查](/articles/sing-box-route-ip-version-check/)。没有得到可解释结果时撤回新增规则，保留原有默认 DNS 路径，并记录核心版本与脱敏日志。

## 官方来源

- [sing-box DNS 规则：query_type、匹配逻辑与版本兼容说明](https://sing-box.sagernet.org/configuration/dns/rule/)
- [sing-box DNS route 动作与 server 标签](https://sing-box.sagernet.org/configuration/dns/rule_action/)

来源核验日期：2026-10-22。本文是当前官方文档的配置整理，没有声称已完成真实设备 DNS 或 IPv6 连通测试。
