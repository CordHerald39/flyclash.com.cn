---
title: "sing-box DNS strategy 配置：IPv4、IPv6 与迁移检查"
category: "tutorials"
description: "按 sing-box 当前 DNS 官方文档检查 strategy 的四种地址族策略，区分解析偏好、路由解析器和已弃用字段，改动后保留回滚路径。"
date: "2026-10-26"
updated: "2026-10-26"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 的 DNS `strategy` 决定解析域名时采用哪种地址族策略。当前官方页面列出 `prefer_ipv4`、`prefer_ipv6`、`ipv4_only` 和 `ipv6_only` 四个值。它描述的是 DNS 结果偏好或限制，不是代理出站选择，也不等同于 Xray 的 `queryStrategy`。迁移配置时先确认字段属于哪一个核心，再判断是否真的需要修改。

## 先区分三种“策略”

`strategy` 位于 DNS 配置，影响域名解析结果；路由规则里的 `domain_resolver` 负责指定规则解析所用的 DNS 服务器；出站或路由动作则决定连接走哪条路径。把这三层写在同一个问题里，常会出现“解析成功但连接失败”或“只返回 IPv6”却误判为节点故障。

当前官方 DNS 文档没有把 `strategy` 标为弃用。页面另行标注了 `independent_cache` 等字段的迁移信息，因此升级时不能把“页面存在迁移提示”概括成所有 DNS 字段都失效。若旧配置来自其他核心，先按目标核心的结构重写，不要只替换字段名。

## 用最小变更做地址族对照

1. 备份原配置，记录系统网络是否具备可用 IPv4、IPv6，以及当前 DNS 服务器和规则。
2. 一次只选择一个 `strategy` 值，运行配置检查；值必须来自当前文档，不能填 `auto` 或自行拼写的别名。
3. 对同一个域名分别发起 A、AAAA 查询，保存返回地址、命中服务器和日志时间。浏览器缓存与应用内部缓存要分开记录。
4. 用一个已知只支持 IPv4 或只支持 IPv6 的目标做连接对照。解析得到地址不代表后续出站一定支持该地址族。
5. 若结果与预期不同，恢复备份再检查 DNS 规则、缓存和 `domain_resolver`，不要用改成全局策略来掩盖单域名问题。

`ipv4_only` 或 `ipv6_only` 可能让另一地址族的站点无法连接；这属于策略预期，不是随机故障。验证完成后，保留最小范围的规则并记录回退值。需要回滚时恢复原文件、清理受影响缓存并重新建立新连接。

DNS 服务器故障的分层方法见 [sing-box DNS fallback](/articles/sing-box-dns-fallback-config/)，查询类型条件可参考 [query_type 规则](/articles/sing-box-dns-query-type-rule-check/)。若问题只发生在路由域名匹配，继续看 [route domain_resolver](/articles/sing-box-route-domain-resolver-check/)。

## 官方来源

[sing-box DNS 官方文档](https://sing-box.sagernet.org/configuration/dns/)

来源核验日期：2026-10-26。本文采用当前页面列出的四个 `strategy` 值，并明确区分页面中另行标注的弃用字段。
