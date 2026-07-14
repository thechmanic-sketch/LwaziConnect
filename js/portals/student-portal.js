function rStudentPortal() {
 const area = document.getElementById('CA');
 const s = D.students[0]; // Amahle — the demo student
 area.innerHTML = `
 <div style="background:linear-gradient(135deg,var(--g),var(--gm));border-radius:12px;padding:18px 20px;margin-bottom:18px;display:flex;align-items:center;gap:14px">
  <div style="width:50px;height:50px;background:var(--a);border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;font-weight:800;font-size:20px;color:var(--g);">${s.ini}</div>
  <div>
   <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:18px;color:#fff">${s.name}</div>
   <div style="font-size:12px;color:rgba(255,255,255,.65);margin-top:2px">${s.cls} · Student ID: ${s.id}</div>
   <div style="display:flex;gap:7px;margin-top:8px">
    <span class="pill" style="background:rgba(255,255,255,.15);color:#fff;font-size:10px"><i class="ti ti-chart-bar" style="font-size:10px"></i>${s.avg}% avg</span>
    <span class="pill" style="background:rgba(255,255,255,.15);color:#fff;font-size:10px"><i class="ti ti-calendar-check" style="font-size:10px"></i>${s.att}% attendance</span>
   </div>
  </div>
 </div>
 <div class="g4" style="margin-bottom:18px">
  <div class="sc" onclick="V('subjects')"><div class="sc-icon ig"><i class="ti ti-book"></i></div><div class="sc-val">${s.avg}%</div><div class="sc-lbl">My Average</div><div style="font-size:10px;margin-top:5px;color:var(--gl);display:flex;align-items:center;gap:3px"><i class="ti ti-trending-up" style="font-size:10px"></i>Grade ${s.grade}</div></div>
  <div class="sc" onclick="V('attendance')"><div class="sc-icon ia"><i class="ti ti-calendar-check"></i></div><div class="sc-val">${s.att}%</div><div class="sc-lbl">Attendance</div></div>
  <div class="sc" onclick="V('homework')"><div class="sc-icon ib"><i class="ti ti-notebook"></i></div><div class="sc-val">3</div><div class="sc-lbl">Tasks due</div></div>
  <div class="sc" onclick="V('announcements')"><div class="sc-icon ip"><i class="ti ti-speakerphone"></i></div><div class="sc-val">2</div><div class="sc-lbl">New notices</div></div>
 </div>
 <div class="g2">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-book"></i>My Marks — Term 3</div></div>
   ${['Mathematics','English','IsiZulu','Natural Sciences','Social Sciences'].map(sub=>{const m=Math.max(40,Math.min(100,Math.floor(s.avg+(Math.random()*18-9))));const g=m>=80?'A':m>=70?'B':m>=60?'C':m>=50?'D':'F';return`<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="width:120px;font-size:11px;color:var(--sm)">${sub}</span><div style="flex:1;height:6px;background:var(--sp);border-radius:3px;overflow:hidden"><div style="height:100%;width:${m}%;background:${m<50?'var(--r)':m<70?'var(--a)':'var(--g)'};border-radius:3px"></div></div><span style="font-size:11px;font-weight:700;width:32px;text-align:right">${m}%</span><span class="pill ${gc(g)}">${g}</span></div>`;}).join('')}
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-calendar-time"></i>Today's Timetable</div></div>
   ${[['07:30','Mathematics','Mr. T. Zulu','Room 12'],['08:30','English','Mrs. R. Sithole','Room 11'],['10:00','☕ Break','—','—'],['11:00','Natural Sciences','Mrs. P. Ndlovu','Room 9'],['12:00','IsiZulu','Ms. B. Gumede','Room 8'],['13:00','Social Sciences','Mr. S. Mthethwa','Room 10']].map(([t,s,te,r])=>s.includes('Break')?`<div style="background:var(--ap);border-radius:6px;padding:6px 10px;font-size:11px;color:var(--ad);margin-bottom:5px;text-align:center;">${t} — ${s}</div>`:`<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--sp)"><span style="font-size:10px;color:var(--sl);width:38px">${t}</span><div style="flex:1"><div style="font-size:12px;font-weight:600">${s}</div><div style="font-size:10px;color:var(--sl)">${te} · ${r}</div></div></div>`).join('')}
  </div>
 </div>`;
}

