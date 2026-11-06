---
title: "sing-box Shadowsocks 出站配置：method、密码与 UDP 能力怎么查"
category: "tutorials"
description: "依据 sing-box 官方 Shadowsocks 出站文档，分离服务器地址、method、password 和 UDP 能力检查，避免把协议参数错误当成网络故障."
date: "2026-11-06"
updated: "2026-11-06"
author: "FlyClash 中文指南编辑部"
draft: false
---

Shadowsocks 出站能解析但无法使用时，优先核对服务端给出的 method、password、server 和端口。TCP 可用不代表 UDP 一定可用，协议参数和服务端能力要分开验证。

## 先确认配置边界

运行 sing-box check；核对 route 是否选择该出站并记录 TCP 结果；再单独验证 UDP 应用；修改单个字段并重新建连，避免旧连接复用造成误判。

## 验证与回滚

1. 备份当前配置并记录核心版本和错误时间。
2. 运行官方配置检查命令，确认字段结构和引用对象。
3. 建立一次新的最小连接，按日志阶段区分解析、监听、握手和路由问题。
4. 一次只改一个变量，验证后保留可回滚副本。

不要把真实订阅、密码、令牌或会话密钥写入公开日志。可继续阅读 [sing-box-socks-udp-over-tcp](/articles/sing-box-socks-udp-over-tcp/) 与 [sing-box-direct-outbound-route](/articles/sing-box-direct-outbound-route/)。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/outbound/shadowsocks/)

来源核验日期：2026-11-06。
