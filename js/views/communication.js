function rMessages(area){
 const myMessages=CU_ROLE==='parent'?D.messages.filter(m=>m.from===D.students[0].parent):D.messages;
 area.innerHTML=`<div style="display:grid;grid-template-columns:276px 1fr;gap:12px;height:calc(100vh-112px);height:calc(100vh - 112px)">
  <div class="card" style="padding:0;overflow:hidden;display:flex;flex-direction:column">
   <div style="padding:11px 13px;border-bottom:1px solid var(--sb)"><div style="background:var(--sp);border-radius:6px;padding:0 9px;height:28px;display:flex;align-items:center;gap:5px"><i class="ti ti-search" style="font-size:12px;color:var(--sx)"></i><input type="text" placeholder="Search messages..." style="border:none;background:transparent;font-size:12px;color:var(--s);outline:none;width:100%"></div></div>
   <div style="flex:1;overflow-y:auto" id="msgList">
   ${myMessages.map(m=>`<div class="msg-li${m.id===CMsg?' active':''}${m.unread?' unread':''}" onclick="openMsg(${m.id})" id="mli-${m.id}">
    <div style="width:5px;height:5px;border-radius:50%;background:${m.unread?'var(--a)':'transparent'};flex-shrink:0;margin-top:5px"></div>
    <div class="av av-s" style="background:${m.bg};color:${m.fg}">${m.ini}</div>
    <div style="flex:1;min-width:0"><div style="font-weight:600;font-size:12px">${m.from}${m.wa?'<i class="ti ti-brand-whatsapp" style="font-size:10px;color:var(--wd);margin-left:3px"></i>':''}</div><div class="tsm" style="margin-bottom:1px">${m.role}</div><div style="font-size:11px;color:var(--sx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px">${m.thread[m.thread.length-1].text}</div></div>
    <div class="tsm">${m.time}</div>
   </div>`).join('')}
   </div>
  </div>
  <div class="card" style="padding:0;overflow:hidden;display:flex;flex-direction:column" id="chatPanel">${rChatPanel(CMsg)}</div>
 </div>`;
}
function rChatPanel(id){
 const m=D.messages.find(x=>x.id===id);if(!m)return'';
 return`<div style="padding:11px 14px;border-bottom:1px solid var(--sb);display:flex;align-items:center;gap:9px">
   <div class="av av-m" style="background:${m.bg};color:${m.fg}">${m.ini}</div>
   <div><div style="font-weight:600;font-size:13px">${m.from}${m.wa?'<span class="pill pw" style="margin-left:5px"><i class="ti ti-brand-whatsapp"></i> WhatsApp</span>':''}</div><div class="tsm">${m.role}</div></div>
   <div class="flex g6 ml-a"><div class="ibt" onclick="T('Call initiated','')"><i class="ti ti-phone" style="font-size:13px"></i></div><div class="ibt" onclick="T('Marked resolved','success')"><i class="ti ti-circle-check" style="font-size:13px;color:var(--g)"></i></div></div>
  </div>
  <div style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:1px" id="chatMsgs">
   ${m.thread.map(msg=>`
   <div class="chat-meta${msg.dir==='out'?' right':''}">${msg.dir==='out'?'You':m.from} · ${msg.time}${msg.wa?'<i class="ti ti-brand-whatsapp" style="color:var(--wd);font-size:10px;margin-left:2px"></i>':''}</div>
   <div style="display:flex;justify-content:${msg.dir==='out'?'flex-end':'flex-start'}">
    <div class="chat-bubble ${msg.dir==='in'?'chat-in':msg.wa?'chat-wa':'chat-out'}">${msg.text}${msg.dir==='out'&&msg.status?`<div style="text-align:right;margin-top:3px"><span class="wast ${msg.status}"><i class="ti ti-checks" style="font-size:11px"></i>${msg.status}</span></div>`:''}</div>
   </div>`).join('')}
  </div>
  <div style="padding:9px 12px;border-top:1px solid var(--sb)">
   <div style="display:flex;gap:5px;margin-bottom:7px;flex-wrap:wrap">
    ${['Fee reminder','Report card ready','Please call us','Meeting request'].map(t=>`<div onclick="document.getElementById('msgIn').value='${t}'" style="background:var(--sp);border:1px solid var(--sb);border-radius:16px;padding:2px 8px;font-size:10px;cursor:pointer;transition:all .12s" onmouseover="this.style.background='var(--gp)'" onmouseout="this.style.background='var(--sp)'">${t}</div>`).join('')}
   </div>
   <div style="display:flex;gap:7px;align-items:flex-end">
    <textarea id="msgIn" placeholder="Type a reply..." style="flex:1;border:1px solid var(--sb);border-radius:8px;padding:8px 10px;font-size:12px;color:var(--s);resize:none;height:50px;outline:none;font-family:Inter" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg(${id});}"></textarea>
    <div style="display:flex;flex-direction:column;gap:4px">
     <button class="btn btn-w" style="height:22px;font-size:10px;padding:0 7px" onclick="sendMsg(${id},true)"><i class="ti ti-brand-whatsapp" style="font-size:10px"></i></button>
     <button class="btn btn-g" style="height:22px;font-size:10px;padding:0 7px" onclick="sendMsg(${id},false)"><i class="ti ti-send" style="font-size:10px"></i></button>
    </div>
   </div>
  </div>`;
}
function openMsg(id){
 CMsg=id;
 document.querySelectorAll('.msg-li').forEach(el=>el.classList.remove('active'));
 const li=document.getElementById(`mli-${id}`);
 if(li){li.classList.add('active');li.classList.remove('unread');const dot=li.querySelector('div');if(dot)dot.style.background='transparent';}
 document.getElementById('chatPanel').innerHTML=rChatPanel(id);
}
function sendMsg(id,wa=false){
 const inp=document.getElementById('msgIn');const txt=inp?.value.trim();if(!txt)return;
 const m=D.messages.find(x=>x.id===id);const now=new Date();const time=now.getHours()+':'+String(now.getMinutes()).padStart(2,'0');
 m.thread.push({dir:'out',text:txt,time,wa,status:'sent'});inp.value='';
 document.getElementById('chatPanel').innerHTML=rChatPanel(id);
 T(wa?'Sent via WhatsApp':'Message sent',wa?'wa':'success');
}

