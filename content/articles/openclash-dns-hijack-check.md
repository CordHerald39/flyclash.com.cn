---
title: "OpenClash DNS 劫持：透明代理解析路径排查"
category: "tutorials"
description: "分离 OpenClash DNS 劫持、Fake-IP、重定向和上游解析，给出可回滚的路由器检查顺序。"
date: "2026-10-24"
updated: "2026-10-24"
author: "FlyClash 中文指南编辑部"
draft: false
---

OpenClash 透明代理场景中，DNS 劫持、Fake-IP、路由重定向和上游 DNS 是不同层级。出现域名解析异常、局域网设备无法访问或部分应用绕过代理时，先确定 DNS 请求是否到达 OpenClash，再看核心的 DNS 模式。本文只按项目公开入口整理核对顺序，不把某个模式当成所有路由器的默认答案。

## 记录现状与回滚点

备份 OpenWrt 配置和 OpenClash 当前配置，记录 LAN 接口、DNS 转发、透明代理模式、Fake-IP 设置和防火墙规则。保留原有端口与上游地址，先截图或导出状态，避免排查过程中丢失可回滚信息。

## 先验证请求有没有被劫持

从一台 LAN 客户端发起新 DNS 查询，分别记录客户端配置的 DNS、路由器监听端口和 OpenClash 日志。若请求根本未到达路由器，先检查 DHCP；若到达但没有被处理，再检查重定向规则和监听地址。不要只看浏览器最终页面。

## 分离 Fake-IP 与上游解析

暂时保持现有透明代理，只改变一个 DNS 模式或一条重定向规则，观察同一域名返回的地址类型、日志命中和后续连接。Fake-IP 返回的地址不能直接当作真实解析地址测试；需要用核心支持的方式验证映射是否存在。

1. 运行当前 OpenClash 的配置检查。
2. 从 LAN 客户端发起新查询和新连接。
3. 对照关闭重定向后的结果，确认差异来自哪一层。
4. 若出现断网或循环，立即恢复备份并重新加载防火墙。

透明代理不生效可继续看 [防火墙重定向](/articles/openclash-firewall-redirect-check/)，配置无法生成可看 [配置重载失败](/articles/openclash-config-reload-failed/)，局域网访问范围可参考 [LAN 访问控制](/articles/openclash-lan-access-control/)。

## 官方来源

- [OpenClash 官方仓库](https://github.com/vernesong/OpenClash)

来源核验日期：2026-10-24。本文没有声称某个 DNS 模式或路由器组合适合所有网络。
