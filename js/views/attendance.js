function rAttendance(area){
 area.innerHTML=`
 <div class="g4 mb18">
  <div class="sc"><div class="sc-icon ig"><i class="ti ti-users"></i></div><div class="sc-val">576</div><div class="sc-lbl">Present today</div></div>
  <div class="sc"><div class="sc-icon ir"><i class="ti ti-user-x"></i></div><div class="sc-val">48</div><div class="sc-lbl">Absent today</div><div class="sc-trend" style="color:var(--wd)"><i class="ti ti-brand-whatsapp" style="font-size:10px"></i>12 parents auto-notified</div></div>
  <div class="sc"><div class="sc-icon ia"><i class="ti ti-clock"></i></div><div class="sc-val">14</div><div class="sc-lbl">Late arrivals</div></div>
  <div class="sc"><div class="sc-icon ib"><i class="ti ti-chart-bar"></i></div><div class="sc-val">91%</div><div class="sc-lbl">Term avg</div><div class="sc-trend tw"><i class="ti ti-target" style="font-size:10px"></i>Target: 95%</div></div>
 </div>
 <div class="g2 mb18">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-calendar-check"></i>Mark — Grade 7A</div>
    <div class="flex g8"><select class="fs" style="width:130px;height:26px;font-size:11px">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select><button class="btn btn-g" style="height:26px;font-size:10px" onclick="T('Attendance saved. 2 parents notified via WhatsApp','wa')"><i class="ti ti-check" style="font-size:10px"></i>Save</button></div>
   </div>
   <div style="max-height:290px;overflow-y:auto">
   ${D.students.filter(s=>s.cls==='Grade 7A').map(s=>`
    <div class="flex ic g8" style="padding:6px 0;border-bottom:1px solid var(--sp)">
     <div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div>
     <span style="flex:1;font-size:12px;font-weight:500">${s.name}</span>
     ${[['P','Present'],['A','Absent'],['L','Late'],['E','Excused'],['S','Sick']].map(([o,lbl])=>`<label title="${lbl}" style="cursor:pointer"><input type="radio" name="a_${s.id}" value="${o}" ${o==='P'?'checked':''} style="display:none"><div class="att-cell att-${o}">${o}</div></label>`).join('')}
     <select style="border:1px solid var(--sb);border-radius:5px;font-size:9px;height:22px;color:var(--sl);padding:0 3px"><option>—</option><option>Sick</option><option>Family</option><option>Unexplained</option></select>
    </div>`).join('')}
   </div>
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-calendar-stats"></i>July 2025 — Amahle Dlamini</div></div>
   <div class="cal-grid mb14" style="margin-bottom:8px">${['M','T','W','T','F','S','S'].map(d=>`<div class="cal-head">${d}</div>`).join('')}
   ${Array.from({length:31},(_,i)=>{const day=i+1;const ss=['P','P','P','P','P',null,null,'P','P','P','A','P','P',null,null,'P','L','P'];const s=ss[i]||null;return s?`<div class="att-cell att-${s}" style="width:100%;border-radius:4px" onclick="T('July ${day}: ${s==='P'?'Present':s==='A'?'Absent':'Late'}','')"><span style="font-size:8px">${day}</span></div>`:`<div style="min-height:22px;border-radius:4px;background:${day>17?'var(--sp)':'#fff'};display:flex;align-items:center;justify-content:center;font-size:8px;color:var(--sx)">${day}</div>`;}).join('')}
   </div>
   <div style="background:var(--rp);border:1px solid var(--r);border-radius:7px;padding:8px 11px;font-size:11px;color:var(--rm)">
    <i class="ti ti-alert-triangle" style="margin-right:4px"></i><strong>Kabelo Mokoena</strong> at 72% — below threshold. <strong>WhatsApp auto-alert sent to parent.</strong>
   </div>
  </div>
 </div>`;
}

