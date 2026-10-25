---
title: "sing-box DNS fallback 配置与解析失败排查"
category: "tutorials"
description: "按 sing-box 官方 DNS 文档检查 fallback 服务器、规则条件和查询结果，区分备用解析触发与连接出口故障。"
date: "2026-10-25"
updated: "2026-10-25"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 的 DNS fallback 不是“更快的第二个服务器”这么简单，它通常受规则和失败条件影响。遇到域名偶发解析失败，先记录实际命中的 DNS 服务器和返回结果，再判断 fallback 是否真的触发。

## 先保存查询证据

记录域名、查询类型、DNS 规则、主服务器响应和失败时间。浏览器缓存、系统 DNS 与 sing-box 内部查询可能不同，先把三者分开。

## 检查 fallback 关系

对照当前版本官方 DNS 配置，确认备用服务器定义、标签引用和规则条件一致。示例字段只用于定位配置层级，不代表固定服务器地址。若主服务器一直返回有效结果，fallback 不会因为“速度慢”自动按你的预期切换。

## 逐项改变并回测

1. 只保留主服务器，确认基础查询。
2. 恢复 fallback，制造可记录的失败条件。
3. 对比日志中的服务器标签与返回码。
4. 若 DNS 成功但业务连接失败，转查出站和路由。

DNS 出口相关问题可参考 [server detour](/articles/sing-box-dns-server-detour-check/)，查询类型规则见 [query_type 规则](/articles/sing-box-dns-query-type-rule-check/)。

## 官方来源

- [sing-box DNS 配置](https://sing-box.sagernet.org/configuration/dns/)
- [sing-box DNS server](https://sing-box.sagernet.org/configuration/dns/server/)

来源核验日期：2026-10-25。具体字段支持范围以当前官方文档为准。
