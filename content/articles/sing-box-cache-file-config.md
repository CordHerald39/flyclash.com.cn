---
title: "sing-box cache_file 缓存配置：selector 选择重启后怎么恢复"
category: "tutorials"
label: "缓存配置"
description: "按 sing-box 官方 cache_file 与 Clash API 文档启用持久缓存，核对路径、cache_id 和出站标签，通过正常停止与重启验证 selector 选择恢复。"
date: "2026-10-14"
updated: "2026-10-14"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 手动选过的出站在重启后恢复默认值，先检查持久缓存是否启用，以及重启前后是否使用同一份缓存文件和相同出站标签。`cache_file` 处理缓存存储，不能替代配置备份，也不会自动补回已删除的节点。先用一份可回退的测试配置验收，再放进日常配置。

## 把缓存写在 experimental.cache_file

[官方缓存文档](https://sing-box.sagernet.org/configuration/experimental/cache-file/)说明该配置自 `1.8.0` 起提供。先执行 `sing-box version` 记录本机版本，将下面片段并入已有完整配置中的 `experimental` 对象；已有该对象时修改原对象，不要增加重复 JSON 键。

```json
{
  "experimental": {
    "cache_file": {
      "enabled": true,
      "path": "cache-test.db",
      "cache_id": "selector-test"
    }
  }
}
```

这是配置片段，未包含入站与出站。示例文件名和标识由读者自行选择；`path` 留空时官方默认使用 `cache.db`。测试时保持固定启动目录；服务启动方式变化后，确认日志中的实际路径与文件所在位置，避免两次启动用了不同文件。

`cache_id` 非空时，配置相关数据使用由该标识区分的存储区域。若给同一配置换了标识，不能直接期待读取旧标识下的选择；多份配置共享文件时应记录各自标识，不要靠反复删除文件解决混用问题。

## 旧 Clash API 缓存字段不要原样搬入

[官方 Clash API 文档](https://sing-box.sagernet.org/configuration/experimental/clash-api/)将旧的 `store_selected`、`cache_file` 和 `cache_id` 字段标为自 `1.8.0` 起弃用。启用 `cache_file.enabled` 后，selector 选择存储默认生效；目标出站必须有标签。不要把旧的 `store_selected` 填进新的缓存对象。

该文档还说明旧路径与标识已迁往 `cache_file.path` 和 `cache_file.cache_id`。旧教程与新配置混用时报未知字段，先按本机版本整理字段，再运行[配置校验](/articles/sing-box-windows-config-check/)。缓存文档里的新字段有各自版本要求，首次验证无需把所有选项照抄进去。

## 用已有 selector 做一次重启对照

[selector 官方文档](https://sing-box.sagernet.org/configuration/outbound/selector/)说明选择器引用出站标签，当前可通过 Clash API 控制。先确认已有 selector、候选出站与本机控制入口正常，再按下面步骤操作：

1. 用本机核心执行 `sing-box check -c 配置文件路径`，通过后启动测试配置。
2. 通过已经配置好的本机面板或控制接口，在 selector 中选一个不同于默认值的现有出站。记录 selector 标签与所选出站标签。
3. 发起新请求，确认实际使用选中的出站；正常停止核心，并检查缓存目录是否出现文件或是否有写入错误。
4. 用相同配置、路径和 `cache_id` 重启，在选择器中核对选择是否恢复，再用新请求确认出站。

预期恢复的是同一个有效出站标签。若重启期间改名、删除候选或切换了配置，先撤销这些变化再重测。旧连接不能用来判断重启后的新选择。

## 缓存文件不生成或选择仍丢失

先检查 `enabled` 是否进入最终配置、运行用户是否有写入权限、磁盘是否有空间，以及启动日志是否出现缓存打开错误。文件存在但选择没恢复时，继续核对路径、标识和标签。客户端自身也可能重新应用选择，使用客户端时要确认最终配置和重启后的实际状态。

只要恢复旧配置时需要调整缓存，先正常停止核心并复制备份，再操作测试文件。完整配置和订阅仍要单独备份。入站尚未验证可从[HTTP 入站验收](/articles/sing-box-http-inbound-config/)建立基线，Linux 程序启动问题见[安装与权限检查](/articles/sing-box-linux-install/)。

## 官方来源

- [sing-box：Cache File](https://sing-box.sagernet.org/configuration/experimental/cache-file/)
- [sing-box：Clash API 与旧缓存字段迁移](https://sing-box.sagernet.org/configuration/experimental/clash-api/)
- [sing-box：Selector 出站](https://sing-box.sagernet.org/configuration/outbound/selector/)

来源核验日期：2026-10-14。示例聚焦选择恢复；FakeIP 和 DNS 持久化属于另外的缓存需求，应对照本机版本分别配置。
