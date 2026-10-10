---
title: "FlClash Linux 下载：deb、rpm 与 AppImage 怎么选"
category: "downloads"
description: "依据 FlClash 官方 README，核对 Linux 的 deb、rpm、AppImage 发行格式、架构和托盘依赖，再完成首次启动验收。"
date: "2026-10-10"
updated: "2026-10-10"
author: "FlyClash 中文指南编辑部"
draft: false
---

FlClash 官方 README 列出 Linux 的 `.deb`、`.rpm` 和 AppImage，并分别说明 x64 与 ARM64。先确认发行版和架构，再从官方 Release 选择资产。

## 核对系统与架构

执行 `uname -m` 记录架构，确认自己使用 Debian/Ubuntu、Fedora 或其他兼容环境。README 说明桌面 Linux 提供 x64 与 ARM64 构建，不要用不匹配的资产强行安装。

## 选择发行格式

1. Debian 或 Ubuntu 优先查看 `.deb` 资产及其依赖。
2. Fedora 等 RPM 系统查看 `.rpm` 资产。
3. 需要便携运行时再考虑 AppImage，并按 README 处理托盘库。
4. 从 [FlClash 官方 Releases](https://github.com/chen08209/FlClash/releases/latest)核对标签和完整资产名。

README 提醒 AppImage 或 `.rpm` 使用托盘图标时可能需要 AyatanaAppIndicator；缺少托盘图标不等于核心一定无法连接，应分开检查。

## 首次启动验收

安装后先导入一份可用配置，再分别检查配置列表、代理模式、DNS 和日志。FlClash 的配置导入与备份边界可参考 [备份与恢复说明](/articles/flclash-backup-restore/)，不要把安装目录当作唯一配置副本。

## 记录升级回退点

保存发行标签、资产、架构和安装方式。升级前保留旧配置与安装包，确认新版本能启动并完成固定目标测试后再清理。

## 官方来源与核验日期

- [FlClash 官方 README](https://raw.githubusercontent.com/chen08209/FlClash/main/README.md)
- [FlClash 官方 Releases](https://github.com/chen08209/FlClash/releases/latest)

来源核验日期：2026-10-10。发行格式、依赖和平台支持以当前 README 与 Release 为准。
