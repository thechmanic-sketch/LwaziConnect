function mEditTT(){OM('Edit Timetable',`
 <div class="fr"><div class="fg"><div class="fl">Class</div><select class="fs">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Day</div><select class="fs">${TT_DAYS.map(d=>`<option>${d}</option>`).join('')}</select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Period</div><select class="fs">${TT_PERIODS.filter(p=>p.l!=='Break').map(p=>`<option>${p.l}</option>`).join('')}</select></div><div class="fg"><div class="fl">Subject</div><select class="fs">${SUBS.map(s=>`<option>${s}</option>`).join('')}</select></div></div>
 <div class="fg"><div class="fl">Teacher</div><select class="fs">${D.teachers.map(t=>`<option>${t.name}</option>`).join('')}</select></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Timetable updated','success');CM()"><i class="ti ti-calendar-check" style="font-size:11px"></i>Save Changes</button>`);}

function mUploadMarks(){
 const availClasses=CU_ROLE==='teacher'?D.classes.filter(c=>myTeacherClasses().includes(c.name)):D.classes;
 OM('Upload Marks',`
 <div class="fr"><div class="fg"><div class="fl">Class</div><select class="fs">${availClasses.map(c=>`<option>${c.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Subject</div><select class="fs">${SUBS.map(s=>`<option>${s}</option>`).join('')}</select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Term</div><select class="fs"><option>Term 3 — 2025</option><option>Term 2</option><option>Term 1</option></select></div><div class="fg"><div class="fl">Assessment Type</div><select class="fs"><option>Exam</option><option>Test</option><option>Assignment</option><option>Project</option></select></div></div>
 <div class="drop-zone" onclick="T('Spreadsheet picker opened','')"><i class="ti ti-file-spreadsheet" style="font-size:28px;color:var(--gl);display:block;margin-bottom:6px"></i><div style="font-weight:600;font-size:12px;color:var(--s)">Upload marks spreadsheet</div><div class="tsm">Download our template · upload completed file</div></div>
 <button class="btn btn-s w100" style="margin-top:8px;justify-content:center" onclick="T('Template downloaded','success')"><i class="ti ti-download" style="font-size:11px"></i>Download Mark Sheet Template</button>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Marks uploaded and saved','success');CM()"><i class="ti ti-upload" style="font-size:11px"></i>Upload Marks</button>`);}

function mImportCSV(){OM('Import Students via CSV',`
 <div class="drop-zone" onclick="T('CSV file picker opened','')"><i class="ti ti-file-spreadsheet" style="font-size:28px;color:var(--gl);display:block;margin-bottom:6px"></i><div style="font-weight:600;font-size:12px;color:var(--s)">Upload students CSV file</div><div class="tsm">Download our template first · max 500 rows per import</div></div>
 <button class="btn btn-s w100" style="margin-top:8px;justify-content:center" onclick="T('Template downloaded','success')"><i class="ti ti-download" style="font-size:11px"></i>Download CSV Template</button>
 <div style="background:var(--ap);border:1px solid var(--a);border-radius:7px;padding:9px 12px;font-size:11px;color:var(--ad);margin-top:10px"><i class="ti ti-info-circle" style="margin-right:4px"></i>Required columns: First Name, Last Name, DOB, Gender, Class, Parent Name, Parent Phone. Existing students will not be duplicated.</div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('48 students imported successfully','success');CM()"><i class="ti ti-upload" style="font-size:11px"></i>Import Students</button>`);}

