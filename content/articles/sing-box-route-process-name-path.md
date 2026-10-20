---
title: "sing-box process_name 规则：进程名与路径不命中怎么查"
category: "tutorials"
description: "根据 sing-box 官方文档核对 process_name、process_path 的桌面平台范围，解释应用子进程和远端来源对进程规则验收的影响。"
date: "2026-10-20"
updated: "2026-10-20"
author: "FlyClash 中文指南编辑部"
draft: false
---

为桌面应用设置了 process_name，但流量仍走默认出站时，先核对实际建立连接的进程。官方文档将 process_name 与 process_path 的支持范围限定为 Linux、Windows 和 macOS；Android 应按包名相关字段核对，不能直接套用桌面规则。

## 名称、路径分别解决什么

process_name 匹配进程名，process_path 匹配进程路径。需要按路径写正则时，官方另有 process_path_regex，并标注了版本要求。普通路径和正则不是同一个字段，不应把正则表达式直接当作完整路径填入。

应用的窗口标题、快捷方式名称可能不是联网进程名。带有更新器、辅助进程或浏览器组件的软件，也可能由其他进程发起请求。排查应结合系统进程信息与连接日志，而非只抄安装目录名。

## 用一次明确请求验证

1. 备份配置，确认运行平台及当前版本支持所选字段。
2. 发起一个可辨认的新请求，记录时间、目标地址和实际联网进程。
3. 用系统进程工具核对名称或完整路径，再检查规则里的值。
4. 查看最终配置与规则顺序，确认请求未先命中其他规则。
5. 重新建立连接，从日志确认规则与出站结果；恢复备份后再做对照。

Windows 路径写入 JSON 时应遵守 JSON 的反斜杠转义规则。配置无法解析属于语法问题；能够解析但没有匹配，则应回到进程信息和路由条件检查。两者需要分别处理。

## 哪些连接不适合这样测

从另一台设备转发来的流量，不能直接假定本机核心知道远端应用进程。应用复用已有连接时，也不能把一次界面刷新当成一条新连接。先确认测试路径和连接生命周期，再判断规则是否失效。

启动前检查可参考 [Windows 配置校验](/articles/sing-box-windows-config-check/)，默认出口与规则安排可参考 [direct 出站配置](/articles/sing-box-direct-outbound-route/)。

## 官方来源

[官方配置文档](https://sing-box.sagernet.org/configuration/route/rule/)

来源核验日期：2026-10-20。
