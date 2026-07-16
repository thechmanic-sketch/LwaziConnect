function subClr(s){const i=SUBS.indexOf(s)%SUB_C.length;const c=SUB_C[i<0?0:i].split('|');return{bg:c[0],fg:c[1]};}

function myTeacher(){
 if(CU_PROFILE)return D.teachers.find(t=>t.profile_id===CU_PROFILE.id||t.id===CU_PROFILE.id)||null;
 return D.teachers[0]||null;
}
function myTeacherClasses(){return myTeacher()?.classes||[];}

// Deterministic pseudo-mark, used only where no real per-subject marks
// table exists yet. Same student+subject always yields the same value
// (unlike Math.random(), which regenerated a different "mark" on every
// render — actively misleading for something presented as an academic
// record). This is a placeholder until real marks are wired up.
function hashSeed(str){let h=0;for(let i=0;i<str.length;i++)h=(h*31+str.charCodeAt(i))>>>0;return h;}
function seededMark(seed,base,spread){
 const frac=(hashSeed(seed)%1000)/1000;
 return Math.max(30,Math.min(100,Math.floor(base+(frac*spread-spread/2))));
}

// Looks up a real mark from the marks table (via D.students[].marks, loaded
// by loadSchoolData) for the given student+subject+term; falls back to the
// deterministic placeholder only when no real mark has been entered yet.
function markFor(s,sub,term,spread){
 const rec=(s.marks||[]).find(m=>m.subject===sub&&m.term===term);
 if(rec)return Math.round(Number(rec.mark)/Number(rec.out_of)*100);
 return seededMark(s.id+sub,s.avg,spread);
}

// ══ DARK MODE ══
function applyTheme(theme){
 document.documentElement.setAttribute('data-theme',theme);
 const icon=document.getElementById('themeIcon');
 if(icon)icon.className=theme==='dark'?'ti ti-sun':'ti ti-moon';
 localStorage.setItem('lc-theme',theme);
}
function toggleTheme(){
 const current=document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';
 applyTheme(current==='dark'?'light':'dark');
}
(function initTheme(){
 const saved=localStorage.getItem('lc-theme');
 const prefersDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
 applyTheme(saved||(prefersDark?'dark':'light'));
})();

let CV='dashboard',CMsg=1,selRows=new Set();

// ══ CONFIG ══
const VC={
 dashboard:{t:'Dashboard',a:'Quick Add',i:'ti-plus'},students:{t:'Students',a:'Add Student',i:'ti-user-plus'},admissions:{t:'Admissions',a:'New Application',i:'ti-clipboard-plus'},parents:{t:'Parents',a:'Add Parent',i:'ti-user-plus'},classes:{t:'Classes',a:'Add Class',i:'ti-plus'},teachers:{t:'Teachers',a:'Add Teacher',i:'ti-user-plus'},subjects:{t:'Subjects & Marks',a:'Upload Marks',i:'ti-upload'},timetable:{t:'Timetable',a:'Edit Timetable',i:'ti-edit'},attendance:{t:'Attendance',a:'Mark Attendance',i:'ti-calendar-check'},reportcards:{t:'Report Cards',a:'Generate All',i:'ti-certificate'},fees:{t:'Fees & Finance',a:'New Invoice',i:'ti-receipt'},messages:{t:'Messages',a:'New Message',i:'ti-send'},announcements:{t:'Announcements',a:'New Announcement',i:'ti-speakerphone'},documents:{t:'Documents',a:'Upload Document',i:'ti-upload'},calendar:{t:'School Calendar',a:'Add Event',i:'ti-calendar-plus'},health:{t:'Health Records',a:'Add Record',i:'ti-first-aid-kit'},discipline:{t:'Discipline Log',a:'Log Incident',i:'ti-gavel'},analytics:{t:'Analytics',a:'Export Report',i:'ti-download'},superadmin:{t:'Super Admin Panel',a:'Add School',i:'ti-plus'},licensing:{t:'Licensing & Plans',a:'Upgrade Plan',i:'ti-arrow-up'},settings:{t:'Settings',a:'Save Changes',i:'ti-device-floppy'},
 aiassist:{t:'AI School Assistant',a:'New Query',i:'ti-sparkles'},idcards:{t:'Digital Learner ID Cards',a:'Print Batch',i:'ti-printer'},homework:{t:'Homework & Assignments',a:'Set Homework',i:'ti-plus'},commscentre:{t:'Communication Centre',a:'New Broadcast',i:'ti-broadcast'},hr:{t:'HR & Staff Management',a:'Add Staff Member',i:'ti-user-plus'},transport:{t:'Transport Management',a:'Add Vehicle',i:'ti-plus'},website:{t:'School Website Builder',a:'Publish Changes',i:'ti-world'},sgb:{t:'SGB Governance',a:'Schedule Meeting',i:'ti-calendar-plus'},compliance:{t:'Security & Compliance',a:'Run Backup Now',i:'ti-shield-check'},enterprise:{t:'Enterprise / Multi-Campus',a:'Add Campus',i:'ti-plus'},
};

