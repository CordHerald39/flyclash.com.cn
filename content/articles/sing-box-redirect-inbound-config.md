---
title: "sing-box redirect 入站配置：端口、路由与回滚怎么检查"
category: "tutorials"
description: "依据 sing-box 官方 redirect 入站文档，整理监听端口、路由引用和回滚验证步骤。"
date: "2026-11-07"
updated: "2026-11-07"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box redirect 入站用于接收被重定向的流量，配置时要把监听端口、入站 tag 和路由引用分开核对。端口监听成功不等于流量已经被正确导入。

## 先确认配置边界

先在受控副本运行配置检查；确认 redirect 入站的 listen、listen_port 与系统重定向规则一致；检查 route 是否引用该 inbound tag；用最小请求验证并保留可回滚副本。

## 验证与回滚

1. 备份当前配置并记录核心版本和错误时间。
2. 运行官方配置检查命令，确认字段结构和引用对象。
3. 建立一次新的最小连接，按日志阶段区分解析、监听、握手和路由问题。
4. 一次只改一个变量，验证后保留可回滚副本。

不要把真实订阅、密码、令牌或密钥写入公开日志。可继续阅读 [sing-box-listen-lan-address-check](/articles/sing-box-listen-lan-address-check/) 与 [sing-box-route-final-outbound-action](/articles/sing-box-route-final-outbound-action/)。

## 官方来源

- [官方文档](https://sing-box.sagernet.org/configuration/inbound/redirect/)

来源核验日期：2026-11-07。
