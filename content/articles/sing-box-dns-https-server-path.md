---
title: "sing-box HTTPS DNS 配置：server、端口与 path 怎么填写"
category: "tutorials"
description: "依据 sing-box 新式 HTTPS DNS 服务器文档核对 server、server_port、path 和 domain_resolver，区分地址解析、TLS 与 DoH 路径故障。"
date: "2026-10-20"
updated: "2026-10-20"
author: "FlyClash 中文指南编辑部"
draft: false
---

在 sing-box 新式 HTTPS DNS 服务器中，server、server_port 与 path 分别表示服务器地址、端口和请求路径。不要把旧配置里的一整条 https 地址直接当作这些字段的等价替换，先确认当前版本使用哪种服务器结构。

## 按官方字段拆开核对

官方文档要求填写 server；server_port 默认是 443，path 默认是 /dns-query。服务商若明确提供了其他端口或路径，应以该服务的真实文档为准。不能因为网站首页可以打开，就认定它同时提供 DoH 服务。

server 使用域名时，官方要求另外设置 domain_resolver 来解析服务器 IP。它解决的是访问 DNS 服务器之前的地址解析，与这台服务器随后处理普通查询的过程不同。解析器 tag 应引用配置中真实存在且能够工作的对象。

## 按失败阶段检查

1. 备份配置，记录内核版本和现有 DNS 服务器结构，避免新旧字段混写。
2. 核对服务提供方给出的主机、端口、路径和证书要求。
3. 检查 server 为域名时的 domain_resolver 引用，确认可以先得到服务器地址。
4. 查看连接日志，区分域名解析失败、TCP 连接失败、TLS 错误与 HTTP 请求错误。
5. 配置校验后通过实际 DNS 查询验收，再测试依赖解析的目标应用。

TLS 错误应检查服务器名称、证书与系统时间，不要直接用关闭证书验证掩盖问题。路径错误则应核对 DoH 服务地址，不应反复更换代理节点来碰运气。

## 迁移时保留回退条件

当前官方文档还解释了新旧服务器在拨号字段和域名解析方式上的差别。迁移应在备份基础上逐个服务器进行，保留原始配置与测试记录。本页没有提供某个公共解析器在所有网络都可用的保证。

服务器地址相关问题可结合 [DNS address_resolver 排错](/articles/sing-box-dns-address-resolver-check/) 阅读，但不要混用其中的旧字段；路由解析器另见 [route domain_resolver](/articles/sing-box-route-domain-resolver-check/)。

## 官方来源

[官方配置文档](https://sing-box.sagernet.org/configuration/dns/server/https/)

来源核验日期：2026-10-20。
