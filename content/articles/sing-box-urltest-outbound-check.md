---
title: "sing-box urltest 出站：自动选路与延迟测试验收"
category: "tutorials"
description: "按 sing-box 官方 urltest 文档检查测试 URL、出站列表和切换结果，避免把一次延迟读数当成稳定性结论。"
date: "2026-10-19"
updated: "2026-10-19"
author: "FlyClash 中文指南编辑部"
draft: false
---

urltest 会按测试结果选择出站，但延迟只代表特定时间、目标和网络。先确认候选出站都能独立工作，再观察自动切换。

## 建立最小测试

1. 备份出站和 route 配置，列出要测试的候选标签。
2. 按官方字段配置 urltest，选择稳定且可解释的测试 URL。
3. 运行 `sing-box check -c config.json`，再启动测试配置。
4. 分别记录测试结果、当前选中出站和真实目标请求结果。

若所有候选都失败，先检查 DNS、网络和出站认证。若测试成功但目标失败，继续检查目标规则和协议兼容性。不要用不断缩短 interval 的方式掩盖网络问题。

继续阅读：[sing-box route final](/articles/sing-box-route-domain-resolver-check/) · [sing-box selector 手动切换](/articles/sing-box-selector-manual-switch/)。

## 官方来源

[sing-box urltest 出站](https://sing-box.sagernet.org/configuration/outbound/urltest/)

来源核验日期：2026-10-19。
