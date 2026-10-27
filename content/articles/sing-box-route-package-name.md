---
title: "sing-box Android package_name：按应用包名分流怎么验收"
category: "tutorials"
description: "依据 sing-box 官方路由规则文档核对 Android package_name 与 package_name_regex，避免把应用显示名、进程名或客户端状态误当成包名匹配。"
date: "2026-10-26"
updated: "2026-10-26"
author: "FlyClash 中文指南编辑部"
draft: false
---

Android 上只想让某个应用走指定出站时，应先确认它的包名，再检查 sing-box 的 `package_name` 规则。官方路由文档把这个字段定义为匹配 Android package name；`package_name_regex` 另有版本标注。包名是应用的标识符，不是桌面名称、通知标题或安装包文件名，三者混用会让规则看起来正确却始终不命中。

## 从实际应用取得包名

在 Android 应用信息页或系统调试工具中复制目标应用的完整包名，记录大小写和点号。若设备上存在同名应用、工作资料夹或克隆版本，要分别确认它们的包名。不要根据网上示例猜测包名，也不要把 `process_name` 等桌面字段直接套到 Android。

先备份配置，确认客户端已经取得 VPN/TUN 所需权限，并记下当前默认出站。规则只会影响已经进入 sing-box 的流量；应用没有被 VPN 接管时，包名规则本身不会创造一条新的接管路径。

## 逐步验证一条应用规则

1. 只添加一个目标包名和一个已存在的出站标签，暂时不要同时改 DNS、TUN 或订阅内容。
2. 运行配置检查，确认 `package_name` 是数组，包名没有多余空格；若使用正则字段，先核对当前版本对 `package_name_regex` 的支持说明。
3. 完全停止并重新打开目标应用，发起一个可辨认的新请求。旧连接或后台缓存可能绕过本次测试。
4. 查看日志中的应用来源、命中规则和出站标签，再用另一个未列入规则的应用做对照。
5. 若两款应用都走同一出口，检查规则顺序和更早的宽泛规则；若只有目标应用无记录，回到 VPN 授权、TUN 接管和应用是否真的发起新连接检查。

规则命中后仍无法访问，继续检查出站认证、DNS 和远端响应，不要为了“让它通”直接放宽到全部应用。回滚时恢复备份、重新加载配置，再确认目标应用回到原默认路径。

按应用设置的界面操作可参照 [Clash Meta for Android 按应用代理](/articles/clash-meta-android-app-routing/)，接管层排查见 [sing-box TUN auto_route](/articles/sing-box-tun-auto-route-check/)。这些文章讨论的是客户端或 TUN 层，不能替代包名规则的命中证据。

## 官方来源

[sing-box Route Rule 官方文档](https://sing-box.sagernet.org/configuration/route/rule/)

来源核验日期：2026-10-26。官方文档明确说明 `package_name` 匹配 Android 包名，正则字段的版本边界以当前页面为准。
