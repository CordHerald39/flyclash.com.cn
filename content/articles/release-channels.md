---
title: "FlyClash 下载怎么选：桌面版、Android 与预发布版本辨别"
category: "downloads"
label: "实用指南"
description: "用真实发行资产区分 FlyClash 的平台和版本通道，说明安装前记录、升级回退与核验边界。"
date: "2026-09-19"
updated: "2026-09-19"
author: "FlyClash 中文指南编辑部"
draft: false
---

> 核验日期：2026-09-19。已核对固定版本源码与发行资产；FlyClash 实际运行未实测。

## 先分清仓库，再比较版本号

FlyClash 桌面版和 Android 版使用不同仓库。桌面端见 GtxFury/FlyClash，Android 见 GtxFury/FlyClash-Android。不要把两个项目的版本号直接比较，也不要把一个桌面安装器改后缀安装到手机。

2026-09-19 查询桌面仓库 GitHub Releases 的 latest 接口，返回 v0.2.9，prerelease 为 false。本次记录只固定这次查询结果；发行列表中的较大版本可能属于预发布，下载时应再次查看标签和说明。

## 真实资产清单与选择方法

| v0.2.9 的实际附件 | 应如何理解 |
| --- | --- |
| FlyClash-0.2.9-x64-setup.exe | Windows x64 安装文件 |
| FlyClash-0.2.9-x64-setup.7z | 7z 压缩附件；扩展名不能证明它是便携版 |
| FlyClash-0.2.9-arm64.dmg | Apple Silicon Mac 文件 |
| FlyClash-0.2.9-x64.dmg | Intel Mac 文件 |

这次固定版本附件里没有 Linux 包，也没有 Android APK。它只能说明 v0.2.9 的附件情况，不能据此否定其他版本支持的平台。Source code 附件是源码，不是上述安装器的替代品。

## 下载前用三项记录避免装错

先在系统信息页确认操作系统和处理器架构；再抄下完整发行标签和附件名称；最后保存发行页链接。遇到新版教程时，先比较教程使用的版本通道，避免拿新界面的按钮解释旧安装包。

若开发者提供校验和，可以在本地计算后对照。只计算一个哈希却没有可信的发布值，不能证明文件来自开发者；文件名一致也不能代替内容核对。

## 从现有版本升级的验收清单

升级前保留可用安装器、当前版本号和软件支持的配置备份。备份可能包含订阅令牌，应存本地或受控位置。先记录一条当前能成功的访问路径，升级后用相同网络、目标和节点复测，不把同时换节点产生的差异归因于版本。

新版本若无法读取旧配置，停止覆盖唯一备份。先查看发行说明中的迁移要求；回退时保留出错日志，使用原版本对应的备份，不能假定新数据格式一定能被旧程序读取。

## 来源与实际核验边界

- [桌面 v0.2.9 原始发行页](https://github.com/GtxFury/FlyClash/releases/tag/v0.2.9)：本文附件名称的直接来源。
- [桌面发行列表](https://github.com/GtxFury/FlyClash/releases)：核对当前通道和更新说明。
- [Android 项目](https://github.com/GtxFury/FlyClash-Android)：手机版本入口。
- 本次证据为实际查询发行元数据与附件清单，未执行 FlyClash GUI 安装或升级。本文不使用“稳定版绝无问题”“全平台亲测”等超出证据的结论。下一步可按[订阅验收流程](/articles/import-subscription/)记录真实运行结果。
