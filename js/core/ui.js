// ══ BULK SELECT ══
function togAll(src,tbl){document.querySelectorAll(`#${tbl} .rc`).forEach(cb=>{cb.checked=src.checked;src.checked?selRows.add(cb.dataset.id):selRows.delete(cb.dataset.id);cb.closest('tr').classList.toggle('sel',src.checked);});updBulk();}
function togRow(cb,id){cb.checked?selRows.add(id):selRows.delete(id);cb.closest('tr').classList.toggle('sel',cb.checked);updBulk();}
function updBulk(){const b=document.getElementById('bulkBar');if(!b)return;const n=selRows.size;if(n>0){b.classList.remove('hidden');b.querySelector('.bc').textContent=`${n} item${n>1?'s':''} selected`;}else b.classList.add('hidden');}

// ══ TOAST ══
function T(msg,type='info'){const tc=document.getElementById('TC');const t=document.createElement('div');t.className=`toast ${type}`;const ic={success:'ti-check',error:'ti-x',warning:'ti-alert-triangle',wa:'ti-brand-whatsapp',info:'ti-info-circle'};t.innerHTML=`<i class="ti ${ic[type]||'ti-info-circle'}" style="font-size:14px;flex-shrink:0"></i>${msg}`;tc.appendChild(t);setTimeout(()=>{t.style.animation='tout .3s ease forwards';setTimeout(()=>t.remove(),300);},3200);}

// ══ MODAL ══
function OM(title,body,foot,w='560px'){document.getElementById('MT').textContent=title;document.getElementById('MB2').innerHTML=body;document.getElementById('MF').innerHTML=foot||`<button class="btn btn-s" onclick="CM()">Cancel</button>`;document.getElementById('MX').style.maxWidth=w;document.getElementById('MB').classList.remove('hidden');}
function CM(){document.getElementById('MB').classList.add('hidden');}

// ══ WHATSAPP CENTRE ══
function openWA(){OM('WhatsApp Business Centre',`
 <div style="background:var(--wp);border:1px solid var(--w);border-radius:9px;padding:12px 14px;margin-bottom:14px;display:flex;align-items:center;gap:10px">
  <i class="ti ti-brand-whatsapp" style="font-size:26px;color:var(--wd)"></i>
  <div><div style="font-weight:700;color:var(--wd)">Connected — WhatsApp Business API</div><div class="tsm">+27 31 100 2000 · Durban Primary School</div></div>
  <span class="pill pg" style="margin-left:auto">Live</span>
 </div>
 <div class="g3" style="margin-bottom:14px">
  <div class="sc" style="cursor:default"><div class="sc-val" style="color:var(--wd)">2,847</div><div class="sc-lbl">Messages this month</div></div>
  <div class="sc" style="cursor:default"><div class="sc-val">94%</div><div class="sc-lbl">Delivery rate</div></div>
  <div class="sc" style="cursor:default"><div class="sc-val" style="color:var(--b)">78%</div><div class="sc-lbl">Read rate</div></div>
 </div>
 <div style="font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.4px;color:var(--sl);margin-bottom:9px">Quick Broadcasts</div>
 ${[['Fee reminder to defaulters','48 parents','ti-receipt'],['Report card ready','312 parents','ti-certificate'],['Exam timetable','All parents','ti-calendar'],['Sports day RSVP','312 parents','ti-trophy']].map(([t,r,ic])=>`
 <div style="display:flex;align-items:center;gap:9px;background:var(--sp);border-radius:7px;padding:9px 12px;cursor:pointer;margin-bottom:7px;transition:background .15s" onmouseover="this.style.background='var(--wp)'" onmouseout="this.style.background='var(--sp)'" onclick="T('WhatsApp broadcast sent to ${r}','wa')">
  <i class="ti ${ic}" style="font-size:17px;color:var(--wd)"></i>
  <div style="flex:1"><div style="font-weight:600;font-size:12px">${t}</div><div class="tsm">${r}</div></div>
  <button class="btn btn-w" style="height:26px;font-size:10px"><i class="ti ti-send" style="font-size:11px"></i>Send</button>
 </div>`).join('')}`,
 `<button class="btn btn-s" onclick="CM()">Close</button><button class="btn btn-w" onclick="T('WhatsApp settings opened','wa');CM()"><i class="ti ti-settings" style="font-size:12px"></i>API Settings</button>`,'500px');}

