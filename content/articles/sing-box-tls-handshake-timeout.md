---
title: "sing-box TLS handshake_timeout：握手等待与连接超时怎么分开查"
category: "tutorials"
description: "根据 sing-box shared TLS 官方说明，核对 handshake_timeout 的版本边界、Duration 格式与默认值，区分 TCP 建连、TLS 握手和后续数据传输超时。"
date: "2026-11-05"
updated: "2026-11-05"
author: "FlyClash 中文指南编辑部"
draft: false
---

日志显示 TCP 已经建立，但连接长时间停在 TLS 握手时，可以检查 `tls.handshake_timeout`。它控制 TLS 握手的等待时间，与 Dial Fields 的 `connect_timeout` 分属不同阶段。只增加建连超时，不一定改变握手阶段的结果；把握手时间设得很长也不能修复证书或协议错误。

## 先确认当前内核接受字段

官方当前页面标注 handshake_timeout 自 sing-box 1.14.0 提供，默认使用 `15s`，格式为 Go Duration。这个标记不代表某个客户端已经打包该版本。先记录实际核心版本和 TLS 引擎，确认对应版本资料，再改配置。

字段位于现有出站或入站的 TLS 对象中。下面展示局部位置，保留已有服务器、证书和认证参数；示例沿用官方默认值，没有提供适合所有网络的推荐时间：

```json
{
  "tls": {
    "enabled": true,
    "handshake_timeout": "15s"
  }
}
```

持续时间必须包含单位，不能直接把数字 15 当作秒填入。配置检查成功也只证明结构可接受，实际握手仍可能因服务端、证书和网络路径失败。

## 用日志把三个阶段拆开

先观察最早错误发生在哪里：上游地址尚未解析，查引导解析；TCP 未连通，查 [connect_timeout](/articles/sing-box-connect-timeout-dial-check/) 与端口；TCP 已建立而 TLS 未完成，才看 handshake_timeout、server_name、证书链和 TLS 版本。握手成功后的应用数据超时，则不属于这个字段的控制范围。

证书名称错误或版本不兼容通常不会因延长等待而恢复。先按 [TLS 版本范围](/articles/sing-box-tls-version-range-handshake/) 的步骤核对双方支持，不要为比较超时而关闭证书校验。

## 单变量比较并保留回退

1. 保存完整配置，记录原超时、核心版本和最早日志时间。
2. 执行 `sing-box check`，处理未知字段或 Duration 格式错误后再重载。
3. 建立新连接，记录 TCP 建立、TLS 完成或超时的时间顺序。
4. 在受控测试中仅改变 handshake_timeout，保持连接目标、TLS 名称和路由一致。
5. 若错误阶段不变或持续返回证书错误，恢复原值，继续查该阶段原因。

应以日志确认握手完成和后续请求得到预期响应，不能仅用界面“节点可用”验收。本文没有进行客户端实机计时，也不声称调整超时能提升速度。

## 官方来源

- [官方文档](https://sing-box.sagernet.org/configuration/shared/tls/)
- [官方文档](https://sing-box.sagernet.org/configuration/shared/dial/)
- [官方文档](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-11-05。
