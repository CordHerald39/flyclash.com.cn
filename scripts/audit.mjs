import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
const config=JSON.parse(await readFile('site.config.json','utf8'));
const base='http://127.0.0.1:'+(process.env.PORT||config.previewPort||4173);
const require=createRequire(import.meta.url);
const lhRequire=createRequire(require.resolve('lighthouse'));
const {launch}=await import(pathToFileURL(lhRequire.resolve('chrome-launcher')).href);
await mkdir('reports/chrome-profile',{recursive:true});
const chrome=await launch({chromeFlags:['--headless'],userDataDir:path.resolve('reports/chrome-profile')});
try {
 for(const [name,route,desktop] of [['home-mobile','/',false],['home-desktop','/',true],['downloads-mobile','/downloads/',false],['article-mobile','/articles/choose-client/',false]]){
  const result=await lighthouse(base+route,{port:chrome.port,output:['json','html'],onlyCategories:['performance','accessibility','best-practices','seo'],},desktop?desktopConfig:undefined);
  await writeFile('reports/'+name+'.report.json',result.report[0]);await writeFile('reports/'+name+'.report.html',result.report[1]);
  console.log(name,JSON.stringify(Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,v.score*100]))));
  console.log(JSON.stringify(Object.values(result.lhr.audits).filter(a=>a.score===0&&a.details?.items?.some(i=>i.node)).map(a=>({id:a.id,items:a.details.items}))));
 }
}finally{await chrome.kill();}
