---
title: "sing-box route ip_version：IPv4/IPv6 条件与连接检查"
category: "tutorials"
description: "根据 sing-box 官方 route rule 文档使用 ip_version 条件，区分规则匹配版本与 DNS 返回地址。"
date: "2026-10-16"
updated: "2026-10-16"
author: "FlyClash 中文指南编辑部"
draft: false
---

route ip_version 条件。本文依据官方文档整理，先保存原配置，再只改一个字段并运行当前客户端或核心的配置检查。

## 实操步骤

1. 记录系统 IPv4/IPv6、DNS 返回地址和原路由
2. 运行配置检查
3. 分别发起 IPv4 与 IPv6 请求并测试无匹配目标

新请求应分别观察规则命中、DNS 或出站结果，旧连接不能作为刚改配置的验收。异常时恢复备份，不要扩大监听范围或关闭安全校验。

继续阅读：[sing-box-dns-address-resolver-check](/articles/sing-box-dns-address-resolver-check/) · [sing-box-reject-rule-action](/articles/sing-box-reject-rule-action/)

官方来源：[https://sing-box.sagernet.org/configuration/route/rule/](https://sing-box.sagernet.org/configuration/route/rule/)

来源核验日期：2026-10-16。
