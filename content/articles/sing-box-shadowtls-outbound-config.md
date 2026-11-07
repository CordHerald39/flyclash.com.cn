---
title: "sing-box ShadowTLS 出站配置：版本、password 与 TLS 如何对齐"
category: "tutorials"
description: "依据 sing-box 官方 ShadowTLS 出站文档，分层检查版本、密码、server_name 与底层出站。"
date: "2026-11-07"
updated: "2026-11-07"
author: "FlyClash 中文指南编辑部"
draft: false
---

ShadowTLS 出站握手失败时，先区分 ShadowTLS 参数与底层 TLS/代理出站参数。版本、password、server_name 或底层 tag 任一不匹配，都可能表现为连接被立即关闭。

## 先确认配置边界

保存可回滚副本并运行配置检查；确认 route 实际选中的 tag；观察 TCP、TLS、ShadowTLS 握手阶段；一次只改一个字段，验证后再保留新配置。

## 验证与回滚

1. 备份当前配置并记录核心版本和错误时间。
2. 运行官方配置检查命令，确认字段结构和引用对象。
3. 建立一次新的最小连接，按日志阶段区分解析、监听、握手和路由问题。
4. 一次只改一个变量，验证后保留可回滚副本。

不要把真实订阅、密码、令牌或密钥写入公开日志。可继续阅读 [sing-box-tls-server-name-certificate-check](/articles/sing-box-tls-server-name-certificate-check/) 与 [sing-box-tls-handshake-timeout](/articles/sing-box-tls-handshake-timeout/)。

## 官方来源

- [官方文档](https://sing-box.sagernet.org/configuration/outbound/shadowtls/)

来源核验日期：2026-11-07。
