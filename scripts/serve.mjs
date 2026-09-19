import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const projectRoot=fileURLToPath(new URL('../',import.meta.url));
const config=JSON.parse(await readFile(path.join(projectRoot,'site.config.json'),'utf8'));
const port=Number(process.env.PORT||config.previewPort||4173);
const root=path.join(projectRoot,'dist');
http.createServer(async(req,res)=>{try{const p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const f=path.resolve(root,'.'+p+(p.endsWith('/')?'index.html':''));if(!f.startsWith(root+path.sep))throw Error();const b=await readFile(f);res.setHeader('Content-Type',({'html':'text/html; charset=utf-8','css':'text/css','js':'text/javascript','svg':'image/svg+xml','xml':'application/xml','txt':'text/plain'})[f.split('.').pop()]||'application/octet-stream');res.end(b);}catch{res.statusCode=404;res.setHeader('Content-Type','text/html; charset=utf-8');try{res.end(await readFile(path.join(root,'404.html')));}catch{res.end('404 Not Found');}}}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
