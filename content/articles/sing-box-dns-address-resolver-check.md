---
title: "sing-box DNS address_resolver：服务器地址解析与启动排查"
category: "tutorials"
description: "根据 sing-box 官方 DNS server 文档理解 address_resolver、detour 和服务器地址解析。"
date: "2026-10-16"
updated: "2026-10-16"
author: "FlyClash 中文指南编辑部"
draft: false
---

DNS server address_resolver。本文依据官方文档整理，先保存原配置，再只改一个字段并运行当前客户端或核心的配置检查。

## 实操步骤

1. 记录原 DNS servers、标签和路由
2. 运行 sing-box check 确认引用存在
3. 启动后查看服务器地址解析并测试业务域名

新请求应分别观察规则命中、DNS 或出站结果，旧连接不能作为刚改配置的验收。异常时恢复备份，不要扩大监听范围或关闭安全校验。

继续阅读：[sing-box-direct-outbound-route](/articles/sing-box-direct-outbound-route/) · [sing-box-selector-manual-switch](/articles/sing-box-selector-manual-switch/)

官方来源：[https://sing-box.sagernet.org/configuration/dns/server/](https://sing-box.sagernet.org/configuration/dns/server/)

来源核验日期：2026-10-16。