function rAnnouncements(area){
 area.innerHTML=`
 <div class="g3 mb18">
  <div class="sc"><div class="sc-icon ir"><i class="ti ti-alert-circle"></i></div><div class="sc-val">1</div><div class="sc-lbl">Urgent active</div></div>
  <div class="sc"><div class="sc-icon iw"><i class="ti ti-brand-whatsapp"></i></div><div class="sc-val">2,847</div><div class="sc-lbl">WhatsApp msgs sent</div></div>
  <div class="sc"><div class="sc-icon ig"><i class="ti ti-eye"></i></div><div class="sc-val">78%</div><div class="sc-lbl">Avg read rate</div></div>
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-speakerphone"></i>Announcements</div><button class="btn btn-g" onclick="mNewAnn()"><i class="ti ti-plus" style="font-size:11px"></i>New</button></div>
  ${D.announcements.map(a=>`<div class="ann-item">
   <div class="ann-bar" style="background:${a.color}"></div>
   <div style="flex:1">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:9px">
     <div class="ann-title">${a.title}</div>
     <div class="flex g6" style="flex-shrink:0"><i class="ti ti-edit act" onclick="T('Editing','')"></i><i class="ti ti-trash act" style="color:var(--r)" onclick="T('Deleted','error')"></i></div>
    </div>
    <div class="ann-body">${a.body}</div>
    <div class="ann-meta" style="margin-top:7px">
     <span class="ann-tag">${a.tag}</span>
     ${a.wa?'<span class="pill pw"><i class="ti ti-brand-whatsapp"></i> WhatsApp</span>':''}
     ${a.rsvp>0?`<span class="pill pb"><i class="ti ti-calendar-check"></i> ${a.rsvp} RSVPs</span>`:''}
     <span class="tsm">${a.date}</span>
     <div class="dstat"><i class="ti ti-send" style="font-size:10px"></i>${a.sent} sent</div>
     <div class="dstat"><i class="ti ti-check" style="font-size:10px;color:var(--b)"></i>${a.delivered} delivered</div>
     <div class="dstat"><i class="ti ti-eye" style="font-size:10px;color:var(--g)"></i>${a.read} read</div>
     <button style="margin-left:auto;background:none;border:none;cursor:pointer;font-size:11px;color:var(--g)" onclick="T('Resent to ${a.sent} recipients','wa')"><i class="ti ti-send" style="font-size:10px;margin-right:2px"></i>Resend</button>
    </div>
   </div>
  </div>`).join('')}
 </div>`;
}

function rDocuments(area){
 const ic={pdf:'ti-file-type-pdf',xlsx:'ti-file-spreadsheet'};const icol={pdf:'var(--r)',xlsx:'var(--b)'};
 const acCol={All:'pg',Parents:'pb',Staff:'pa',Admin:'pr'};
 const canManage=CU_ROLE==='admin'||CU_ROLE==='principal'||CU_ROLE==='superadmin';
 const visibleAccess=canManage?['All','Parents','Staff','Admin']:CU_ROLE==='teacher'?['All','Staff']:['All','Parents'];
 const docs=D.documents.filter(d=>visibleAccess.includes(d.access));
 area.innerHTML=`<div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-files"></i>Document Library</div>
   <div class="flex g8"><select class="fs" style="width:140px;height:28px;font-size:11px"><option>All Categories</option><option>Forms</option><option>Finance</option><option>Policies</option><option>Academic</option><option>HR</option></select>${canManage?'<button class="btn btn-g" onclick="mUploadDoc()"><i class="ti ti-upload" style="font-size:11px"></i>Upload</button>':''}</div>
  </div>
  <div style="background:var(--ap);border:1px solid var(--a);border-radius:7px;padding:9px 12px;font-size:11px;color:var(--ad);margin-bottom:12px"><i class="ti ti-lock" style="margin-right:4px"></i><strong>Role-based access active.</strong> Documents restricted by: Admin → Staff → Parents → Students.</div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Document</th><th>Category</th><th>Access</th><th>Size</th><th>Uploaded by</th><th>Date</th><th>Actions</th></tr></thead><tbody>
  ${docs.map(d=>`<tr>
   <td><div class="flex ic g8"><i class="ti ${ic[d.type]||'ti-file'}" style="font-size:19px;color:${icol[d.type]||'var(--sl)'}"></i><span style="font-weight:500">${d.name}</span></div></td>
   <td><span class="pill pn">${d.cat}</span></td>
   <td><span class="pill ${acCol[d.access]||'pn'}"><i class="ti ti-lock" style="font-size:9px"></i>${d.access}</span></td>
   <td class="tsm">${d.size}</td><td>${d.by}</td><td>${d.date}</td>
   <td><div class="flex g6"><i class="ti ti-eye act" onclick="T('Previewing ${d.name}','')"></i><i class="ti ti-download act" onclick="T('Downloading ${d.name}','success')"></i><i class="ti ti-share act" onclick="T('Shared via WhatsApp','wa')"></i>${canManage?'<i class="ti ti-trash act" style="color:var(--r)" onclick="T(\'Deleted\',\'error\')"></i>':''}</div></td>
  </tr>`).join('')}
  </tbody></table></div>
 </div>`;
}

