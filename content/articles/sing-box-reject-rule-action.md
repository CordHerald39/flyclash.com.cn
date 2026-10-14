---
title: "sing-box reject 规则动作：限定目标、default 与 drop 的区别"
category: "tutorials"
description: "按 sing-box 官方规则动作文档为明确目标配置 reject，理解 TCP、UDP、TUN 与已有连接的处理差异，避免无条件拒绝扩大范围。"
date: "2026-10-15"
updated: "2026-10-15"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 需要阻止一个明确目标的连接时，可以使用 reject 规则动作。先确定匹配范围，再选择拒绝方式，最后用目标和无关请求对照验收。没有条件的拒绝规则可能影响大量流量，不要把网络超时直接当成规则正确生效。

## 使用当前规则动作结构

[官方路由规则文档](https://sing-box.sagernet.org/configuration/route/rule/)把匹配字段与动作组合起来。下面是一条应并入已有 `route.rules` 数组的测试规则，域名为保留示例，应替换成自己明确需要阻止的目标。保留其他规则与原兜底，先在配置副本中检查。

```json
{
  "domain": ["blocked.example.com"],
  "action": "reject",
  "method": "default"
}
```

片段不是完整配置，不能覆盖整个 route 对象。若本机版本不接受当前动作写法，先查相应版本的迁移文档，不把新旧 block 出站、旧路由字段和当前 reject 结构混用。

## default 不总等于同一种错误

[官方规则动作说明](https://sing-box.sagernet.org/configuration/route/rule_action/)对未执行 sniff 的 TUN 连接定义：default 对 TCP 回复 RST，对 UDP 回复端口不可达；drop 丢弃数据包。非 TUN 连接及已建立连接会直接关闭。因此浏览器看到的错误文字和等待时间，不能脱离入口类型判断。

文档还说明，未启用 `no_drop` 时，三十秒内触发五十次后，method 会暂时改为 drop；method 已是 drop 时不适用 no_drop。不要通过高频刷新测试期望每次看到相同拒绝提示，少量新连接和日志更容易辨别实际行为。

当前文档标注，1.13.0 起 reject 可处理 ICMP echo 请求。本页示例只验证普通目标连接；不使用 ping 的成功或失败代替 TCP 规则验收，也不声称所有安装版本都具有新的 ICMP 行为。

## 用两组请求检查影响范围

1. 备份原配置，记录版本、入口类型和目标原先的连接结果。
2. 在副本中加入一条范围明确的 reject 规则，检查它是否会被既有规则提前处理。
3. 运行 `sing-box check -c config-test.json`，通过后按原方式加载。
4. 新建目标连接，观察是否匹配拒绝规则及具体错误。
5. 同时请求一个无关目标，确认它仍经过原出站；测试完恢复备份或仅撤销测试项。

目标使用 IP 而规则匹配域名、请求来自其他入口、最终运行配置没更新，都可能让观察不符合预期。先核对请求实际条件，别把规则扩大成全局拒绝来追求“马上见效”。

## 故障记录与恢复

保留时间、规则代号、入口类型、目标是否受影响和无关目标对照，反馈前隐藏敏感地址。加载问题参考[配置校验](/articles/sing-box-windows-config-check/)，不清楚入口时参考[HTTP 入站](/articles/sing-box-http-inbound-config/)。已有连接关闭与新连接被拒绝需要分别记录；恢复后再次建立连接，才能确认原路径恢复。

## 官方来源

- [https://sing-box.sagernet.org/configuration/route/rule_action/](https://sing-box.sagernet.org/configuration/route/rule_action/)
- [https://sing-box.sagernet.org/configuration/route/rule/](https://sing-box.sagernet.org/configuration/route/rule/)

来源核验日期：2026-10-15。配置说明以本机核心版本支持范围为准。
