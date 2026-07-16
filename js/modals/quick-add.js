function openQuickAdd(){
 const ADMIN_ACTIONS=[['ti-user-plus','Add Student','mAddStu()'],['ti-user-check','Add Teacher','mAddTeacher()'],['ti-receipt','New Invoice','mAddInv()'],['ti-calendar-check','Mark Attendance','mMarkAtt()'],['ti-speakerphone','Announcement','mNewAnn()'],['ti-clipboard-plus','New Application','mAddAdmission()'],['ti-upload','Upload Document','mUploadDoc()'],['ti-message-circle','New Message','mNewMsg()']];
 const TEACHER_ACTIONS=[['ti-calendar-check','Mark Attendance','mMarkAtt()'],['ti-notebook','Set Homework','mSetHomework()'],['ti-certificate','Report Card','V(\'reportcards\');CM()'],['ti-message-circle','New Message','mNewMsg()']];
 const PARENT_ACTIONS=[['ti-message-circle','Message School','mNewMsg()']];
 const STUDENT_ACTIONS=[];
 const actions=CU_ROLE==='teacher'?TEACHER_ACTIONS:CU_ROLE==='parent'?PARENT_ACTIONS:CU_ROLE==='student'?STUDENT_ACTIONS:ADMIN_ACTIONS;
 OM('Quick Add',`
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
  ${actions.map(([ic,lbl,fn])=>`
  <div onclick="${fn}" style="background:var(--sp);border:1px solid var(--sb);border-radius:8px;padding:12px;display:flex;align-items:center;gap:9px;cursor:pointer;transition:all .15s" onmouseover="this.style.background='var(--gp)';this.style.borderColor='var(--g)'" onmouseout="this.style.background='var(--sp)';this.style.borderColor='var(--sb)'">
   <i class="ti ${ic}" style="font-size:18px;color:var(--g)"></i>
   <span style="font-size:12px;font-weight:600;color:var(--s)">${lbl}</span>
  </div>`).join('')||'<div class="tsm" style="grid-column:1/-1;padding:8px 0">Nothing to add from here.</div>'}
 </div>`,
 `<button class="btn btn-s" onclick="CM()">Close</button>`,'460px');}
