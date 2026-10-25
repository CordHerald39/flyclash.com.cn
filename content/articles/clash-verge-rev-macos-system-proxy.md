---
title: "Clash Verge Rev macOS 系统代理不生效怎么查"
category: "tutorials"
description: "检查 Clash Verge Rev 在 macOS 上的系统代理开关、监听端口和应用接管状态，定位浏览器直连或退出后残留的问题。"
date: "2026-10-25"
updated: "2026-10-25"
author: "FlyClash 中文指南编辑部"
draft: false
---

Clash Verge Rev 的系统代理是否生效，取决于客户端开关、监听端口和 macOS 网络代理设置。遇到客户端显示运行但浏览器直连，先分别验证这三层，不要只重启应用。

## 确认客户端状态

记录当前配置、代理模式、HTTP/SOCKS 监听端口和系统版本。确认客户端仍在运行且端口处于监听状态，再开始检查 macOS 系统设置。

## 检查 macOS 代理开关

在当前网络服务的代理设置中确认 HTTP、HTTPS 或 SOCKS 项目是否指向 Clash Verge Rev 的监听地址和端口。若系统存在多个网络服务，先确认正在使用的那一个。

## 用浏览器与命令行对照

1. 先用命令行通过本地端口请求一个测试地址。
2. 再打开浏览器访问同一地址，记录是否经过代理。
3. 退出客户端后检查系统代理是否按预期恢复。
4. 若端口可用但规则不命中，转查配置与出站。

Windows 系统代理问题可参考 [Windows 系统代理](/articles/clash-verge-rev-windows-system-proxy/)，启动后未生效可看 [启动代理检查](/articles/clash-verge-rev-startup-proxy-check/)。

## 官方来源

- [Clash Verge Rev 官方仓库](https://github.com/clash-verge-rev/clash-verge-rev)

来源核验日期：2026-10-25。macOS 菜单名称可能随系统版本变化。
