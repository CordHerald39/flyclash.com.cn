---
title: "sing-box tcp_fast_open：开启后连接不稳怎么回退排查"
category: "tutorials"
description: "根据 sing-box 官方 dial 字段文档，定位 tcp_fast_open 所在层级，检查 detour 覆盖与实际出站，避免把可解析配置当作加速效果证据。"
date: "2026-11-03"
updated: "2026-11-03"
author: "FlyClash 中文指南编辑部"
draft: false
---

开启 `tcp_fast_open` 后连接更慢或偶发失败，先把这个单独选项恢复到原值，再用相同目标比较。官方文档把它定义为启用 TCP Fast Open 的拨号选项，没有承诺在所有网络中提升速度。

## 先确认字段真正作用于当前出站

检查连接实际选中的出站 tag，以及该对象是否使用 detour。官方 dial 文档明确：设置 detour 后，其他拨号字段会被忽略。把 tcp_fast_open 写在未使用的节点，或写到 TLS 对象中，都不能验证它的效果。

```json
{"type": "direct", "tag": "direct-check", "tcp_fast_open": false}
```

这是 direct 出站的局部检查示意，false 用于对比关闭状态。不要把示例替换整个现有出站，也不要为测试删除原有地址绑定和路由。

## 做一次可解释的对比

1. 备份配置，记录操作系统、核心版本和实际出站。
2. 执行 `sing-box check`，确认字段被当前核心接受。
3. 保持网络与目标一致，仅切换 tcp_fast_open，关闭旧连接再重试。
4. 观察错误阶段及多次请求结果；若关闭后恢复，保留关闭状态并核对系统及网络支持。

配置检查只能证明结构被接受，不能证明握手实际使用了 Fast Open。单次延迟变化也不能作为性能结论；若故障在 DNS、认证或 TLS 阶段，继续沿对应日志排查。

相关说明：[连接超时](/articles/sing-box-connect-timeout-dial-check/)、[绑定接口](/articles/sing-box-bind-interface-outbound-check/)。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/shared/dial/)

来源核验日期：2026-11-03。
