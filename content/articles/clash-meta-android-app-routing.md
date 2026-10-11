---
title: "Clash Meta for Android 按应用代理：访问控制模式与名单怎么配合"
category: tutorials
label: "按应用代理"
description: "依据 Clash Meta for Android 官方网络设置与 VPN 实现，区分全部应用、仅选中应用和排除选中应用，解释设置灰色及应用未进入代理的排查步骤。"
date: "2026-10-11"
updated: "2026-10-11"
author: "FlyClash 中文指南编辑部"
draft: false
---

Clash Meta for Android 的按应用代理先决定哪些应用进入 VPN，再由内核规则决定请求如何出站。某个应用被排除后，它的请求不会通过这条 VPN 的内核规则；在规则文件里增加域名，也不能把它自动加回应用名单。

## 先停止服务再调整网络设置

官方[网络设置实现](https://raw.githubusercontent.com/MetaCubeX/ClashMetaForAndroid/main/design/src/main/java/com/github/kr328/clash/design/NetworkSettingsDesign.kt)会在服务运行时禁用多项 VPN 网络选项。设置呈灰色时，先停止客户端服务再检查，不必立即卸载应用。

确认使用 VPN 接管系统流量的功能已经启用，再进入访问控制模式与应用选择入口。仅靠某个应用手动设置 HTTP 代理，不是这里的按应用 VPN 分流流程。安装及首次授权还没完成，可先读[Clash Meta for Android 安装指南](/articles/clash-meta-android-install/)。

## 三种模式对应不同的名单含义

| 模式 | 选中应用的含义 |
| --- | --- |
| 全部应用 | 应用选择名单不用于限制 VPN 接管范围 |
| 仅选中应用 | 将选中应用加入允许进入 VPN 的名单 |
| 排除选中应用 | 将选中应用加入不进入 VPN 的名单 |

这些语义可在官方[VPN 服务实现](https://raw.githubusercontent.com/MetaCubeX/ClashMetaForAndroid/main/service/src/main/java/com/github/kr328/clash/service/TunService.kt)中核对。尤其注意：同一份勾选名单在“仅选中”与“排除选中”模式下意义相反。不要只保存应用名单截图而漏掉模式。

## 做一次两个应用的对照测试

1. 记录原模式和原名单，选一个目标应用与一个对照应用；在应用选择页核对包名，避免把同名应用选错。
2. 选择“仅选中应用”语义的模式，只选目标应用，保存后重新启动服务并确认 VPN 已建立。
3. 关闭两个应用的旧连接，再分别发起新请求，记录请求时间、网络环境和客户端连接记录。
4. 目标应用的请求应进入客户端；对照应用不在允许名单中，不能用它的请求判断内核规则是否有效。
5. 再恢复原名单与模式，重启服务后重新核对，确认测试没有改变日常应用范围。

进入 VPN 的应用仍可能命中 `DIRECT` 规则，所以“已进入客户端”与“使用远端代理节点”要分开验证。请看请求命中的规则与出站，不能只凭目标网页能否打开判断模式。

## 结果不一致时怎么查

目标应用没有新连接记录，先查 VPN 状态、名单、实际包名和服务是否在保存后重新启动。进入客户端但访问失败，再查配置、DNS 与节点。被排除的应用也打不开时，核对它在当前网络能否直接访问，以及 Android 是否启用了限制非 VPN 流量的系统设置；排除名单不保证网络本身可达。

若应用列表与本文行为明显不同，记录已安装版本并对照原始项目，先确认是否使用了同名客户端或改包。[Clash Meta for Android 独立下载页](/software/clash-meta-android/)保留对应仓库入口，便于核对发行来源后再查配置问题。

## 官方来源

- [Clash Meta for Android 网络设置源码](https://raw.githubusercontent.com/MetaCubeX/ClashMetaForAndroid/main/design/src/main/java/com/github/kr328/clash/design/NetworkSettingsDesign.kt)
- [Clash Meta for Android VPN 服务源码](https://raw.githubusercontent.com/MetaCubeX/ClashMetaForAndroid/main/service/src/main/java/com/github/kr328/clash/service/TunService.kt)
- [Clash Meta for Android 应用选择源码](https://raw.githubusercontent.com/MetaCubeX/ClashMetaForAndroid/main/app/src/main/java/com/github/kr328/clash/AccessControlActivity.kt)

来源核验日期：2026-10-11。本文核对公开源码行为，具体界面文字以安装版本为准。
