---
title: "sing-box mixed 入站配置：同一端口的 HTTP 与 SOCKS 接入验收"
category: "tutorials"
label: "混合入站"
description: "建立只监听本机的 sing-box mixed 入站，用 HTTP 与 SOCKS5 两种请求分别验收同一端口，区分监听、认证、域名解析和实际出站问题。"
date: "2026-10-14"
updated: "2026-10-14"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box 的 `mixed` 入站在同一端口接受 HTTP 与 SOCKS 请求，适合不同应用各自支持不同代理协议的情况。一个应用连接成功，只证明它使用的协议和请求路径可用；另一个应用仍需单独验收，尤其要确认端口、协议和域名解析方式。

## 建立独立的本机测试配置

[官方 mixed 文档](https://sing-box.sagernet.org/configuration/inbound/mixed/)列出 SOCKS4、SOCKS4a、SOCKS5 和 HTTP 支持。按[监听字段](https://sing-box.sagernet.org/configuration/shared/listen/)将入口限制为 `127.0.0.1`，避免测试时开放到其他设备。保存下面内容为 `mixed-test.json`，日常配置保持原样。

```json
{
  "log": { "level": "info" },
  "inbounds": [
    {
      "type": "mixed",
      "tag": "mixed-in",
      "listen": "127.0.0.1",
      "listen_port": 18080,
      "set_system_proxy": false
    }
  ],
  "outbounds": [{ "type": "direct", "tag": "direct-out" }],
  "route": { "final": "direct-out" }
}
```

示例使用[direct 出站](https://sing-box.sagernet.org/configuration/outbound/direct/)与[最终路由](https://sing-box.sagernet.org/configuration/route/)，不提供远端节点。它验证本机协议接入，未启用系统代理或 TUN。`18080` 需未被占用。

## 先检查，再启动核心

按[配置文档](https://sing-box.sagernet.org/configuration/)用本机版本检查。Windows 在程序目录运行：

```powershell
.\sing-box.exe check -c .\mixed-test.json
.\sing-box.exe run -c .\mixed-test.json
```

Linux 对应使用 `sing-box check -c ./mixed-test.json` 和 `sing-box run -c ./mixed-test.json`。`run` 命令见[官方源码](https://github.com/SagerNet/sing-box/blob/testing/cmd/sing-box/cmd_run.go)。预期先通过校验，再正常监听；端口冲突时停止测试，换一个未占用端口并同步修改请求。

## 用同一目标分别测试两种协议

先准备一个获准访问、已确认可用的 HTTP 服务，用 IP 地址测试可以暂时排除目标域名解析。下面假设本机 `18081` 已有测试服务；若没有，不要直接照跑，可以用已安装的 Python 在一个空的临时目录执行 `python -m http.server 18081 --bind 127.0.0.1`，测试后停止它。

```sh
curl --proxy http://127.0.0.1:18080 --noproxy "" --max-time 15 --verbose http://127.0.0.1:18081/
curl --proxy socks5://127.0.0.1:18080 --noproxy "" --max-time 15 --verbose http://127.0.0.1:18081/
```

Windows 使用 `curl.exe`。两次均应先连接 `18080`，再得到同一服务的响应；结合核心日志确认请求进入 `mixed-in`。这些选项见[curl 官方手册](https://curl.se/docs/manpage.html)。临时 HTTP 服务只放空目录，避免通过目录列表暴露个人文件。

## 域名与认证另做一次对照

IP 目标通过后，再换成日常使用的目标域名。curl 的 `socks5://` 在客户端解析目标，`socks5h://` 将域名交给代理；两者结果不同，应检查对应的解析路径。不要用一次本地 IP 请求成功推断远端节点、DNS 或所有应用都正常。

官方说明 `users` 为空时不需要认证。若增加自己的测试用户名和密码，HTTP 与 SOCKS 请求都要带匹配凭据，并分别检查认证结果。共享到局域网需重新规划监听范围与访问限制，本页仅覆盖回环地址。

只需要 HTTP 入口可看[HTTP 入站指南](/articles/sing-box-http-inbound-config/)；配置尚未通过校验可看[Windows 配置检查](/articles/sing-box-windows-config-check/)。两协议通过后再接入真实代理出站，保留测试配置以便定位后续故障。

## 官方来源

- [sing-box：mixed 入站](https://sing-box.sagernet.org/configuration/inbound/mixed/)
- [sing-box：监听字段](https://sing-box.sagernet.org/configuration/shared/listen/)
- [sing-box：direct 出站](https://sing-box.sagernet.org/configuration/outbound/direct/)
- [sing-box：路由](https://sing-box.sagernet.org/configuration/route/)
- [sing-box：配置检查](https://sing-box.sagernet.org/configuration/)
- [sing-box：run 命令](https://github.com/SagerNet/sing-box/blob/testing/cmd/sing-box/cmd_run.go)
- [curl：代理选项](https://curl.se/docs/manpage.html)

来源核验日期：2026-10-14。示例须用本机版本检查后执行。
