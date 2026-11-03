---
title: "sing-box udp_fragment：UDP 大报文失败怎样分层排查"
category: "tutorials"
description: "参考 sing-box 官方 udp_fragment 拨号字段，区分 UDP 分片开关、TUN MTU 与代理 UDP 能力，整理小报文正常而大报文失败的检查步骤。"
date: "2026-11-03"
updated: "2026-11-03"
author: "FlyClash 中文指南编辑部"
draft: false
---

UDP 小请求正常、较大报文失败时，可以检查 `udp_fragment`，但不能据此认定原因就是分片。官方 dial 文档只把它定义为启用 UDP fragmentation，实际故障还可能来自 MTU、路由、对端限制或代理不支持 UDP。

## 先确认流量走到哪个出站

记录目标地址、报文大小、当前出站与日志。确认这个协议链路本来就支持 UDP，再检查拨号字段；开关不会让原本只支持 TCP 的链路突然具有 UDP 能力。若出站设置 detour，其他拨号字段按官方说明会被忽略。

```json
{"type": "direct", "tag": "direct-check", "udp_fragment": false}
```

这是 direct 出站中的局部示例，用于建立关闭状态基线。TUN 的 MTU 和出站拨号的分片选项属于不同环节，不应同时随意调整。

## 用报文大小缩小范围

1. 备份配置，先运行 `sing-box check` 排除字段错误。
2. 用同一目标比较小报文和较大报文，记录成功边界及错误。
3. 只改变 udp_fragment 后新建请求，避免旧连接状态干扰。
4. 没有改善时恢复原值，再查接口 MTU、路径限制、防火墙和服务端日志。

分片报文可能在路径中被丢弃，启用分片并不保证所有网络可达。不要把 DNS 解析错误、无 UDP 出站或目标端口拒绝都归因于该开关；先保留能稳定复现的最小请求。

相关排查：[TUN MTU](/articles/sing-box-tun-mtu/)、[TCP 与 UDP 路由](/articles/sing-box-route-network-tcp-udp/)。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/shared/dial/)

来源核验日期：2026-11-03。
