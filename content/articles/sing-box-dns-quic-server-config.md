---
title: "sing-box DNS QUIC：解析超时与 TLS 主机名怎么分开排查"
category: "tutorials"
description: "参考 sing-box 官方 DNS QUIC 服务器文档，核对服务器地址、TLS 主机名、证书校验和 detour，避免把 QUIC 不通误判成普通 DNS 失败。"
date: "2026-11-04"
updated: "2026-11-04"
author: "FlyClash 中文指南编辑部"
draft: false
---

配置 QUIC DNS 后解析超时，先区分 UDP/QUIC 建连、TLS 校验和 DNS 响应三个阶段。服务器地址可达并不代表 TLS 主机名或证书设置正确。

## 逐项核对服务器配置

保存原配置，确认 DNS server 的 type、server 地址和 TLS 字段位于官方定义的层级。局部示意：

```json
{
  "type": "quic",
  "tag": "secure-dns",
  "server": "dns.example.invalid"
}
```

示例域名不可直接使用，实际地址和证书主机名应来自服务提供方。detour 会改变连接路径，不能在排障时忽略。

## 按阶段测试

1. 执行 `sing-box check`，确认当前核心接受该服务器类型。
2. 记录 DNS 规则命中的 server tag 与实际出站。
3. 只切换 detour 或 TLS 校验中的一个变量，建立新查询。
4. 若仍超时，分别查 UDP 路径、MTU、证书和上游响应。

不要为了绕过错误长期启用 insecure。可结合 [DNS HTTPS path](/articles/sing-box-dns-https-server-path/) 与 [UDP DNS 迁移](/articles/sing-box-udp-dns-server-migration/) 继续核对。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/dns/server/quic/)

来源核验日期：2026-11-04。
