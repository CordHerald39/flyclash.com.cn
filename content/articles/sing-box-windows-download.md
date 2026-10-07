---
title: "sing-box Windows 下载：核心文件与图形客户端边界"
category: downloads
label: "Windows 下载"
description: "按 sing-box 官方文档与 Releases 核对 Windows 构建、配置版本和核心与图形客户端的边界。"
date: "2026-10-07"
updated: "2026-10-07"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 的官方项目包含核心程序与多平台构建。Windows 下载前先确认你需要的是命令行核心、集成客户端还是配置文档中的示例。

## 以官方项目为入口

打开 [SagerNet/sing-box](https://github.com/SagerNet/sing-box) 与 [官方文档](https://sing-box.sagernet.org/)，先确认当前版本、支持平台和配置说明。项目页面未说明的第三方 GUI 不自动视为官方组件。

## 在 Releases 识别 Windows 资产

进入 [sing-box Releases](https://github.com/SagerNet/sing-box/releases)，按资产名称和说明确认 Windows 构建、压缩包或源码。不要把源码压缩包直接当作可运行安装器。

## 配置文件要跟版本走

下载后先保存配置副本，再查看文档中对应版本的配置字段。导入其他客户端配置前，先确认格式是否兼容；解析错误应保留原文和报错位置。

## 启动后做最小验证

先验证程序能够启动，再用固定目标检查 DNS、连接和日志。若你实际使用的是 FlyClash 图形客户端，应继续参考 [FlyClash 内核管理](/articles/fly-core-switch/) 区分客户端版本与内核版本。

## 来源与边界

本文的项目来源为 [SagerNet/sing-box](https://github.com/SagerNet/sing-box/releases)。版本、平台和安装包以项目当前 README、文档与 Releases 为准；本文未对特定设备或网络环境作实测承诺。

