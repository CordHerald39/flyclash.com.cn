---
title: "sing-box direct 入站：override_address 与端口转发检查"
category: "tutorials"
description: "依据 sing-box 官方 direct 入站文档区分监听端口与目标端口，说明 override_address、override_port 和 TCP/UDP 范围的逐层验收方法。"
date: "2026-10-20"
updated: "2026-10-20"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 的 direct 入站可覆盖连接的目标地址或端口。它与名为 direct 的直连出站是不同配置对象。排查端口转发时，应分别确认本机监听位置、覆盖后的目标及后续路由，不能只看配置里出现了 direct。

## 四项信息先分开记录

记下客户端连接的监听地址与端口、入站允许的 network、override_address、override_port。官方定义中，override_address 覆盖目标地址，override_port 覆盖目标端口；监听端口并不因此自动变成目标端口。

network 可选择 tcp 或 udp，留空则同时支持两者。即便入站接受了某类连接，目标服务仍必须在对应协议和端口上正常工作；TCP 测试成功不能证明 UDP 也可用。

## 从目标到入口逐层验收

1. 备份配置，先确认目标服务在预期地址、端口和协议上能够访问。
2. 核对 direct 入站的监听地址及端口，避免与现有服务冲突。
3. 检查 override_address、override_port 是否对应目标，注意不要指回本入站造成循环。
4. 只在本机受控范围内发起测试请求，查看日志是否接收并选中了预期路由。
5. 再按实际需求检查其他设备到监听端口的访问，限制可访问范围。

如果本机直连目标就失败，先处理目标服务；如果入口根本没有连接日志，先检查监听、防火墙和客户端请求地址；若入口已接收但后续失败，再核对覆盖值与出站路径。

## 不要误当作通用代理入口

HTTP 或 SOCKS 客户端期待的代理协议，与 direct 入站的固定目标转发用途不同。把浏览器系统代理指向一个任意 direct 入站，不能据此证明它能代理所有网站。需要通用代理协议时，应选对应入站类型并单独验收。

HTTP 接入见 [sing-box HTTP 入站](/articles/sing-box-http-inbound-config/)，HTTP/SOCKS 共用端口见 [mixed 入站](/articles/sing-box-mixed-inbound-config/)。修改失败时恢复原配置，不删除原有可用入口。

## 官方来源

[官方配置文档](https://sing-box.sagernet.org/configuration/inbound/direct/)

来源核验日期：2026-10-20。
