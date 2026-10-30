---
title: "sing-box TLS 版本不匹配：min_version 与 max_version 怎么检查"
category: "tutorials"
description: "依据 sing-box 官方 TLS 文档，检查最小和最大 TLS 版本限制，区分协议协商失败、证书错误和 ALPN 不匹配，并保留配置回退。"
date: "2026-10-30"
updated: "2026-10-30"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box TLS 握手失败时，证书并不是唯一原因。客户端配置的 `min_version`、`max_version` 与服务端支持范围没有交集，也会导致连接无法建立。先从日志区分版本协商、证书和 ALPN 错误，再调整版本范围，不要同时关闭多项检查。

## 从一条明确的失败连接开始

备份配置，记录内核版本、目标地址、TLS 服务端域名和原始错误。确认出站确实启用了 TLS；普通明文连接不适用本步骤。若错误明确指向证书域名或信任链，先处理 [sing-box TLS server_name 检查](/articles/sing-box-tls-server-name-certificate-check/)，不要只修改版本号。

## 核对版本字符串与范围

官方文档使用字符串 `"1.0"`、`"1.1"`、`"1.2"`、`"1.3"` 表示 TLS 版本，而不是 sing-box 软件版本。`min_version` 是可接受的最低版本，`max_version` 是可接受的最高版本；最低值不能高于最高值。

下列片段只展示 TLS 子对象内的版本范围，保留原出站的其他必要字段和真实服务端域名：

```json
{
  "tls": {
    "enabled": true,
    "min_version": "1.2",
    "max_version": "1.3",
    "insecure": false
  }
}
```

在本次核验的官方文档中，默认最低版本为 TLS 1.2，默认最高版本当前为 TLS 1.3。显式限制到某一个版本会缩小协商范围；没有明确要求时，优先检查是谁加入了限制，再与运行版本的默认行为比较。

## 一次只改变版本限制

1. 在配置目录执行 `sing-box check`，先排除字段类型或配置格式错误。
2. 只调整版本上下限，保持目标、`server_name`、ALPN 和证书校验不变。
3. 重新建立连接，比较同一目标的握手日志。连接复用可能掩盖配置变化，应确保产生了新的测试连接。
4. 如果版本协商已通过但出现证书或 ALPN 错误，按新错误继续排查，而不是继续扩大版本范围。

服务端只支持旧协议时，先核实是否连接了正确的服务和端口，再由服务维护方修复兼容性；不要把长期启用过旧协议作为通用答案。Windows 原生 TLS 引擎还可能受系统版本能力影响，启用了相应引擎时须一起核对官方页面的平台说明。

## 恢复与交付结果

无改善时还原备份，保存修改前后两组错误。只有确认新连接已经完成握手，才记录为协议协商问题已解决；配置检查通过并不等于握手成功。ALPN 相关错误见 [sing-box TLS ALPN](/articles/sing-box-tls-alpn/)，证书诊断见 [insecure 排查](/articles/sing-box-tls-insecure-flag-check/)。

## 官方来源

- [对应字段官方文档](https://sing-box.sagernet.org/configuration/shared/tls/)
- [配置检查命令](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-10-30。
