---
title: "FlClash macOS 安装：选择 DMG 或 Homebrew 后怎样验收"
category: tutorials
label: "macOS 安装"
description: "依据 FlClash 官方 README 核对 Mac 系统要求、芯片架构、DMG 与 Homebrew 安装方式，并区分应用启动与代理接管问题。"
date: "2026-10-11"
updated: "2026-10-11"
author: "FlyClash 中文指南编辑部"
draft: false
---

FlClash 的官方 Mac 下载入口属于 `chen08209/FlClash`。先辨认项目，再选芯片与安装方式，可以避免把本站介绍的另一个项目 FlyClash 的安装文件混用。完成安装后，还要单独验证配置和代理模式，看到窗口并不表示所有应用已经走代理。

## 安装前核对三个条件

1. 在“关于本机”记录 macOS 版本与芯片类型。2026-10-11 核验的[官方 README](https://raw.githubusercontent.com/chen08209/FlClash/main/README.md)列出 macOS 12 及以上，并提供 Apple Silicon 和 Intel 的 DMG。
2. 从 README 进入[官方 Releases](https://github.com/chen08209/FlClash/releases/latest)，检查目标发行说明和文件架构，不使用搜索广告或第三方重打包链接。
3. 已安装旧版时，先做可恢复备份并记录配置名称、代理模式和原版本，避免新版本启动失败后没有回退副本。

具体备份过程见[FlClash 备份与恢复](/articles/flclash-backup-restore/)。不要用覆盖唯一备份的方法测试迁移。

## 方法一：安装官方 DMG

Intel 机器选择对应 x64 文件，Apple Silicon 选择对应 ARM64 文件，以发行资产实际标注为准。下载完成后打开 DMG，按安装界面将应用放入应用程序目录，再从该目录启动；安装完成后退出磁盘映像。

打不开磁盘映像时先检查下载是否完整、系统是否满足要求。应用能复制但无法运行时，记录系统提示并检查架构。Source code 压缩包是源码下载，不等于可直接运行的应用。

## 方法二：使用官方提供的 Homebrew 命令

已配置 Homebrew 的用户可按 README 执行：

```sh
brew tap chen08209/tap
brew install --cask flclash
```

执行后检查命令的完成状态和应用程序目录中的 FlClash。已有安装时先阅读 Homebrew 的反馈，再决定升级或修复；不要让 DMG 与 cask 各自留下一个来源、版本不明的副本。命令找不到 `brew` 说明 Homebrew 环境尚未准备好，可以改用 DMG。

## 系统提示与连接故障分开处理

如 macOS 提示开发者无法验证，确认文件来自官方发行页后，按[Apple 官方打开应用说明](https://support.apple.com/zh-cn/102445)查看“隐私与安全性”中的单应用授权入口。提示包含恶意内容、文件被修改或损坏时，应先核对来源与重新下载，不把所有提示都当成同一种拦截。

成功进入界面后，导入一份有效配置，选中它并核对代理组。先使用一种代理模式，保持一个固定测试目标，再在连接视图或日志中找新请求。系统代理只影响使用该设置的应用；测试程序自行直连时，不能据此判断客户端安装失败。

如果界面能打开而核心启动报错，记录核心错误与配置来源；如果请求进入客户端但失败，再检查规则命中和出站。不要同时开启另一款代理客户端来测试，避免把系统代理或端口竞争引入本轮排查。

其他平台的包格式见[FlClash Windows 下载](/articles/flclash-windows-download/)与[Linux 下载说明](/articles/flclash-linux-download/)，它们不能替代 macOS 的发行资产。

## 官方来源

- [FlClash 官方 README](https://raw.githubusercontent.com/chen08209/FlClash/main/README.md)
- [FlClash 官方发行入口](https://github.com/chen08209/FlClash/releases/latest)
- [Apple：在 Mac 上安全地打开 App](https://support.apple.com/zh-cn/102445)

来源核验日期：2026-10-11。具体系统要求与安装资产以所选发行说明为准。
