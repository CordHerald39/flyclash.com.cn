---
title: "sing-box direct 出站：直连标签、路由与旧字段迁移"
category: "tutorials"
description: "根据 sing-box 官方文档设置 direct 出站，核对路由目标与兜底出站，区分本机直连和上游代理，并检查旧 override 字段的版本要求。"
date: "2026-10-15"
updated: "2026-10-15"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 的 direct 出站直接向目标发送请求。它可以用于明确需要本机直连的流量，也可作连通性对照；定义了一个 direct 标签，并不会让所有请求自动直连。仍须核对规则、兜底标签以及客户端最终加载的配置。

## 先定义一个清晰标签

[官方 direct 文档](https://sing-box.sagernet.org/configuration/outbound/direct/)给出 `type: direct`。下面是添加到已有 `outbounds` 的一项，标签名自行选择并保持唯一，不要覆盖其他代理出站。

```json
{
  "outbounds": [{
    "type": "direct",
    "tag": "local-direct"
  }]
}
```

这是片段，不包含入口与完整路由。直连仍使用当前机器的网络条件，无法替代不可用的上游网络，也不能据此推断域名一定由哪台 DNS 解析。需要 DNS 分流时，单独核对当前版本 DNS 与拨号设置。

## 看规则，也看没有命中时的去向

[官方 Route 文档](https://sing-box.sagernet.org/configuration/route/)说明，`final` 是默认出站标签；为空时使用第一个出站。调整出站数组顺序可能改变未匹配请求，新增项时应检查原顺序与原 `final`。不要为了一个直连目标把兜底也改为直连。

当前[规则动作文档](https://sing-box.sagernet.org/configuration/route/rule_action/)用 `action: route` 配合 `outbound` 指向目标标签。需要给一条已确认的测试规则选择直连时，保留原匹配条件，把动作引用设为实际的 local-direct。此处只展示动作结构：

```json
{
  "action": "route",
  "outbound": "local-direct"
}
```

该片段不是一条完整业务规则。不要把没有匹配条件的动作直接插到列表顶部，否则可能扩大影响范围。旧版路由结构与当前文档存在迁移差异，先用本机版本校验，再按版本文档整理。

## 旧 override 字段不要继续照搬

direct 文档标记 `override_address`、`override_port` 自 1.11.0 弃用，并说明将在 1.13.0 移除。本文不以这些旧出站字段修改目标。确有目标重写需求时，按当前规则动作和版本迁移说明独立处理，不能通过删除报错字段后悄悄改变业务目的。

## 用一条新连接对照路径

1. 保存完整配置与原出站顺序，记录 `sing-box version`。
2. 只加入 direct 项和限定范围的测试规则，运行 `sing-box check -c config-test.json`。
3. 加载后从既有入口请求测试目标，观察命中规则与实际出站标签。
4. 再请求一个不匹配的目标，确认其仍走原有路径。
5. 异常时撤销测试规则和新增项，重新校验后恢复。

入口不通先看[HTTP 入站验收](/articles/sing-box-http-inbound-config/)；Windows 配置加载问题见[配置校验](/articles/sing-box-windows-config-check/)。TUN 环境的直连异常还须核对接口和回环问题，不能只凭 direct 名称判断流量已绕开原路由。

## 官方来源

- [https://sing-box.sagernet.org/configuration/outbound/direct/](https://sing-box.sagernet.org/configuration/outbound/direct/)
- [https://sing-box.sagernet.org/configuration/route/](https://sing-box.sagernet.org/configuration/route/)
- [https://sing-box.sagernet.org/configuration/route/rule_action/](https://sing-box.sagernet.org/configuration/route/rule_action/)

来源核验日期：2026-10-15。配置说明以本机核心版本支持范围为准。
