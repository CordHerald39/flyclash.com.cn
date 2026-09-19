import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {escapeHtml as e} from './content.mjs';

export async function loadFaq(){
 const data=JSON.parse(await readFile('content/faq.json','utf8'));
 if(!Array.isArray(data)||data.some(x=>typeof x.question!=='string'||!x.question.trim()||typeof x.answer!=='string'||!x.answer.trim()))throw Error('content/faq.json: 问答内容不完整');
 return data;
}

export function enhancePage(html,{route,config,articles,faq}){
 // related-footer: keep discovery in a contextual page, not a domain-wide link list.
 html=html.replace('href="/privacy/">隐私说明</a>','href="/privacy/">隐私说明</a><a href="/resources/">相关指南</a>');
 let addition='';
 if(route==='/'){
  const order=config.featuredGuides||[];
  const eligible=articles.filter(a=>['tutorials','downloads'].includes(a.category));
  const guides=[...order.map(slug=>eligible.find(a=>a.slug===slug)).filter(Boolean),...eligible.filter(a=>!order.includes(a.slug))].slice(0,6);
  addition=`<section class="wrap section knowledge-section"><div class="section-heading"><div><span class="eyebrow">READ & SOLVE</span><h2>带着具体问题，找到下一步</h2><p>下载、配置与故障排查，按你遇到的问题继续阅读。</p></div></div><div class="knowledge-grid">${guides.map(a=>`<a href="/articles/${a.slug}/"><span>${e(a.label)}</span><h3>${e(a.title)}</h3><p>${e(a.description)}</p></a>`).join('')}</div></section><section class="wrap section faq-section" id="faq"><div class="section-heading"><div><span class="eyebrow">QUESTIONS, ANSWERED</span><h2>常见问题</h2></div></div><div class="faq-list">${faq.map(x=>`<details><summary>${e(x.question)}</summary><p>${e(x.answer)}</p></details>`).join('')}</div></section>`;
 }
 const current=articles.find(a=>route==='/articles/'+a.slug+'/');
 if(current){
  const category=config.categories.find(c=>c[0]===current.category);
  const related=articles.filter(a=>a.slug!==current.slug&&a.category===current.category).slice(0,3);
  const crumbs=[{name:'首页',item:'https://'+config.domain+'/'},{name:category[1],item:'https://'+config.domain+'/'+category[0]+'/'},{name:current.title,item:'https://'+config.domain+route}];
  const schema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map((x,i)=>({'@type':'ListItem',position:i+1,...x}))};
  html=html.replace('</head>',`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script></head>`);
  html=html.replace('<main id="main">',`<main id="main"><nav class="wrap article-path" aria-label="文章路径"><a href="/">首页</a><span aria-hidden="true">/</span><a href="/${category[0]}/">${e(category[1])}</a><span aria-hidden="true">/</span><span>正文</span></nav>`);
  addition=`<section class="wrap section related-section"><h2>继续阅读</h2>${related.length?`<div class="knowledge-grid">${related.map(a=>`<a href="/articles/${a.slug}/"><h3>${e(a.title)}</h3><p>${e(a.description)}</p></a>`).join('')}</div>`:''}<a class="back-category" href="/${category[0]}/">返回${e(category[1])} →</a></section>`;
 }
 return html.replace('</main>',addition+'</main>');
}

export async function writeNotFound(output,config){
 await writeFile(path.join(output,'404.html'),`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>页面未找到 | ${e(config.name)}</title><meta name="description" content="该页面可能已移动或删除，请返回首页或教程分类继续浏览。"><meta name="robots" content="noindex"><link rel="canonical" href="https://${config.domain}/404.html"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/style.css"></head><body><main class="wrap section not-found"><span class="eyebrow">404 / PAGE NOT FOUND</span><h1>这条链接没有找到页面。</h1><p>文章可能已更名或删除。你可以从以下入口继续查找。</p><div class="hero-actions"><a class="button" href="/">返回首页</a><a class="button secondary" href="/tutorials/">浏览使用教程</a><a class="button secondary" href="/downloads/">查找软件下载</a></div></main></body></html>`);
}
