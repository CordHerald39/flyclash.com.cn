---
title: "sing-box Hysteria2 入站配置：监听、password 与 TLS 怎么验收"
category: "tutorials"
description: "参考 sing-box 官方 Hysteria2 入站文档，整理监听地址、认证密码和 TLS 证书的配置验收步骤。"
date: "2026-11-07"
updated: "2026-11-07"
author: "FlyClash 中文指南编辑部"
draft: false
---

Hysteria2 入站无法被客户端连接时，先核对监听地址和端口，再分别检查 password、TLS 证书和客户端 server_name。监听成功不等于认证或路由已经成功。

## 先确认配置边界

运行配置检查并确认进程监听；从受控客户端测试 TCP/UDP 可达性；观察 TLS 和认证错误；确认入站 tag 后再检查 route，避免把路由问题误当作端口故障。

## 验证与回滚

1. 备份当前配置并记录核心版本和错误时间。
2. 运行官方配置检查命令，确认字段结构和引用对象。
3. 建立一次新的最小连接，按日志阶段区分解析、监听、握手和路由问题。
4. 一次只改一个变量，验证后保留可回滚副本。

不要把真实订阅、密码、令牌或密钥写入公开日志。可继续阅读 [sing-box-listen-lan-address-check](/articles/sing-box-listen-lan-address-check/) 与 [sing-box-tls-certificate](/articles/sing-box-tls-certificate/)。

## 官方来源

- [官方文档](https://sing-box.sagernet.org/configuration/inbound/hysteria2/)

来源核验日期：2026-11-07。
