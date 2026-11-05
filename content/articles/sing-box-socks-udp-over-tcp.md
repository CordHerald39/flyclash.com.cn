---
title: "sing-box SOCKS udp_over_tcp：服务端支持与协议版本怎么确认"
category: "tutorials"
description: "参考 sing-box SOCKS 和 UDP over TCP 官方文档，解释 SagerNet UoT 的协议边界、enabled/version 与双端互通要求，避免把任意 SOCKS5 代理当作可用 UoT 上游。"
date: "2026-11-05"
updated: "2026-11-05"
author: "FlyClash 中文指南编辑部"
draft: false
---

SOCKS 出站的网页访问正常、UDP 应用却不通时，不要立即打开 `udp_over_tcp`。sing-box 文档中的 UDP over TCP 是 SagerNet 定义的专用协议，把 UDP 包装进 TCP 传输；它不是 SOCKS5 的通用兼容开关。上游不支持同一协议时，开启后也不能建立正确的 UDP 路径。

## 先确认需求和上游能力

记录目标应用是否真的使用 UDP，以及当前 SOCKS 出站的 tag、上游地址和版本。TCP 网页测试只证明 TCP 链路可用，不能代替 UDP 验收。官方 SOCKS 出站支持 4、4a、5 等版本，默认使用 5；还要检查 `network` 是否限制了需要的网络类型，不能在只允许 tcp 的配置上期待 UDP 自动工作。

向服务提供方确认支持 SagerNet UoT，以及支持哪个协议版本。官方列出版本 1 和 2，版本 2 为默认值。不同版本使用不同握手标记，客户端能连上 SOCKS 端口，不表示上游认识这些标记。不要按软件名字或一次测速结果推断支持范围。

## 只修改现有 SOCKS 出站的局部字段

在已确认双端支持版本 2 的测试连接中，核对下面片段，并保留原服务器、认证、tag 和路由。该片段不能单独运行：

```json
{
  "udp_over_tcp": {
    "enabled": true,
    "version": 2
  }
}
```

官方允许在不指定版本时用布尔值代替对象。排查互通时写清版本更便于核对，但不能凭空选择上游不支持的版本。UoT 文档还明确说明它不是 Shadowsocks 协议的一部分，不要把普通协议支持当成 UoT 支持。

## 用真实 UDP 请求验收

1. 备份配置，在配置目录运行 `sing-box check`，确认字段有效。
2. 重载后，从同一个应用发起新的、可重复的 UDP 请求。
3. 查看请求是否进入预期 SOCKS 出站，记录上游是否拒绝、关闭或返回响应。
4. 用相同目标比较原设置；只有双端版本一致且 UDP 请求得到预期响应，才记录为互通成功。

切换协议后出现延迟变化，不能据此声称性能提升。先区分路径变化、超时和应用自身重试，无法确认上游能力时恢复备份。相关出站路径可看 [selector 选择检查](/articles/sing-box-selector-manual-switch/)，普通 UDP 分片另见 [udp_fragment 字段](/articles/sing-box-dial-udp-fragment-check/)，两者用途不同。

本页没有对真实上游进行 UoT 实机测试，记录的是官方协议定义和核对步骤。

## 官方来源

- [官方文档](https://sing-box.sagernet.org/configuration/outbound/socks/)
- [官方文档](https://sing-box.sagernet.org/configuration/shared/udp-over-tcp/)
- [官方文档](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-11-05。
