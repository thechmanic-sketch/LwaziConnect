function mUpgrade(){OM('Upgrade Your Plan',`
 <div style="text-align:center;padding:10px 0 16px">
  <div style="width:44px;height:44px;background:var(--ap);border-radius:11px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;font-size:20px;color:var(--ad)"><i class="ti ti-crown"></i></div>
  <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:17px;color:var(--s);margin-bottom:5px">Upgrade to Enterprise</div>
  <div class="tsm">Unlock unlimited students, multi-campus, and custom branding.</div>
 </div>
 <div style="background:var(--gx);border:1px solid var(--gl);border-radius:9px;padding:14px 18px;margin-bottom:14px"><div style="font-weight:800;font-size:20px;font-family:'Outfit',sans-serif;color:var(--g)">R1,499 <span style="font-size:12px;font-weight:400">/month</span></div><div class="tsm">or R25,000 once-off lifetime licence</div></div>
 <div class="fg"><div class="fl">Contact Name</div><input class="fi" value="N. Khumalo"></div>
 <div class="fg"><div class="fl">Email</div><input class="fi" value="admin@durbanprimary.edu.za" type="email"></div>
 <div class="fg"><div class="fl">Preferred Plan</div><select class="fs"><option>Enterprise — R1,499/month</option><option>Enterprise — R25,000 lifetime</option></select></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Request sent — our team will contact you within 24 hours','success');CM()"><i class="ti ti-send" style="font-size:11px"></i>Request Upgrade</button>`);}

function mAddSchool(){OM('Add New School',`
 <div class="fg"><div class="fl">School Name</div><input class="fi" placeholder="e.g. Westville Primary School"></div>
 <div class="fr"><div class="fg"><div class="fl">Contact Person</div><input class="fi" placeholder="Principal or Admin name"></div><div class="fg"><div class="fl">Phone</div><input class="fi" placeholder="031 xxx xxxx"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Email</div><input class="fi" placeholder="admin@school.edu.za" type="email"></div><div class="fg"><div class="fl">Province</div><select class="fs"><option>KwaZulu-Natal</option><option>Gauteng</option><option>Western Cape</option><option>Eastern Cape</option></select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Plan</div><select class="fs"><option>Starter — R499/mo</option><option>Professional — R899/mo</option><option>Enterprise — R1,499/mo</option></select></div><div class="fg"><div class="fl">Licence Type</div><select class="fs"><option>Monthly Subscription</option><option>Lifetime Licence</option></select></div></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('School account created — welcome email sent','success');CM()"><i class="ti ti-building-school" style="font-size:11px"></i>Create School Account</button>`);}

