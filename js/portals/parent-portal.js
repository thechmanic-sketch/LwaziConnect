// ══ PARENT PORTAL ══
function rParentPortal(){
 const s=D.students[0];
 document.getElementById('CA').innerHTML=`
 <div style="background:var(--g);margin:-20px -20px 0;padding:14px 18px;display:flex;align-items:center;justify-content:space-between">
  <div class="flex ic g8"><div class="logo-icon" style="width:26px;height:26px;font-size:11px">L</div><div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;color:#fff">LwaziConnect</div></div>
  <div style="font-size:10px;color:rgba(255,255,255,.4)">Parent Portal</div>
  <button onclick="doLogout()" style="background:rgba(255,255,255,.14);color:#fff;border:none;border-radius:5px;padding:4px 9px;font-size:10px;cursor:pointer"><i class="ti ti-logout" style="font-size:10px;margin-right:3px"></i>Log Out</button>
 </div>
 <div style="background:var(--g);padding:14px 18px 0;margin:0 -20px">
  <div style="display:flex;align-items:center;gap:12px;padding-bottom:14px">
   <div class="av av-l" style="background:${s.bg};color:${s.fg}">${s.ini}</div>
   <div><div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:17px;color:#fff">${s.name}</div><div style="font-size:11px;color:rgba(255,255,255,.5)">${s.cls} · ${s.id}</div></div>
  </div>
 </div>
 <div style="background:var(--bg);padding:16px 0">
  <div class="g4 mb18">
   <div class="pp-stat"><div class="pp-stat-val" style="color:var(--g)">${s.avg}%</div><div class="pp-stat-lbl">Term Average</div></div>
   <div class="pp-stat"><div class="pp-stat-val" style="color:${s.att<85?'var(--r)':'var(--g)'}">${s.att}%</div><div class="pp-stat-lbl">Attendance</div></div>
   <div class="pp-stat"><div class="pp-stat-val" style="color:${s.balance>0?'var(--r)':'var(--g)'}">${s.balance>0?fmt(s.balance):'Paid'}</div><div class="pp-stat-lbl">Fee Balance</div></div>
   <div class="pp-stat"><div class="pp-stat-val"><span class="pill ${gc(s.grade)}">${s.grade}</span></div><div class="pp-stat-lbl">Term Grade</div></div>
  </div>
  <div class="g2 mb18">
   <div class="card"><div class="card-head"><div class="card-title"><i class="ti ti-book"></i>Subject Results</div></div>
   ${SUBS.slice(0,6).map(sub=>{const m=Math.max(40,Math.min(100,Math.floor(s.avg+(Math.random()*18-9))));const g=m>=80?'A':m>=70?'B':m>=60?'C':m>=50?'D':'F';return`<div class="flex ic g8" style="margin-bottom:7px"><span style="width:110px;font-size:11px">${sub}</span><div class="pw-bar" style="flex:1"><div class="pb-bar" style="width:${m}%;background:${m<50?'var(--r)':m<60?'var(--a)':'var(--g)'}"></div></div><span style="font-size:11px;font-weight:700;width:30px;text-align:right">${m}%</span><span class="pill ${gc(g)}">${g}</span></div>`;}).join('')}</div>
   <div>
    <div class="card mb14"><div class="card-head"><div class="card-title"><i class="ti ti-calendar-check"></i>Attendance</div></div>
    <div style="text-align:center;padding:10px 0">
     <svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="30" fill="none" stroke="#F3F4F6" stroke-width="10"/><circle cx="40" cy="40" r="30" fill="none" stroke="${s.att>=90?'#1B4332':'#DC2626'}" stroke-width="10" stroke-dasharray="${Math.round(s.att*1.88)} 188" stroke-dashoffset="47" stroke-linecap="round"/><text x="40" y="44" text-anchor="middle" font-family="Outfit" font-weight="800" font-size="15" fill="#1F2937">${s.att}%</text></svg>
     <div class="tsm" style="margin-top:8px">${s.att>=90?'Excellent attendance!':s.att>=80?'Good attendance. Room to improve.':'Below 85% threshold. Please contact us.'}</div>
    </div></div>
    ${s.balance>0?`<div class="card" style="border:1px solid var(--r)"><div class="card-title" style="color:var(--r);margin-bottom:9px"><i class="ti ti-alert-triangle"></i>Outstanding Fees</div><div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:20px;color:var(--r);margin-bottom:9px">${fmt(s.balance)}</div><button class="btn btn-g w100" style="justify-content:center" onclick="T('PayFast payment page opened for ${fmt(s.balance)}','success')"><i class="ti ti-link" style="font-size:11px"></i>Pay Now via PayFast</button></div>`:`<div class="card" style="border:1px solid var(--gl)"><div class="card-title" style="color:var(--g)"><i class="ti ti-circle-check"></i>Fees Up to Date</div><div class="tsm" style="margin-top:5px">All Term 3 fees paid. Thank you!</div></div>`}
   </div>
  </div>
  <div class="card mb18"><div class="card-head"><div class="card-title"><i class="ti ti-speakerphone"></i>School Announcements</div></div>${D.announcements.slice(0,3).map(a=>`<div class="ann-item"><div class="ann-bar" style="background:${a.color}"></div><div><div class="ann-title" style="font-size:12px">${a.title}</div><div class="tsm">${a.date}</div></div></div>`).join('')}</div>
  <div class="card mb18"><div class="card-head"><div class="card-title"><i class="ti ti-files"></i>My Documents</div></div>
  ${D.documents.filter(d=>d.access==='All'||d.access==='Parents').map(d=>`<div class="pp-doc" onclick="T('Downloading ${d.name}','success')"><i class="ti ti-file-type-pdf" style="font-size:18px;color:var(--r)"></i><div style="flex:1"><div style="font-size:12px;font-weight:500">${d.name}</div><div class="tsm">${d.size} · ${d.date}</div></div><i class="ti ti-download act"></i></div>`).join('')}</div>
  <div class="card"><div class="card-head"><div class="card-title"><i class="ti ti-message-circle"></i>Messages</div><button class="btn btn-w" onclick="T('Opening WhatsApp with school','wa')"><i class="ti ti-brand-whatsapp" style="font-size:11px"></i>WhatsApp School</button></div>
  ${D.messages.filter(m=>m.from===s.parent).slice(0,3).map(m=>`<div style="display:flex;align-items:flex-start;gap:9px;padding:9px 0;border-bottom:1px solid var(--sp);cursor:pointer" onclick="V('messages')"><div class="av av-s" style="background:var(--gp);color:var(--g)">DPS</div><div style="flex:1"><div style="font-size:12px;font-weight:600">Durban Primary School</div><div style="font-size:11px;color:var(--sl);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:240px">${m.thread[0].text}</div></div><div class="tsm">${m.time}</div></div>`).join('')||'<div class="tsm" style="padding:9px 0">No messages yet.</div>'}
  </div>
 </div>`;
 document.getElementById('ptitle').textContent='Parent Portal — '+s.name;
}

