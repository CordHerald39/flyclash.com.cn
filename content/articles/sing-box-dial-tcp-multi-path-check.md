---
title: "sing-box tcp_multi_path：多网卡不等于多路径连接"
category: "tutorials"
description: "依据 sing-box 官方拨号文档，检查 tcp_multi_path 的构建要求、detour 影响和验证边界，区分多网卡路由选择与实际多路径 TCP。"
date: "2026-11-03"
updated: "2026-11-03"
author: "FlyClash 中文指南编辑部"
draft: false
---

设备同时连着有线和无线网络，不代表打开 `tcp_multi_path` 就会合并两条链路。sing-box 文档将它列为 TCP Multi Path 开关，并注明 Go 1.21 要求；实际行为还需要运行环境支持。

## 先区分开关、构建与网络能力

记录客户端使用的实际核心版本及可获得的构建信息。图形客户端版本不一定等于内置核心版本，不能只凭界面显示判断。这个拨号字段应位于适用的出站对象，不能放入 DNS 规则或 TLS 配置中。

```json
{"type": "direct", "tag": "direct-check", "tcp_multi_path": false}
```

片段用于说明关闭状态。若当前对象设置了 detour，官方规则是其他拨号字段被忽略，应先明确实际负责拨号的上游出站。不要仅为启用开关就删除已有 detour。

## 验证与回退步骤

1. 备份配置，确认字段和核心兼容，再运行 `sing-box check`。
2. 在相同网络与目标上，对比关闭和开启后的新 TCP 连接。
3. 检查系统可提供的连接诊断，确认是否真的协商出多路径；普通连接成功不足以证明。
4. 若出现异常而缺少协商证据，恢复原值，继续检查系统、对端和中间网络支持。

这个开关不是负载均衡规则，也不保证下载速度叠加。若需求只是指定出口网卡，应查看接口绑定与路由配置。这里没有运行多路径实机测试，也不提供未经测量的提速数字。

继续阅读：[接口绑定检查](/articles/sing-box-bind-interface-outbound-check/)、[TUN 自动路由](/articles/sing-box-tun-auto-route-check/)。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/shared/dial/)

来源核验日期：2026-11-03。
