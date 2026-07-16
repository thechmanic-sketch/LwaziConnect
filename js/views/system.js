function rSuperAdmin(area){
 const mrr=D.schools.reduce((a,s)=>a+s.amount,0);
 const activeCount=D.schools.filter(s=>s.status==='active').length;
 const trialCount=D.schools.filter(s=>s.status==='trial').length;
 area.innerHTML=`
 <div class="g4 mb18">
  <div class="sc" style="border-left:4px solid var(--a)"><div class="sc-icon ig"><i class="ti ti-building-school"></i></div><div class="sc-val">${D.schools.length}</div><div class="sc-lbl">Schools on platform</div></div>
  <div class="sc" style="border-left:4px solid var(--g)"><div class="sc-icon ib"><i class="ti ti-users"></i></div><div class="sc-val">${D.schools.reduce((a,s)=>a+s.students,0).toLocaleString()}</div><div class="sc-lbl">Total students</div></div>
  <div class="sc" style="border-left:4px solid var(--gl)"><div class="sc-icon ia"><i class="ti ti-currency-dollar"></i></div><div class="sc-val">${fmt(mrr)}</div><div class="sc-lbl">Monthly recurring revenue</div><div class="sc-trend tu"><i class="ti ti-trending-up" style="font-size:10px"></i>${fmt(mrr*12)} projected/year</div></div>
  <div class="sc" style="border-left:4px solid var(--p)"><div class="sc-icon ip"><i class="ti ti-crown"></i></div><div class="sc-val">${activeCount}</div><div class="sc-lbl">Active licences · ${trialCount} trial</div></div>
 </div>
 <div class="card mb18"><div class="card-head"><div class="card-title"><i class="ti ti-chart-bar"></i>Monthly Revenue</div><button class="btn btn-s" style="height:26px;font-size:10px" onclick="T('Revenue report exported','success')"><i class="ti ti-download" style="font-size:10px"></i>Export</button></div><div class="bar-chart" id="barRev"></div></div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-building-school"></i>All Schools</div>
   <div class="flex g8"><button class="btn btn-s" onclick="T('Platform update pushed to all schools','success')"><i class="ti ti-speakerphone" style="font-size:11px"></i>Broadcast Update</button><button class="btn btn-g" onclick="mAddSchool()"><i class="ti ti-plus" style="font-size:11px"></i>Add School</button></div>
  </div>
  ${D.schools.map(s=>`<div class="sa-card">
   <div class="av av-m" style="background:var(--gp);color:var(--g)">${s.name.substring(0,2).toUpperCase()}</div>
   <div class="hdot ${s.health>=85?'g':s.health>=60?'a':'r'}"></div>
   <div style="flex:1"><div style="font-weight:600;font-size:13px">${s.name}</div><div class="tsm">${s.contact} · Last login: ${s.lastLogin} · Health: ${s.health}%</div></div>
   <div style="text-align:right;min-width:80px"><div style="font-weight:600">${s.students.toLocaleString()} students</div></div>
   <span class="pill ${s.plan==='Enterprise'?'pp':s.plan==='Professional'?'pb':'pg'}">${s.plan}</span>
   <div style="text-align:right;min-width:76px"><div style="font-family:'Outfit',sans-serif;font-weight:700;color:${s.amount>0?'var(--g)':'var(--sl)'}">${s.amount>0?fmt(s.amount)+'/mo':'Trial'}</div></div>
   <span class="pill ${sc(s.status)}">${sl(s.status)}</span>
   <div class="flex g6"><i class="ti ti-settings act" onclick="event.stopPropagation();T('Managing ${s.name}','')"></i><i class="ti ti-eye act" onclick="event.stopPropagation();T('Viewing dashboard','')"></i><i class="ti ti-brand-whatsapp act" style="color:var(--wd)" onclick="event.stopPropagation();T('WhatsApp to ${s.contact}','wa')"></i></div>
  </div>`).join('')}
 </div>`;
 setTimeout(()=>bldBar('barRev',['Feb','Mar','Apr','May','Jun','Jul'],[1398,1398,1897,2397,2897,2897],3500,'#1B4332',true),60);
}

