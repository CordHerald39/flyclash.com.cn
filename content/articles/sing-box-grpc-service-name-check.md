---
title: "sing-box gRPC service_name 连接失败：服务名与保活参数怎么查"
category: "tutorials"
description: "依据 sing-box gRPC 传输官方文档，核对 service_name 字段位置、真实服务名及不同实现的保活语义，避免用超时参数掩盖配置错误。"
date: "2026-10-31"
updated: "2026-10-31"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 的 gRPC 节点连接失败时，先核对服务提供方给出的 `service_name`，再检查 TLS 与服务端入口。官方传输文档把它定义为 gRPC 服务名；它不是节点显示名称，也不是订阅下载路径。修改节点备注不会改变这个连接参数。

## 确认使用的是哪一种传输

保存原配置、内核版本、传输类型及错误阶段。先检查运行配置确实包含 `type: "grpc"`，而不是仍使用 WebSocket 或普通 TCP 的条目。客户端可能只展示简化名称，应查看导出的运行配置或其提供的诊断信息，分享时隐藏 UUID 与账户数据。

VLESS 官方文档列出的 `transport` 可引用 V2Ray Transport。不是所有出站都使用这套传输结构，也不能给一个不支持它的协议随意添加 gRPC 字段。

## 把服务名放到正确的对象里

下例只展示传输对象。`TunService` 是官方文档的结构示例值；实际服务名必须由自己使用的服务端配置确定，不能把它当作每个节点的默认服务：

```json
{
  "transport": {
    "type": "grpc",
    "service_name": "TunService"
  }
}
```

保持原有节点地址、端口、用户认证和 TLS 不变，对照服务端逐字符核对服务名。不要自行在名称前加斜杠或照抄 WebSocket 的 `path`。如果经过反向代理，服务端维护方还需要确认对应入口确实转发到这项服务。

## 先别用保活时间处理首次连接失败

官方文档区分标准 gRPC 与默认 gRPC 实现，说明标准实现默认未包含在构建中。`idle_timeout`、`ping_timeout` 在两种实现中的行为不同；其中 `permit_without_stream` 的说明针对标准 gRPC 客户端。不能仅因配置页列出了这些参数，就断言所用客户端一定支持同一种实现或行为。

首次握手或认证尚未成功时，应先修正服务名和入口。若连接建立后才在空闲时断开，再固定实现、网络和空闲时长，对照服务端限制检查保活。延长超时不保证能解决服务端拒绝或网络中断。

## 分阶段验证，失败后恢复

1. 在备份基础上仅修正已证实错误的服务名，通过 `sing-box check` 后重载。
2. 新建连接，先区分网络超时、TLS 证书错误和传输错误；TLS 协议范围另见 [TLS 版本范围排查](/articles/sing-box-tls-version-range-handshake/)。
3. 成功建立连接后测试实际请求，再测试空闲后的新请求，分别记录，不把一次测速成功作为长期保活结论。
4. 没有改善时恢复备份，保留错误时间与服务名核对结果，继续向服务维护方确认支持的传输和构建能力。

若最初连 TCP 都超时，可先看 [sing-box connect_timeout 检查](/articles/sing-box-connect-timeout-dial-check/)。本文没有运行真实 gRPC 服务，不提供通用可用节点配置。

## 官方来源

- [官方字段文档](https://sing-box.sagernet.org/configuration/shared/v2ray-transport/)
- [官方字段文档](https://sing-box.sagernet.org/configuration/outbound/vless/)
- [官方配置检查命令](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-10-31。
