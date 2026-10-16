---
title: "sing-box route domain_resolver：域名规则解析与命中验收"
category: "tutorials"
description: "根据 sing-box 官方 route rule 文档设置 domain_resolver，区分规则匹配、DNS 解析与最终出站。"
date: "2026-10-16"
updated: "2026-10-16"
author: "FlyClash 中文指南编辑部"
draft: false
---

route domain_resolver。本文依据官方文档整理，先保存原配置，再只改一个字段并运行当前客户端或核心的配置检查。

## 实操步骤

1. 记录原 rules、DNS servers 和 final
2. 运行配置检查确认两个引用存在
3. 发起新请求观察规则、解析和 outbound

新请求应分别观察规则命中、DNS 或出站结果，旧连接不能作为刚改配置的验收。异常时恢复备份，不要扩大监听范围或关闭安全校验。

继续阅读：[sing-box-dns-address-resolver-check](/articles/sing-box-dns-address-resolver-check/) · [sing-box-selector-manual-switch](/articles/sing-box-selector-manual-switch/)

官方来源：[https://sing-box.sagernet.org/configuration/route/rule/](https://sing-box.sagernet.org/configuration/route/rule/)、[https://sing-box.sagernet.org/configuration/dns/server/](https://sing-box.sagernet.org/configuration/dns/server/)

来源核验日期：2026-10-16。
