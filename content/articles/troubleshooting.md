---
title: "FlyClash 启动与连接排错：端口、权限和配置"
category: "tutorials"
description: "在改动设置前先确认故障发生在哪一层。"
date: "2026-09-19"
updated: "2026-09-19"
author: "FlyClash 中文指南编辑部"
draft: false
---

## 内核没有启动

查看日志中是否存在配置解析或端口占用错误。同类客户端同时运行时，可能竞争本地监听端口。

## 系统代理没有生效

检查客户端状态和操作系统代理设置是否一致。若界面提示权限问题，先核对项目文档，不随意关闭系统安全功能。

## 一次只改一项

记录当前版本与错误信息，每次只调整一个相关设置。确认改动是否有效后再继续，便于恢复原状。

## 参考来源

- [原始项目仓库](https://github.com/GtxFury/FlyClash)
- [Android 原始项目](https://github.com/GtxFury/FlyClash-Android)
