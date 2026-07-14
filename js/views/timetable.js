function rTimetable(area){
 area.innerHTML=`<div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-calendar-time"></i>Grade 7A — Weekly Timetable</div>
   <div class="flex g8"><select class="fs" style="width:140px;height:28px;font-size:11px">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select><button class="btn btn-s" style="height:28px;font-size:10px" onclick="T('Printed','success')"><i class="ti ti-printer" style="font-size:10px"></i>Print</button><button class="btn btn-g" style="height:28px;font-size:10px" onclick="mEditTT()"><i class="ti ti-edit" style="font-size:10px"></i>Edit</button></div>
  </div>
  <div class="tt-grid">
   <div></div>${TT_DAYS.map(d=>`<div class="tt-head">${d}</div>`).join('')}
   ${TT_PERIODS.map(p=>{const row=TT_S[p.l];if(!row)return`<div class="tt-time">${p.t}<br><span style="font-size:7px">${p.l}</span></div><div class="tt-break" style="grid-column:span 5">☕ Break 10:00–11:00</div>`;return`<div class="tt-time">${p.t}<br><span style="font-size:7px">${p.l}</span></div>`+row.map((sub,di)=>{const c=subClr(sub);const tch=D.teachers[di%D.teachers.length];return`<div class="tt-cell" style="background:${c.bg};color:${c.fg}" onclick="T('${sub} — ${tch.name}','')"><div style="font-weight:700;font-size:10px">${sub}</div><div style="font-size:8px;opacity:.6;margin-top:1px">${tch.name.split(' ')[1]}</div></div>`;}).join('');}).join('')}
  </div>
 </div>`;
}

