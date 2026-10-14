---
title: "OpenClash 核心更新失败：版本查询、压缩包校验与执行错误排查"
category: "tutorials"
label: "核心更新"
description: "根据 OpenClash 官方核心更新脚本，把失败分到版本查询、下载、gzip 校验、解压执行和替换阶段，检查架构与存储并保留可用核心。"
date: "2026-10-14"
updated: "2026-10-14"
author: "FlyClash 中文指南编辑部"
draft: false
---

OpenClash 核心更新失败，先保存更新日志中第一条具体错误，再判断失败发生在版本查询、下载还是新核心执行阶段。订阅 YAML 更新成功不能证明核心已更新；核心下载成功也不能证明新文件能在当前路由器上运行。路由器仍能正常转发时，先保留旧核心与可用配置。

## 更新前记录环境与回退文件

记录 OpenClash 版本、当前核心类型与版本、设备 CPU 架构、所选编译版本及更新通道。先按[配置备份指南](/articles/openclash-config-backup-restore/)保留设置与 YAML，并确认备份是否包含核心；仅有 YAML 不能恢复被替换的核心程序。

[官方核心更新脚本](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/root/usr/share/openclash/openclash_core.sh)会根据编译版本选择下载文件，未选择时给出提示。不能只看到路由器名称相似就下载同一个包，应核对设备架构与所选编译目标。

## 先区分版本查询和文件下载

日志提示 `Core Version Check Error` 时，脚本尚未取得所需核心版本信息。[官方版本查询源码](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/root/usr/share/openclash/openclash_version.lua)也会检查版本字符串，不能把错误页内容当作版本号。此时先检查路由器到官方来源的网络、DNS 和当前 GitHub 地址代理设置，别手工改一个猜测版本号继续下载。

出现 `Core Download Failed` 时，再检查下载路径是否能访问、路由器时间与 HTTPS 状态，以及日志中的实际 HTTP 错误。只在手机或电脑上能访问同一来源，不能证明路由器本身可达。每次只改变一个影响下载的设置，再发起一次有记录的更新。

## 下载之后还有校验、解压和执行

官方脚本先对下载文件执行 `gzip -t`，之后解压到临时文件、设置权限并运行新文件的 `-v`。这些阶段失败的处理不同：

| 日志或现象 | 先检查什么 |
| --- | --- |
| `Core Verification Failed` | 下载内容是否完整、是否拿到了错误页面或非预期压缩文件 |
| `Core Update Failed` 且包含解压错误 | 压缩包内容、临时空间与解压阶段的具体错误 |
| 新文件执行报格式或架构错误 | 所选编译版本与设备 CPU 架构是否一致 |
| `Core Move Failed` | 最终路径是否可写、文件系统和空间是否正常 |

脚本通常使用 `/etc/openclash/core/clash_meta`；启用小闪存模式时使用 `/tmp/etc/openclash/core/clash_meta`。先核对实际模式再检查路径。可以在路由器终端只读查看空间和已安装文件：

```sh
df -h /tmp /etc/openclash
ls -l /etc/openclash/core/clash_meta /tmp/etc/openclash/core/clash_meta
```

未使用的路径不存在可以是正常现象。不要因为看到不存在就删除旧目录，或在不了解挂载方式时手工覆盖运行中的核心。

## 手动上传后也要确认运行版本

自动下载无法完成时，按安装版本提供的核心上传入口，使用官方项目所指向的正确架构文件。先保存原文件和当前日志，上传后核对核心版本、启动日志与固定目标的新连接；如果新核心无法启动，恢复已保存的可用版本及配置。

更新成功提示之后，还要确认服务实际使用新版本，DNS、规则与原有设备连接均按预期工作。配置加载报错可回到[安装与配置入口检查](/articles/openclash-install-guide/)；只有订阅更新报错时使用[订阅更新排查](/articles/openclash-subscription-update-failed/)，不用再次替换核心。

## 官方来源

- [OpenClash：核心更新脚本](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/root/usr/share/openclash/openclash_core.sh)
- [OpenClash：版本查询与有效性检查](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/root/usr/share/openclash/openclash_version.lua)

来源核验日期：2026-10-14。根据官方主分支脚本说明排查阶段，安装版本的下载通道与路径应以本机日志为准。
