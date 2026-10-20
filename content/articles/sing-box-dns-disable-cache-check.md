---
title: "sing-box disable_cache：关闭 DNS 缓存怎样做对照检查"
category: "tutorials"
description: "依据 sing-box 官方 DNS 文档区分 disable_cache、disable_expire 与乐观缓存，给出临时对照步骤，避免把系统或应用缓存误当成核心缓存。"
date: "2026-10-20"
updated: "2026-10-20"
author: "FlyClash 中文指南编辑部"
draft: false
---

更换 DNS 服务器后仍看到旧结果，可以临时检查 sing-box 的 disable_cache。官方定义是关闭 DNS 缓存；disable_expire 则关闭缓存过期，含义不同。不要因为“结果没变化”就把两个字段一起开启。

## 先确认是哪一层缓存

系统、浏览器、应用和代理核心都可能保留解析或连接状态。关闭核心的 DNS 缓存，不能据此认定其他缓存也被清空。应用仍复用旧连接时，看到相同目标 IP 也不代表核心重新查询后仍返回旧值。

下面只是一项 DNS 配置片段，需合并到当前版本有效的完整配置中：

```json
{
  "dns": {
    "disable_cache": true
  }
}
```

## 如何做一次临时对照

1. 备份配置，记录版本、查询域名、解析服务器及正常状态下的返回结果。
2. 确认实际测试请求经过 sing-box 的 DNS 路径，而不是应用自带的其他解析服务。
3. 仅临时修改 disable_cache，检查配置并按客户端方式使其生效。
4. 发起新的查询，从 DNS 日志比较服务器、结果与是否出现重新查询。
5. 对照完成后恢复原设置，记录差异；不要把临时诊断开关自动当作长期优化。

若关闭后依然拿到相同地址，应继续检查上游真实回答、hosts 或规则是否改变了查询路径，而非反复清理不相关配置。相同回答本身不证明缓存错误。

## 留意与其他字段的关系

当前文档说明 disable_cache、disable_expire 与 optimistic 存在冲突。optimistic 还有自己的版本要求，旧版本不应直接照搬新文档字段。遇到配置校验失败，应先核对当前版本支持范围，恢复备份后逐项检查。

这里讨论 DNS 回答缓存；持久化选择与缓存文件是另一类问题，见 [cache_file 配置](/articles/sing-box-cache-file-config/)。服务器连接失败时，先阅读 [DNS 地址解析排错](/articles/sing-box-dns-address-resolver-check/)。

## 官方来源

[官方配置文档](https://sing-box.sagernet.org/configuration/dns/)

来源核验日期：2026-10-20。
