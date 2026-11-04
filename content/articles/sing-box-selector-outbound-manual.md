---
title: "sing-box selector 出站：手动切换节点不生效怎么检查"
category: "tutorials"
description: "依据 sing-box 官方 selector 出站文档，检查代理组成员、selected 状态和 route 引用，区分界面切换成功与新连接实际仍使用旧出站。"
date: "2026-11-04"
updated: "2026-11-04"
author: "FlyClash 中文指南编辑部"
draft: false
---

手动切换 selector 后新连接仍使用旧节点，先确认路由实际引用的是 selector 的 tag，而不是某个固定出站。界面显示已选择只说明控制面状态变化，还要从连接记录核对最终出站。

## 对照 selector 对象

保留现有出站，检查 selector 的成员与默认选择。局部结构：

```json
{
  "type": "selector",
  "tag": "proxy",
  "outbounds": ["node-a", "node-b"],
  "default": "node-a"
}
```

示例标签和节点名仅表示关系，必须替换为当前配置中真实存在的对象。

## 验证控制面和数据面

1. 执行 `sing-box check`，确认每个成员出站都存在。
2. 检查 route.final 或规则目标是否指向 selector tag。
3. 通过控制接口切换后关闭旧连接，再创建新请求。
4. 若仍走旧节点，查连接复用、规则顺序和是否存在另一个同名 tag。

不要为了验证切换同时改 DNS 和 TLS。可继续参考 [URLTest 自动选择](/articles/sing-box-urltest-outbound-check/) 与 [出站路由](/articles/sing-box-direct-outbound-route/)。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/outbound/selector/)

来源核验日期：2026-11-04。
