---
title: "sing-box NTP 时间同步：配置字段、网络检查与适用范围"
category: "tutorials"
description: "根据 sing-box 官方 NTP 文档配置内置校时服务，区分核心协议时间与系统时钟，检查服务器、端口、同步间隔和连接错误。"
date: "2026-10-15"
updated: "2026-10-15"
author: "FlyClash 中文指南编辑部"
draft: false
---

设备时间明显不准，sing-box 出现与时间有关的协议错误时，先检查操作系统校时。系统环境无法同步时间时，可评估核心内置 NTP；它为核心相关协议提供时间，不能替代对证书、节点参数或目标网络的检查，也不应被当成修复所有 TLS 错误的开关。

## 先判断是不是时间问题

记录当前系统日期、时区、具体错误和发生时间，与可靠时间来源对照。只有时区显示不同而实际时刻正确，不能直接认定存在时钟偏差。证书已过期、主机名不符、网络拒绝等错误也需要分别排查。

[官方 NTP 文档](https://sing-box.sagernet.org/configuration/ntp/)说明，启用后会为 TLS、Shadowsocks、VMess 等协议提供时间，适用于无法进行时间同步的环境。文档没有把它描述为修改整个操作系统时钟的服务，验收时不要只看桌面时钟有没有跳动。

## 合并一段最小配置

下面是顶层 `ntp` 片段，服务器采用官方示例地址，实际使用前确认当前网络能访问。它不包含入站和出站，不要覆盖已有完整配置。

```json
{
  "ntp": {
    "enabled": true,
    "server": "time.apple.com",
    "server_port": 123,
    "interval": "30m"
  }
}
```

`server` 为必填地址；官方默认端口是 123，同步间隔默认三十分钟。`interval` 使用文档展示的时长字符串，别写成无单位的秒数。地址解析和网络访问仍需工作，开启服务不会凭空建立到服务器的通路。

NTP 配置还支持拨号字段。有明确出站需求时，按本机版本和官方拨号文档配置；首次测试不照抄不相关的高级选项，也不要把业务代理端口填到 NTP 端口中。

## 配置成功和校时成功分别验证

1. 备份完整配置及错误日志，执行 `sing-box version` 记录核心版本。
2. 合并片段，按[官方配置说明](https://sing-box.sagernet.org/configuration/)运行 `sing-box check -c config-test.json`。
3. 使用原启动方式加载测试配置，确认没有未知字段、地址解析或同步连接错误。
4. 检查可获得的同步状态与相关日志，再对原先失败的协议建立新连接。
5. 保留同一目标、同一参数的前后结果；若错误仍在，继续按错误类型排查。

进程能启动只说明配置被接受，不表示已联系上时间服务器。服务器不可达时，记录失败原因；不要不停缩短间隔或连续重启。可检查本机网络、域名解析和相关出站是否可用，然后再做一次有依据的验证。

## 恢复与后续诊断

如系统校时恢复，或启用后引入新问题，恢复备份中的原 NTP 设置，再核对业务连接。不要通过关闭证书校验掩盖时间错误。Windows 加载问题见[配置检查](/articles/sing-box-windows-config-check/)，入口问题见[mixed 入站验收](/articles/sing-box-mixed-inbound-config/)。本文没有对实际时间服务器或节点进行连通性实测。

## 官方来源

- [https://sing-box.sagernet.org/configuration/ntp/](https://sing-box.sagernet.org/configuration/ntp/)
- [https://sing-box.sagernet.org/configuration/](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-10-15。配置说明以本机核心版本支持范围为准。
