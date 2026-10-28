---
title: "sing-box DNS rule action：按规则修改 DNS 行为"
category: "tutorials"
description: "参考 sing-box 官方 DNS Rule Action 文档检查 DNS 规则动作的匹配范围和顺序。"
date: "2026-10-28"
updated: "2026-10-28"
author: "FlyClash 中文指南编辑部"
draft: false
---

当不同域名需要不同 DNS 处理时，sing-box 可以用 DNS rule action 对命中的查询执行指定动作。官方文档把规则条件与动作分开说明，排查时应先确认命中，再判断结果。

## 先保存基线

备份配置，记录 DNS server、规则顺序、测试域名、查询类型和当前返回地址。先用原配置查询一次，保存日志，避免把缓存命中当成新规则效果。

## 只添加一条规则

在 dns.rules 中加入只匹配测试域名的规则，并使用当前版本文档列出的 action 字段。关系示意：

{
  "dns": {
    "rules": [
      {
        "domain_suffix": ["example.test"],
        "action": "route",
        "server": "local"
      }
    ]
  }
}

实际域名、server 和动作名称必须按配置目标填写。运行配置检查后重载，再查询同一域名。

## 记录命中和回滚

比较规则命中、使用的 server、返回地址和后续出站。若没有命中，检查顺序与条件；若命中但返回失败，检查被选 server。删除新增规则并重新加载即可回滚，不要直接覆盖订阅源文件。

可继续阅读 [sing-box DNS server detour](/articles/sing-box-dns-server-detour-check/)。

## 官方来源

- [DNS Rule Action](https://sing-box.sagernet.org/configuration/dns/rule_action/)

来源核验日期：2026-10-28。

