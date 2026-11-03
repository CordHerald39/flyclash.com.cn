---
title: "sing-box TCP keepalive 配置：空闲断连与心跳怎么区分"
category: "tutorials"
description: "依据 sing-box 官方 dial 文档，检查 disable_tcp_keep_alive、tcp_keep_alive 和 interval 的关系，区分系统保活、应用心跳及中间设备超时。"
date: "2026-11-03"
updated: "2026-11-03"
author: "FlyClash 中文指南编辑部"
draft: false
---

代理连接空闲一段时间后断开，先记录断开的时间和日志，再决定是否调整 TCP keepalive。它是 TCP 层的保活机制，不能替代应用心跳，也不能保证服务端或中间设备永远不关闭连接。

## 核对三个相关字段

官方拨号文档从 sing-box 1.13.0 标记这些字段：`disable_tcp_keep_alive` 关闭保活，`tcp_keep_alive` 设置初始等待时间，`tcp_keep_alive_interval` 设置后续间隔。先核对实际核心版本；旧核心遇到未知字段应恢复配置，而不是忽略报错启动。

```json
{
  "type": "direct",
  "tag": "direct-check",
  "disable_tcp_keep_alive": false,
  "tcp_keep_alive": "5m",
  "tcp_keep_alive_interval": "75s"
}
```

示例取自本次核验文档中的默认值说明，只作为当前文档的参考，不表示所有历史版本采用相同默认值。若设置 detour，其他拨号字段会被忽略，应检查实际负责建立连接的上游对象。

## 排查空闲断开

1. 备份配置并执行 `sing-box check`，确认当前版本接受字段。
2. 区分握手超时、持续传输中断与空闲断开，分别记录发生阶段。
3. 使用同一服务建立新连接，只调整一个保活参数，观察是否能稳定复现差异。
4. 若连接仍在固定时间被关闭，核对应用心跳、服务端空闲策略和中间设备超时。

不要把间隔设得很小来代替诊断，这可能增加无用流量。无明确改善时恢复原参数，保留断开时间及双方日志。本页没有进行真实长连接保活测试。

继续阅读：[拨号连接超时](/articles/sing-box-connect-timeout-dial-check/)、[WebSocket 握手路径](/articles/sing-box-websocket-path-handshake-check/)。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/shared/dial/)

来源核验日期：2026-11-03。
