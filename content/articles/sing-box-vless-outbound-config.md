---
title: "sing-box VLESS 出站配置：UUID、flow 与 TLS 逐项检查"
category: "tutorials"
description: "依据 sing-box 官方 VLESS 出站文档，整理 server、server_port、uuid、flow 和 TLS 的核对顺序，避免把传输层错误当成节点失效."
date: "2026-11-06"
updated: "2026-11-06"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 的 VLESS 出站连接失败时，先确认 route 使用的出站 tag，再按地址、UUID、flow 和 TLS 分层检查。配置能通过解析只代表字段结构正确，不代表服务端传输方式匹配。

## 先确认配置边界

运行 sing-box check；检查 route 最终出站；观察 TCP 建连、TLS 和 VLESS 握手分别在哪一步失败；一次只改一个传输字段并重新建连。

## 验证与回滚

1. 备份当前配置并记录核心版本和错误时间。
2. 运行官方配置检查命令，确认字段结构和引用对象。
3. 建立一次新的最小连接，按日志阶段区分解析、监听、握手和路由问题。
4. 一次只改一个变量，验证后保留可回滚副本。

不要把真实订阅、密码、令牌或会话密钥写入公开日志。可继续阅读 [sing-box-tls-server-name-certificate-check](/articles/sing-box-tls-server-name-certificate-check/) 与 [sing-box-websocket-path-handshake-check](/articles/sing-box-websocket-path-handshake-check/)。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/outbound/vless/)
- [官方文档 2](https://sing-box.sagernet.org/configuration/shared/tls/)

来源核验日期：2026-11-06。
