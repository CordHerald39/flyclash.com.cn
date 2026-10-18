---
title: "sing-box DNS reverse_mapping：反向映射与域名恢复检查"
category: "tutorials"
description: "根据 sing-box 官方 DNS 文档理解 reverse_mapping，检查 IP 到域名恢复对规则匹配的影响。"
date: "2026-10-18"
updated: "2026-10-18"
author: "FlyClash 中文指南编辑部"
draft: false
---

reverse_mapping 会影响 DNS 结果与域名之间的映射记录。它需要和实际规则、日志一起验证，不能单独当作分流开关。

## 实操步骤

1. 记录当前 DNS server、缓存和 route 规则，先在副本上修改。
2. 按官方字段说明启用或关闭 reverse_mapping，运行配置检查。
3. 对同一域名重复请求，观察缓存命中、IP 与恢复出的域名记录。
4. 若分流仍不符合预期，检查 route 规则和 resolver 标签，不要清空全部缓存作为第一步。

记录变更前后的日志，确认问题来自映射行为后再保留设置。

继续阅读：[sing-box DNS address_resolver](/articles/sing-box-dns-address-resolver-check/) · [sing-box route domain_resolver](/articles/sing-box-route-domain-resolver-check/)

官方来源：[sing-box DNS](https://sing-box.sagernet.org/configuration/dns/)

来源核验日期：2026-10-18。
