---
title: "sing-box rule-set 路由规则集更新与命中检查"
category: "tutorials"
description: "检查 sing-box rule-set 的来源、格式、更新状态和路由引用，定位规则集未更新或更新后不生效的问题。"
date: "2026-10-25"
updated: "2026-10-25"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box rule-set 由规则集定义、远程或本地来源和路由引用共同决定。更新失败时，先分辨文件下载失败、格式校验失败还是规则根本没有被引用。

## 记录规则集链路

备份配置，记录 rule-set 标签、格式、路径或 URL、更新时间和引用它的路由规则。只看最终代理结果无法确认到底是哪一层出了问题。

## 检查格式与来源

对照官方 rule-set 文档，确认当前版本要求的格式和字段。远程来源要检查 HTTP 状态、响应类型和证书；本地文件要检查路径、权限和文件是否为空。

## 验证更新后的命中

1. 手动触发一次规则集更新并保存日志。
2. 用配置检查命令确认文件可解析。
3. 访问一个明确属于规则集的域名。
4. 查看规则顺序与最终出站，确认引用已生效。

若仅是下载失败，先保留更新日志并对照 [rule providers](/articles/fly-rule-providers/)；路由未命中时可对照 [domain_suffix 规则](/articles/sing-box-route-domain-suffix-check/)。

## 官方来源

- [sing-box rule-set 配置](https://sing-box.sagernet.org/configuration/rule-set/)
- [sing-box route 规则](https://sing-box.sagernet.org/configuration/route/rule/)

来源核验日期：2026-10-25。本文不提供第三方规则集下载地址。
