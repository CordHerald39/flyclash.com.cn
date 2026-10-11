---
title: "OpenClash 配置备份与恢复：完整备份、排除核心与单份 YAML 的区别"
category: tutorials
label: "配置备份"
description: "根据 OpenClash 官方备份与恢复源码，检查备份包范围、UCI 设置、配置和核心，避免把下载单份 YAML 当成完整迁移。"
date: "2026-10-11"
updated: "2026-10-11"
author: "FlyClash 中文指南编辑部"
draft: false
---

OpenClash 配置能下载下来，不代表升级或换路由器后的所有设置都能恢复。单份 YAML、配置目录压缩包和完整备份保存的范围不同；迁移前先明确要保留哪些内容，再检查文件，能减少恢复后代理模式、订阅或核心缺失的问题。

## 按官方实现辨认备份范围

2026-10-11 核验的[官方控制器源码](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/luasrc/controller/openclash.lua)包含多种备份处理。完整备份会把 `/etc/config/openclash` 复制进 `/etc/openclash/` 后打包该目录；排除核心的备份会排除 `core`；仅配置备份只打包 `config` 目录。

| 备份内容 | 适合核对的对象 |
| --- | --- |
| 完整目录备份 | 插件 UCI 设置、配置及目录中的其他文件 |
| 排除核心备份 | 保留设置与配置，核心另按目标设备准备 |
| 仅配置目录 | YAML 配置文件，不等于插件全部设置 |
| 下载单份配置 | 一份原始 YAML；运行配置另有下载入口 |

完整备份也不是 OpenWrt 全系统镜像，不据此承诺保存路由器网络、无线或其他插件的设置。换设备时还要重新检查系统与核心架构，参照[OpenClash 安装核对](/articles/openclash-install-guide/)。

## 先核验文件，再升级或重装

1. 记录插件版本、路由器架构、当前配置名、模式和订阅更新设置。
2. 用当前版本的备份入口生成所需包，保存到电脑，再保留一份独立副本。
3. 检查文件大小与时间，使用归档工具打开列表；有 `tar` 的环境可执行只读检查：

```sh
tar -tzf Backup-OpenClash.tar.gz
```

将文件名换成实际下载的文件。完整包应能找到配置目录与保存的 UCI 文件，排除核心包不应被当作含核心的备份。无法列出内容或文件为空时，先重新生成并检查下载，不继续清理旧环境。

## 恢复时保留管理入口与回退副本

先确认目标设备已经具备兼容的 OpenClash 环境，并通过可靠的本地管理连接访问路由器。恢复前再备份目标设备当前状态，停止插件后选择备份恢复类型，上传核验过的备份包；不要把归档文件当成普通 YAML 导入。

[配置管理源码](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/luasrc/model/cbi/openclash/config.lua)会将备份解压到 `/etc/openclash/`，并把包中的 `openclash` 文件移回 `/etc/config/openclash`。只含配置的包不具备完整的设置副本。因此，界面出现恢复完成提示后，仍要核对实际设置，而不能直接宣布迁移成功。

## 恢复后按顺序验收

先检查配置列表与当前选中项，再看核心是否能启动、代理模式与 DNS 设置是否符合原记录。跨架构迁移时，不直接沿用旧设备核心二进制。最后对固定目标建立新请求，观察日志与规则命中，再恢复自动订阅更新。

配置缺失时检查包内目录；核心启动失败时检查架构与文件；核心正常但域名打不开时再看[Fake-IP 与 DNS 排查](/articles/openclash-fake-ip-dns/)；只有更新任务失败时看[订阅更新失败](/articles/openclash-subscription-update-failed/)。保留恢复前后的两份备份，不用连续覆盖来尝试未知结果。

## 官方来源

- [OpenClash 备份控制器源码](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/luasrc/controller/openclash.lua)
- [OpenClash 配置管理与恢复源码](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/luasrc/model/cbi/openclash/config.lua)

来源核验日期：2026-10-11。备份可能含私人订阅与节点信息，不上传公开仓库或 Issue。
