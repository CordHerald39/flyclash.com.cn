---
title: "sing-box DNS server detour：查询出口怎么查"
category: "tutorials"
description: "解释 sing-box DNS server 与 detour 的关系，区分 DNS 查询链路、代理出口和循环依赖。"
date: "2026-10-24"
updated: "2026-10-24"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 的 DNS server 配置决定查询发送到哪里，detour 则会影响建立该查询连接的出口。DNS 能返回结果但实际代理仍失败时，先确认查询服务器、detour 和规则选择的是同一条可达路径。不要把 DNS server 的地址、出站标签和代理监听端口混写。

## 先区分查询与业务连接

备份配置，记录 DNS server 标签、地址、查询协议、detour 和实际命中的 DNS 规则。网站访问失败不一定是 DNS 失败；先做一次只查询域名的对照，再建立业务连接。

## 检查 server 与 detour

官方 DNS server 文档用标签引用服务器。下面是局部结构示例：

```json
{
  "dns": {
    "servers": [
      {
        "type": "https",
        "tag": "dns-remote",
        "server": "dns.example",
        "detour": "proxy"
      }
    ]
  }
}
```

示例地址和标签仅用于说明关系。确认 `proxy` 已在 outbounds 中存在，且该出口本身不会依赖同一个 DNS 查询形成循环。字段名称、必填项和版本支持范围以当前官方页面和 `sing-box check` 为准。

## 用直连与代理两条路径对照

1. 先用已知可达的 DNS server 验证基础查询。
2. 再只改变 detour，记录查询是否建立、返回码和耗时。
3. 对比一个走该 DNS server 的业务域名。
4. 若出现循环或连接失败，恢复原 detour，检查出口和路由。

如果 DNS 查询本身成功但规则未命中，继续看 [DNS query_type 规则](/articles/sing-box-dns-query-type-rule-check/)；如果是域名解析器标签问题，参考 [DNS address_resolver](/articles/sing-box-dns-address-resolver-check/)。出口连接超时可对照 [connect_timeout](/articles/sing-box-connect-timeout-dial-check/)。

## 官方来源

- [sing-box DNS server 配置](https://sing-box.sagernet.org/configuration/dns/server/)

来源核验日期：2026-10-24。本文不保证示例 DNS 地址在你的网络中可达。
