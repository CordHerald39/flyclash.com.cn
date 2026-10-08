---
title: "sing-box Windows 配置检查：启动失败先看 JSON 结构和路径"
category: "tutorials"
label: "Windows 配置"
description: "用最小配置、路径核对和日志定位 sing-box Windows 启动失败，区分文件格式错误与核心运行问题。"
date: "2026-10-08"
updated: "2026-10-08"
author: "FlyClash 中文指南编辑部"
draft: false
---

sing-box Windows 启动失败时，先确认配置文件能被读取和解析，再检查内核运行参数。不要把下载包、图形客户端和配置文件当作一个产品。

## 先确认核心来源

从 [sing-box 官方仓库](https://github.com/SagerNet/sing-box)和 Releases 核对 Windows 资产及配置文档。官方项目的核心程序可能需要单独的启动参数或目录结构，第三方客户端有自己的封装方式。

## 从最小配置开始

复制一份配置到独立目录，只保留一个入站、一个出站和必要的日志字段。先检查 JSON 括号、字段拼写和文件编码，再逐项恢复 DNS、路由与规则集。

## 检查路径和权限

确认启动命令引用的配置路径确实存在，规则集和证书路径使用当前 Windows 可读的位置。路径错误和权限错误应记录原始日志，不要用重新下载核心来掩盖。

## 通过后再接入客户端

核心能以最小配置启动后，再接入图形客户端或系统代理。若仍无流量，比较核心日志、客户端端口和系统代理设置，避免同时替换配置和客户端。

## 来源与边界

本文依据 [sing-box 官方仓库](https://github.com/SagerNet/sing-box)公开文档整理，不复制具体版本命令或未经核验的第三方配置。
