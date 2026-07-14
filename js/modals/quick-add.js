function openQuickAdd(){OM('Quick Add',`
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
  ${[['ti-user-plus','Add Student','mAddStu()'],['ti-user-check','Add Teacher','mAddTeacher()'],['ti-receipt','New Invoice','mAddInv()'],['ti-calendar-check','Mark Attendance','mMarkAtt()'],['ti-speakerphone','Announcement','mNewAnn()'],['ti-clipboard-plus','New Application','mAddAdmission()'],['ti-upload','Upload Document','mUploadDoc()'],['ti-message-circle','New Message','mNewMsg()']].map(([ic,lbl,fn])=>`
  <div onclick="${fn}" style="background:var(--sp);border:1px solid var(--sb);border-radius:8px;padding:12px;display:flex;align-items:center;gap:9px;cursor:pointer;transition:all .15s" onmouseover="this.style.background='var(--gp)';this.style.borderColor='var(--g)'" onmouseout="this.style.background='var(--sp)';this.style.borderColor='var(--sb)'">
   <i class="ti ${ic}" style="font-size:18px;color:var(--g)"></i>
   <span style="font-size:12px;font-weight:600;color:var(--s)">${lbl}</span>
  </div>`).join('')}
 </div>`,
 `<button class="btn btn-s" onclick="CM()">Close</button>`,'460px');}
