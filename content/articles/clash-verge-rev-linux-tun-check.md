---
title: "Clash Verge Rev Linux TUN：设备、权限与路由检查"
category: "tutorials"
description: "整理 Clash Verge Rev 在 Linux 启动 TUN 时的设备、权限、路由和系统代理排查步骤。"
date: "2026-10-24"
updated: "2026-10-24"
author: "FlyClash 中文指南编辑部"
draft: false
---

Clash Verge Rev 在 Linux 上启用 TUN 后，问题可能出在内核设备、权限、路由或应用自身配置。页面显示“已开启”并不等于 tun 设备已经创建，也不等于目标流量经过该接口。本文依据项目公开资料整理检查顺序，不给出未经核验的发行版命令。

## 先记录系统与当前配置

保存 profile 和应用日志，记录发行版、内核、应用版本、TUN 开关、系统代理和冲突的其他网络服务。不要先删除网络管理器或清空规则；先确认问题范围和可回滚路径。

## 分层检查 TUN

1. 确认系统存在可用的 TUN 设备支持，并检查应用日志是否报告权限或设备创建失败。
2. 确认应用以需要的权限运行，记录授权方式，不把服务暴露到公网。
3. 查看是否出现 tun 设备及对应路由，再测试一个新连接。
4. 若设备存在但没有流量，检查 auto route、系统代理和已有防火墙规则。

不同发行版的设备名称、权限和网络管理工具可能不同。不要直接复制其他系统的命令；每次只改变一项，并保留原路由输出。

## 区分 TUN 与系统代理

关闭 TUN 后单独启用系统代理，测试同一个应用，再恢复原设置。若系统代理有效而 TUN 无流量，优先检查接口和路由；若两者都失败，继续看 profile、端口和出站。已有连接不足以验证新模式，必须新建连接。

相关排查可参考 [Linux 系统代理](/articles/clash-verge-rev-linux-system-proxy-check/)、[Windows TUN 启动失败](/articles/clash-verge-rev-windows-tun-start-failed/) 与 [自定义规则](/articles/clash-verge-rev-custom-rules/)。

## 官方来源

- [Clash Verge Rev 官方仓库](https://github.com/clash-verge-rev/clash-verge-rev)

来源核验日期：2026-10-24。本文没有声称在某个发行版上完成了真实设备测试。
