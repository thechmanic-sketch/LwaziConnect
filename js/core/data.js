// ══ DATA ══
const D={
 students:[
  {id:'STU001',name:'Amahle Dlamini',ini:'AD',bg:'#D8F3DC',fg:'#1B4332',cls:'Grade 7A',gender:'Female',dob:'2012-03-14',parent:'Lindiwe Dlamini',phone:'071 234 5678',email:'lindiwe@email.com',addr:'14 Umlazi Rd, Durban',avg:87,grade:'A',status:'active',balance:0,t1:85,t2:88,t3:87,att:94,medical:'None',blood:'O+'},
  {id:'STU002',name:'Siyanda Nxumalo',ini:'SN',bg:'#EFF6FF',fg:'#1D6FA4',cls:'Grade 7A',gender:'Male',dob:'2011-11-02',parent:'Bongani Nxumalo',phone:'082 345 6789',email:'bongani@email.com',addr:'32 Phoenix Ave, Durban',avg:74,grade:'B',status:'active',balance:850,t1:70,t2:72,t3:74,att:89,medical:'Asthma',blood:'A+'},
  {id:'STU003',name:'Zanele Mthembu',ini:'ZM',bg:'#FFF3CD',fg:'#B45309',cls:'Grade 6B',gender:'Female',dob:'2013-07-19',parent:'Thandi Mthembu',phone:'073 456 7890',email:'thandi@email.com',addr:'7 Chatsworth St, Durban',avg:61,grade:'C',status:'active',balance:0,t1:58,t2:60,t3:61,att:91,medical:'None',blood:'B+'},
  {id:'STU004',name:'Kabelo Mokoena',ini:'KM',bg:'#FEE2E2',fg:'#DC2626',cls:'Grade 6B',gender:'Male',dob:'2013-01-25',parent:'Dineo Mokoena',phone:'084 567 8901',email:'dineo@email.com',addr:'9 Pinetown Rd, Durban',avg:48,grade:'F',status:'at-risk',balance:1700,t1:52,t2:49,t3:48,att:72,medical:'None',blood:'AB+'},
  {id:'STU005',name:'Nomvula Cele',ini:'NC',bg:'#D8F3DC',fg:'#1B4332',cls:'Grade 5A',gender:'Female',dob:'2014-05-08',parent:'Sipho Cele',phone:'076 678 9012',email:'sipho@email.com',addr:'55 Kingsburgh Rd, Durban',avg:91,grade:'A',status:'active',balance:0,t1:89,t2:90,t3:91,att:97,medical:'Peanut allergy',blood:'O-'},
  {id:'STU006',name:'Thabo Shabalala',ini:'TS',bg:'#EDE9FE',fg:'#5B21B6',cls:'Grade 5A',gender:'Male',dob:'2014-09-30',parent:'Zodwa Shabalala',phone:'061 789 0123',email:'zodwa@email.com',addr:'21 Bluff Rd, Durban',avg:79,grade:'B',status:'active',balance:425,t1:75,t2:77,t3:79,att:88,medical:'None',blood:'A-'},
  {id:'STU007',name:'Nandi Zulu',ini:'NZ',bg:'#EFF6FF',fg:'#1D6FA4',cls:'Grade 7B',gender:'Female',dob:'2012-06-11',parent:'Mandla Zulu',phone:'072 111 2233',email:'mandla@email.com',addr:'3 Berea Rd, Durban',avg:83,grade:'B',status:'active',balance:0,t1:80,t2:82,t3:83,att:93,medical:'None',blood:'B-'},
  {id:'STU008',name:'Lethiwe Buthelezi',ini:'LB',bg:'#FFF3CD',fg:'#B45309',cls:'Grade 6A',gender:'Male',dob:'2013-02-28',parent:'Sbonelo Buthelezi',phone:'083 222 3344',email:'sbonelo@email.com',addr:'8 Overport Rd, Durban',avg:66,grade:'C',status:'active',balance:0,t1:63,t2:65,t3:66,att:86,medical:'None',blood:'O+'},
 ],
 teachers:[
  {id:'TCH001',name:'Mr. T. Zulu',ini:'TZ',bg:'#D8F3DC',fg:'#1B4332',subject:'Mathematics & Science',classes:['Grade 7A','Grade 7B'],phone:'071 900 1001',email:'t.zulu@durbanprimary.edu.za',status:'active',joined:'2019-01-15'},
  {id:'TCH002',name:'Mrs. R. Sithole',ini:'RS',bg:'#EFF6FF',fg:'#1D6FA4',subject:'English & Life Skills',classes:['Grade 7B'],phone:'082 900 2002',email:'r.sithole@durbanprimary.edu.za',status:'active',joined:'2020-03-01'},
  {id:'TCH003',name:'Mrs. P. Ndlovu',ini:'PN',bg:'#EDE9FE',fg:'#5B21B6',subject:'Natural Sciences',classes:['Grade 6B'],phone:'073 900 3003',email:'p.ndlovu@durbanprimary.edu.za',status:'active',joined:'2018-07-10'},
  {id:'TCH004',name:'Ms. F. Zungu',ini:'FZ',bg:'#FFF3CD',fg:'#B45309',subject:'Mathematics',classes:['Grade 6A'],phone:'084 900 4004',email:'f.zungu@durbanprimary.edu.za',status:'active',joined:'2021-01-20'},
  {id:'TCH005',name:'Mr. S. Mthethwa',ini:'SM',bg:'#FEE2E2',fg:'#DC2626',subject:'Social Sciences',classes:['Grade 5A'],phone:'076 900 5005',email:'s.mthethwa@durbanprimary.edu.za',status:'on-leave',joined:'2017-06-05'},
  {id:'TCH006',name:'Ms. B. Gumede',ini:'BG',bg:'#D8F3DC',fg:'#1B4332',subject:'English & Zulu',classes:['Grade 5B'],phone:'061 900 6006',email:'b.gumede@durbanprimary.edu.za',status:'active',joined:'2022-01-10'},
 ],
 classes:[
  {name:'Grade 7A',teacher:'Mr. T. Zulu',students:32,cap:35,room:'Room 12'},
  {name:'Grade 7B',teacher:'Mrs. R. Sithole',students:30,cap:35,room:'Room 11'},
  {name:'Grade 6A',teacher:'Ms. F. Zungu',students:35,cap:38,room:'Room 9'},
  {name:'Grade 6B',teacher:'Mrs. P. Ndlovu',students:33,cap:38,room:'Room 10'},
  {name:'Grade 5A',teacher:'Mr. S. Mthethwa',students:36,cap:40,room:'Room 7'},
  {name:'Grade 5B',teacher:'Ms. B. Gumede',students:34,cap:40,room:'Room 8'},
 ],
 parents:[
  {name:'Lindiwe Dlamini',ini:'LD',bg:'#D8F3DC',fg:'#1B4332',children:['Amahle Dlamini'],phone:'071 234 5678',email:'lindiwe@email.com',portal:true,status:'active'},
  {name:'Bongani Nxumalo',ini:'BN',bg:'#EFF6FF',fg:'#1D6FA4',children:['Siyanda Nxumalo'],phone:'082 345 6789',email:'bongani@email.com',portal:true,status:'active'},
  {name:'Thandi Mthembu',ini:'TM',bg:'#FFF3CD',fg:'#B45309',children:['Zanele Mthembu'],phone:'073 456 7890',email:'thandi@email.com',portal:false,status:'active'},
  {name:'Dineo Mokoena',ini:'DM',bg:'#FEE2E2',fg:'#DC2626',children:['Kabelo Mokoena'],phone:'084 567 8901',email:'dineo@email.com',portal:false,status:'active'},
  {name:'Sipho Cele',ini:'SC',bg:'#D8F3DC',fg:'#1B4332',children:['Nomvula Cele'],phone:'076 678 9012',email:'sipho@email.com',portal:true,status:'active'},
  {name:'Zodwa Shabalala',ini:'ZS',bg:'#EDE9FE',fg:'#5B21B6',children:['Thabo Shabalala'],phone:'061 789 0123',email:'zodwa@email.com',portal:false,status:'active'},
 ],
 invoices:[
  {id:'INV-001',student:'Amahle Dlamini',cls:'Grade 7A',term:'Term 3 2025',amount:2500,paid:2500,status:'paid',date:'2025-07-01',method:'EFT'},
  {id:'INV-002',student:'Siyanda Nxumalo',cls:'Grade 7A',term:'Term 3 2025',amount:2500,paid:1650,status:'partial',date:'2025-07-01',method:'EFT'},
  {id:'INV-003',student:'Kabelo Mokoena',cls:'Grade 6B',term:'Term 3 2025',amount:2500,paid:800,status:'overdue',date:'2025-07-01',method:'Cash'},
  {id:'INV-004',student:'Nomvula Cele',cls:'Grade 5A',term:'Term 3 2025',amount:2500,paid:2500,status:'paid',date:'2025-07-01',method:'PayFast'},
  {id:'INV-005',student:'Thabo Shabalala',cls:'Grade 5A',term:'Term 3 2025',amount:2500,paid:2075,status:'partial',date:'2025-07-01',method:'EFT'},
  {id:'INV-006',student:'Zanele Mthembu',cls:'Grade 6B',term:'Term 3 2025',amount:2500,paid:2500,status:'paid',date:'2025-07-01',method:'PayFast'},
  {id:'INV-007',student:'Nandi Zulu',cls:'Grade 7B',term:'Term 3 2025',amount:2500,paid:2500,status:'paid',date:'2025-07-01',method:'EFT'},
  {id:'INV-008',student:'Lethiwe Buthelezi',cls:'Grade 6A',term:'Term 3 2025',amount:2500,paid:2500,status:'paid',date:'2025-07-01',method:'EFT'},
 ],
 messages:[
  {id:1,from:'Lindiwe Dlamini',role:'Parent · Amahle',ini:'LD',bg:'#D8F3DC',fg:'#1B4332',time:'9:42 AM',unread:true,wa:true,thread:[
   {dir:'in',text:"Good morning. I wanted to ask about Amahle's Mathematics progress this term.",time:'9:40 AM',wa:true},
   {dir:'out',text:"Good morning Mrs Dlamini! Amahle is doing very well — she scored 87% on the last assessment.",time:'9:41 AM',wa:true,status:'read'},
   {dir:'in',text:"That's wonderful! Will her report card be available on the portal?",time:'9:42 AM',wa:true},
  ]},
  {id:2,from:'Mr. T. Zulu',role:'Grade 7A Teacher',ini:'TZ',bg:'#D8F3DC',fg:'#1B4332',time:'Yesterday',unread:true,wa:false,thread:[
   {dir:'in',text:'Science project submissions are due tomorrow. Please remind parents.',time:'Tue 3:15 PM',wa:false},
  ]},
  {id:3,from:'Bongani Nxumalo',role:'Parent · Siyanda',ini:'BN',bg:'#EFF6FF',fg:'#1D6FA4',time:'Monday',unread:false,wa:true,thread:[
   {dir:'in',text:'I will settle the R850 balance by Friday.',time:'Mon 11:00 AM',wa:true},
   {dir:'out',text:'Thank you Mr Nxumalo. Payment via EFT or PayFast.',time:'Mon 11:30 AM',wa:true,status:'delivered'},
  ]},
  {id:4,from:'Dineo Mokoena',role:'Parent · Kabelo',ini:'DM',bg:'#FEE2E2',fg:'#DC2626',time:'Monday',unread:true,wa:true,thread:[
   {dir:'in',text:"Can we schedule a meeting to discuss Kabelo's progress? I'm very concerned.",time:'Mon 9:00 AM',wa:true},
  ]},
  {id:5,from:'Mrs. P. Ndlovu',role:'Grade 6B Teacher',ini:'PN',bg:'#EDE9FE',fg:'#5B21B6',time:'Friday',unread:true,wa:false,thread:[
   {dir:'in',text:"I have uploaded the Term 3 marks for Grade 6B. Please review before publishing.",time:'Fri 4:00 PM',wa:false},
   {dir:'out',text:"Thank you Mrs Ndlovu. Will review and publish Monday.",time:'Fri 4:45 PM',wa:false,status:'delivered'},
  ]},
 ],
 announcements:[
  {id:1,title:'Parent-Teacher Evening — 25 July 2025',body:'All parents are invited to the Term 3 Parent-Teacher Evening on Friday 25 July from 14:00 to 18:00. Please book your time slot via the parent portal.',color:'#DC2626',tag:'Urgent',date:'Today 08:00',audience:'All Parents',sent:312,delivered:298,read:241,wa:true,rsvp:87},
  {id:2,title:'Term 3 Examination Schedule Released',body:'The Term 3 examination timetable is now available on the portal. Exams run from 11 August to 22 August 2025.',color:'#E9A825',tag:'Academic',date:'Yesterday',audience:'All',sent:624,delivered:610,read:502,wa:true,rsvp:0},
  {id:3,title:'Sports Day — 5 September 2025',body:'Annual Sports Day registrations are now open. Students may participate in athletics, swimming, and team sports.',color:'#1B4332',tag:'Events',date:'3 days ago',audience:'All',sent:624,delivered:598,read:445,wa:false,rsvp:134},
  {id:4,title:'School Fee Reminder — Term 3',body:'Term 3 school fees were due on 1 July 2025. Parents with outstanding balances are requested to contact the finance office urgently.',color:'#5B21B6',tag:'Finance',date:'5 days ago',audience:'Fee Defaulters',sent:48,delivered:44,read:31,wa:true,rsvp:0},
  {id:5,title:'Library Books Due Back Friday',body:'All learners with borrowed library books must return them by Friday 25 July so we can complete the term stocktake.',color:'#1D6FA4',tag:'Academic',date:'2 days ago',audience:'Students only',sent:624,delivered:601,read:388,wa:false,rsvp:0},
 ],
 documents:[
  {name:'Admission Form 2026.pdf',type:'pdf',size:'245 KB',date:'2025-07-10',cat:'Forms',by:'Admin',access:'All'},
  {name:'School Fees Structure 2025.pdf',type:'pdf',size:'180 KB',date:'2025-07-01',cat:'Finance',by:'Admin',access:'Parents'},
  {name:'Code of Conduct.pdf',type:'pdf',size:'320 KB',date:'2025-01-15',cat:'Policies',by:'Admin',access:'All'},
  {name:'Grade 7A Term 2 Results.xlsx',type:'xlsx',size:'98 KB',date:'2025-06-30',cat:'Academic',by:'Mr. T. Zulu',access:'Staff'},
  {name:'Sports Day Permission Slip.pdf',type:'pdf',size:'120 KB',date:'2025-07-08',cat:'Events',by:'Admin',access:'All'},
  {name:'Staff Salary Schedule.xlsx',type:'xlsx',size:'64 KB',date:'2025-01-01',cat:'HR',by:'Admin',access:'Admin'},
  {name:'Fee Defaulters List July.pdf',type:'pdf',size:'88 KB',date:'2025-07-15',cat:'Finance',by:'Admin',access:'Admin'},
 ],
 admissions:[
  {id:'APP-001',name:'Lesedi Khumalo',grade:'Grade 6',dob:'2013-04-12',parent:'Thabo Khumalo',phone:'083 100 2001',status:'pending',date:'2025-07-12'},
  {id:'APP-002',name:'Ayanda Gumede',grade:'Grade 5',dob:'2014-08-03',parent:'Nompumelelo Gumede',phone:'071 200 3002',status:'approved',date:'2025-07-08'},
  {id:'APP-003',name:'Sibusiso Dube',grade:'Grade 7',dob:'2012-11-22',parent:'Lungelo Dube',phone:'082 300 4003',status:'pending',date:'2025-07-15'},
 ],
 schools:[
  {id:'SCH001',name:'Durban Primary School',plan:'Professional',students:624,status:'active',contact:'N. Khumalo',amount:899,health:95,lastLogin:'Today'},
  {id:'SCH002',name:'Pinetown Academy',plan:'Starter',students:312,status:'active',contact:'S. Dlamini',amount:499,health:82,lastLogin:'Yesterday'},
  {id:'SCH003',name:'Phoenix Community School',plan:'Enterprise',students:1250,status:'active',contact:'B. Mthembu',amount:1499,health:91,lastLogin:'Today'},
  {id:'SCH004',name:'Westville Junior School',plan:'Professional',students:480,status:'trial',contact:'R. Naidoo',amount:0,health:44,lastLogin:'3 days ago'},
 ],
 discipline:[
  {id:'INC-001',student:'Kabelo Mokoena',type:'Misconduct',desc:'Disruptive behaviour in class',date:'2025-07-10',teacher:'Mr. T. Zulu',action:'Parent notified',status:'resolved'},
  {id:'INC-002',student:'Siyanda Nxumalo',type:'Late',desc:'Arrived 45 minutes late without explanation',date:'2025-07-14',teacher:'Mrs. R. Sithole',action:'Verbal warning',status:'open'},
  {id:'INC-003',student:'Kabelo Mokoena',type:'Absent',desc:'3 consecutive unexplained absences',date:'2025-07-07',teacher:'Mrs. P. Ndlovu',action:'Meeting scheduled',status:'pending'},
 ],
 health:[
  {student:'Amahle Dlamini',condition:'None',allergy:'None',blood:'O+',aid:'Discovery Kids',emergency:'071 234 5678',doctor:'Dr. Naidoo – 031 500 1001'},
  {student:'Siyanda Nxumalo',condition:'Asthma',allergy:'Dust',blood:'A+',aid:'Bonitas',emergency:'082 345 6789',doctor:'Dr. Mokoena – 031 500 2002'},
  {student:'Nomvula Cele',condition:'None',allergy:'Peanuts',blood:'O-',aid:'Medihelp',emergency:'076 678 9012',doctor:'Dr. Cele – 031 500 3003'},
  {student:'Kabelo Mokoena',condition:'None',allergy:'None',blood:'AB+',aid:'None',emergency:'084 567 8901',doctor:'Dr. Sithole – 031 500 4004'},
 ],
 calEvents:[
  {date:'2025-07-17',title:'Grade 7 Science Projects Due',type:'academic',cls:'Grade 7'},
  {date:'2025-07-25',title:'Parent-Teacher Evening',type:'event',cls:'All'},
  {date:'2025-08-01',title:'Term 3 Exams Begin',type:'exam',cls:'All'},
  {date:'2025-09-05',title:'Sports Day',type:'event',cls:'All'},
  {date:'2025-07-18',title:'Grade 5 Maths Test',type:'exam',cls:'Grade 5'},
  {date:'2025-07-19',title:'Report Card Day',type:'academic',cls:'All'},
 ],
 homework:[
  {id:'HW001',title:'Algebra Worksheet — Chapter 4',subject:'Mathematics',cls:'Grade 7A',teacher:'Mr. T. Zulu',due:'2025-07-22',posted:'2025-07-17',completion:78,status:'active'},
  {id:'HW002',title:'Essay: My Hero',subject:'English',cls:'Grade 7B',teacher:'Mrs. R. Sithole',due:'2025-07-20',posted:'2025-07-15',completion:92,status:'active'},
  {id:'HW003',title:'Ecosystem Diagram',subject:'Natural Sciences',cls:'Grade 6B',teacher:'Mrs. P. Ndlovu',due:'2025-07-18',posted:'2025-07-12',completion:65,status:'overdue'},
  {id:'HW004',title:'Times Tables Practice',subject:'Mathematics',cls:'Grade 6A',teacher:'Ms. F. Zungu',due:'2025-07-25',posted:'2025-07-18',completion:40,status:'active'},
  {id:'HW005',title:'IsiZulu Comprehension',subject:'IsiZulu',cls:'Grade 5A',teacher:'Mr. S. Mthethwa',due:'2025-07-19',posted:'2025-07-14',completion:88,status:'active'},
 ],
 sgbMembers:[
  {name:'Mr. V. Naidoo',role:'Chairperson',category:'Parent',term:'2024–2027',phone:'083 111 2222'},
  {name:'Mrs. N. Khumalo',role:'Principal (ex officio)',category:'Staff',term:'Permanent',phone:'031 100 2000'},
  {name:'Mr. T. Zulu',role:'Secretary',category:'Educator',term:'2024–2027',phone:'071 900 1001'},
  {name:'Mrs. L. Dlamini',role:'Treasurer',category:'Parent',term:'2024–2027',phone:'071 234 5678'},
  {name:'Mr. B. Nxumalo',role:'Additional Member',category:'Parent',term:'2024–2027',phone:'082 345 6789'},
  {name:'Ms. F. Zungu',role:'Additional Member',category:'Educator',term:'2024–2027',phone:'084 900 4004'},
 ],
 sgbMeetings:[
  {date:'2025-07-08',title:'Q3 Budget Review & Fee Adjustment',attendance:'6/6',status:'minutes-ready',resolutions:3},
  {date:'2025-06-10',title:'Infrastructure Maintenance Planning',attendance:'5/6',status:'minutes-ready',resolutions:2},
  {date:'2025-05-12',title:'Code of Conduct Policy Review',attendance:'6/6',status:'minutes-ready',resolutions:4},
  {date:'2025-08-12',title:'Term 4 Planning & Sports Day Budget',attendance:'—',status:'scheduled',resolutions:0},
 ],
 vehicles:[
  {id:'BUS-01',reg:'ND 45 KL GP',driver:'Mr. S. Mahlangu',capacity:32,enrolled:28,route:'Route A — Umlazi / Chatsworth',status:'active',lastService:'2025-06-01'},
  {id:'BUS-02',reg:'ND 12 MN GP',driver:'Mr. P. Khumalo',capacity:32,enrolled:30,route:'Route B — Pinetown / Westville',status:'active',lastService:'2025-06-15'},
  {id:'BUS-03',reg:'ND 78 QR GP',driver:'Mr. J. Reddy',capacity:24,enrolled:19,route:'Route C — Bluff / Berea',status:'maintenance',lastService:'2025-07-10'},
 ],
 staff:[
  {name:'N. Khumalo',role:'Principal',dept:'Management',contract:'Permanent',startDate:'2015-01-10',leaveBalance:12,qualifications:'B.Ed, M.Ed Leadership',status:'active'},
  {name:'Mr. T. Zulu',role:'Senior Teacher — Maths & Science',dept:'Academic',contract:'Permanent',startDate:'2019-01-15',leaveBalance:8,qualifications:'B.Sc Education',status:'active'},
  {name:'Mrs. R. Sithole',role:'Teacher — English',dept:'Academic',contract:'Permanent',startDate:'2020-03-01',leaveBalance:15,qualifications:'B.Ed Hons',status:'active'},
  {name:'Mrs. P. Ndlovu',role:'Teacher — Natural Sciences',dept:'Academic',contract:'Permanent',startDate:'2018-07-10',leaveBalance:10,qualifications:'B.Sc Education',status:'active'},
  {name:'Mr. S. Mthethwa',role:'Teacher — Social Sciences',dept:'Academic',contract:'Permanent',startDate:'2017-06-05',leaveBalance:3,qualifications:'B.Ed',status:'on-leave'},
  {name:'Mrs. F. Mbeki',role:'Finance Officer',dept:'Admin',contract:'Permanent',startDate:'2021-02-01',leaveBalance:18,qualifications:'B.Com Accounting',status:'active'},
  {name:'Mr. D. Pillay',role:'Groundskeeper',dept:'Operations',contract:'Permanent',startDate:'2016-04-01',leaveBalance:9,qualifications:'N/A',status:'active'},
 ],
 auditLog:[
  {time:'Today 09:14',user:'N. Khumalo',action:'Approved admission APP-002',ip:'196.x.x.42'},
  {time:'Today 08:50',user:'Mr. T. Zulu',action:'Updated Grade 7A Term 3 marks',ip:'196.x.x.18'},
  {time:'Yesterday 16:22',user:'N. Khumalo',action:'Exported fee defaulters report',ip:'196.x.x.42'},
  {time:'Yesterday 11:05',user:'System',action:'Automated WhatsApp reminder batch sent (48 recipients)',ip:'system'},
  {time:'2 days ago',user:'Mrs. P. Ndlovu',action:'Logged discipline incident INC-003',ip:'196.x.x.31'},
 ],
 campuses:[
  {name:'Durban Primary — Main Campus',students:624,principal:'N. Khumalo',type:'Primary',status:'active'},
  {name:'Durban Primary — Bluff Annex',students:180,principal:'Mrs. T. Govender',type:'Primary',status:'active'},
 ]
};


