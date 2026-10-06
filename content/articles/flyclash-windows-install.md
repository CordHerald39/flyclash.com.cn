---
title: "FlyClash Windows 安装前检查：架构、来源与首次启动"
category: tutorials
label: "安装指南"
description: "从官方发行资产、Windows 架构和首次启动三个阶段检查 FlyClash 桌面版安装。"
date: "2026-10-06"
updated: "2026-10-06"
author: "FlyClash 中文指南编辑部"
draft: false
---

安装 FlyClash 前先确认平台和发行通道。Windows 安装器的文件名不能替代发行页说明。

## 从原始发行页选择附件

打开 [GtxFury/FlyClash Releases](https://github.com/GtxFury/FlyClash/releases)，核对标签、是否为 prerelease 以及附件名称。不要从搜索结果中的重打包链接安装。

## 确认 Windows 架构

在系统设置中查看处理器架构，再选择发行页中对应的 Windows 资产。x64、ARM64 和压缩包不是同一类安装方式；没有明确说明的附件不要凭猜测使用。

## 首次启动分开验证

先确认程序能打开，再导入配置。记录 Windows 防火墙提示和 VPN/系统代理授权结果。启动失败与订阅解析失败属于不同问题，应分别保留日志。

## 保留升级回退点

安装前保存当前版本和配置位置。新版本异常时先停止覆盖旧文件，查看发行说明后再决定回退。

## 来源与边界

版本和资产以开发者 [GitHub 项目](https://github.com/GtxFury/FlyClash) 为准。本文未在具体 Windows 设备上执行安装测试。
