---
title: "sing-box TLS ECH 配置：config、config_path 与 DNS 获取怎么检查"
category: "tutorials"
description: "依据 sing-box shared TLS 官方文档，分清 ECH 客户端配置和服务端私钥，检查 DNS 获取、server_name 与版本相关字段，避免把 ECH 当成关闭证书校验。"
date: "2026-11-05"
updated: "2026-11-05"
author: "FlyClash 中文指南编辑部"
draft: false
---

启用 ECH 后连接失败，先确认客户端拿到了与服务端匹配的 ECH 配置。ECH 是用于加密 ClientHello 一部分内容的 TLS 扩展，服务端必须支持它；打开本地开关不会自动改变远端服务器，也不会取消证书校验。

## 分清两端使用的文件

官方 shared TLS 文档把 `key`、`key_path` 列为服务端字段，内容是 PEM 格式的 ECH 私钥；客户端使用 `config` 或 `config_path`，内容是 PEM 格式的 ECH 配置。不要把服务端私钥复制到客户端配置，更不能把它放进公开订阅或反馈日志。

已有服务明确提供 ECH 配置文件时，可在它的 TLS 对象内核对以下局部字段。文件必须真实存在，并由当前进程读取；该片段不含完整出站和服务地址：

```json
{
  "ech": {
    "enabled": true,
    "config_path": "./ech-config.pem"
  }
}
```

如果自建服务，需要按官方命令 `sing-box generate ech-keypair` 生成匹配的服务端 key 和客户端 config。生成过程涉及私钥保管，本文没有生成或发布任何真实密钥。

## 未指定配置时检查 DNS 获取

文档说明客户端的 config 或 config_path 为空时会尝试从 DNS 获取。确认所查询的 HTTPS 记录确实提供该服务的 ECH 参数，再查 DNS 路径和缓存。普通 A/AAAA 地址解析正常，不足以证明 ECH 配置获取成功。

`query_server_name` 是客户端查询 ECH HTTPS 记录的覆盖名称，官方标注自 sing-box 1.13.0 提供；为空时使用 server_name。本机版本尚需自己确认，旧核心不要直接添加这个新字段。曾出现在 ECH 中的两个旧选项在官方文档中已有弃用/移除标记，不要从旧截图复制。证书名称仍应对照 [TLS server_name 检查](/articles/sing-box-tls-server-name-certificate-check/)。

## 保持其余参数不变做对照

1. 保存配置，记录实际核心版本、TLS 引擎和服务方提供的 ECH 信息。
2. 执行 `sing-box check`，确认字段有效、文件可读取。
3. 重载并建立新连接，区分 DNS 获取失败、ECH 不匹配和证书错误。
4. 仅在自己管理的测试连接中恢复原 ECH 设置作对照，记录差异；不要同时更改 TLS 主机名、认证和路由。

当前文档中不同 TLS 引擎的支持字段并不相同，要核对正在使用的引擎。还可结合 [TLS 版本范围](/articles/sing-box-tls-version-range-handshake/) 排查握手。本文依据官方字段说明，不宣称 ECH 在任意服务或网络下都可用。

## 官方来源

- [官方文档](https://sing-box.sagernet.org/configuration/shared/tls/)
- [官方文档](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-11-05。
