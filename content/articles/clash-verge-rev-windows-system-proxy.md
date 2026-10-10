---
title: "Clash Verge Rev Windows 系统代理：开关、范围与连接验收"
category: "tutorials"
description: "围绕 Clash Verge Rev 官方项目入口，说明 Windows 系统代理与 TUN 接管的边界，按配置、开关、目标测试排查连接问题。"
date: "2026-10-10"
updated: "2026-10-10"
author: "FlyClash 中文指南编辑部"
draft: false
---

Clash Verge Rev 中看到运行状态，不代表 Windows 的所有流量都已接管。系统代理、应用自带代理和 TUN 模式有不同范围，排错时必须分开记录。

## 先确认版本与配置

从 [Clash Verge Rev 官方仓库](https://github.com/clash-verge-rev/clash-verge-rev)与发行页核对版本。先选定一份可解析的配置，记录当前模式、端口和配置来源；不要在连接故障时同时升级应用和替换配置。

## 检查 Windows 系统代理

启用系统代理后，打开 Windows 设置和测试浏览器确认代理地址、端口与应用显示一致。浏览器若设置了独立代理，会绕过系统代理；命令行工具也可能有自己的环境变量。

## 区分系统代理与 TUN

系统代理通常只影响遵循 Windows 代理设置的应用，TUN 则会改变更广的流量接管范围并涉及权限。不要因为一个网页可访问就断言 TUN 已经正常，也不要在没有回退点时同时开启多个接管方式。

## 用固定目标验收

1. 关闭其他代理工具，避免端口和路由互相覆盖。
2. 记录一个固定域名的解析、连接和出站结果。
3. 分别测试浏览器与命令行，确认它们使用的入口。
4. 失败时恢复系统代理设置，再查看日志。

Linux 用户可参考 [Clash Verge Rev Linux 代理模式](/articles/clash-verge-rev-linux-proxy-mode/)，不要跨系统照搬权限步骤。

## 官方来源与核验日期

- [Clash Verge Rev 官方仓库](https://github.com/clash-verge-rev/clash-verge-rev)

来源核验日期：2026-10-10。菜单和接管行为以当前发行版及系统设置为准。
