---
title: "Clash Verge Rev Linux 系统代理：桌面环境与端口检查"
category: "tutorials"
description: "按 Clash Verge Rev 官方文档检查 Linux 系统代理开关、桌面环境变量和监听端口，定位核心运行但浏览器未走代理的问题。"
date: "2026-10-19"
updated: "2026-10-19"
author: "FlyClash 中文指南编辑部"
draft: false
---

Linux 上核心有流量不等于桌面应用已经使用代理。先确认 Clash Verge Rev 的监听端口，再检查桌面系统代理和应用自身设置。

## 先测试端口，再测试桌面

1. 记录当前配置、代理模式和 HTTP/SOCKS 监听端口。
2. 查看核心日志，确认监听成功且没有端口冲突。
3. 在桌面环境中检查系统代理开关与地址端口是否一致。
4. 用新窗口访问测试地址，再比较浏览器和命令行的代理行为。

如果命令行可用而浏览器不可用，检查浏览器自己的代理设置、沙箱和环境变量。若监听端口本身不可达，回到配置和进程日志；不要仅切换规则模式来掩盖系统代理没有开启。

继续阅读：[Clash Verge Rev Linux 代理模式](/articles/clash-verge-rev-linux-proxy-mode/) · [Clash Verge Rev 启动代理检查](/articles/clash-verge-rev-startup-proxy-check/)。

## 官方来源

[Clash Verge Rev 官方仓库](https://github.com/clash-verge-rev/clash-verge-rev)

来源核验日期：2026-10-19。
