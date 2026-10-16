---
title: "sing-box TUN auto_route：接口、自动路由与 DNS 接管检查"
category: "tutorials"
description: "根据 sing-box 官方 TUN 入站文档检查 interface_name、auto_route 和 strict_route。"
date: "2026-10-16"
updated: "2026-10-16"
author: "FlyClash 中文指南编辑部"
draft: false
---

TUN auto_route 和 strict_route。本文依据官方文档整理，先保存原配置，再只改一个字段并运行当前客户端或核心的配置检查。

## 实操步骤

1. 备份原代理、路由和 DNS
2. 运行配置检查并确认虚拟接口
3. 测试浏览器、命令行和本地地址并单独检查 DNS

新请求应分别观察规则命中、DNS 或出站结果，旧连接不能作为刚改配置的验收。异常时恢复备份，不要扩大监听范围或关闭安全校验。

继续阅读：[sing-box-reject-rule-action](/articles/sing-box-reject-rule-action/) · [sing-box-ntp-time-sync](/articles/sing-box-ntp-time-sync/)

官方来源：[https://sing-box.sagernet.org/configuration/inbound/tun/](https://sing-box.sagernet.org/configuration/inbound/tun/)

来源核验日期：2026-10-16。
