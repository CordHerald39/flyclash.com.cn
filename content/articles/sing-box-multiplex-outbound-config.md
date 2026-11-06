---
title: "sing-box multiplex 出站配置：启用复用前先核对协议与并发"
category: "tutorials"
description: "参考 sing-box 官方 multiplex 文档，说明复用配置的作用范围、协议支持和排错顺序，避免用 multiplex 掩盖上游连接问题."
date: "2026-11-06"
updated: "2026-11-06"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box multiplex 用于在支持的出站上复用多条逻辑连接。它改变连接组织方式，不能替代 DNS、TLS 或上游认证；启用后异常时先确认底层出站本身可用。

## 先确认配置边界

复制配置并运行 sing-box check；关闭 multiplex 验证底层出站；开启后观察新连接和服务端日志；逐项调整协议或并发，异常时恢复可用副本。

## 验证与回滚

1. 备份当前配置并记录核心版本和错误时间。
2. 运行官方配置检查命令，确认字段结构和引用对象。
3. 建立一次新的最小连接，按日志阶段区分解析、监听、握手和路由问题。
4. 一次只改一个变量，验证后保留可回滚副本。

不要把真实订阅、密码、令牌或会话密钥写入公开日志。可继续阅读 [sing-box-connect-timeout-dial-check](/articles/sing-box-connect-timeout-dial-check/) 与 [sing-box-tls-handshake-timeout](/articles/sing-box-tls-handshake-timeout/)。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/shared/multiplex/)

来源核验日期：2026-11-06。
