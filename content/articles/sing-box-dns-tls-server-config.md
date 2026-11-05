---
title: "sing-box DNS over TLS 配置：853 端口与证书主机名怎么查"
category: "tutorials"
description: "根据 sing-box 官方 DoT 服务器文档，核对 type tls、server_port、TLS 对象、引导解析和出站路径，避免把证书错误当作 DNS 规则故障。"
date: "2026-11-05"
updated: "2026-11-05"
author: "FlyClash 中文指南编辑部"
draft: false
---

DNS over TLS（DoT）解析失败时，先判断 TCP 有没有连到解析器，再看 TLS 握手和 DNS 响应。DoT 使用 TLS 保护查询传输，与普通 TCP DNS、HTTPS DNS 的协议不同。解析器的网站首页可访问，也不能证明它的 DoT 端口已经可用。

## 对照服务器对象和版本

当前官方页面标注新式 `type: "tls"` DNS 服务器自 sing-box 1.12.0 提供。先记录本机实际版本，再确定能否使用该结构；不能因为最新文档出现字段就直接覆盖旧配置。

服务器对象属于 `dns.servers`，包含唯一 tag、必填 `server`、可选 `server_port` 和 `tls` 对象。文档默认端口为 853，上游若指定其他端口则以它的正式说明为准。已有规则引用旧 tag 时应保留引用关系，别同时更换解析器名称和全套规则。

## 地址和证书名称分开核对

`server` 填域名时，官方要求另外指定 `domain_resolver` 来解析上游 IP，避免用尚未连通的 DoT 服务器解析它自己。`tls.server_name` 用于证书主机名校验，应和上游提供的证书名称对应。用 IP 连接时尤其要核对服务要求，不能把 IP 可达误当成证书名称正确。

出现证书错误，先查系统时间、服务器名称和证书链；不要把 `insecure` 当作通用修复。字段关系可继续看 [TLS server_name](/articles/sing-box-tls-server-name-certificate-check/)。DoT 没有 DoH 的 HTTP path，不应复制 [HTTPS DNS 路径](/articles/sing-box-dns-https-server-path/) 到 TLS 服务器中。

## 注意迁移时的默认出站变化

官方说明旧 TLS DNS 服务器默认使用默认出站，新服务器使用 dialer，默认等价于空的 direct 出站。需要通过已有代理才能接通上游时，明确核对 `detour`。旧地址解析字段对应的新位置是 Dial Fields 的 `domain_resolver` 和 `domain_strategy`，不要混合两代结构。

1. 备份后执行 `sing-box check`，确认版本接受该服务器和 tag。
2. 重载并发起新 DNS 查询，记录选择的服务器和实际出口。
3. 按顺序区分上游域名解析失败、TCP 超时、TLS 证书错误和查询返回错误。
4. 只改一个变量做对照；失败时恢复原条目，并保留最早错误。

只有查询经过目标 TLS 服务器且返回预期记录，才算这条 DNS 路径可用。端口测试或配置检查不能替代这个结果，本文没有对用户当前网络作连通性保证。

## 官方来源

- [官方文档](https://sing-box.sagernet.org/configuration/dns/server/tls/)
- [官方文档](https://sing-box.sagernet.org/configuration/shared/tls/)
- [官方文档](https://sing-box.sagernet.org/configuration/shared/dial/)
- [官方文档](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-11-05。
