---
title: "sing-box HTTP 入站配置：端口、认证与请求验证"
category: "tutorials"
description: "依据 sing-box 官方 HTTP inbound 文档配置本机 HTTP 代理，检查端口监听、认证和请求路由。"
date: "2026-10-18"
updated: "2026-10-18"
author: "FlyClash 中文指南编辑部"
draft: false
---

HTTP inbound 为桌面应用提供本机代理入口。配置时先限制监听范围，再通过请求和日志验证链路。

## 实操步骤

1. 复制配置，确认 inbound 标签、监听地址和端口没有与其他服务冲突。
2. 按需配置用户名和密码，避免在没有认证的情况下监听局域网接口。
3. 执行 sing-box check，启动后用 curl 或目标应用发起一次请求。
4. 查看 inbound 日志，再检查请求命中的路由和 outbound。

若只在本机使用，优先监听回环地址。局域网访问还需要单独检查防火墙和授权范围。

继续阅读：[sing-box mixed 入站配置](/articles/sing-box-mixed-inbound-config/) · [sing-box direct 出站配置](/articles/sing-box-direct-outbound-route/)

官方来源：[sing-box HTTP inbound](https://sing-box.sagernet.org/configuration/inbound/http/)

来源核验日期：2026-10-18。