function V(v){
 CV=v;selRows=new Set();
 document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
 document.querySelector(`[data-v="${v}"]`)?.classList.add('active');
 const c=VC[v]||{t:v,a:'Add',i:'ti-plus'};
 document.getElementById('ptitle').textContent=c.t;
 document.getElementById('topLbl').textContent=c.a;
 document.getElementById('topIco').className=`ti ${c.i}`;
 document.getElementById('topBtn')?.classList.toggle('hidden',CU_ROLE==='parent'||CU_ROLE==='student'||(CU_ROLE==='teacher'&&(v==='timetable'||v==='classes')));
 const area=document.getElementById('CA');area.innerHTML='';
 const fn={dashboard:rDash,students:rStudents,admissions:rAdmissions,parents:rParents,classes:rClasses,teachers:rTeachers,subjects:rSubjects,timetable:rTimetable,attendance:rAttendance,reportcards:rReportCards,fees:rFees,messages:rMessages,announcements:rAnnouncements,documents:rDocuments,calendar:rCalendar,health:rHealth,discipline:rDiscipline,analytics:rAnalytics,superadmin:rSuperAdmin,licensing:rLicensing,settings:rSettings,
 aiassist:rAI,idcards:rIDCards,homework:rHomework,commscentre:rCommsCentre,hr:rHR,transport:rTransport,website:rWebsite,sgb:rSGB,compliance:rCompliance,enterprise:rEnterprise};
 (fn[v]||rDash)(area);
}

function topAction(){
 const A={dashboard:openQuickAdd,students:mAddStu,admissions:mAddAdmission,parents:mAddParent,teachers:mAddTeacher,fees:mAddInv,messages:mNewMsg,announcements:mNewAnn,documents:mUploadDoc,classes:mAddClass,attendance:mMarkAtt,reportcards:mGenReports,calendar:mAddEvent,health:mAddHealth,discipline:mLogInc,analytics:()=>T('Report exported','success'),settings:()=>T('Settings saved','success'),licensing:mUpgrade,superadmin:mAddSchool,timetable:mEditTT,subjects:mUploadMarks,
 aiassist:()=>{document.getElementById('aiInput')?.focus();},idcards:()=>T('Batch of '+D.students.length+' ID cards queued for printing','success'),homework:mSetHomework,commscentre:mNewBroadcast,hr:mAddStaff,transport:mAddVehicle,website:()=>T('Website changes published live','success'),sgb:mSchedMeeting,compliance:()=>T('Manual backup started — complete in ~2 minutes','success'),enterprise:mAddCampus};
 (A[CV]||openQuickAdd)();
}

function switchRole(r,el){
 document.querySelectorAll('.role-btn').forEach(b=>b.classList.remove('active'));el.classList.add('active');
 if(r==='parent'){rParentPortal();return;}
 if(r==='teacher'){T('Switched to Teacher view','info');}
 V(CV);
}

// ══ HELPERS ══
function gc(g){return{A:'pA',B:'pB',C:'pC',D:'pD',F:'pF'}[g]||'pn';}
function sc(s){return{active:'pg','on-leave':'pa','at-risk':'pr',pending:'pa',approved:'pg',rejected:'pr',paid:'pg',partial:'pa',overdue:'pr',trial:'pb',resolved:'pg',open:'pr',pending:'pa'}[s]||'pn';}
function sl(s){return{active:'Active','on-leave':'On Leave','at-risk':'At Risk',pending:'Pending',approved:'Approved',rejected:'Rejected',paid:'Paid',partial:'Partial',overdue:'Overdue',trial:'Trial',resolved:'Resolved',open:'Open'}[s]||s;}
function fmt(n){return'R'+Number(n).toLocaleString();}
function aN(id,target,suf=''){let n=0;const el=document.getElementById(id);if(!el)return;const s=Math.ceil(target/40);const t=setInterval(()=>{n=Math.min(n+s,target);el.textContent=n+suf;if(n>=target)clearInterval(t);},28);}
function bldBar(id,labels,vals,max,color,money=false){const el=document.getElementById(id);if(!el)return;el.innerHTML=labels.map((l,i)=>`<div class="bar-col"><div class="bar-val">${money?'R'+Math.round(vals[i]/1000)+'k':vals[i]+(vals[i]<=100?'%':'')}</div><div class="bar-rect" style="background:${color};height:${Math.round(vals[i]/max*95)}px" onclick="T('${l}: ${money?fmt(vals[i]):vals[i]}','info')"></div><div class="bar-lbl">${l}</div></div>`).join('');}

