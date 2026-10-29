---
title: "FlClash Android 订阅导入：地址可达、解析和 VPN 验收"
category: "tutorials"
description: "基于 FlClash 官方项目资料，拆分 Android 订阅导入、配置解析、代理组选择和 VPN 权限检查。"
date: "2026-10-29"
updated: "2026-10-29"
author: "FlyClash 中文指南编辑部"
draft: false
---

FlClash 订阅导入应分成地址可达、内容可解析和配置已激活三步。列表出现节点不代表代理已启动，Android VPN 权限和应用路由仍需单独验收。

## 先保护订阅地址

从 [FlClash 官方仓库](https://github.com/chen08209/FlClash)核对项目和发行入口。把带令牌的订阅 URL 保存在密码管理器或受控笔记中，公开排错时只提供脱敏后的域名与错误时间。

## 导入并保留旧配置

新增订阅前导出或复制当前可用配置，记录导入时间和来源。首次更新只选择一个配置，观察下载状态、解析结果和代理组数量；失败时保留旧配置，不要连续覆盖同一条订阅。

## 完成 Android 侧验收

1. 确认订阅内容被解析为预期的配置格式。
2. 选择一个代理组和节点，检查日志是否出现启动结果。
3. 重新授予或确认 Android VPN 权限，再测试一个允许代理的目标。
4. 用直连目标做对照，区分 VPN、DNS 和节点问题。

如果导入成功但没有连接，继续看 [FlClash Android VPN 权限](/articles/flclash-android-vpn-permission-check/)；如果配置字段合并异常，可参考 [FlClash 配置合并](/articles/flclash-profile-merge-check/)。

## 更新失败的回退

记录错误提示、时间和配置名称，恢复旧配置后再检查订阅服务是否返回了完整内容。不要把包含账号的完整响应内容复制到公开 issue。

## 官方来源

- [FlClash 官方 GitHub 仓库](https://github.com/chen08209/FlClash)

来源核验日期：2026-10-29。
