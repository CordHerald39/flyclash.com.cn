---
title: "Clash Verge Rev 启动后系统代理未生效：检查顺序"
category: "tutorials"
description: "依据 Clash Verge Rev 官方项目资料排查启动后系统代理未生效，覆盖模式、端口、权限和日志检查。"
date: "2026-10-18"
updated: "2026-10-18"
author: "FlyClash 中文指南编辑部"
draft: false
---

启动应用不代表系统代理已经接管。应从客户端状态、监听端口和系统设置三处逐项确认。

## 实操步骤

1. 确认使用的是官方发行资产，并记录当前配置文件和运行模式。
2. 在客户端检查系统代理开关、HTTP/SOCKS 端口与当前代理组。
3. 用系统设置确认代理地址和端口与客户端一致，再发起一次测试请求。
4. 若端口被占用，关闭冲突进程或修改端口后重启客户端，最后查看项目日志。

不要同时开启多个代理客户端的系统代理开关。修改前保留原配置，便于恢复。

继续阅读：[Clash Verge Rev Windows 系统代理](/articles/clash-verge-rev-windows-system-proxy/) · [Clash Verge Rev Windows TUN 启动失败](/articles/clash-verge-rev-windows-tun-start-failed/)

官方来源：[Clash Verge Rev repository](https://github.com/clash-verge-rev/clash-verge-rev)

来源核验日期：2026-10-18。