function rLicensing(area){
 area.innerHTML=`
 <div style="text-align:center;margin-bottom:22px">
  <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:21px;color:var(--s)">LwaziConnect Licensing</div>
  <div class="tsm" style="margin-top:4px">All plans include free setup, onboarding, and data migration from Excel or D6.</div>
  <div style="display:flex;align-items:center;justify-content:center;gap:9px;margin-top:12px">
   <span class="tsm">Monthly</span>
   <label style="position:relative;width:40px;height:22px;cursor:pointer"><input type="checkbox" id="planT" style="opacity:0;position:absolute" onchange="toggleLic(this.checked)"><div id="pt" style="position:absolute;inset:0;background:var(--g);border-radius:11px;transition:background .2s"></div><div id="pb2" style="position:absolute;width:16px;height:16px;background:#fff;border-radius:50%;top:3px;left:3px;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.18)"></div></label>
   <span style="font-size:12px;color:var(--g);font-weight:600">Lifetime <span class="pill pa" style="margin-left:3px">Save 60%</span></span>
  </div>
 </div>
 <div id="mP" class="g3 mb20">
  ${[{n:'Starter',p:'R499',per:'/month',stu:'Up to 300',feats:['Student management','Attendance tracking','Fee management','Parent messaging','Email support']},
    {n:'Professional',p:'R899',per:'/month',stu:'Up to 800',feats:['All Starter features','Report cards','WhatsApp integration','Timetable management','Analytics dashboard','Priority support'],cur:true,badge:'Most Popular'},
    {n:'Enterprise',p:'R1,499',per:'/month',stu:'Unlimited',feats:['All Professional features','Multi-campus','Custom branding','API access','Dedicated manager','24/7 phone support']}
  ].map(p=>`<div class="lic ${p.badge?'pop':''} ${p.cur?'cur':''}" onclick="mUpgrade()">
   ${p.badge?`<div class="lbadge">${p.badge}</div>`:'<div style="height:20px"></div>'}
   <div class="lname">${p.n}</div><div class="lprice">${p.p}</div><div class="lperiod">${p.per} · ${p.stu} students</div>
   <div class="divider"></div>
   ${p.feats.map(f=>`<div class="lfeat"><i class="ti ti-circle-check"></i>${f}</div>`).join('')}
   <button class="${p.cur?'btn btn-s':'btn btn-g'} w100" style="margin-top:12px;justify-content:center" onclick="event.stopPropagation();mUpgrade()">${p.cur?'Current Plan':'Get Started'}</button>
  </div>`).join('')}
 </div>
 <div id="lP" class="g3 mb20 hidden">
  ${[{n:'Starter',p:'R9,500',stu:'Up to 300',feats:['Lifetime licence','1 year free support','Free updates']},
    {n:'Professional',p:'R15,000',stu:'Up to 800',feats:['Lifetime licence','2 years free support','Free updates','Staff training'],badge:'Best Value'},
    {n:'Enterprise',p:'R25,000',stu:'Unlimited',feats:['Lifetime licence','3 years free support','Custom domain','API access','Dedicated training']}
  ].map(p=>`<div class="lic ${p.badge?'pop':''}" onclick="mUpgrade()">
   ${p.badge?`<div class="lbadge">${p.badge}</div>`:'<div style="height:20px"></div>'}
   <div class="lname">${p.n}</div><div class="lprice">${p.p}</div><div class="lperiod">One-time · ${p.stu} students</div>
   <div class="divider"></div>
   ${p.feats.map(f=>`<div class="lfeat"><i class="ti ti-circle-check"></i>${f}</div>`).join('')}
   <button class="btn btn-a w100" style="margin-top:12px;justify-content:center" onclick="event.stopPropagation();mUpgrade()">Buy Lifetime Licence</button>
  </div>`).join('')}
 </div>`;
 document.getElementById('planT').addEventListener('change',function(){document.getElementById('pb2').style.transform=this.checked?'translateX(18px)':'translateX(0)';});
}
function toggleLic(lt){document.getElementById('mP').classList.toggle('hidden',lt);document.getElementById('lP').classList.toggle('hidden',!lt);}

