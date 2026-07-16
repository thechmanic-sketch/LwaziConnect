function rAdmissions(area){
 const pendingCount=D.admissions.filter(a=>a.status==='pending').length;
 const approvedCount=D.admissions.filter(a=>a.status==='approved').length;
 area.innerHTML=`
 <div style="background:var(--gp);border:1px solid var(--gl);border-radius:9px;padding:11px 15px;margin-bottom:16px;display:flex;align-items:center;gap:10px">
  <i class="ti ti-link" style="font-size:18px;color:var(--g)"></i>
  <div style="flex:1"><div style="font-weight:700;font-size:12px;color:var(--g)">Public Application Link</div><div class="tsm">Parents can apply from their phone once your admissions link is set up</div></div>
  <button class="btn btn-g" onclick="openPublicForm()"><i class="ti ti-eye" style="font-size:11px"></i>Preview Form</button>
  <button class="btn btn-s" onclick="T('Link copied!','success')"><i class="ti ti-copy" style="font-size:11px"></i>Copy Link</button>
 </div>
 <div class="g3 mb18">
  <div class="sc"><div class="sc-icon ia"><i class="ti ti-clipboard"></i></div><div class="sc-val">${pendingCount}</div><div class="sc-lbl">Pending Applications</div></div>
  <div class="sc"><div class="sc-icon ig"><i class="ti ti-circle-check"></i></div><div class="sc-val">${approvedCount}</div><div class="sc-lbl">Approved this term</div></div>
  <div class="sc"><div class="sc-icon ib"><i class="ti ti-calendar"></i></div><div class="sc-val">${new Date().getFullYear()+1}</div><div class="sc-lbl">Next intake year</div></div>
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-clipboard-list"></i>Applications</div><button class="btn btn-g" onclick="mAddAdmission()"><i class="ti ti-plus" style="font-size:11px"></i>New Application</button></div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>App ID</th><th>Applicant</th><th>Grade</th><th>Parent</th><th>Phone</th><th>Documents</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead><tbody>
  ${D.admissions.map(a=>`<tr>
   <td class="mono">${a.id}</td><td style="font-weight:600">${a.name}</td><td>${a.grade}</td><td>${a.parent}</td><td>${a.phone}</td>
   <td>${a.status==='approved'?'<span class="pill pg"><i class="ti ti-check"></i> Complete</span>':'<span class="pill pa"><i class="ti ti-clock"></i> Awaiting</span>'}</td>
   <td>${a.date}</td><td><span class="pill ${sc(a.status)}">${sl(a.status)}</span></td>
   <td><div class="flex g6"><i class="ti ti-eye act" onclick="T('Viewing ${a.id}','')"></i>
    ${a.status==='pending'?`<button class="btn btn-g" style="height:24px;font-size:10px;padding:0 7px" onclick="appApprove('${a.id}',this)"><i class="ti ti-check" style="font-size:10px"></i>Approve</button><button class="btn btn-r" style="height:24px;font-size:10px;padding:0 7px" onclick="appReject('${a.id}',this)">Reject</button>`:''}
   </div></td>
  </tr>`).join('')}
  </tbody></table></div>
 </div>`;
}
async function appApprove(id,btn){
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 btn.disabled=true;
 try{
  const {error}=await sb.from('admissions').update({status:'approved'}).eq('id',id);
  if(error)throw error;
  T('Application approved','success');
  await loadSchoolData(schoolId);
  V('admissions');
 }catch(err){
  T(err.message||'Failed to approve application','error');
  btn.disabled=false;
 }
}
async function appReject(id,btn){
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 btn.disabled=true;
 try{
  const {error}=await sb.from('admissions').update({status:'rejected'}).eq('id',id);
  if(error)throw error;
  T('Application rejected','error');
  await loadSchoolData(schoolId);
  V('admissions');
 }catch(err){
  T(err.message||'Failed to reject application','error');
  btn.disabled=false;
 }
}
function openPublicForm(){
 OM('Online Application Form Preview',`
  <div style="background:var(--g);border-radius:9px;padding:18px;text-align:center;margin-bottom:14px">
   <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:17px;color:#fff">${schoolName()}</div>
   <div style="font-size:10px;color:rgba(255,255,255,.45);margin-top:2px">Online Admission Application 2026</div>
  </div>
  <div class="tsm" style="text-align:center;margin-bottom:14px;color:var(--ad)">This is what parents see on their phone when they click the application link</div>
  <div class="fr"><div class="fg"><div class="fl">Applicant First Name</div><input class="fi" placeholder="e.g. Lesedi"></div><div class="fg"><div class="fl">Last Name</div><input class="fi" placeholder="e.g. Khumalo"></div></div>
  <div class="fr"><div class="fg"><div class="fl">Date of Birth</div><input class="fi" type="date"></div><div class="fg"><div class="fl">Grade Applying For</div><select class="fs">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div></div>
  <div class="fr"><div class="fg"><div class="fl">Parent / Guardian</div><input class="fi" placeholder="Full name"></div><div class="fg"><div class="fl">Phone</div><input class="fi" placeholder="071 xxx xxxx"></div></div>
  <div style="margin:12px 0 8px;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.4px;color:var(--sl)">Upload Documents</div>
  ${[["Child's Birth Certificate",'Required'],["Parent's ID",'Required'],['Previous School Report','Optional'],['Proof of Address','Required']].map(([doc,req])=>`
  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--sp)">
   <div><div style="font-size:12px;font-weight:500">${doc}</div><div class="tsm" style="color:${req==='Required'?'var(--r)':'var(--sl)'}">${req}</div></div>
   <button class="btn btn-s" style="height:26px;font-size:10px" onclick="T('File uploaded','success')"><i class="ti ti-upload" style="font-size:10px"></i>Upload</button>
  </div>`).join('')}`,
  `<button class="btn btn-s" onclick="CM()">Close Preview</button><button class="btn btn-g" onclick="T('Application submitted — APP-004 created','success');CM()"><i class="ti ti-send" style="font-size:11px"></i>Submit Application</button>`,'540px');
}
