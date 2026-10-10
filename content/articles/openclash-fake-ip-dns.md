---
title: "OpenClash Fake-IP 与 DNS：先核对依赖和解析接管范围"
category: "tutorials"
description: "根据 OpenClash 官方 README 与 Mihomo 文档入口，整理 Fake-IP、DNS 接管和 OpenWrt 依赖的排查边界。"
date: "2026-10-10"
updated: "2026-10-10"
author: "FlyClash 中文指南编辑部"
draft: false
---

OpenClash 运行在 OpenWrt 上，Fake-IP 与 DNS 设置会同时影响路由器解析和客户端访问。先确认插件、内核和系统依赖，再判断是解析还是代理路径故障。

## 先确认官方组件

从 [OpenClash 官方 README](https://raw.githubusercontent.com/vernesong/OpenClash/master/README.md)核对下载入口、依赖和使用手册。README 列出 `dnsmasq-full`、`kmod-tun` 等依赖，但具体包名和可用版本仍以设备固件为准。

## 分清 Fake-IP 与普通解析

在当前配置中记录 DNS 模式、Fake-IP 过滤规则和上游服务器。不要把示例配置整段复制到生产路由器，也不要在不知道回退方式时同时修改 DNS、策略组和防火墙。

## 逐层测试

1. 确认路由器自身能解析一个固定域名。
2. 检查客户端拿到的 DNS 响应和 Fake-IP 行为。
3. 再测试代理策略与最终出站。
4. 记录修改前后的配置差异和日志时间。

订阅更新失败时，先参考 [OpenClash 订阅更新排错](/articles/openclash-subscription-update-failed/)，不要把地址不可达当成 Fake-IP 故障。恢复旧配置后再逐项启用规则。

## 保留路由器回退点

保存当前配置备份和固件信息，修改前确认能通过本地管理入口恢复。公开求助时去除订阅地址、内网域名和认证信息。

## 官方来源与核验日期

- [OpenClash 官方 README](https://raw.githubusercontent.com/vernesong/OpenClash/master/README.md)
- [mihomo DNS 文档](https://wiki.metacubex.one/config/dns/)

来源核验日期：2026-10-10。依赖、字段和默认行为以当前 OpenWrt 固件及官方文档为准。
