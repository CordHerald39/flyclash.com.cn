---
title: "sing-box hijack-dns 动作：DNS 劫持规则不生效怎么排查"
category: "tutorials"
description: "依据 sing-box 官方 DNS 劫持动作文档，核对规则动作位置、TUN 接管和 DNS 入站，区分没有捕获请求与上游解析失败。"
date: "2026-11-02"
updated: "2026-11-02"
author: "FlyClash 中文指南编辑部"
draft: false
---

透明代理开启后系统仍使用原 DNS，先确认 DNS 请求是否经过 sing-box，再检查规则是否使用 `hijack-dns` 动作。动作只处理已被路由规则匹配的请求，不能替代 TUN、系统防火墙或应用自身的加密 DNS。

## 确认接管前提

备份配置，记录 TUN 入站、DNS 入站和规则顺序。局部动作示例：

```json
{"action": "hijack-dns"}
```

它应放在 route 规则动作数组允许的位置，不能当作 DNS server 配置。

## 分层验证

1. 运行 `sing-box check` 并重载，确认 TUN 接管无错误。
2. 从系统生成一次新 DNS 请求，观察 sing-box 日志是否有匹配。
3. 有匹配但解析失败时，查 DNS server 与上游；无匹配时回到规则顺序和系统接管。
4. 关闭测试规则后恢复原网络路径，避免留下持续劫持。

不要为了排查关闭系统全部 DNS 安全策略，也不要把浏览器 DoH 结果当作系统 DNS 证据。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/route/rule_action/hijack-dns/)
- [官方文档 2](https://sing-box.sagernet.org/configuration/inbound/tun/)

来源核验日期：2026-11-02。
