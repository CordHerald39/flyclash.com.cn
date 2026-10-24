---
title: "sing-box route invert 规则：反转条件与顺序排查"
category: "tutorials"
description: "按 sing-box 官方 route rule 文档检查 invert 的条件反转、规则顺序与默认出站。"
date: "2026-10-24"
updated: "2026-10-24"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 路由规则中的 invert 会把条件结果反转。它适合表达“除了这组条件以外”的范围，但也容易与多个条件、rule_set 和更早规则叠加后造成误判。遇到新增排除规则反而覆盖全部流量时，应先把条件和顺序拆开验证。

## 先确定规则输入

备份 route，记录域名、IP、端口、network、rule_set 以及命中的规则顺序。一次只测试一个输入，避免同时改变 final、DNS 和出站。规则命中日志应来自新连接，旧连接可能还沿用原出站。

## 只反转一组明确条件

官方 route rule 文档支持规则条件和 invert。局部示例：

```json
{
  "domain_suffix": ["example.test"],
  "invert": true,
  "action": "route",
  "outbound": "proxy"
}
```

示例用于说明反转关系，具体 action、outbound 和字段组合要按当前版本校验。不要把 `invert` 当成“跳过本条规则”的开关；它会改变条件真假，仍会参与后续动作。若条件列表为空或同时包含多个条件，先查官方定义并用最小配置验证。

## 用命中与未命中样本对照

1. 运行配置检查，确认规则动作和出站标签存在。
2. 准备一个满足原条件的域名和一个不满足的域名。
3. 分别新建连接，记录反转前后的规则命中和出站。
4. 恢复原规则，确认没有改变全局 final。

若规则完全不生效，先看 [domain_suffix 规则](/articles/sing-box-route-domain-suffix-check/)；若来源网段条件参与，参考 [source_ip_cidr](/articles/sing-box-route-source-ip-cidr-check/)。默认出站异常时检查 [route.final](/articles/sing-box-route-domain-suffix-check/)。

## 官方来源

- [sing-box route rule](https://sing-box.sagernet.org/configuration/route/rule/)

来源核验日期：2026-10-24。示例不代表对真实节点的连通性或性能测试。