function rSettings(area){
 area.innerHTML=`<div class="g2" style="align-items:start">
  <div>
   <div class="card mb14">
    <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;color:var(--s);margin-bottom:12px;display:flex;align-items:center;gap:6px"><i class="ti ti-building-school" style="color:var(--g)"></i>School Profile</div>
    <div class="fg"><div class="fl">School Name</div><input class="fi" value="Durban Primary School"></div>
    <div class="fr"><div class="fg"><div class="fl">Phone</div><input class="fi" value="031 100 2000"></div><div class="fg"><div class="fl">Email</div><input class="fi" value="admin@durbanprimary.edu.za"></div></div>
    <div class="fg"><div class="fl">Address</div><input class="fi" value="Private Bag X01, Durban, 4001"></div>
    <div class="fr"><div class="fg"><div class="fl">Province</div><select class="fs"><option>KwaZulu-Natal</option><option>Gauteng</option><option>Western Cape</option></select></div><div class="fg"><div class="fl">School Type</div><select class="fs"><option>Primary School</option><option>High School</option><option>Combined</option></select></div></div>
    <button class="btn btn-g" onclick="T('Profile saved','success')"><i class="ti ti-device-floppy" style="font-size:11px"></i>Save Profile</button>
   </div>
   <div class="card mb14">
    <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;color:var(--s);margin-bottom:12px;display:flex;align-items:center;gap:6px"><i class="ti ti-currency-dollar" style="color:var(--g)"></i>Fee Structure</div>
    ${D.classes.map(c=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="width:100px;font-size:11px">${c.name}</span><input class="fi" style="flex:1;height:30px" value="R2,500"></div>`).join('')}
    <button class="btn btn-g" style="margin-top:6px" onclick="T('Fee structure updated','success')"><i class="ti ti-device-floppy" style="font-size:11px"></i>Save Fees</button>
   </div>
   <div class="card">
    <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;color:var(--s);margin-bottom:12px;display:flex;align-items:center;gap:6px"><i class="ti ti-credit-card" style="color:var(--g)"></i>PayFast Integration</div>
    <div style="background:var(--gp);border:1px solid var(--gl);border-radius:7px;padding:9px 12px;margin-bottom:10px;display:flex;align-items:center;gap:7px"><i class="ti ti-circle-check" style="color:var(--g)"></i><div><div style="font-size:12px;font-weight:600;color:var(--g)">PayFast Connected</div><div class="tsm">Merchant ID: 12345678</div></div></div>
    <div class="fg"><div class="fl">Merchant Email</div><input class="fi" value="finance@durbanprimary.edu.za"></div>
    <button class="btn btn-g" onclick="T('PayFast settings saved','success')"><i class="ti ti-device-floppy" style="font-size:11px"></i>Save</button>
   </div>
  </div>
  <div>
   <div class="card mb14">
    <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;color:var(--s);margin-bottom:12px;display:flex;align-items:center;gap:6px"><i class="ti ti-brand-whatsapp" style="color:var(--wd)"></i>WhatsApp & Notifications</div>
    ${[['WhatsApp Business API','Send messages via WhatsApp',true],['Auto-notify absent parents','Send WhatsApp when child is marked absent',true],['Fee payment reminders','Auto-send overdue reminders',true],['Report card WhatsApp delivery','Send reports via WhatsApp',false],['Email notifications','Automated emails for announcements',true],['Weekly school summary','Send principal weekly summary',false]].map(([l,d,on])=>`
    <div class="tog-row"><div><div style="font-size:12px;font-weight:500">${l}</div><div class="tsm">${d}</div></div><label class="tog-sw"><input type="checkbox" ${on?'checked':''} onchange="T('Setting updated','success')"><div class="t-tr"></div><div class="t-th"></div></label></div>`).join('')}
   </div>
   <div class="card">
    <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;color:var(--s);margin-bottom:12px;display:flex;align-items:center;gap:6px"><i class="ti ti-lock" style="color:var(--g)"></i>Security</div>
    ${[['Two-factor authentication','Require OTP on login',false],['Parent portal access','Parents can log in and view child data',true],['Auto-logout after 30 min','Timeout for inactive sessions',true]].map(([l,d,on])=>`
    <div class="tog-row"><div><div style="font-size:12px;font-weight:500">${l}</div><div class="tsm">${d}</div></div><label class="tog-sw"><input type="checkbox" ${on?'checked':''} onchange="T('Setting updated','success')"><div class="t-tr"></div><div class="t-th"></div></label></div>`).join('')}
    <div class="fg" style="margin-top:10px"><div class="fl">New Password</div><input class="fi" type="password" placeholder="Enter new password"></div>
    <button class="btn btn-g" onclick="T('Password updated','success')"><i class="ti ti-device-floppy" style="font-size:11px"></i>Update Password</button>
   </div>
  </div>
 </div>`;
}

