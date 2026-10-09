---
title: "Clash Verge Rev macOS 安装：Intel、Apple Silicon 与发行渠道核对"
category: "downloads"
description: "从 Clash Verge Rev 官方安装文档核对 macOS 要求、处理器架构与 GitHub 发布渠道，按下载、安装、配置验收顺序排查。"
date: "2026-10-09"
updated: "2026-10-09"
author: "FlyClash 中文指南编辑部"
draft: false
---

在 Mac 上安装 Clash Verge Rev，先核对系统版本与处理器，再选发行资产。官方安装文档分别列出 Intel 和 Apple M 芯片，并说明项目通过 GitHub Release 发布。Windows 的 WebView2 安装说明不适用于 macOS，也不要把 FlyClash 的包当作 Clash Verge Rev。

## 检查系统与架构

从苹果菜单打开“关于本机”，记录 macOS 版本，以及“芯片”或“处理器”信息。Apple M 系列与 Intel 应选择各自对应的资产，不要仅凭文件大小或下载次数判断。

截至本文核验日期，官方安装页提示支持 macOS 12 及以上。这个要求可能随发行变化，下载时应再次查看当前文档与发行说明。较旧系统不应直接套用新版安装步骤。

## 从原始发行页下载

1. 在[官方安装文档](https://www.clashverge.dev/install.html)核对平台与架构说明。
2. 进入文档链接的 [clash-verge-rev Releases](https://github.com/clash-verge-rev/clash-verge-rev/releases)。
3. 区分正式版和测试版，记下标签与完整资产名称。
4. 按该发行的说明安装对应 macOS 资产，保留下载来源记录。

网页上看见 Source code 压缩包，不等于它是可直接安装的应用。没有明确匹配的资产时，应先确认支持情况，不要把其他平台包改名使用。

## 首次打开被系统阻止时

先记录系统弹窗原文，区分架构不符、文件损坏、来源提示和权限问题。确认来源和文件完整性后，按该发行说明及官方常见问题逐项处理。不要将网上的批量移除隔离标记命令当成固定安装步骤，也不要关闭整个系统的安全检查来测试未知文件。

已经使用旧版时，先保留配置与订阅来源再升级。启动失败可以对照[Clash Verge Rev 更新排错](/articles/clash-verge-rev-update/)，避免卸载时同时清除唯一的配置副本。

## 安装成功后的验收

打开应用只是第一步。导入一份兼容配置，确认当前启用的配置与内核状态，再检查系统代理、测试应用和连接记录。系统代理和 TUN 接管范围不同，不能看到菜单开关就推断所有应用都已进入代理。

保持一个节点和一个测试目标，记录能否解析、连接以及实际出站。出现连接错误时恢复原设置，再按日志定位。Linux 用户应阅读[Linux 代理模式检查](/articles/clash-verge-rev-linux-proxy-mode/)，避免跨系统照搬权限操作。

## 官方来源与核验日期

- [Clash Verge Rev 官方安装文档](https://www.clashverge.dev/install.html)

来源核验日期：2026-10-09。平台要求与命令行为以所用版本的官方文档为准。