const SUBS=['Mathematics','English','IsiZulu','Natural Sciences','Social Sciences','Technology','Creative Arts','Life Skills'];
const TT_DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday'];
const TT_PERIODS=[{l:'Period 1',t:'07:30'},{l:'Period 2',t:'08:30'},{l:'Period 3',t:'09:30'},{l:'Break',t:'10:00'},{l:'Period 4',t:'11:00'},{l:'Period 5',t:'12:00'},{l:'Period 6',t:'13:00'}];
const TT_S={'Period 1':['Mathematics','English','IsiZulu','Mathematics','English'],'Period 2':['English','Mathematics','Mathematics','IsiZulu','Natural Sciences'],'Period 3':['Natural Sciences','Social Sciences','English','Technology','Mathematics'],'Period 4':['IsiZulu','Technology','Social Sciences','English','Creative Arts'],'Period 5':['Social Sciences','Natural Sciences','Life Skills','Creative Arts','IsiZulu'],'Period 6':['Life Skills','Creative Arts','Technology','Natural Sciences','Social Sciences']};
const SUB_C=['#D8F3DC|#1B4332','#EFF6FF|#1D6FA4','#FFF3CD|#B45309','#FEE2E2|#DC2626','#EDE9FE|#5B21B6','#D8F3DC|#1B4332','#E0F2FE|#0369A1','#FCE7F3|#9D174D'];
