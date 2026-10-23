const filters=[...document.querySelectorAll('[data-platform]')];
function apply(platform){if(!filters.some(b=>b.dataset.platform===platform))platform='全部';filters.forEach(b=>{const active=b.dataset.platform===platform;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});let count=0;document.querySelectorAll('[data-systems]').forEach(el=>{el.hidden=platform!=='全部'&&!el.dataset.systems.includes(platform);if(!el.hidden)count++;});const label=document.querySelector('#filter-count');if(label)label.textContent=`${count} 个下载入口`;}
filters.forEach(b=>b.addEventListener('click',()=>{apply(b.dataset.platform);const url=new URL(location.href);if(b.dataset.platform==='全部')url.searchParams.delete('platform');else url.searchParams.set('platform',b.dataset.platform);history.replaceState(null,'',url);}));if(filters.length)apply(new URLSearchParams(location.search).get('platform')||'全部');

if(['localhost','127.0.0.1'].includes(location.hostname)){document.querySelectorAll('[data-preview-port]').forEach(el=>{const a=document.createElement('a');a.href='http://127.0.0.1:'+el.dataset.previewPort+'/';a.textContent='打开本地预览 →';el.append(a);});}

/* 广告弹窗：3 秒后弹出，可关闭 */
(function(){
  if(localStorage.getItem("popup-seen")) return;
  setTimeout(function(){
    var o=document.createElement("div");
    o.className="popup-overlay";
    o.setAttribute("role","dialog");
    o.setAttribute("aria-modal","true");
    o.setAttribute("aria-labelledby","popup-title");
    o.innerHTML='<div class="popup-content"><span class="popup-ad-label">\u5e7f\u544a</span><div class="popup-stack"><a href="https://xn--9kqs58iq4c.com/" target="_blank" rel="sponsored noopener noreferrer" class="popup-link"><p class="popup-title" id="popup-title">Clash \u673a\u573a\u63a8\u8350</p><img src="https://free.picui.cn/free/2026/06/05/6a229370bf0c1.png" alt="Clash \u673a\u573a\u63a8\u8350\u5e7f\u544a" class="popup-image"></a><div class="popup-shop-wrap"><a href="https://xn--9kqs58iq4c.com/" target="_blank" rel="sponsored noopener noreferrer" class="popup-shop-btn">\u52a0\u901f\u5668\u4e0b\u8f7d</a></div></div></div>';
    document.body.appendChild(o);
    localStorage.setItem("popup-seen","1");
    o.addEventListener("click",function(e){
      if(e.target===o){o.remove();}
    });
    var close=document.createElement("button");
    close.textContent="\u00d7";
    close.style.cssText="position:absolute;top:12px;right:14px;border:none;background:none;font-size:28px;cursor:pointer;color:#68757a;line-height:1;padding:0 6px";
    close.setAttribute("aria-label","\u5173\u95ed\u5e7f\u544a");
    close.addEventListener("click",function(e){e.stopPropagation();o.remove();});
    o.querySelector(".popup-content").appendChild(close);
  },3000);
})();

