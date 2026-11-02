---
title: "sing-box direct 出站 bind_interface：指定网卡后连接失败怎么查"
category: "tutorials"
description: "依据 sing-box 官方 direct 出站和 dial 字段文档，核对 bind_interface、路由表与接口名称，区分字段不支持、接口不存在和目标不可达。"
date: "2026-11-02"
updated: "2026-11-02"
author: "FlyClash 中文指南编辑部"
draft: false
---

为直连出站指定网卡后请求失败，先确认接口名称来自当前系统，并检查该接口是否有到目标的路由。`bind_interface` 只影响拨号选择，不会替你创建接口或修改系统路由。

## 只改 dial 层字段

保存出站配置，确认实际使用的是 `direct`。局部结构：

```json
{"type": "direct", "tag": "direct-lan", "bind_interface": "Ethernet"}
```

示例接口名必须换成系统实际名称；不要把 IP 地址当作接口名称。

## 分阶段验证

1. 执行 `sing-box check`，确认当前版本接受字段。
2. 列出接口与路由表，确认目标网段能从指定接口到达。
3. 用固定目标测试，再比较未绑定接口的原出站。
4. 若接口存在但握手失败，继续查 DNS、MTU 和防火墙，不要重复改 bind_interface。

回退时删除本轮字段，恢复原出站并保留对比结果。

## 官方来源

- [官方文档 1](https://sing-box.sagernet.org/configuration/outbound/direct/)
- [官方文档 2](https://sing-box.sagernet.org/configuration/shared/dial/)

来源核验日期：2026-11-02。
