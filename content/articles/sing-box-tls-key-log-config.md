---
title: "sing-box TLS key_log：受控调试如何配置与清理密钥文件"
category: "tutorials"
description: "依据 sing-box 官方 TLS 文档，说明 key_log 的调试用途、文件权限与清理边界，避免把 TLS 会话密钥当作普通日志保存."
date: "2026-11-06"
updated: "2026-11-06"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box TLS 调试有时需要导出会话密钥，以便在受控环境分析握手。key_log 产生的是敏感材料，不能像普通运行日志一样长期保留，也不应上传到仓库或公开 issue。

## 先确认配置边界

在临时副本启用并记录目标进程；用最小复现流量确认文件权限；抓包后立即停止复现并安全清理密钥；关闭 key_log 后重新建连确认生产配置不再导出。

## 验证与回滚

1. 备份当前配置并记录核心版本和错误时间。
2. 运行官方配置检查命令，确认字段结构和引用对象。
3. 建立一次新的最小连接，按日志阶段区分解析、监听、握手和路由问题。
4. 一次只改一个变量，验证后保留可回滚副本。

不要把真实订阅、密码、令牌或会话密钥写入公开日志。可继续阅读 [sing-box-tls-certificate](/articles/sing-box-tls-certificate/) 与 [sing-box-tls-handshake-timeout](/articles/sing-box-tls-handshake-timeout/)。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/shared/tls/)

来源核验日期：2026-11-06。
