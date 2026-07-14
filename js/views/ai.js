// ══════════════════════════════════════
// NEW MODULES — FULL PLATFORM VISION
// ══════════════════════════════════════

// ─── AI ASSISTANT ───
let aiHistory=[{role:'ai',text:"Hi N. Khumalo 👋 I'm your AI School Assistant. I can analyse attendance, academics, fees, and behaviour across the whole school instantly. Try asking me something, or tap a suggestion below."}];
function rAI(area){
 area.innerHTML=`
 <div style="background:linear-gradient(135deg,#8B5CF6,#6D28D9);border-radius:11px;padding:16px 20px;margin-bottom:16px;display:flex;align-items:center;gap:12px">
  <div style="width:38px;height:38px;background:rgba(255,255,255,.18);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:19px;color:#fff"><i class="ti ti-sparkles"></i></div>
  <div style="flex:1"><div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;color:#fff">AI School Assistant</div><div style="font-size:11px;color:rgba(255,255,255,.7)">Ask anything about your school — attendance, marks, fees, behaviour, trends</div></div>
  <span class="phase-badge" style="background:rgba(255,255,255,.2);color:#fff">Phase 1 · Core</span>
 </div>
 <div class="card" style="display:flex;flex-direction:column;height:calc(100vh - 200px)">
  <div id="aiChat" style="flex:1;overflow-y:auto;padding:6px 4px 10px"></div>
  <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:10px" id="aiSuggestRow">
   ${['Which learners are at risk?','Show fee defaulters','Attendance below 80%','Generate a report comment','Best performing class','Who needs intervention?'].map(q=>`<div class="ai-suggest" onclick="aiAsk('${q}')">${q}</div>`).join('')}
  </div>
  <div style="display:flex;gap:8px;align-items:flex-end;border-top:1px solid var(--sb);padding-top:12px">
   <textarea id="aiInput" placeholder="Ask the AI assistant anything about your school..." style="flex:1;border:1px solid var(--sb);border-radius:9px;padding:9px 12px;font-size:12px;color:var(--s);resize:none;height:44px;outline:none;font-family:Inter" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();aiSubmit();}"></textarea>
   <button class="btn" style="height:44px;background:linear-gradient(135deg,#8B5CF6,#6D28D9);color:#fff" onclick="aiSubmit()"><i class="ti ti-send" style="font-size:13px"></i></button>
  </div>
 </div>`;
 rAIChat();
}
function rAIChat(){
 const c=document.getElementById('aiChat');if(!c)return;
 c.innerHTML=aiHistory.map(m=>m.role==='ai'?`<div class="ai-msg-row"><div class="ai-av"><i class="ti ti-sparkles"></i></div><div class="ai-bubble">${m.text}</div></div>`:`<div class="ai-msg-row" style="justify-content:flex-end"><div class="ai-bubble user">${m.text}</div></div>`).join('');
 c.scrollTop=c.scrollHeight;
}
function aiAsk(q){document.getElementById('aiInput').value=q;aiSubmit();}
function aiSubmit(){
 const inp=document.getElementById('aiInput');const q=inp?.value.trim();if(!q)return;
 aiHistory.push({role:'user',text:q});inp.value='';rAIChat();
 setTimeout(()=>{aiHistory.push({role:'ai',text:aiAnswer(q)});rAIChat();},550);
}
function aiAnswer(q){
 const ql=q.toLowerCase();
 const atRisk=D.students.filter(s=>s.att<85||s.grade==='F'||s.grade==='D');
 const defaulters=D.invoices.filter(i=>i.status!=='paid');
 if(ql.includes('risk')||ql.includes('intervention')||ql.includes('support')){
  return `I found <strong>${atRisk.length} learners</strong> who need attention: ${atRisk.map(s=>`<strong>${s.name}</strong> (${s.cls}, ${s.att}% attendance, Grade ${s.grade})`).join(', ')}. The most urgent is <strong>${atRisk[0]?.name||'none'}</strong> — attendance has dropped below the 80% threshold and academic average is failing. I'd recommend scheduling a parent meeting this week. Want me to draft an intervention plan?`;
 }
 if(ql.includes('fee')||ql.includes('defaulter')||ql.includes('outstanding')||ql.includes('owing')){
  const total=defaulters.reduce((a,i)=>a+(i.amount-i.paid),0);
  return `There are <strong>${defaulters.length} accounts</strong> with outstanding balances totalling <strong>R${total.toLocaleString()}</strong>. The largest is <strong>${defaulters[0]?.student}</strong> owing R${(defaulters[0].amount-defaulters[0].paid).toLocaleString()}. I can send WhatsApp payment reminders with PayFast links to all of them right now — just say the word.`;
 }
 if(ql.includes('attendance')){
  const low=D.students.filter(s=>s.att<85);
  return `School-wide attendance is averaging <strong>91%</strong>, which is below your 95% target. <strong>${low.length} learners</strong> are below 85%, concentrated mostly in Grade 6B. The biggest concern is <strong>${low[0]?.name}</strong> at ${low[0]?.att}%. Pattern detected: absences cluster on Mondays — worth investigating whether this links to transport or family circumstances.`;
 }
 if(ql.includes('report comment')||ql.includes('comment')){
  return `Here's a draft comment for a strong learner: <em>"Demonstrates exceptional academic discipline and consistently produces work of a high standard. A pleasure to teach — keep up the excellent effort."</em> For a struggling learner: <em>"Shows potential but requires additional support to reach grade-level expectations. Recommend a structured homework routine and regular check-ins with the class teacher."</em> Want me to generate comments for a specific class?`;
 }
 if(ql.includes('best')||ql.includes('top')||ql.includes('performing')){
  const byClass={};D.students.forEach(s=>{byClass[s.cls]=byClass[s.cls]||[];byClass[s.cls].push(s.avg);});
  const ranked=Object.entries(byClass).map(([c,v])=>({c,avg:Math.round(v.reduce((a,b)=>a+b,0)/v.length)})).sort((a,b)=>b.avg-a.avg);
  return `<strong>${ranked[0].c}</strong> is your top performing class with a <strong>${ranked[0].avg}% average</strong>. Grade 5A consistently shows the strongest results this term, driven by high attendance (97%) correlating directly with academic performance. Want a full ranked breakdown of all classes?`;
 }
 if(ql.includes('hello')||ql.includes('hi ')||ql==='hi'){
  return `Hello! I have full visibility into your school's data — 624 learners, attendance, marks, fees, and behaviour records. What would you like to know?`;
 }
 return `Based on current school data: 624 learners enrolled, 91% average attendance, R37,000 in outstanding fees, and ${atRisk.length} learners flagged for academic or attendance support. Try asking me something more specific — like "which Grade 7 learners need help in Maths" — and I'll search across all records to answer.`;
}

