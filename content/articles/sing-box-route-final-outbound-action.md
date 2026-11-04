---
title: "sing-box route final：兜底出站不生效怎么定位"
category: "tutorials"
description: "参考 sing-box 官方 route 文档，说明 final 作为未匹配流量的兜底出站时如何核对规则顺序、tag 和连接复用，不把 final 当作强制覆盖全部规则。"
date: "2026-11-04"
updated: "2026-11-04"
author: "FlyClash 中文指南编辑部"
draft: false
---

某些请求没有命中预期规则时，可以检查 route 的 `final` 兜底出站。它只处理前面规则没有决定出站的连接；如果上方规则已命中，修改 final 不会覆盖已有结果。

## 先列出规则命中链

保存配置，记录规则顺序、目标 tag 和 final 值。局部示意：

```json
{"route": {"final": "proxy"}}
```

`proxy` 必须是存在的出站或 selector tag。示例不代表所有流量都应走代理。

## 用三类请求验证

1. 运行 `sing-box check`，确认 final 指向的 tag 存在。
2. 选择一个明确命中前置规则的请求和一个不命中的请求。
3. 关闭旧连接后分别创建新请求，记录规则与最终出站。
4. 若兜底仍异常，继续查 selector 状态、DNS 和连接复用。

不要通过删除全部前置规则来“验证 final”。可结合 [规则集](/articles/sing-box-route-rule-set/) 与 [域名后缀规则](/articles/sing-box-route-domain-suffix-check/) 排查。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/route/rule_action/)

来源核验日期：2026-11-04。
