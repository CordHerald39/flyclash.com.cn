---
title: "sing-box DNS resolve 动作：规则触发后如何确认解析路径"
category: "tutorials"
description: "参考 sing-box 官方 DNS rule action 文档，检查 resolve 动作的字段位置、服务器选择和缓存影响，避免把路由 resolve 与 DNS 解析动作混淆。"
date: "2026-11-02"
updated: "2026-11-02"
author: "FlyClash 中文指南编辑部"
draft: false
---

DNS 规则需要在后续匹配前先得到地址时，sing-box 的 `resolve` 动作会改变处理顺序。配置可解析但结果不对，先确认动作位于 DNS 规则动作中，而不是误写到 route 规则。

## 先看动作链

记录实际 DNS 入站、服务器 tag 和规则顺序。局部写法仅展示结构：

```json
{"action": "resolve", "server": "local"}
```

`local` 必须是现有 DNS 服务器标签；示例不创建服务器，也不保证绕过代理。

## 用新请求验证

1. 执行配置检查，确认动作字段被当前版本接受。
2. 记录同一域名在动作前后的查询服务器和地址结果。
3. 清理或等待相关缓存后重新测试，区分旧结果与新规则。
4. 若解析正确但连接失败，再检查路由和出站。

不要同时改 DNS、路由和 TLS。失败时恢复动作前配置，保留日志中的规则命中信息。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/dns/rule_action/resolve/)
- [官方文档 2](https://sing-box.sagernet.org/configuration/dns/)

来源核验日期：2026-11-02。
