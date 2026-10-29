---
title: "sing-box TLS insecure 排查：证书错误时先核对域名与信任链"
category: "tutorials"
description: "依据 sing-box 官方 TLS 文档，区分 server_name、证书路径和 insecure 设置，定位握手失败并保留安全回退方案。"
date: "2026-10-29"
updated: "2026-10-29"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 出现 TLS 握手或证书错误时，不应直接把 `insecure` 当作常规修复。先核对服务端域名、证书链和客户端配置，再决定是否需要临时诊断。

## 记录握手现场

备份当前配置，记录 sing-box 版本、目标地址、端口和错误时间。不要在公开日志中放入账号、私钥或完整订阅内容。

## 对照官方 TLS 字段

在 [sing-box TLS 官方文档](https://sing-box.sagernet.org/configuration/shared/tls/)中核对 `server_name`、证书文件和校验相关字段。`server_name` 影响证书主机名校验；证书路径错误、系统时间异常或服务端证书不匹配，都可能产生类似错误。

可用一个脱敏的结构片段确认字段位置：

```json
{
  "tls": {
    "enabled": true,
    "server_name": "example.com",
    "insecure": false
  }
}
```

示例不代表你的服务端域名或证书配置。

## 先修复原因，再做临时诊断

1. 检查系统时间、目标域名和服务端证书覆盖范围。
2. 确认客户端实际加载的是这份配置，而不是旧缓存。
3. 用 `insecure: false` 复测，记录完整错误类型。
4. 只有在隔离环境定位问题时才短暂改变校验设置，确认后立即恢复并重新验证。

如果证书路径或 server_name 不匹配，先看 [sing-box TLS certificate 配置](/articles/sing-box-tls-certificate/)；如果是 ALPN 或指纹问题，可参考 [sing-box TLS ALPN](/articles/sing-box-tls-alpn/)。

## 官方来源

- [sing-box TLS 配置](https://sing-box.sagernet.org/configuration/shared/tls/)

来源核验日期：2026-10-29。
