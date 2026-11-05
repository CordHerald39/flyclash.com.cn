---
title: "sing-box TCP DNS 配置：端口、引导解析与迁移后的出站检查"
category: "tutorials"
description: "依据 sing-box 官方 TCP DNS 文档，检查 type tcp、server_port、domain_resolver 和新旧默认出站差异，区分普通 TCP DNS 与加密解析。"
date: "2026-11-05"
updated: "2026-11-05"
author: "FlyClash 中文指南编辑部"
draft: false
---

需要把 DNS 查询送到 TCP 服务器，或从旧 TCP DNS 格式迁移时，先确认上游确实提供 TCP DNS 服务。把 `type` 改成 `tcp` 不会让普通网页服务器变成解析器，也不会给查询加密。本文处理服务器条目和连接路径，沿用现有 DNS 规则，不替换整份配置。

## 先确认版本与上游协议

当前官方页面把新式 TCP DNS 服务器标为自 sing-box 1.12.0 提供。这是文档的支持边界，不是本机已安装版本的证明。记录运行内核版本、原服务器标签、地址和端口；若内核较旧，先查对应版本资料。

官方字段要求 `server`，`server_port` 默认 53。上游若使用其他端口，按服务提供方说明填写。TCP DNS 与 DNS over TLS 的协议不同，不能把 DoT 的端口直接填进普通 TCP 条目。需要加密解析时可对照 [HTTPS DNS](/articles/sing-box-dns-https-server-path/) 的配置边界。

## 服务器地址为域名时先解决引导解析

新结构在 `dns.servers` 的单个对象里填写 `type: "tcp"`、唯一 `tag`、`server` 和需要覆盖的 `server_port`。保留原 tag 时，核对已有规则引用是否仍一致；换 tag 则必须同步处理引用。

`server` 使用域名时，官方要求设置 Dial Fields 中的 `domain_resolver`，先取得上游 IP。这个解析器不能依赖尚未连通的同一服务器，否则可能形成引导循环。旧格式的 `address_resolver`、`address_strategy` 不能原样留在新对象里，相关背景见 [旧解析器字段排查](/articles/sing-box-dns-address-resolver-check/)。

## 迁移后检查实际连接路径

官方明确区分默认行为：旧服务器未指定 detour 时使用默认出站；新服务器像普通出站一样使用 dialer，默认等价于空的 direct 出站。原先必须经代理访问的解析器，迁移后可能改为直连。此时按已有出站 tag 核对 `detour`，不要新造一个不存在的代理名。

1. 保存备份，在配置目录执行 `sing-box check`，先排除字段和引用错误。
2. 重载后，向实际 sing-box DNS 入口查询同一个测试域名，观察命中的服务器 tag。
3. 将 TCP 建连失败、服务器未响应和 DNS 返回错误分开记录；端口可连不代表查询成功。
4. 仅改变出站路径做对照，无法定位时恢复备份，并保留版本和日志。

验收应包含新查询返回预期记录、日志使用预期 TCP 服务器及出口。本文未做客户端实机解析测试，不保证某个公共解析器在当前网络可达。

## 官方来源

- [官方文档](https://sing-box.sagernet.org/configuration/dns/server/tcp/)
- [官方文档](https://sing-box.sagernet.org/configuration/shared/dial/)
- [官方文档](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-11-05。
