import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
export async function validateSite(root,origin){
 const files=[];
 async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())await walk(file);else files.push(file);}}
 await walk(root);
 for(const file of files.filter(f=>f.endsWith('.html'))){
  const html=await readFile(file,'utf8');
  if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)throw Error(`${file}: 页面必须有一个主标题`);
  for(const link of html.matchAll(/(?:href|src)="([^"\s]+)"/g)){
   const href=link[1].replaceAll('&amp;','&');
   if(/^(https?:|mailto:)/i.test(href))continue;
   const base=origin+'/'+path.relative(root,file).split(path.sep).join('/').replace(/index\.html$/,'');
   const url=new URL(href,base);
   if(url.origin!==origin)continue;
   let target=path.resolve(root,'.'+decodeURIComponent(url.pathname));
   if(target!==root&&!target.startsWith(root+path.sep))throw Error('链接越出发布目录');
   try{if((await stat(target)).isDirectory())target=path.join(target,'index.html');await stat(target);}catch{throw Error(`${file}: 站内链接不存在 ${href}`);}
   if(url.hash&&target.endsWith('.html')){const dest=await readFile(target,'utf8');if(!dest.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`))throw Error(`${file}: 锚点不存在 ${href}`);}
  }
 }
 return files.length;
}
