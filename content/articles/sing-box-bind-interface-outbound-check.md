---
title: "sing-box 出站 bind_interface：切换网卡后连不上怎么查"
category: "tutorials"
description: "依据 sing-box Dial Fields 官方文档，检查出站 bind_interface 的网卡名称、detour 优先关系及网络策略冲突，用同一目标对照切网后的连接失败。"
date: "2026-10-31"
updated: "2026-10-31"
author: "FlyClash 中文指南编辑部"
draft: false
---

电脑从有线网络切到 Wi-Fi 后，sing-box 仍尝试使用原来的网卡，可能导致出站连接失败。`bind_interface` 是拨号字段，用于绑定网络接口；排查时先确认它是否留在当前真正使用的出站中，再检查接口名称和网络状态。

## 先核对真正发起连接的出站

备份配置，记录内核版本、所选节点、活动网卡和连接错误。对同一目标先确认系统本身有可用网络，再看路由日志中选择的出站标签。图形客户端可能从订阅生成运行配置，编辑订阅原文后还要确认最终配置没有覆盖回旧值。

官方 Dial Fields 文档说明，设置 `detour` 后其他拨号字段会被忽略。因此，如果这个出站经另一个出站拨号，不应只盯着当前条目的 `bind_interface`；要沿 `detour` 找到实际建立底层连接的上游条目。

## 接口名称与源地址要分开检查

`bind_interface` 填网络接口名称；`inet4_bind_address` 与 `inet6_bind_address` 填本机绑定地址。它们不是同一种字段，不能把 IP 地址填进接口名称，也不要照抄别人机器的网卡名。

使用系统网卡列表核对实际名称、是否启用以及是否取得地址。网卡改名、移除 USB 网卡或切换网络后，原值需要重新核实。若本来不需要固定出口，可以在备份后移除这一条绑定做对照；保留其他拨号和节点认证设置。

官方另列的 `network_strategy` 只在符合条件的 Android、Apple 图形客户端中生效，并与接口和源地址绑定冲突。不要为了让桌面切网恢复而同时叠加这些字段。涉及连接等待时长，另见 [connect_timeout 检查](/articles/sing-box-connect-timeout-dial-check/)。

## 每次只改变一个绑定条件

1. 保持目标、节点和网络不变，记录原配置的失败时间与错误。
2. 在实际拨号条目中修正接口名，或临时移除不必要的固定绑定；执行 `sing-box check` 后重载。
3. 关闭旧连接，用同一目标重新连接，再对照选择的出站、错误和接口流量。
4. 再切到另一张已联网网卡复测。若必须固定接口，切网后的失败可能是预期限制，应决定保留绑定还是采用其他网络策略。

配置检查通过不能证明出口已经切换。若仍失败，恢复备份，继续分别检查目标可达性、DNS 与路由，避免连续修改多项后丢失原因。出站和路由的区别可参看 [sing-box direct 出站与路由](/articles/sing-box-direct-outbound-route/)。

## 官方来源

- [官方字段文档](https://sing-box.sagernet.org/configuration/shared/dial/)
- [官方字段文档](https://sing-box.sagernet.org/configuration/outbound/vless/)
- [官方配置检查命令](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-10-31。
