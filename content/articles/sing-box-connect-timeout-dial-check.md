---
title: "sing-box connect_timeout 配置：连接超时与 detour 怎么区分"
category: "tutorials"
description: "解释 sing-box connect_timeout 的时长格式与拨号作用范围，核对 detour 对其他拨号字段的影响，避免把 DNS、TLS 和测速超时混在一起。"
date: "2026-10-22"
updated: "2026-10-22"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 日志出现超时，先确定它发生在域名解析、建立连接、TLS 握手还是请求传输阶段。官方将 connect_timeout 列在拨号字段中，用于连接超时；它不是所有操作共用的总超时开关。若同一拨号对象配置了 detour，官方还说明其他拨号字段会被忽略，必须先核对实际经过哪个出口。

## 记录最早错误与失败对象

备份原配置，记录核心版本、报错时间、出口标签和最早错误。订阅下载超时、DNS 查询超时、节点延迟测试超时与实际出口拨号超时，触发它们的组件可能不同。即使界面都显示“timeout”，也不能只修改一个 connect_timeout 来判断这些问题是否一起解决。

先确认目标地址与端口正确，核心正在加载准备修改的配置，再检查这个连接是否涉及域名解析。若域名本身不能解析，应从[DNS 服务器地址解析](/articles/sing-box-dns-address-resolver-check/)继续检查；若连接建立后进入 TLS 再失败，应读取握手阶段的错误。

## 使用带单位的时长字符串

下面仅表示在支持官方拨号字段的既有对象中设置 connect_timeout 的形式，不是一份完整出口配置。示例 10s 只解释十秒的写法，不是针对所有网络的推荐值；请保留原来的协议、地址与认证信息。

```json
{
  "connect_timeout": "10s"
}
```

官方要求采用 Go Duration 格式，例如 300ms、1.5s 或 1m。不能把不带单位的数字当作秒数，也不能把带汉字单位的文本直接填进配置。根据实际核心检查结果确认字段和位置合法，再重载。本文不声称这个字段的未填写默认值，避免把其他组件的超时值误套到这里。

## 检查 detour 是否改变作用位置

官方把 detour 定义为上游出口标签，并注明启用时忽略其他拨号字段。如果准备修改的对象同时设置了 detour，只观察本对象的 connect_timeout 变化，可能无法得到预期结果。

顺着 detour 指向的已有出口标签核对实际拨号链路，确认哪一层负责建立到目标的连接，再按该出口类型与核心文档检查对应字段。不要为了“让超时设置生效”直接删掉 detour，这会改变出口路径，测试结果也就不再对应同一条链路。

## 为什么加长等待不等于修复

目标未监听、地址错误、网络无法到达或上游出口不可用时，增加等待时间不会自动修复原因。应先从最早错误判断是拒绝、解析失败还是等待超时，再选相关检查步骤。如果 TCP 已建立但后续响应很慢，也不能只凭总耗时判断 connect_timeout 没有生效。

验收时固定目标、出口和网络条件，每次只改一项并重新建立连接。记录最终错误、是否进入后续阶段、连接是否成功；观察界面里原来已建立的会话不足以验证新拨号字段。没有得到可解释改善时恢复原值，保留日志和当次差异，避免一并改动 DNS、证书、路由和超时。

继续阅读：[Windows 配置检查](/articles/sing-box-windows-config-check/) · [direct 出口与路由](/articles/sing-box-direct-outbound-route/) · [HTTPS DNS 路径检查](/articles/sing-box-dns-https-server-path/)

## 官方来源

- [sing-box 拨号字段：connect_timeout、Duration 格式与 detour](https://sing-box.sagernet.org/configuration/shared/dial/)

来源核验日期：2026-10-22。本文整理官方字段含义与排查顺序，没有把本地示例当作真实节点连接测试。
