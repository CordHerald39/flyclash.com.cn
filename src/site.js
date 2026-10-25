const filters=[...document.querySelectorAll('[data-platform]')];
function apply(platform){if(!filters.some(b=>b.dataset.platform===platform))platform='全部';filters.forEach(b=>{const active=b.dataset.platform===platform;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});let count=0;document.querySelectorAll('[data-systems]').forEach(el=>{el.hidden=platform!=='全部'&&!el.dataset.systems.includes(platform);if(!el.hidden)count++;});const label=document.querySelector('#filter-count');if(label)label.textContent=`${count} 个下载入口`;}
filters.forEach(b=>b.addEventListener('click',()=>{apply(b.dataset.platform);const url=new URL(location.href);if(b.dataset.platform==='全部')url.searchParams.delete('platform');else url.searchParams.set('platform',b.dataset.platform);history.replaceState(null,'',url);}));if(filters.length)apply(new URLSearchParams(location.search).get('platform')||'全部');

if(['localhost','127.0.0.1'].includes(location.hostname)){document.querySelectorAll('[data-preview-port]').forEach(el=>{const a=document.createElement('a');a.href='http://127.0.0.1:'+el.dataset.previewPort+'/';a.textContent='打开本地预览 →';el.append(a);});}
/* FlyClash popup standard */
(function(){
  setTimeout(function(){
    var o=document.createElement("div");
    o.className="popup-overlay";
    o.setAttribute("role","dialog");
    o.setAttribute("aria-modal","true");
    o.setAttribute("aria-labelledby","popup-title");
    o.innerHTML='<div class="popup-content"><span class="popup-ad-label">广告</span><div class="popup-stack"><a href="https://189.24.66.76/register?aff=DjVQGjJK" target="_blank" rel="sponsored noopener noreferrer" class="popup-link"><p class="popup-title" id="popup-title">Clash 机场推荐</p><img src="https://free.picui.cn/free/2026/06/05/6a229370bf0c1.png" alt="Clash 机场推荐广告" class="popup-image"></a><div class="popup-shop-wrap"><a href="https://189.24.66.76/register?aff=DjVQGjJK" target="_blank" rel="sponsored noopener noreferrer" class="popup-shop-btn">加速器下载</a></div></div></div>';
    document.body.appendChild(o);
    o.addEventListener("click",function(e){if(e.target===o)o.remove();});
    var close=document.createElement("button");
    close.textContent="×";
    close.style.cssText="position:absolute;top:12px;right:14px;border:none;background:none;font-size:28px;cursor:pointer;color:#68757a;line-height:1;padding:0 6px";
    close.setAttribute("aria-label","关闭广告");
    close.addEventListener("click",function(e){e.stopPropagation();o.remove();});
    o.querySelector(".popup-content").appendChild(close);
  },3000);
})();
(()=>{const footer=document.querySelector('footer');if(!footer||footer.querySelector('.site-cooperation'))return;const p=document.createElement('p');p.className='site-cooperation';p.innerHTML='站长合作：<a href="https://t.me/bewater678" target="_blank" rel="noopener noreferrer">@bewater678</a>';footer.firstElementChild?.append(p)})();