// ─── DIGITAL LEARNER ID CARDS ───
function rIDCards(area){
 area.innerHTML=`
 <div style="background:var(--gp);border:1px solid var(--gl);border-radius:9px;padding:11px 15px;margin-bottom:16px;display:flex;align-items:center;gap:10px">
  <i class="ti ti-id" style="font-size:18px;color:var(--g)"></i>
  <div style="flex:1"><div style="font-weight:700;font-size:12px;color:var(--g)">Digital Learner ID Cards</div><div class="tsm">QR-coded ID for verification, emergency info access, and gate check-in</div></div>
  <span class="phase-badge ph1">Phase 1</span>
  <button class="btn btn-g" onclick="T('Batch of 624 ID cards queued for printing','success')"><i class="ti ti-printer" style="font-size:11px"></i>Print All</button>
 </div>
 <div class="g3">
  ${D.students.map(s=>`
  <div>
   <div class="id-card">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;position:relative;z-index:1">
     <div><div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:13px">Durban Primary School</div><div style="font-size:9px;opacity:.6;margin-top:1px">Learner Identification Card</div></div>
     <div class="logo-icon" style="width:26px;height:26px;font-size:11px">L</div>
    </div>
    <div style="display:flex;align-items:center;gap:12px;margin-top:16px;position:relative;z-index:1">
     <div class="av av-l" style="background:${s.bg};color:${s.fg}">${s.ini}</div>
     <div style="flex:1">
      <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:14px">${s.name}</div>
      <div style="font-size:10px;opacity:.65;margin-top:1px">${s.cls} · ${s.id}</div>
      <div style="font-size:9px;opacity:.5;margin-top:4px">Blood: ${s.blood} · Valid: 2025/2026</div>
     </div>
     <div class="qr-box"><i class="ti ti-qrcode" style="font-size:42px;color:#1B4332"></i></div>
    </div>
   </div>
   <div class="flex g6" style="margin-top:8px;justify-content:center">
    <button class="btn btn-s" style="height:24px;font-size:10px" onclick="T('${s.name} ID card downloaded','success')"><i class="ti ti-download" style="font-size:10px"></i>Download</button>
    <button class="btn btn-s" style="height:24px;font-size:10px" onclick="T('Scanning QR shows: ${s.name}, ${s.cls}, Emergency: ${s.phone}, Blood: ${s.blood}','info')"><i class="ti ti-scan" style="font-size:10px"></i>Test Scan</button>
   </div>
  </div>`).join('')}
 </div>`;
}

