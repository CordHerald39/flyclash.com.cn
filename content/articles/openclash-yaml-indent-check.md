---
title: "OpenClash YAML 缩进检查：解析失败时先保留原配置"
category: "tutorials"
description: "参考 OpenClash 官方仓库，把 YAML 缩进、字段类型、订阅转换和核心加载分层排查，避免错误覆盖可用配置。"
date: "2026-10-29"
updated: "2026-10-29"
author: "FlyClash 中文指南编辑部"
draft: false
---

OpenClash 报 YAML 解析错误时，先保留原配置和错误日志。缩进、列表层级或布尔值类型有误，都会让后续的核心启动问题被掩盖。

## 先确定失败阶段

从 [OpenClash 官方仓库](https://github.com/vernesong/OpenClash)核对当前插件和核心说明，记录错误发生在订阅下载、转换、YAML 解析还是核心加载。不要把带令牌的订阅地址写进日志。

## 只检查一份副本

复制当前配置，在副本上检查空格缩进、列表短横线、引号和布尔值。YAML 对层级敏感，先保持同一层使用一致的空格，不要用 Tab。每次只改一处并保存差异。

## 逐层恢复

1. 用最小配置确认核心可以启动。
2. 加入 DNS、代理组和规则，每一步都重新加载并记录结果。
3. 订阅转换成功后，再检查转换产物是否完整。
4. 解析通过但连接失败时，再转向 DNS、端口和防火墙排查。

如果问题出现在订阅更新，可参阅 [OpenClash 订阅自动更新](/articles/openclash-subscription-auto-update/)；如果解析成功但核心不启动，继续看 [OpenClash 核心更新失败](/articles/openclash-core-update-failed/)。

## 回滚标准

只要副本仍可解析，就先保留该版本作为回退点。确认新配置连续完成解析、核心启动和最小连接测试后，再替换正式配置。

## 官方来源

- [OpenClash 官方 GitHub 仓库](https://github.com/vernesong/OpenClash)

来源核验日期：2026-10-29。
