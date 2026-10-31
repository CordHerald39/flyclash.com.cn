---
title: "sing-box WebSocket path 握手失败：路径与 early data 检查"
category: "tutorials"
description: "对照 sing-box 官方 V2Ray Transport 文档，检查 WebSocket 的 transport path、额外请求头与 early data 一致性，区分网络、TLS 和传输握手错误。"
date: "2026-10-31"
updated: "2026-10-31"
author: "FlyClash 中文指南编辑部"
draft: false
---

节点地址和端口可以连接，sing-box 仍报 WebSocket 握手失败，可以先对照服务端提供的传输路径。官方文档说明，WebSocket 的 `path` 是 HTTP 请求路径，服务端会校验；TCP 可达只能说明底层连接可建立，不能证明路径、TLS 与代理认证都正确。

## 先确定错误发生的阶段

备份配置，记录节点传输类型、目标端口与原始错误。若错误是连接超时，先查网络；若是证书错误，先按 [TLS server_name 与证书检查](/articles/sing-box-tls-server-name-certificate-check/) 处理。遇到握手阶段的 HTTP 状态或非预期响应，再比较路径和反向代理入口。

只使用服务提供方明确给出的配置。订阅地址的 URL 路径通常属于配置下载接口，不能拿来替代节点的 WebSocket 传输路径。

## 核对 transport 内的 path

在支持 V2Ray Transport 的出站中检查 `transport` 对象。VLESS 官方出站文档列出该字段；不要把它放到顶层或误写成 DNS 请求路径。下面仅展示局部结构，`/proxy-ws` 是说明写法的自定义路径，必须替换为自己服务端的实际配置：

```json
{
  "transport": {
    "type": "ws",
    "path": "/proxy-ws"
  }
}
```

保留节点的地址、端口、认证和 TLS 设置。逐字符比对路径，包含前导斜杠、大小写以及服务端要求的结尾形式。官方文档对普通 HTTP transport 提到的“路径后缀”兼容行为不适用于 WebSocket，不能据此随意增加路径。

## 没有需要时先保留 early data 原值

官方 `max_early_data` 为非零时启用相应早期数据行为；`early_data_header_name` 默认让早期数据放进路径。文档给出的 Xray-core 兼容头名称为 `Sec-WebSocket-Protocol`，并要求与服务端一致。只有服务端确实启用了对应功能时才调整，不能把这些字段当作通用修复参数。

`headers` 是额外 HTTP 请求头。它不替代 TLS 服务器名称或证书验证；也不要复制浏览器里的 Cookie、Authorization 等敏感头到公开配置中。

## 配置通过后再测试新连接

1. 保持节点、TLS 与网络不变，只修正已确认错误的路径。
2. 执行 `sing-box check` 后重载，并确认客户端实际运行配置包含新值。
3. 关闭旧连接并重新连接，记录握手阶段是否变化；网页可打开本身不足以证明使用的是这个节点。
4. 如果仍失败，恢复备份，向服务维护方核对入口路径、反向代理和传输类型，不通过关闭证书校验绕过定位。

基础配置检查入口见 [sing-box Windows 配置检查](/articles/sing-box-windows-config-check/)。本文未在真实服务端验证示例路径，不能将示意值直接作为可用节点参数。

## 官方来源

- [官方字段文档](https://sing-box.sagernet.org/configuration/shared/v2ray-transport/)
- [官方字段文档](https://sing-box.sagernet.org/configuration/outbound/vless/)
- [官方配置检查命令](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-10-31。
