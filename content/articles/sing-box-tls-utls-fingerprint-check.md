---
title: "sing-box TLS uTLS 指纹：握手失败排查"
category: "tutorials"
description: "核对 sing-box TLS 的 uTLS fingerprint、server_name 和证书校验，避免把指纹当成万能修复。"
date: "2026-10-24"
updated: "2026-10-24"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 的 TLS 配置可以包含 uTLS 指纹选择。握手失败时，应先判断是服务器名、证书校验、传输层还是指纹字段不兼容。随意更换指纹不能替代地址、端口和证书链检查，且不同版本的支持范围可能变化。

## 记录握手阶段

备份配置，记录出站类型、server_name、证书校验设置、transport 和最早错误。若 TCP 尚未建立，先查网络与端口；若已进入 TLS，再对照 server_name、证书和 fingerprint。不要把代理面板显示的“TLS 错误”当成唯一原因。

## 核对 utls 字段

官方 shared TLS 文档说明 uTLS 的配置结构。示例只展示局部关系：

```json
{
  "tls": {
    "enabled": true,
    "server_name": "example.test",
    "utls": {
      "enabled": true,
      "fingerprint": "chrome"
    }
  }
}
```

示例域名和指纹仅为格式说明。必须用当前官方文档列出的值，并确认当前核心构建支持；不要把浏览器版本号当成 fingerprint 值。server_name 应与证书和服务端配置对应，不能为了通过握手关闭所有校验。

## 单变量验证

1. 运行 `sing-box check`，先排除字段结构错误。
2. 保持地址、端口、server_name 不变，只切换一个已支持的 fingerprint。
3. 建立新连接，记录握手阶段、证书错误和最终结果。
4. 失败时恢复原值，并检查 [server_name 证书域名](/articles/sing-box-tls-server-name-certificate-check/)。

如果 TLS 已成功但请求仍超时，继续看 [connect_timeout](/articles/sing-box-connect-timeout-dial-check/)；如果出站选择错误，参考 [selector 手动切换](/articles/sing-box-selector-manual-switch/)。

## 官方来源

- [sing-box shared TLS 配置](https://sing-box.sagernet.org/configuration/shared/tls/)

来源核验日期：2026-10-24。本文没有声称任何指纹能绕过服务端策略。
