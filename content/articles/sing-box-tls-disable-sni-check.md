---
title: "sing-box disable_sni：关闭 SNI 后 TLS 握手失败怎么查"
category: "tutorials"
description: "参考 sing-box 官方 TLS 文档，区分 disable_sni、server_name 与 insecure 的职责，排查关闭 SNI 后的虚拟主机选择与证书错误。"
date: "2026-11-03"
updated: "2026-11-03"
author: "FlyClash 中文指南编辑部"
draft: false
---

把 `disable_sni` 打开后节点无法握手，先恢复原设置并确认服务器是否依赖 SNI 选择虚拟主机。这个客户端选项控制 ClientHello 是否发送服务器名称，不会自动关闭证书验证。

## 分清三个 TLS 字段

官方文档说明，server_name 用于核验证书主机名；通常也参与客户端握手中的服务器名称发送。disable_sni 控制不发送该名称，insecure 则接受任意服务器证书。这三个设置不能互相替代。

```json
{"tls": {"enabled": true, "disable_sni": false, "insecure": false}}
```

这是现有出站中的 TLS 局部对象，地址、认证及 server_name 应保留服务端要求的值。省略这些必需信息的片段不能直接作为完整节点导入。

## 按错误阶段测试

1. 保存原配置和实际核心版本，执行 `sing-box check`。
2. 检查当前 TLS engine 是否支持该字段，按对应版本文档确认兼容范围。
3. 保持地址、认证和证书校验不变，只恢复 disable_sni 后新建连接。
4. 对照日志判断是证书主机名错误、握手被关闭，还是 TCP 连接本身失败。

如果服务端依赖名称选择证书或后端，隐藏 SNI 可能改变它的响应。应向维护者确认要求，不要用 insecure 绕过验证来掩盖问题。此文只解释字段及检查方法，没有替具体服务器验证连通性。

继续阅读：[server_name 与证书](/articles/sing-box-tls-server-name-certificate-check/)、[insecure 标志](/articles/sing-box-tls-insecure-flag-check/)。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/shared/tls/)

来源核验日期：2026-11-03。
