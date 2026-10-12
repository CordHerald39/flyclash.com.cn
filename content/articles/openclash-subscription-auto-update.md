---
title: "OpenClash 订阅自动更新：预约、循环与单条启用怎么设置"
category: "tutorials"
label: "订阅配置"
description: "依据 OpenClash 官方配置订阅界面与调度源码，设置预约或循环自动更新，检查单条订阅启用、路由器时间、计划任务与实际更新日志。"
date: "2026-10-12"
updated: "2026-10-12"
author: "FlyClash 中文指南编辑部"
draft: false
---

OpenClash 手动更新能成功，到了设定时间却没有新配置，应先检查自动更新开关、更新模式与单条订阅启用状态。自动更新是一次计划执行：它可能没有触发，也可能执行后发现内容没有变化。文件修改时间不变，单独看并不能判断计划失败。

## 在配置订阅页选择一种计划

打开当前版本的“配置订阅”页。官方[界面源码](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/luasrc/model/cbi/openclash/config-subscribe.lua)与[中文翻译](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/po/zh-cn/openclash.zh-cn.po)对应的字段如下；不同版本排版可能变化，可按字段含义辨认。

| 界面字段 | 配置键 | 要确认的内容 |
| --- | --- | --- |
| 自动更新 | `auto_update` | 全局自动更新是否开启 |
| 更新模式 | `config_auto_update_mode` | 预约或循环，选择其一 |
| 更新时间(每周) | `config_update_week_time` | 预约模式的每天或某个星期 |
| 更新时间(每天) | `auto_update_time` | 预约模式的整点小时 |
| 更新间隔(分钟) | `config_update_interval` | 循环模式的分钟间隔 |

预约适合希望在固定时段更新的路由器；循环适合按间隔检查，但不应设置成极短间隔反复请求订阅服务。先记录原设置，设定一次计划，再点“保存配置”。“更新配置”是另一个会立即执行更新的按钮，不能用点过它来证明未来计划已生效。

## 单条订阅也必须处于启用状态

全局开关下面还有每条配置订阅的启用项。核对目标条目的配置别名、地址和启用状态；官方[订阅更新脚本](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/root/usr/share/openclash/openclash.sh)在无指定目标的常规更新中会跳过停用项和空地址。

先手动验证这一条能下载、解析并使用，再观察计划执行。不要为测试重新创建同名配置，也不要公开带令牌的完整订阅地址。手动更新本身失败时，转到[OpenClash 订阅更新失败](/articles/openclash-subscription-update-failed/)，本页不替代下载故障排查。

## 预约模式怎样查是否写入计划任务

确认路由器显示的日期、时区和时间与期望一致。官方[启动脚本](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/root/etc/init.d/openclash)将预约任务写入 `/etc/crontabs/root`，执行 `openclash.sh`。有 SSH 访问权限时，可只读查看：

```sh
date
grep -n 'openclash.sh' /etc/crontabs/root
```

比对小时和星期是否符合设置。循环模式不使用这条预约 cron，不能因找不到它就判失败。保存后预约记录仍缺失或仍是旧值时，保留设置与计划记录；在可中断的维护时间按当前版本支持的方法重新启动 OpenClash，再查看。不要直接叠加手写 cron，让两个调度入口重复更新。

## 以执行日志和配置加载验收

到达预约时段或经过一个循环间隔后，检查目标配置的更新日志。下载失败、校验失败、更新成功与“没有变化”分别记录；官方脚本在新旧内容相同时会保留原文件。计划执行成功后，如果修改的是当前配置，还应检查重新加载与一次真实连接。

验收记录至少包括：路由器时间、更新模式、目标别名、一次计划执行结果、当前使用的配置和目标请求结果。设定计划前可按[配置备份与恢复](/articles/openclash-config-backup-restore/)保存副本。测试完成后恢复日常时段，避免后续在工作期间频繁中断连接。

## 官方来源

- [配置订阅界面实现](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/luasrc/model/cbi/openclash/config-subscribe.lua)
- [OpenClash 中文字段翻译](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/po/zh-cn/openclash.zh-cn.po)
- [OpenClash 启动与预约任务实现](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/root/etc/init.d/openclash)
- [OpenClash 订阅更新脚本](https://raw.githubusercontent.com/vernesong/OpenClash/master/luci-app-openclash/root/usr/share/openclash/openclash.sh)

来源核验日期：2026-10-12。上述为官方 master 源码行为，旧版字段与调度可能不同；本页没有连接或修改读者路由器。
