function rSubjects(area,clsName){
 const isTeacher=CU_ROLE==='teacher';
 const availClasses=isTeacher?D.classes.filter(c=>myTeacherClasses().includes(c.name)):D.classes;
 const cls=clsName||(availClasses[0]&&availClasses[0].name)||'Grade 7A';
 area.innerHTML=`
 <div class="tab-bar"><div class="tab active" onclick="xT(this,'sm1')">Mark Sheet</div><div class="tab" onclick="xT(this,'sm2')">Subjects</div><div class="tab" onclick="xT(this,'sm3')">Exams</div></div>
 <div id="sm1"><div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-table"></i>${cls} — Term 3 Marks</div>
   <div class="flex g8"><select class="fs" style="width:140px;height:28px;font-size:11px" onchange="rSubjects(null,this.value)">${availClasses.map(c=>`<option ${c.name===cls?'selected':''}>${c.name}</option>`).join('')}</select><select class="fs" style="width:100px;height:28px;font-size:11px"><option>Term 3</option><option>Term 2</option><option>Term 1</option></select><button class="btn btn-g" style="height:28px;font-size:10px" onclick="mUploadMarks()"><i class="ti ti-upload" style="font-size:10px"></i>Upload</button></div>
  </div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Student</th>${SUBS.map(s=>`<th>${s.split(' ')[0].substring(0,4)}</th>`).join('')}<th>Avg</th><th>Grade</th></tr></thead><tbody>
  ${D.students.filter(s=>s.cls===cls).map(s=>{const ms=SUBS.map(sub=>seededMark(s.id+sub,s.avg,22));const avg=Math.round(ms.reduce((a,b)=>a+b,0)/ms.length);const g=avg>=80?'A':avg>=70?'B':avg>=60?'C':avg>=50?'D':'F';return`<tr><td><div class="flex ic g6"><div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div>${s.name}</div></td>${ms.map(m=>`<td style="font-weight:500;color:${m<50?'var(--r)':m<60?'var(--ad)':'var(--sm)'}">${m}</td>`).join('')}<td style="font-weight:700">${avg}%</td><td><span class="pill ${gc(g)}">${g}</span></td></tr>`;}).join('')}
  </tbody></table></div>
 </div></div>
 <div id="sm2" class="hidden"><div class="g3">${SUBS.map((sub,i)=>{const c=SUB_C[i%SUB_C.length].split('|');return`<div class="card" style="cursor:pointer" onclick="T('Viewing ${sub} curriculum','')"><div style="width:36px;height:36px;border-radius:8px;background:${c[0]};display:flex;align-items:center;justify-content:center;margin-bottom:9px"><i class="ti ti-book" style="font-size:17px;color:${c[1]}"></i></div><div style="font-weight:600;font-size:13px;margin-bottom:3px">${sub}</div><div class="tsm">All grades</div><span class="pill pg" style="margin-top:7px">Active</span></div>`;}).join('')}</div></div>
 <div id="sm3" class="hidden"><div class="card"><div class="card-head"><div class="card-title"><i class="ti ti-file-check"></i>Examinations</div><button class="btn btn-g" onclick="T('Creating exam','')"><i class="ti ti-plus" style="font-size:11px"></i>Create</button></div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Exam</th><th>Subject</th><th>Grade</th><th>Date</th><th>Duration</th><th>Marks</th><th>Status</th></tr></thead><tbody>
  ${SUBS.slice(0,5).map((s,i)=>`<tr><td style="font-weight:600">Term 3 — ${s}</td><td>${s}</td><td>Grade 7</td><td>${['11 Aug','12 Aug','13 Aug','14 Aug','18 Aug'][i]} 2025</td><td>2 hours</td><td>100</td><td><span class="pill pa">Upcoming</span></td></tr>`).join('')}
  </tbody></table></div></div></div>`;
}
function xT(el,id){el.closest('.tab-bar').querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');['sm1','sm2','sm3'].forEach(x=>{const e=document.getElementById(x);if(e)e.classList.toggle('hidden',x!==id);});}

