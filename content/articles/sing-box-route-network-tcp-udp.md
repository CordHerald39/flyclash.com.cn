---
title: "sing-box network 规则：TCP 与 UDP 为什么走不同出站"
category: "tutorials"
description: "依据 sing-box 路由规则文档区分 network、protocol 与 network_type，给出限定目标的 TCP/UDP 对照步骤，避免误改成全局分流。"
date: "2026-10-20"
updated: "2026-10-20"
author: "FlyClash 中文指南编辑部"
draft: false
---

同一应用的网页请求正常、语音或其他 UDP 流量却失败时，可以检查 sing-box 路由中的 network 条件。这里区分的是连接使用的 TCP 或 UDP，不是 Wi-Fi 与移动网络，也不等同于应用协议识别。

## 三类字段不要混用

network 用于 TCP/UDP 网络条件；protocol 匹配嗅探得到的协议；network_type 描述网络类型，并有平台与客户端适用限制。把想匹配的对象先写清楚，才能判断规则字段是否选对。

若原配置只为某个域名或端口安排了 UDP 规则，不要为了修一个应用把它改成接管全部 UDP。保留目标范围，可以减少对其他应用的影响，也更方便恢复。

## 做有边界的测试

1. 备份配置并记录当前版本，找到目标连接实际命中的规则。
2. 记录该连接的网络类型、目标地址、端口及选择的出站；不要仅凭应用名称判断它一定使用 UDP。
3. 在原有目标限制内检查 network 条件，并确认路由动作所引用的出站存在。
4. 查看规则前后顺序，确认更早的宽泛规则没有提前命中。
5. 分别发起已知 TCP 与 UDP 的新连接，核对日志中的结果。

官方文档说明，默认规则中的不同类条件按规定组合匹配。加上 network 并不意味着其余域名、端口条件全部被忽略；需要把整条规则一起读，而不是只看新增的一行。

## 命中了仍不能连接

规则命中只证明选择过程，无法证明被选出站支持并成功转发 UDP。还需检查入站接收范围、上游协议能力以及当前网络。用浏览器成功打开 HTTPS 页面，不能代替 UDP 路径验收。

旧规则迁移时应按当前文档检查 action，避免混用不同版本结构。默认出口相关问题见 [route final 与规则分流](/articles/sing-box-direct-outbound-route/)，入站网络配置可对照 [mixed 入站配置](/articles/sing-box-mixed-inbound-config/)。

## 官方来源

[官方配置文档](https://sing-box.sagernet.org/configuration/route/rule/)

来源核验日期：2026-10-20。
