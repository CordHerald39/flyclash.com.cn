---
title: "sing-box Trojan 出站配置：密码、server_name 与证书怎么核对"
category: "tutorials"
description: "参考 sing-box 官方 Trojan 与 TLS 文档，按服务端地址、密码、server_name 和证书链定位 Trojan 出站握手失败."
date: "2026-11-06"
updated: "2026-11-06"
author: "FlyClash 中文指南编辑部"
draft: false
---

Trojan 出站经常表现为 TCP 可达但 TLS 或认证失败。先将 server、server_port、password 和 TLS 的 server_name 分开记录，再确认 route 实际选择的出站。

## 先确认配置边界

用 sing-box check 确认对象结构；检查系统时间、证书信任链和 server_name；观察错误发生在 TCP、TLS 还是 Trojan 认证阶段；只改一个变量后建立新会话。

## 验证与回滚

1. 备份当前配置并记录核心版本和错误时间。
2. 运行官方配置检查命令，确认字段结构和引用对象。
3. 建立一次新的最小连接，按日志阶段区分解析、监听、握手和路由问题。
4. 一次只改一个变量，验证后保留可回滚副本。

不要把真实订阅、密码、令牌或会话密钥写入公开日志。可继续阅读 [sing-box-tls-certificate](/articles/sing-box-tls-certificate/) 与 [sing-box-route-final-outbound-action](/articles/sing-box-route-final-outbound-action/)。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/outbound/trojan/)
- [官方文档 2](https://sing-box.sagernet.org/configuration/shared/tls/)

来源核验日期：2026-11-06。
