---
title: "sing-box domain_suffix 规则：域名后缀分流不生效怎么查"
category: "tutorials"
description: "说明 sing-box domain_suffix 的字段位置、域名可见性与规则条件组合，按实际连接记录排查后缀分流未命中，并保留原有出口。"
date: "2026-10-22"
updated: "2026-10-22"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 设置 domain_suffix 后仍走默认出口，先确认请求进入了这份运行配置，以及路由判断时是否能取得域名。官方把 domain_suffix 定义为域名后缀匹配；它属于流量路由规则，与 DNS 查询规则是两处不同的配置。单独在 DNS 中设置同名条件，不能据此判断连接也会切换出口。

## 先定位配置与出口标签

保留当前能联网的配置，记录 sing-box 核心版本、实际启动文件和当前默认出口。若使用图形客户端，先确认编辑的是客户端正在加载的内容，避免改动一个未启用的副本。核心配置字段也不能直接当作 FlyClash 或其他客户端的界面选项。

在既有配置中核对 route.rules 和 outbounds。准备使用的出口标签必须已经存在，且该出口本身可连接；否则即便规则命中，也可能在转发阶段失败。可以先阅读[Windows 配置检查](/articles/sing-box-windows-config-check/)，区分解析错误与运行时规则问题。

## 给单一后缀添加一条规则

下面只是加入现有 route.rules 数组的一条规则，不是完整配置。example.com 是示例域名，proxy-existing 是示例出口标签；应替换为你要处理的域名后缀和已有出口标签。

```json
{
  "domain_suffix": ["example.com"],
  "action": "route",
  "outbound": "proxy-existing"
}
```

先只设置这一个域名条件，避免同时加入端口、进程、来源网段后无法判断哪项条件阻止了命中。保存后按所用客户端或核心的方式检查配置，再重载；如果检查失败，先恢复原文件并处理错误，不要直接用失败配置继续测试。

## 核对域名是否进入判断

从同一应用请求一个明确属于目标后缀的站点，查看连接记录里的目标信息与出口。应用直接连接 IP、上游已替换目标信息，或入站没有提供域名时，不能仅凭浏览器地址栏断言核心取得了同一个域名。先核对记录中的实际目标，再决定是否需要检查 DNS 或嗅探设置。

规则排查时，同时检查它前面是否已有处理这次连接的规则。官方默认规则的匹配逻辑中，域名类条件与端口、来源地址等条件组还有组合关系。例如同一条规则额外设置 network 或 port 后，满足后缀不代表整条规则满足。不要把一个复杂规则里的字段误读为全部互相替代。

## 用正反两个目标验收

分别访问一个属于目标后缀的地址和一个不属于该后缀的地址，记录时间、目标、匹配记录和出口。两次都应重新发起连接，避免仅观察原来已经建立的会话。若目标请求根本未进入核心，先检查接管方式；若已进入却没有域名，继续检查目标信息来源；若命中但失败，回到出口连接检查。

确认后缀规则有效，再逐项恢复确有必要的额外条件。若出现意外分流，撤回这条新规则并恢复原配置，无需同时改写 DNS、默认出口和所有规则集。

继续阅读：[进程名与路径规则](/articles/sing-box-route-process-name-path/) · [TCP 与 UDP 分流](/articles/sing-box-route-network-tcp-udp/) · [sing-box 软件入口](/software/sing-box-windows/)

## 官方来源

- [sing-box 流量路由规则字段与匹配逻辑](https://sing-box.sagernet.org/configuration/route/rule/)
- [sing-box 路由动作与出口标签](https://sing-box.sagernet.org/configuration/route/rule_action/)

来源核验日期：2026-10-22。本文为官方字段说明与排查步骤整理，未提供设备实测或测速结论。
