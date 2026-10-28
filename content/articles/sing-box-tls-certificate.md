---
title: "sing-box TLS certificate：证书文件与握手排查"
category: "tutorials"
description: "按照 sing-box 官方 TLS 文档核对 certificate、证书链和私钥路径，区分文件读取错误与域名不匹配。"
date: "2026-10-28"
updated: "2026-10-28"
author: "FlyClash 中文指南编辑部"
draft: false
---

TLS 服务端或客户端握手失败时，证书路径、私钥权限和域名匹配都可能是原因。sing-box 官方 TLS 文档列出 certificate 相关字段；排查应先通过配置检查，再观察真实握手。

## 先核对文件与运行用户

备份配置，记录证书与私钥路径、运行用户、目标 server_name 和文件权限。确认文件存在且运行用户可读，不要在日志中粘贴私钥内容。

## 使用最小 TLS 片段

只在目标 TLS 结构中核对证书与私钥字段，示意：

{
  "tls": {
    "enabled": true,
    "certificate_path": "/path/to/cert.pem",
    "key_path": "/path/to/key.pem"
  }
}

示例路径不是下载地址。字段名和结构必须以当前版本文档为准。运行配置检查后重载，再用同一 server_name 建立新连接。

## 按错误类型判断

- 文件不存在或权限错误：先修正路径与权限。
- 证书与 server_name 不匹配：检查证书 SAN 与请求域名。
- 配置通过但握手仍失败：继续看上游端口、时间、协议和网络路径。

恢复时还原原证书路径并重载。TLS ALPN 变化可对照 [sing-box TLS ALPN](/articles/sing-box-tls-alpn/)。

## 官方来源

- [sing-box TLS](https://sing-box.sagernet.org/configuration/shared/tls/)

来源核验日期：2026-10-28。

