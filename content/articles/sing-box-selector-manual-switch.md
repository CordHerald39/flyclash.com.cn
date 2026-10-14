---
title: "sing-box selector 手动切换：候选标签与 Clash API 检查"
category: "tutorials"
description: "按 sing-box 官方 selector 文档建立出站选择器，核对候选标签、默认选择、Clash API 本机入口及已有连接的切换边界。"
date: "2026-10-15"
updated: "2026-10-15"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 中需要在几个已配置的出站之间手动选择，可以添加 selector。它引用出站标签，由控制接口改变当前选择。先检查候选确实存在、测试流量进入选择器，再看切换结果；重启后能否保留选择属于缓存问题，应在基础切换通过后单独验收。

## 候选使用出站标签

[selector 官方文档](https://sing-box.sagernet.org/configuration/outbound/selector/)规定，`outbounds` 是必填候选标签列表，`default` 为空时选择第一项。下例是局部出站项，proxy-a 和 proxy-b 必须已在同一配置定义，不提供节点参数。

```json
{
  "type": "selector",
  "tag": "manual-select",
  "outbounds": ["proxy-a", "proxy-b"],
  "default": "proxy-a",
  "interrupt_exist_connections": false
}
```

将它加入原 `outbounds` 数组，保留原标签和顺序。不要把选择器自己的标签放回候选，也不要把名称相似当成同一个出站。图形客户端的显示名称可能经过处理，应核对最终配置中的真实 tag。

## 控制入口与流量入口分开

官方说明 selector 当前只能通过 Clash API 控制。[Clash API 文档](https://sing-box.sagernet.org/configuration/experimental/clash-api/)中 `external_controller` 为空时接口关闭；可按本机现有面板说明配置回环控制地址，如 127.0.0.1:9090，并设置自己的 secret。面板访问地址与业务代理端口不能混填。

首次配置在本机完成，不为手动选择开放公网控制。使用已有面板时，确认它连接的是这一个核心的地址，认证也对应当前配置；不要在截图或反馈里暴露 secret。若面板无法接入，先解决端口、认证或客户端支持问题，再测试切换。

## 保持路由范围明确

[Route 文档](https://sing-box.sagernet.org/configuration/route/)中的 `final` 决定默认出站。只要测试流量没有路由到 manual-select，改变该选择器就不会影响它。先通过一条范围明确的现有规则选中该标签，保留其他流量的原路径，别为了看到效果把全局兜底一起改掉。

1. 备份完整配置，记录版本、原路由和控制入口。
2. 加入选择器并执行 `sing-box check -c config-test.json`，确认所有候选标签有效。
3. 在本机面板查看当前成员，选择 proxy-a 并新建测试请求。
4. 改为 proxy-b，再新建连接，检查路由记录和实际成员。
5. 请求一个未经过选择器的目标，确认它仍使用原出站。

## 旧连接为什么没有立即换出口

`interrupt_exist_connections` 控制选中项变化时是否中断已有入站连接，官方同时说明内部连接始终会被中断。保持 false 的测试不能用旧连接的结果判断新选择失败；先用新请求验证。需要中断行为时在可回退环境单独试验，评估持续传输受影响情况。

重启选择丢失见[cache_file 持久化配置](/articles/sing-box-cache-file-config/)，它不会替代选择器和控制接口。加载报错见[配置校验指南](/articles/sing-box-windows-config-check/)。完成后恢复原选择和测试规则，保留配置备份。

## 官方来源

- [https://sing-box.sagernet.org/configuration/outbound/selector/](https://sing-box.sagernet.org/configuration/outbound/selector/)
- [https://sing-box.sagernet.org/configuration/experimental/clash-api/](https://sing-box.sagernet.org/configuration/experimental/clash-api/)
- [https://sing-box.sagernet.org/configuration/route/](https://sing-box.sagernet.org/configuration/route/)

来源核验日期：2026-10-15。配置说明以本机核心版本支持范围为准。
