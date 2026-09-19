import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {Marked} from 'marked';
import {parseDocument} from 'yaml';
import sanitizeHtml from 'sanitize-html';

export const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const validDate=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value;

export async function loadArticles(directory,categories){
 const articles=[];const seen=new Set();
 for(const entry of (await readdir(directory,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){
  if(!entry.isFile()||!entry.name.endsWith('.md'))continue;
  const fail=message=>{throw new Error(`${entry.name}: ${message}`)};
  const slug=entry.name.slice(0,-3);
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))fail('文件名请使用小写英文、数字和短横线');
  const text=(await readFile(path.join(directory,entry.name),'utf8')).replace(/^\uFEFF/,'').replace(/\r\n/g,'\n');
  const match=text.match(/^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/);
  if(!match)fail('缺少 YAML 文章信息，须用两行 --- 包围');
  const document=parseDocument(match[1],{uniqueKeys:true});
  if(document.errors.length)fail(document.errors.map(e=>e.message).join('; '));
  const data=document.toJS({maxAliasCount:20});
  if(!data||typeof data!=='object'||Array.isArray(data))fail('文章信息必须是字段列表');
  const allowed=new Set(['title','category','label','description','date','updated','author','draft']);
  for(const key of Object.keys(data))if(!allowed.has(key))fail(`不支持的字段 ${key}`);
  for(const key of ['title','category','description','date'])if(typeof data[key]!=='string'||!data[key].trim())fail(`缺少或无效字段 ${key}`);
  if(!categories.includes(data.category))fail(`未知分类 ${data.category}`);
  if(!validDate(data.date))fail('date 必须为有效的 YYYY-MM-DD 日期');
  data.updated??=data.date;
  if(!validDate(data.updated)||data.updated<data.date)fail('updated 必须为不早于 date 的有效日期');
  if(data.draft!==undefined&&typeof data.draft!=='boolean')fail('draft 必须为 true 或 false');
  for(const key of ['author','label'])if(data[key]!==undefined&&(typeof data[key]!=='string'||!data[key].trim()))fail(`${key} 必须为非空文本`);
  if(!match[2].trim())fail('文章正文不能为空');
  if(data.draft)continue;
  if(seen.has(slug))fail('文章网址重复');seen.add(slug);
  const toc=[];
  const parser=new Marked({gfm:true,renderer:{
   heading({tokens,depth}){
    if(depth===1)fail('正文请从二级标题 ## 开始，页面自动生成主标题');
    const html=this.parser.parseInline(tokens);
    const id=`section-${toc.length}`;
    toc.push({id,title:sanitizeHtml(html,{allowedTags:[],allowedAttributes:{}}),depth});
    return `<h${depth} id="${id}">${html}</h${depth}>\n`;
   }
  }});
  const html=sanitizeHtml(parser.parse(match[2]),{
   allowedTags:['p','br','hr','h2','h3','h4','h5','h6','strong','em','del','blockquote','ul','ol','li','pre','code','a','table','thead','tbody','tr','th','td'],
   allowedAttributes:{a:['href','title'],h2:['id'],h3:['id'],h4:['id'],h5:['id'],h6:['id'],ol:['start'],th:['align'],td:['align']},
   allowedSchemes:['https','http','mailto'],allowProtocolRelative:false
  });
  if(!sanitizeHtml(html,{allowedTags:[],allowedAttributes:{}}).trim())fail('正文没有可发布内容');
  articles.push({...data,slug,html,toc,author:data.author||'Clash 大全编辑部',label:data.label||data.category,reading:`${Math.max(1,Math.ceil(match[2].length/400))} 分钟`});
 }
 return articles.sort((a,b)=>b.date.localeCompare(a.date)||b.updated.localeCompare(a.updated)||a.slug.localeCompare(b.slug));
}
