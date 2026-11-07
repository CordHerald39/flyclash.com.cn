---
title: "sing-box HTTP 代理出站配置：server、端口与认证怎么核对"
category: "tutorials"
description: "参考 sing-box 官方 HTTP 出站文档，整理服务器地址、端口、用户名密码和路由选择的排查顺序。"
date: "2026-11-07"
updated: "2026-11-07"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box HTTP 出站能通过配置检查但请求失败时，先确认 route 选择的出站 tag，再核对 server、server_port 和认证字段。不要把代理端口可连接误判为上游认证成功。

## 先确认配置边界

运行 sing-box check；分别记录 TCP 连接、HTTP 认证和目标请求结果；核对用户名密码是否来自受控配置；改动后建立新连接并清理测试凭据。

## 验证与回滚

1. 备份当前配置并记录核心版本和错误时间。
2. 运行官方配置检查命令，确认字段结构和引用对象。
3. 建立一次新的最小连接，按日志阶段区分解析、监听、握手和路由问题。
4. 一次只改一个变量，验证后保留可回滚副本。

不要把真实订阅、密码、令牌或密钥写入公开日志。可继续阅读 [sing-box-direct-outbound-route](/articles/sing-box-direct-outbound-route/) 与 [sing-box-connect-timeout-dial-check](/articles/sing-box-connect-timeout-dial-check/)。

## 官方来源

- [官方文档](https://sing-box.sagernet.org/configuration/outbound/http/)

来源核验日期：2026-11-07。
