function rFees(area){
 area.innerHTML=`
 <div class="g3 mb18">
  <div class="sc"><div class="sc-icon ig"><i class="ti ti-circle-check"></i></div><div class="sc-val">R112,500</div><div class="sc-lbl">Collected — Term 3</div><div class="sc-trend tu"><i class="ti ti-trending-up" style="font-size:10px"></i>75% collection rate</div></div>
  <div class="sc"><div class="sc-icon ia"><i class="ti ti-clock"></i></div><div class="sc-val">R26,500</div><div class="sc-lbl">Partially paid</div><div class="sc-trend tw"><i class="ti ti-users" style="font-size:10px"></i>12 students</div></div>
  <div class="sc"><div class="sc-icon ir"><i class="ti ti-alert-triangle"></i></div><div class="sc-val">R37,000</div><div class="sc-lbl">Outstanding</div>
   <div style="margin-top:6px"><button class="btn btn-w" style="height:22px;font-size:10px;width:100%;justify-content:center" onclick="T('WhatsApp reminders sent to 8 parents','wa')"><i class="ti ti-brand-whatsapp" style="font-size:10px"></i>Remind All</button></div>
  </div>
 </div>
 <div class="card mb18">
  <div class="card-head"><div class="card-title"><i class="ti ti-chart-bar"></i>Payment Methods</div></div>
  <div class="g3">${[['EFT','R68,500','5 payments','var(--b)'],['PayFast','R31,000','3 payments','var(--g)'],['Cash','R13,000','2 payments','var(--ad)']].map(([m,a,c,col])=>`<div class="sc" style="cursor:default"><div class="sc-icon" style="background:${col}22;color:${col}"><i class="ti ti-credit-card"></i></div><div class="sc-val" style="color:${col}">${a}</div><div class="sc-lbl">${m} · ${c}</div></div>`).join('')}</div>
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-receipt-2"></i>Invoice Records</div>
   <div class="flex g8">
    <div class="chip active" onclick="filtInv('all',this)">All</div>
    <div class="chip" onclick="filtInv('paid',this)">Paid</div>
    <div class="chip" onclick="filtInv('partial',this)">Partial</div>
    <div class="chip" onclick="filtInv('overdue',this)">Overdue</div>
    <div style="margin-left:auto;display:flex;gap:7px">
     <button class="btn btn-w" onclick="T('WhatsApp reminders sent to all defaulters','wa')"><i class="ti ti-brand-whatsapp" style="font-size:11px"></i>Remind All</button>
     <button class="btn btn-g" onclick="mAddInv()"><i class="ti ti-plus" style="font-size:11px"></i>New Invoice</button>
    </div>
   </div>
  </div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th class="cc"><input type="checkbox" class="rc" onchange="togAll(this,'invT')"></th><th>Invoice</th><th>Student</th><th>Amount</th><th>Paid</th><th>Balance</th><th>Method</th><th>Status</th><th>Actions</th></tr></thead><tbody id="invB"></tbody></table></div>
 </div>`;
 rstInv(D.invoices);
}
function rstInv(list){
 const tb=document.getElementById('invB');if(!tb)return;
 tb.innerHTML=list.map(inv=>{const bal=inv.amount-inv.paid;return`<tr>
  <td><input type="checkbox" class="rc" data-id="${inv.id}" onchange="togRow(this,'${inv.id}')"></td>
  <td class="mono">${inv.id}</td><td style="font-weight:600">${inv.student}</td>
  <td style="font-weight:600">${fmt(inv.amount)}</td><td style="color:var(--g);font-weight:600">${fmt(inv.paid)}</td>
  <td style="color:${bal>0?'var(--r)':'var(--sl)'};font-weight:${bal>0?600:400}">${bal>0?fmt(bal):'—'}</td>
  <td><span class="pill pn">${inv.method}</span></td>
  <td><span class="pill ${sc(inv.status)}">${sl(inv.status)}</span></td>
  <td><div class="flex g6"><i class="ti ti-eye act" onclick="openInv('${inv.id}')"></i>${bal>0?`<div class="pay-btn" onclick="T('PayFast link sent for ${fmt(bal)}','success')"><i class="ti ti-link"></i>PayFast</div><i class="ti ti-brand-whatsapp act" style="color:var(--wd)" onclick="T('WhatsApp reminder sent','wa')"></i>`:''}<i class="ti ti-download act" onclick="T('Downloaded','success')"></i></div></td>
 </tr>`;}).join('');
}
function filtInv(status,el){el.closest('.card-head').querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));el.classList.add('active');rstInv(status==='all'?D.invoices:D.invoices.filter(i=>i.status===status));}
function openInv(id){
 const inv=D.invoices.find(i=>i.id===id);if(!inv)return;const bal=inv.amount-inv.paid;
 OM(`Invoice ${inv.id}`,`
  <div style="background:var(--g);border-radius:8px;padding:12px 16px;margin-bottom:14px"><div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:14px;color:#fff">Durban Primary School</div><div style="font-size:9px;color:rgba(255,255,255,.4);margin-top:1px">Tax Invoice · ${inv.id} · ${inv.date}</div></div>
  <div class="fr3 mb14"><div><div class="tsm fw6">Student</div><div style="font-size:13px;margin-top:2px">${inv.student}</div></div><div><div class="tsm fw6">Class</div><div style="font-size:13px;margin-top:2px">${inv.cls}</div></div><div><div class="tsm fw6">Term</div><div style="font-size:13px;margin-top:2px">${inv.term}</div></div></div>
  <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px"><tr style="background:var(--sp)"><th style="padding:6px 9px;text-align:left;font-size:9px;text-transform:uppercase;color:var(--sl)">Description</th><th style="padding:6px 9px;text-align:right">Amount</th></tr><tr><td style="padding:8px 9px;border-bottom:1px solid var(--sp)">Tuition — ${inv.term}</td><td style="padding:8px 9px;text-align:right;font-weight:600">${fmt(inv.amount)}</td></tr><tr><td style="padding:8px 9px;color:var(--g)">Paid (${inv.method})</td><td style="padding:8px 9px;text-align:right;color:var(--g);font-weight:600">− ${fmt(inv.paid)}</td></tr><tr style="background:${bal>0?'var(--rp)':'var(--gp)'}"><td style="padding:8px 9px;font-weight:700;color:${bal>0?'var(--r)':'var(--g)'}">Balance</td><td style="padding:8px 9px;text-align:right;font-weight:800;font-size:15px;font-family:Outfit;color:${bal>0?'var(--r)':'var(--g)'}">${bal>0?fmt(bal):'PAID IN FULL'}</td></tr></table>
  ${bal>0?`<div class="pay-btn" style="display:flex;justify-content:center;padding:9px;font-size:12px;border-radius:7px" onclick="T('PayFast link for ${fmt(bal)} sent to parent','success')"><i class="ti ti-link" style="font-size:14px"></i>Send PayFast Link — ${fmt(bal)}</div>`:''}`,
  `<button class="btn btn-s" onclick="CM()">Close</button><button class="btn btn-s" onclick="T('Downloaded','success')"><i class="ti ti-download" style="font-size:11px"></i>PDF</button>${bal>0?`<button class="btn btn-w" onclick="T('WhatsApp reminder sent','wa');CM()"><i class="ti ti-brand-whatsapp" style="font-size:11px"></i>WhatsApp Reminder</button>`:''}`);
}

