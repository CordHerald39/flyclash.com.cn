---
title: "Clash Verge Rev DNS 扩展配置合并：nameserver-policy 被覆盖怎么查"
category: "tutorials"
label: "DNS 扩展"
description: "根据 Clash Verge Rev 官方扩展链路，检查全局与订阅 DNS 配置的替换规则、nameserver-policy 丢失和应用设置回写，核对最终运行配置。"
date: "2026-10-14"
updated: "2026-10-14"
author: "FlyClash 中文指南编辑部"
draft: false
---

Clash Verge Rev 中给某个订阅增加 DNS 策略后，全局的另一条策略消失，先检查两层扩展是否都写了 `dns.nameserver-policy`。同一个字段在不同层出现时，最终内容可能整体替换；把两份 YAML 都保存成功，不能证明它们的条目同时保留。

## 先记录版本和扩展作用范围

按[官方扩展配置说明](https://www.clashverge.dev/guide/extend.html)，先备份订阅原文、全局扩展和当前订阅扩展，再记录应用版本。文档说明 `v2.5.5` 起，DNS 下写出的字段及顶层 `hosts` 使用整体替换规则；旧版本应对照对应版本说明，不能套用新行为。

全局扩展适用于多个订阅，订阅扩展只处理对应订阅。官方执行链路是：订阅原文、应用设置、全局扩展配置、全局扩展脚本、订阅扩展配置、订阅扩展脚本，最后应用设置回写。调查时按这个顺序收集同一字段，避免只看最后编辑过的一份文件。

## nameserver-policy 的两条记录要放在最终那一层

假设全局扩展为一个域名指定解析器，当前订阅又给另一个域名指定解析器。域名与地址都是演示值，应替换为你已验证可用的策略：

```yaml
# 全局扩展配置
dns:
  nameserver-policy:
    "service-a.example": https://dns.alidns.com/dns-query

# 当前订阅的扩展配置
dns:
  nameserver-policy:
    "service-b.example": https://1.1.1.1/dns-query
```

按上述版本规则，预期最终 `nameserver-policy` 仅保留第二层写出的表。若两条都需要保留，就在该订阅扩展中写出完整的两条策略，或在订阅扩展脚本里逐条增加所需项；修改脚本前先检查现有脚本有没有再次给整个字段赋值。

不必为了保留这两条记录，把订阅所有 DNS 字段都复制一遍。DNS 中没有写出的字段保持原值；写了 `nameserver` 列表时，列表也会整体替换。检查时明确是哪一个子字段被换掉，避免把它误解为所有 `dns` 子字段都会被清空。

## 应用接管的字段要到设置中检查

扩展写入 `mixed-port` 等应用接管字段时，链路末尾会恢复应用设置值，并给出提示和扩展卡片日志。DNS 也有边界：官方说明 `dns.ipv6` 仅在“DNS 覆写”开启且覆写页面启用 IPv6 时被接管。遇到该值不符，先核对这些条件，不能只把订阅扩展重复保存。

DNS 覆写在扩展前写入，而上述字段接管又可能发生在末尾。记录设置、扩展和最终值，才能判断是哪一层生效。需要改变应用监听或接管方式，可参考[Windows 系统代理验收](/articles/clash-verge-rev-windows-system-proxy/)。

## 每次只改一层并检查最终配置

保存后重新生成并加载当前订阅的配置，查看实际交给内核的内容。预期最终表里出现需要的两条记录，其他 DNS 子字段仍与预期一致；若不一致，备份后一次停用一个相关脚本，再比较最终值。不要同时改全局扩展、订阅扩展和 DNS 覆写。

最终字段正确后，用新建连接测试所需域名，并检查日志中的解析与出站结果。配置文本正确不等于解析器在当前网络可达；如果故障发生在规则命中阶段，转到[自定义规则检查](/articles/clash-verge-rev-custom-rules/)，继续保留本页已验证的 DNS 配置。

## 官方来源

- [Clash Verge Rev：扩展配置与脚本、DNS 合并规则和应用优先级](https://www.clashverge.dev/guide/extend.html)
- [Clash Verge Rev 官方文档入口](https://www.clashverge.dev/)

来源核验日期：2026-10-14。本文聚焦 DNS 字段在多层扩展中的合并与替换，版本边界按官方文档核对。
