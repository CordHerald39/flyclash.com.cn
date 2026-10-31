---
title: "sing-box Hosts DNS predefined：静态域名映射不生效怎么查"
category: "tutorials"
description: "参考 sing-box 官方 Hosts DNS 文档，核对 type hosts、predefined、系统 hosts 路径和 DNS 规则选择，分辨静态映射未加载与查询绕过问题。"
date: "2026-10-31"
updated: "2026-10-31"
author: "FlyClash 中文指南编辑部"
draft: false
---

在 sing-box 配置里添加静态域名映射后不生效，先检查查询是否选择了 Hosts DNS 服务器。`predefined` 属于 `type: "hosts"` 的 DNS 服务器配置；添加服务器条目本身，不代表每个 DNS 请求都会自动使用它，也不会让绕过 sing-box 的应用解析发生变化。

## 先检查内核版本和现有 DNS 路径

官方 Hosts DNS 页面标注该服务器类型自 sing-box 1.12.0 提供。先记录实际运行的内核版本、DNS 服务器标签、现有规则与测试域名，保存备份。旧内核应对照相应版本资料，不能仅因为新文档里存在字段就直接覆盖配置。

同时确认应用是否经过 sing-box DNS。浏览器内置的加密 DNS、应用缓存和其他 VPN 的解析路径都可能影响结果。需要先区分“映射条目没被使用”和“应用根本没有向这里查询”。

## 在 Hosts 服务器中定义映射

下面是单个 DNS 服务器片段，应合并到现有 `dns.servers`，不能作为完整配置运行。示例把自己的测试域名映射到回环地址，仅用于本机解析对照，不是公网服务地址：

```json
{
  "type": "hosts",
  "tag": "hosts-local",
  "predefined": {
    "proxy-check.test": "127.0.0.1"
  }
}
```

官方示例允许映射值为一个 IP 字符串或多个 IP 的数组。填写自己已经确认的目标地址，别把其他网站域名随意指向无关 IP；解析能返回地址也不代表目标端口有服务，更不代表 HTTPS 证书能匹配该域名。

## 核对系统 hosts 与 DNS 规则

`path` 用于指定 hosts 文件路径。未指定时，文档列出的默认来源为 `/etc/hosts`，Windows 使用 `C:\Windows\System32\Drivers\etc\hosts`。自定义路径还要确认文件存在、内容格式及运行进程的读取权限。不要为了一个映射清空系统 hosts。

然后核对现有 DNS 规则是否会选择 `hosts-local`。官方“有 hosts 时优先使用”示例分别列出了 sing-box 1.14.0 的 `preferred_by` 和更早版本的 `ip_accept_any` 写法；不要把两个版本的片段直接拼接。本例只展示服务器条目，不替换现有规则。规则动作的字段关系可参看 [DNS rule action 检查](/articles/sing-box-dns-rule-action/)。

## 用新查询检验结果

1. 执行 `sing-box check`，确认当前内核接受服务器类型、标签与规则引用，再重载。
2. 重新向 sing-box 的实际 DNS 入口查询测试域名，分别记录请求类型、选择的服务器和返回地址。
3. 再通过目标应用建立新连接；若直接查询正确而应用结果不同，继续查应用缓存或其他解析路径。
4. 无法确认规则版本或映射来源时，恢复备份，保留原结果；不要通过停用全部其他 DNS 服务器来掩盖选择问题。

缓存对照步骤见 [sing-box DNS disable_cache 排查](/articles/sing-box-dns-disable-cache-check/)。本文是基于官方配置文档的排查流程，没有对真实内网服务进行连通性测试。

## 官方来源

- [官方字段文档](https://sing-box.sagernet.org/configuration/dns/server/hosts/)
- [官方字段文档](https://sing-box.sagernet.org/configuration/dns/rule/)
- [官方配置检查命令](https://sing-box.sagernet.org/configuration/)

来源核验日期：2026-10-31。
