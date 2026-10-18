---
title: "OpenClash 防火墙重定向：透明代理不生效排查"
category: "tutorials"
description: "按 OpenClash 官方项目资料检查防火墙重定向、接口和运行状态，定位透明代理未生效问题。"
date: "2026-10-18"
updated: "2026-10-18"
author: "FlyClash 中文指南编辑部"
draft: false
---

OpenClash 的透明代理依赖路由器接口、防火墙规则和核心状态共同工作。先确认服务状态，再检查重定向规则是否生成。

## 实操步骤

1. 记录 OpenWrt 版本、OpenClash 版本和当前配置备份。
2. 检查核心已启动、配置已加载，并确认 LAN/WAN 接口选择正确。
3. 查看防火墙重定向规则是否存在，再从局域网设备发起 DNS 与 HTTPS 请求。
4. 若规则缺失，先修复接口或服务配置；不要直接清空防火墙规则。

透明代理测试应区分路由器本机和局域网客户端，避免把本机直连结果当作转发成功。

继续阅读：[OpenClash Fake-IP 与 DNS](/articles/openclash-fake-ip-dns/) · [OpenClash 订阅自动更新](/articles/openclash-subscription-auto-update/)

官方来源：[OpenClash repository](https://github.com/vernesong/OpenClash)

来源核验日期：2026-10-18。
