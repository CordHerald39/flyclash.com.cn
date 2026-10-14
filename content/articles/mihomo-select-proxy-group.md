---
title: "mihomo select 手动代理组：候选、默认节点与切换验收"
category: "tutorials"
description: "按 mihomo 官方 select 文档建立手动代理组，核对节点引用、default-selected 与运行时选择，区分选择生效、规则命中和重启持久化。"
date: "2026-10-15"
updated: "2026-10-15"
author: "FlyClash 中文指南编辑部"
draft: false
---

想在两个已有节点之间手动切换，可以使用 mihomo 的 select 代理组。先建立候选列表，再让目标请求进入这个组；仅在面板点击一个成员，不能证明所有流量都跟着改变。规则、组选择和旧连接需要分别检查。

## 先建立一个最小选择组

[官方 select 文档](https://wiki.metacubex.one/config/proxy-groups/select/)使用 `type: select`，候选可引用已有出站或其他代理组。下面是局部片段，没有节点参数；节点A、节点B 必须是配置中真实存在的名称。

```yaml
proxy-groups:
  - name: 手动测试
    type: select
    proxies:
      - 节点A
      - 节点B
```

保留原有代理组、入站和规则，只新增该项。名称含特殊符号时用引号包裹，避免 YAML 解析歧义。图形客户端可能对订阅做合并，保存后查看实际运行配置，而不是只检查编辑器里的原文件。

## 默认成员和当前选择要区分

[通用字段文档](https://wiki.metacubex.one/config/proxy-groups/)提供 `default-selected`：为空或所填节点名不存在时，默认选择组中第一项。确需指定默认节点，可在确认当前核心支持后加入 `default-selected: 节点B`，名称必须与候选一致。

默认值描述初始选择，运行时点击后的状态和重启持久化还与客户端、缓存等设置有关。不要靠反复重新排列节点列表判断点击是否生效。首次测试先观察运行状态，重启恢复作为单独一轮验收，避免两种问题混在一起。

## 让一条明确流量经过该组

1. 备份原配置，记录核心版本、原选中项和要测试的业务域名。
2. 合并组并通过客户端原有校验入口检查，查看最终候选是否完整。
3. 在客户端已有规则或覆写入口，让一个明确目标使用“手动测试”；保留其他流量原路径。
4. 选择节点A，关闭旧测试连接后重发请求，核对连接记录的组与成员。
5. 改选节点B，再发起新请求，比较记录和目标响应。

没有经过该组时，节点点击本身无法改变这条连接。FlyClash 用户先查[代理模式与运行路径](/articles/flyclash-proxy-mode-check/)；使用 Clash Verge Rev 的本地规则入口，可阅读[自定义规则检查](/articles/clash-verge-rev-custom-rules/)。不要为验证一个组把全机规则一次改完。

## 候选为空或节点选了仍不通

候选名称写错、来源集合为空、最终配置被覆盖，应分别查配置与更新结果。`use` 引用集合和 `proxies` 引用成员的含义不同；若使用集合，确认更新成功且实际包含候选，见[规则与提供者检查](/articles/fly-rule-providers/)。规则集合不是节点集合，别把两种资源混用。

已选中且命中组但目标失败，继续检查节点、DNS、目标端口和具体错误。手动选择不负责健康检查或自动容错。完成后恢复原组及测试规则，用同一目标新连接核对原路径，保留原可用配置作为回退。本文不提供节点服务或速度结论。

## 官方来源

- [https://wiki.metacubex.one/config/proxy-groups/select/](https://wiki.metacubex.one/config/proxy-groups/select/)
- [https://wiki.metacubex.one/config/proxy-groups/](https://wiki.metacubex.one/config/proxy-groups/)

来源核验日期：2026-10-15。配置说明以本机核心版本支持范围为准。
