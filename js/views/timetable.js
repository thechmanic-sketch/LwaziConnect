function genClassSchedule(cls){
 let h=0;for(let i=0;i<cls.length;i++)h=(h*31+cls.charCodeAt(i))>>>0;
 const offset=h%5;
 const rot=arr=>arr.slice(offset).concat(arr.slice(0,offset));
 const out={};
 Object.keys(TT_S).forEach(k=>out[k]=rot(TT_S[k]));
 return out;
}

function rTimetable(area,clsName){
 area=area||document.getElementById('CA');
 if(!D.classes.length){
  area.innerHTML=`<div class="card" style="text-align:center;padding:40px 20px"><div class="tsm">No classes yet — add a class first to see a timetable.</div></div>`;
  return;
 }
 const cls=clsName||D.classes[0].name;
 const clsObj=D.classes.find(c=>c.name===cls);
 const realSlots=clsObj?(D.timetableSlots||[]).filter(s=>s.class_id===clsObj._id):[];
 const hasReal=realSlots.length>0;
 const sched=hasReal?null:genClassSchedule(cls);
 const slotFor=(day,period)=>realSlots.find(s=>s.day===day&&s.period===period);
 area.innerHTML=`<div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-calendar-time"></i>${cls} — Weekly Timetable</div>
   <div class="flex g8"><select class="fs" style="width:140px;height:28px;font-size:11px" onchange="rTimetable(null,this.value)">${D.classes.map(c=>`<option ${c.name===cls?'selected':''}>${c.name}</option>`).join('')}</select><button class="btn btn-s" style="height:28px;font-size:10px" onclick="window.print()"><i class="ti ti-printer" style="font-size:10px"></i>Print</button><button class="btn btn-g" style="height:28px;font-size:10px" onclick="mEditTT('${clsObj?clsObj._id:''}')"><i class="ti ti-edit" style="font-size:10px"></i>Edit</button></div>
  </div>
  ${hasReal?'':'<div class="tsm" style="margin-bottom:8px;color:var(--ad)"><i class="ti ti-info-circle" style="margin-right:4px"></i>No timetable has been set for this class yet — showing a placeholder layout. Use Edit to enter the real schedule.</div>'}
  <div class="tt-grid">
   <div></div>${TT_DAYS.map(d=>`<div class="tt-head">${d}</div>`).join('')}
   ${TT_PERIODS.map(p=>{
    if(p.l==='Break')return`<div class="tt-time">${p.t}<br><span style="font-size:7px">${p.l}</span></div><div class="tt-break" style="grid-column:span 5">☕ Break 10:00–11:00</div>`;
    if(hasReal){
     return `<div class="tt-time">${p.t}<br><span style="font-size:7px">${p.l}</span></div>`+TT_DAYS.map(day=>{
      const slot=slotFor(day,p.l);
      if(!slot||!slot.subject)return`<div class="tt-cell" style="background:var(--sp);color:var(--sl)"><div style="font-size:9px">—</div></div>`;
      const c=subClr(slot.subject);
      const tch=D.teachers.find(t=>t.id===slot.teacher_id);
      return `<div class="tt-cell" style="background:${c.bg};color:${c.fg}" onclick="T('${slot.subject} — ${tch?tch.name:'Unassigned'}','')"><div style="font-weight:700;font-size:10px">${slot.subject}</div><div style="font-size:8px;opacity:.6;margin-top:1px">${tch?tch.name.split(' ')[1]||tch.name:'Unassigned'}</div></div>`;
     }).join('');
    }
    const row=sched[p.l];
    if(!row)return`<div class="tt-time">${p.t}<br><span style="font-size:7px">${p.l}</span></div><div class="tt-break" style="grid-column:span 5">☕ Break 10:00–11:00</div>`;
    return`<div class="tt-time">${p.t}<br><span style="font-size:7px">${p.l}</span></div>`+row.map((sub,di)=>{const c=subClr(sub);const tch=D.teachers.length?D.teachers[di%D.teachers.length]:null;const tName=tch?tch.name:'Unassigned';return`<div class="tt-cell" style="background:${c.bg};color:${c.fg}" onclick="T('${sub} — ${tName}','')"><div style="font-weight:700;font-size:10px">${sub}</div><div style="font-size:8px;opacity:.6;margin-top:1px">${tch?tch.name.split(' ')[1]||tch.name:'—'}</div></div>`;}).join('');
   }).join('')}
  </div>
 </div>`;
}
