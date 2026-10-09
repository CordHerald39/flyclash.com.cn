---
title: "FlyClash 7890 端口被占用：Windows 查 PID、辨认进程与恢复"
category: "tutorials"
description: "从 FlyClash 官方 README 的端口冲突提示出发，用 PowerShell 查询监听端口和所属进程，区分内核启动与系统代理问题。"
date: "2026-10-09"
updated: "2026-10-09"
author: "FlyClash 中文指南编辑部"
draft: false
---

FlyClash 点击启动后内核失败，日志若明确提示地址或端口已被占用，应先查监听进程。原始 README 在常见问题中提到同类软件可能占用相同端口，并以默认 7890 为例。实际排查以你当前配置和日志中的端口为准，不把 7890 当作所有版本固定值。

## 先保存报错与当前状态

记录启动时间、错误原文、当前配置端口，以及是否同时运行其他代理软件。先确认是监听端口冲突，还是配置解析、权限或其他启动错误。没有端口相关证据时，回到[启动与连接分层排错](/articles/troubleshooting/)，不要直接改端口。

## 在 PowerShell 中查询 TCP 监听

以下示例只做查询。如果日志显示的端口不是 7890，先替换示例中的数字：

```powershell
$listeners = Get-NetTCPConnection -LocalPort 7890 -State Listen -ErrorAction SilentlyContinue
$listeners | Select-Object LocalAddress, LocalPort, OwningProcess
$listeners | ForEach-Object { Get-Process -Id $_.OwningProcess }
```

`OwningProcess` 是监听连接所属进程的 PID。查看进程名称后，再到任务管理器核对路径和软件身份。不要把自己猜测的 PID 直接传给结束进程命令，更不要停止不认识的系统服务。

查询没有结果，只说明当时没有查到对应 TCP 监听；不能据此排除 UDP、瞬时竞争、权限差异或其他地址上的冲突。应结合日志时间和实际协议继续判断。

## 根据进程身份选择处理方法

| 查询结果 | 下一步 |
| --- | --- |
| 另一款已确认的代理客户端 | 从其自身界面正常退出，再重试 FlyClash |
| 当前客户端已有一个实例 | 检查是否重复启动，保留正常实例的配置 |
| 不认识的应用或服务 | 核实路径和用途，暂不强制结束 |
| 端口无人监听但仍报错 | 重新比对报错时间、协议和监听地址 |

停止另一个客户端可能改变系统代理。操作前记录原设置，关闭后重新查询端口，再启动 FlyClash，避免把旧的系统代理残留误判成新的连接故障。

## 必须改端口时同步检查接入方

只有在确实需要两个服务并行运行时，才按客户端支持的方式选择空闲端口。配置中的监听端口、系统代理地址、浏览器手动代理和其他应用的本地代理入口需要一致。仅修改内核端口而保留旧入口，会出现内核正常但应用无法连接。

## 恢复后的验收

确认内核成功启动、预期进程正在监听正确端口，再检查[系统代理与接管范围](/articles/flyclash-proxy-mode-check/)。用一个固定目标新建连接并查看日志，失败时恢复原设置。端口冲突解决不等于远端节点、DNS 或订阅也已正常，应逐层验证。

## 官方来源与核验日期

- [FlyClash 官方 README](https://raw.githubusercontent.com/GtxFury/FlyClash/main/README.md)
- [Microsoft Get-NetTCPConnection 文档](https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection?view=windowsserver2025-ps)

来源核验日期：2026-10-09。平台要求与命令行为以所用版本的官方文档为准。
