---
title: "sing-box route sniff 动作：协议嗅探后分流条件怎么验收"
category: "tutorials"
description: "参考 sing-box 官方 route rule action 与 sniff 文档，说明 sniff 动作的顺序、协议识别边界和回退步骤，避免把一次识别失败当成全部连接故障。"
date: "2026-11-02"
updated: "2026-11-02"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 路由规则依赖域名或协议嗅探时，先确认 `sniff` 动作确实被执行。它只能在请求已经进入 sing-box 且协议具备可识别信息时工作，不能替代入站接管或 DNS。

## 检查动作位置

保留原规则，记录入站标签、目标和期望的协议。局部动作示例：

```json
{"action": "sniff"}
```

动作应按官方规则结构放入 route 规则；后续规则必须使用当前版本支持的字段。

## 用可重复的请求验证

1. 执行配置检查并重载。
2. 选择一个协议明确的测试请求，记录嗅探结果和命中规则。
3. 再用不满足协议条件的请求验证兜底出口。
4. 未识别时查加密、QUIC、规则顺序和入站能力，不要直接放宽全部规则。

测试结束后删除临时规则或恢复备份，保留原始日志以便继续定位。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/route/rule_action/sniff/)
- [官方文档 2](https://sing-box.sagernet.org/configuration/route/)

来源核验日期：2026-11-02。
