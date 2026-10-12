---
title: "sing-box HTTP 入站配置：本地监听、认证与连接验收"
category: "tutorials"
label: "入站配置"
description: "按 sing-box 官方 HTTP 入站与监听字段文档建立本机 HTTP 代理入口，用最小直连配置、curl 显式代理和日志检查监听、认证及路由阶段。"
date: "2026-10-12"
updated: "2026-10-12"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 的 HTTP 入站让本机应用把请求交给核心。它是应用进入 sing-box 的入口，实际访问目标由出站和路由决定。先建立只监听回环地址的最小 HTTP 入口，用一个当前网络本来就能访问的目标验收，再接入你的代理出站；这样可以分清端口没开和出口连接失败。

## 先准备独立测试配置

将下面保存为 `http-test.json`，保留日常配置不动。`18080` 是本文的示例端口，需要确认未被占用；`127.0.0.1` 限定本机访问。配置使用官方[HTTP 入站](https://sing-box.sagernet.org/configuration/inbound/http/)、[监听字段](https://sing-box.sagernet.org/configuration/shared/listen/)、[direct 出站](https://sing-box.sagernet.org/configuration/outbound/direct/)与[路由](https://sing-box.sagernet.org/configuration/route/)中的基础字段。

```json
{
  "log": { "level": "info" },
  "inbounds": [
    {
      "type": "http",
      "tag": "http-in",
      "listen": "127.0.0.1",
      "listen_port": 18080,
      "set_system_proxy": false
    }
  ],
  "outbounds": [
    { "type": "direct", "tag": "direct-out" }
  ],
  "route": { "final": "direct-out" }
}
```

此例最终直连，不提供远端节点，也不会改变系统代理；它只用于确认应用到核心的 HTTP 接入路径。官方 HTTP 入站文档还包含带版本要求的扩展字段，首次测试不必全部照抄。

## 检查通过后再启动和发起请求

先查看本机 `sing-box version`，使用该版本执行检查。Windows PowerShell 进入核心目录后可运行：

```powershell
.\sing-box.exe check -c .\http-test.json
.\sing-box.exe run -c .\http-test.json
```

Linux 在程序路径已可用时对应执行 `sing-box check -c ./http-test.json` 与 `sing-box run -c ./http-test.json`。配置检查见[官方配置文档](https://sing-box.sagernet.org/configuration/)；`run` 命令见[官方 CLI 源码](https://github.com/SagerNet/sing-box/blob/testing/cmd/sing-box/cmd_run.go)。检查通过只证明配置可接受，随后还要确认没有监听报错；Windows 基础问题见[配置检查指南](/articles/sing-box-windows-config-check/)，Linux 安装见[下载与权限检查](/articles/sing-box-linux-install/)。

另开终端，用 curl 显式指定 HTTP 代理，避免依赖系统设置：

```sh
curl --proxy http://127.0.0.1:18080 --noproxy "" --connect-timeout 10 --max-time 20 --verbose --output /dev/null https://example.com/
```

Windows 将 `curl` 写成 `curl.exe`，并将 `/dev/null` 改为 `NUL`。`--noproxy ""` 用于避免已有免代理设置跳过本地入口。HTTPS 目标通过 HTTP 代理建立隧道：在详细输出里核对与本地端口的连接及 CONNECT 结果，再看目标响应。若选用的示例站点在当前网络不可达，换成你有权访问且已验证直连可用的 HTTPS 目标。

## 有认证需求时单独增加 users

官方文档说明 `users` 为空时不要求认证。本机最小示例省略它；如需增加用户名和密码，可在 `http-in` 对象中加入一组自己的测试凭据，再检查配置。用 curl 的 `--proxy-user` 提供对应凭据，不把密码截图或提交到公开配置。

不要为了让另一台设备连接，就直接改成所有地址监听并继续保持无认证。本页的验证范围是本机 HTTP 入口；共享访问需另行处理监听范围、认证和网络访问限制。

## 失败发生在哪一层

连接本地端口被拒绝时，先看核心是否运行及端口是否一致；代理认证失败时检查 `users` 和请求凭据；CONNECT 已成功而目标访问失败时再查目标、DNS、路由和出站日志。将 `route.final` 改接真实出站前，先保证这个直连基线通过，并核对目标出站标签确实存在。

退出测试核心后，停止测试请求并保留配置副本。一次请求成功只能证明这条路径和目标可用，不代表系统所有应用已接管，也不代表远端代理节点可用。

## 官方来源与核验日期

- [sing-box HTTP 入站](https://sing-box.sagernet.org/configuration/inbound/http/)
- [sing-box 监听字段](https://sing-box.sagernet.org/configuration/shared/listen/)
- [sing-box direct 出站](https://sing-box.sagernet.org/configuration/outbound/direct/)
- [sing-box 路由配置](https://sing-box.sagernet.org/configuration/route/)
- [sing-box 配置检查](https://sing-box.sagernet.org/configuration/)
- [sing-box run 命令官方源码](https://github.com/SagerNet/sing-box/blob/testing/cmd/sing-box/cmd_run.go)
- [curl 官方手册：代理与请求选项](https://curl.se/docs/manpage.html)

来源核验日期：2026-10-12。示例依据官方字段组织，须用读者本机版本检查后执行；本文未对读者设备或目标网络作实测承诺。
