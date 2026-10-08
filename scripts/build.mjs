import {relatedBody} from './related.mjs';
import {loadFaq,enhancePage,writeNotFound} from './enrichment.mjs';
import {readFile,writeFile,mkdir,mkdtemp,copyFile,rm,rename} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {loadAirports,loadArticles} from './content.mjs';
import {validateSite} from './validate.mjs';
import {createTemplates} from './site-template.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));process.chdir(root);
const config=JSON.parse(await readFile('site.config.json','utf8'));
if(!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(config.domain))throw Error('Invalid domain');
const origin='https://'+config.domain;
const faq=await loadFaq();
const articles=await loadArticles('content/articles',config.categories.map(c=>c[0]));
for(const a of articles){if(a.label===a.category)a.label=config.categories.find(c=>c[0]===a.category)[1];if(a.author==='Clash 大全编辑部')a.author=config.name+'编辑部';}
const apps=JSON.parse(await readFile('content/software.json','utf8'));
const airports=await loadAirports();
const templates=createTemplates(config,articles,apps,airports);
const output=await mkdtemp(path.join(root,'.build-'));
const pages=[];
async function page(route,title,description,body,extra={}){const folder=path.join(output,route);await mkdir(folder,{recursive:true});await writeFile(path.join(folder,'index.html'),enhancePage(templates.shell(title,description,route,body,extra),{route,config,articles,faq}));pages.push(route);}
try{
 await copyFile('src/style.css',path.join(output,'style.css'));await copyFile('src/site.js',path.join(output,'site.js'));
 await writeFile(path.join(output,'favicon.svg'),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="${config.color}"/><text x="20" y="28" text-anchor="middle" font-size="23" font-family="Arial" font-weight="bold" fill="white">${config.monogram}</text></svg>`);
 await page('/',config.title,config.description,templates.home());
 for(const c of config.categories)await page('/'+c[0]+'/',c[1],c[2],templates.category(c),{'@type':'CollectionPage'});
 for(const a of apps)await page('/software/'+a.slug+'/',a.title+' 下载与安装说明',a.description,templates.software(a));
 for(const a of articles)await page('/articles/'+a.slug+'/',a.title,a.description,templates.article(a),{'@type':'Article',headline:a.title,datePublished:a.date,dateModified:a.updated,author:{'@type':'Organization',name:a.author},mainEntityOfPage:origin+'/articles/'+a.slug+'/'});
 await page('/resources/','相关软件指南','同一维护方按设备与使用场景整理的相关资料。',relatedBody(config));
await page('/about/','关于本站与编辑政策',config.name+'的来源核验、独立站说明与编辑原则。',templates.about());
 await page('/privacy/','隐私说明',config.name+'的数据使用和外部链接说明。',templates.privacy());
 await writeFile(path.join(output,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
 const dates=new Map(articles.map(a=>['/articles/'+a.slug+'/',a.updated]));
 await writeFile(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(route=>`<url><loc>${origin+route}</loc>${dates.has(route)?'<lastmod>'+dates.get(route)+'</lastmod>':''}</url>`).join('')}</urlset>`);
 await writeFile(path.join(output,'CNAME'),config.domain+'\n');await writeFile(path.join(output,'.nojekyll'),'');
 await writeNotFound(output,config);
 await validateSite(output,origin);
 const dist=path.resolve(root,'dist');if(path.dirname(dist)!==path.resolve(root))throw Error('Unsafe output');
 await rm(dist,{recursive:true,force:true});await rename(output,dist);
 console.log(`Built ${config.domain}: ${pages.length} pages, ${articles.length} articles, ${airports.length} airport cards; links and sitemap verified.`);
}catch(error){if(path.dirname(output)===path.resolve(root)&&path.basename(output).startsWith('.build-'))await rm(output,{recursive:true,force:true});throw error;}
