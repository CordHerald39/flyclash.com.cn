---
title: "sing-box Linux 安装：下载、权限与配置校验顺序"
category: "downloads"
description: "从 sing-box 官方仓库和发行页选择 Linux 资产，按架构、执行权限、配置检查和最小连接测试完成安装。"
date: "2026-10-10"
updated: "2026-10-10"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box Linux 安装应把核心程序、配置文件和图形客户端分开检查。先从官方发行页选择架构，再验证程序能运行，最后检查配置。

## 选择官方资产

进入 [sing-box 官方仓库](https://github.com/SagerNet/sing-box)与 Releases，记录当前发行标签和 Linux 资产名称。执行 `uname -m`确认架构，不要把其他平台压缩包改名使用，也不要使用来源不明的镜像。

## 验证程序与权限

解压到自己可管理的目录后执行：

```bash
uname -m
chmod +x sing-box
./sing-box version
```

版本命令成功只说明二进制可执行。若遇到架构或依赖错误，回到对应 Release 和系统包管理器核对，不要用随机参数绕过错误。

## 配置前先检查结构

准备配置副本，使用当前版本支持的检查方式核对 JSON、路径和资源引用。Windows 配置检查的思路也适用于定位字段问题，可参考 [sing-box Windows 配置检查](/articles/sing-box-windows-config-check/)。检查通过后再接入系统服务或图形客户端。

## 做一次可回退的连接测试

只启用一个配置和一个固定目标，分别记录解析、连接、出站和日志。升级前保留旧程序与配置；订阅地址、证书和密钥不要写入公开脚本或 Issue。

## 官方来源与核验日期

- [sing-box 官方仓库](https://github.com/SagerNet/sing-box)
- [sing-box 官方 Releases](https://github.com/SagerNet/sing-box/releases)

来源核验日期：2026-10-10。资产命名和运行要求以当前发行说明及本机帮助输出为准。
