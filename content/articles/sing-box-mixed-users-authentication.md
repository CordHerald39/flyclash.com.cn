---
title: "sing-box mixed users 认证排查：HTTP 407 与 SOCKS 密码错误"
category: "tutorials"
description: "依据 sing-box mixed 入站官方文档，核对 users 用户名密码、HTTP 与 SOCKS 客户端凭据，以及新增认证后应用无法连接的处理步骤。"
date: "2026-10-30"
updated: "2026-10-30"
author: "FlyClash 中文指南编辑部"
draft: false
---

给 sing-box mixed 入站增加 `users` 后，浏览器或应用可能突然无法使用代理。HTTP 客户端可能提示代理需要认证或返回 407，SOCKS 客户端则可能报告认证失败。此时先检查应用有没有发送代理凭据，再排查节点和 DNS。

## 分清代理认证和节点密码

`users` 属于本机 mixed 入站，对通过该监听端口接入的 SOCKS 与 HTTP 用户生效。它不是远端节点的 UUID、订阅令牌或服务器登录密码。官方明确写明：`users` 为空时不要求认证，因此清空它会改变访问控制，不能当成常规修复。

先备份配置，记录监听地址、端口和当前应用使用的协议。即使 HTTP 和 SOCKS 共用 mixed 端口，应用仍须选择自己支持的代理协议。基础监听检查见 [sing-box mixed 入站配置](/articles/sing-box-mixed-inbound-config/)。

## 核对 users 数组中的账号

在现有 mixed 入站下检查 `users` 数组，每个用户对象包含 `username` 和 `password`。用户名与应用保存的代理账号一致，密码应单独生成并保存在本机，不能复制官方文档示例中的弱口令，也不要在公开日志里放出用户列表。

修改后在配置目录运行 `sing-box check`。随后重启内核，确认客户端没有继续连接旧端口或旧进程。只保存 JSON 而未重载，不能证明新账号已经生效。

## 用支持认证的客户端单独复测

如果已有入站监听 `127.0.0.1:2080`，用户名为 `local-device`，可按实际端口和用户名修改后运行下面的 HTTP 代理测试。只给用户名时 curl 会提示输入代理密码，避免把密码写入命令历史：

```sh
curl --proxy http://127.0.0.1:2080 --proxy-user local-device --head https://sing-box.sagernet.org/
```

同一 mixed 端口的 SOCKS 测试可使用：

```sh
curl --proxy socks5h://127.0.0.1:2080 --proxy-user local-device --head https://sing-box.sagernet.org/
```

这两个命令只用于核对应用能否带凭据建立代理连接，不保证目标站点或远端节点一定可达。认证成功后仍可能出现目标连接超时，应与 407、用户名密码错误分别记录。

## 单个应用失败时怎么处理

若 curl 能认证而应用不能，检查该应用是否支持所选协议的代理认证、是否仍缓存旧凭据。系统代理界面不一定提供与应用相同的账号输入能力，应按应用文档配置；不要为了适配一个不支持认证的应用而把监听改成所有网卡且清空 `users`。

需要回退时恢复完整备份和原访问范围，再确认监听状态。若端口根本无法连接，先看 [FlyClash 代理端口占用排查](/articles/flyclash-port-conflict/)，不要反复修改密码。

## 官方来源

- [对应字段官方文档](https://sing-box.sagernet.org/configuration/inbound/mixed/)
- [配置检查命令](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-10-30。
