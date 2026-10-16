---
title: "sing-box TUN stack：gvisor、system 与 mixed 模式检查"
category: "tutorials"
description: "根据 sing-box 官方 TUN 入站文档核对 stack 选择，区分接口创建成功、TCP/UDP 转发和系统兼容性。"
date: "2026-10-16"
updated: "2026-10-16"
author: "FlyClash 中文指南编辑部"
draft: false
---

TUN stack 选择。本文依据官方文档整理，先保存原配置，再只改一个字段并运行当前客户端或核心的配置检查。

## 实操步骤

1. 记录原 stack、接口名和系统路由
2. 运行配置检查并启动副本
3. 分别测试 TCP 网站、UDP 应用和本地地址

新请求应分别观察规则命中、DNS 或出站结果，旧连接不能作为刚改配置的验收。异常时恢复备份，不要扩大监听范围或关闭安全校验。

继续阅读：[sing-box-tun-auto-route-check](/articles/sing-box-tun-auto-route-check/) · [sing-box-ntp-time-sync](/articles/sing-box-ntp-time-sync/)

官方来源：[https://sing-box.sagernet.org/configuration/inbound/tun/](https://sing-box.sagernet.org/configuration/inbound/tun/)

来源核验日期：2026-10-16。
