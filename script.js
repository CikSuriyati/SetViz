// SetViz — script.js
// Language strings
const STRINGS = {
  en: {
    'Venn Diagram':'Venn Diagram', 'Choose number of sets':'Choose number of sets', 'Drag note':'Drag-and-drop optional later — this prototype uses clicks to toggle membership.',
    'Control Panel':'Control Panel', 'Elements U':'Elements in Universal Set U', 'Hint select':'Hint: select a target set below, then click chips to add/remove.',
    'Target set':'Target set', 'Operation':'Operation highlight', 'Practice Question':'Practice Question', 'New Task':'New Task', 'Check Answer':'Check Answer', 'Reset':'Reset',
    'Tip':'Toggle elements quickly by pressing the number key (1–9) matching a chip.'
  },
  bm: {
    'Venn Diagram':'Rajah Venn', 'Choose number of sets':'Pilih bilangan set', 'Drag note':'Seret-lepas akan ditambah kemudian — prototaip ini guna klik untuk tambah/buang ahli.',
    'Control Panel':'Panel Kawalan', 'Elements U':'Ahli dalam Set Semesta U', 'Hint select':'Pilih set sasaran di bawah, kemudian klik cip untuk tambah/buang.',
    'Target set':'Set sasaran', 'Operation':'Sorotan operasi', 'Practice Question':'Soalan Latihan', 'New Task':'Soalan Baharu', 'Check Answer':'Semak Jawapan', 'Reset':'Set Semula',
    'Tip':'Togol ahli dengan cepat menggunakan kekunci nombor (1–9) sepadan dengan cip.'
  }
};
let LANG = 'en';

function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    el.textContent = (STRINGS[LANG] && STRINGS[LANG][key]) || key;
  });
}

// State
const U = ['1','2','3','4','5','6','7','8'];
let state = {
  A: new Set(),
  B: new Set(),
  goal: null, // {labelEN,labelBM,fn}
  answer: new Set(),
  setCount: 2,
  target: 'A'
};

// Elements
const uniEl = document.getElementById('universe');
const regionA = document.getElementById('regionA');
const regionAB = document.getElementById('regionAB');
const regionB = document.getElementById('regionB');
const regionOut = document.getElementById('regionOut');
const opSelect = document.getElementById('opSelect');
const feedbackEl = document.getElementById('feedback');
const answerPeek = document.getElementById('answerPeek');
const taskText = document.getElementById('taskText');

// Build universe chips
function buildUniverse(){
  uniEl.innerHTML = '';
  U.forEach(x=>{
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = x;
    chip.setAttribute('aria-pressed','false');
    chip.addEventListener('click', ()=>toggleMembership(x));
    uniEl.appendChild(chip);
  });
}

function setTarget(target){
  state.target = target;
  document.querySelectorAll('#targetSeg button').forEach(b=>{
    b.setAttribute('aria-pressed', b.dataset.target===target ? 'true' : 'false');
  });
}

// Toggle membership
function toggleMembership(x){
  const A = state.A, B = state.B;
  if(state.target==='A'){
    if(A.has(x)) A.delete(x); else A.add(x);
  } else if(state.target==='B'){
    if(B.has(x)) B.delete(x); else B.add(x);
  } else { // OUT: ensure x not in A nor B
    A.delete(x); B.delete(x);
  }
  renderVenn();
}

// Render Venn placements
function renderVenn(){
  [regionA, regionAB, regionB, regionOut].forEach(g=>g.innerHTML='');
  const stacks = {A:0, AB:0, B:0, OUT:0};
  U.forEach(x=>{
    const inA = state.A.has(x), inB = state.B.has(x);
    let region = 'OUT';
    if(inA && inB) region='AB'; else if(inA) region='A'; else if(inB) region='B';
    const t = document.createElementNS('http://www.w3.org/2000/svg','text');
    t.setAttribute('font-size','14'); t.textContent = x;
    if(region==='A'){ t.setAttribute('x',150); t.setAttribute('y',130+stacks.A*18); stacks.A++; regionA.appendChild(t); }
    else if(region==='AB'){ t.setAttribute('x',240); t.setAttribute('y',160+stacks.AB*18); stacks.AB++; regionAB.appendChild(t); }
    else if(region==='B'){ t.setAttribute('x',330); t.setAttribute('y',130+stacks.B*18); stacks.B++; regionB.appendChild(t); }
    else { t.setAttribute('x',60); t.setAttribute('y',70+stacks.OUT*18); stacks.OUT++; regionOut.appendChild(t); }
  });

  document.querySelectorAll('#universe .chip').forEach(ch=>{
    const x = ch.textContent.trim();
    const inA = state.A.has(x), inB = state.B.has(x);
    ch.classList.toggle('active', inA || inB);
    ch.setAttribute('aria-pressed', (inA||inB) ? 'true':'false');
  });

  if(state.goal){
    state.answer = state.goal.fn(state.A, state.B);
    answerPeek.textContent = '{ ' + [...state.answer].join(', ') + ' }';
  } else {
    answerPeek.textContent = '';
  }
}

// Highlights
function setHighlight(op){
  const ids = ['hl-union','hl-intersection','hl-AminusB','hl-BminusA','hl-complement'];
  ids.forEach(id=>{ document.getElementById(id).setAttribute('opacity','0'); });
  if(op==='union') document.getElementById('hl-union').setAttribute('opacity','1');
  if(op==='intersection') document.getElementById('hl-intersection').setAttribute('opacity','1');
  if(op==='AminusB') document.getElementById('hl-AminusB').setAttribute('opacity','1');
  if(op==='BminusA') document.getElementById('hl-BminusA').setAttribute('opacity','1');
  if(op==='complement') document.getElementById('hl-complement').setAttribute('opacity','1');
}

opSelect.addEventListener('change', e=> setHighlight(e.target.value));

// Tasks
const tasks = [
  {labelEN:'List elements of A ∩ B', labelBM:'Senaraikan ahli bagi A ∩ B', fn:(A,B)=> new Set([...A].filter(x=>B.has(x)))},
  {labelEN:'List elements of A ∪ B', labelBM:'Senaraikan ahli bagi A ∪ B', fn:(A,B)=> new Set([...new Set([...A,...B])])},
  {labelEN:'List elements of A \\ B', labelBM:'Senaraikan ahli bagi A \\ B', fn:(A,B)=> new Set([...A].filter(x=>!B.has(x)))},
  {labelEN:'List elements of B \\ A', labelBM:'Senaraikan ahli bagi B \\ A', fn:(A,B)=> new Set([...B].filter(x=>!A.has(x)))},
];

function newTask(){
  state.A = new Set(U.filter(()=>Math.random()<0.5));
  state.B = new Set(U.filter(()=>Math.random()<0.5));
  const t = tasks[Math.floor(Math.random()*tasks.length)];
  state.goal = t;
  taskText.textContent = (LANG==='bm'? t.labelBM : t.labelEN);
  feedbackEl.textContent = '';
  renderVenn();
  const opKey = taskText.textContent.includes('∩') ? 'intersection'
             : taskText.textContent.includes('∪') ? 'union'
             : taskText.textContent.includes('A \\ B') ? 'AminusB'
             : taskText.textContent.includes('B \\ A') ? 'BminusA' : 'none';
  document.getElementById('opSelect').value = opKey; setHighlight(opKey);
}

function checkAnswer(){
  if(!state.goal){ feedbackEl.className='feedback bad'; feedbackEl.textContent = (LANG==='bm'?'Tiada soalan. Klik Soalan Baharu.':'No task yet. Click New Task.'); return; }
  const user = state.goal.fn(state.A, state.B);
  const ok = user.size===state.answer.size && [...user].every(x=>state.answer.has(x));
  if(ok){
    feedbackEl.className='feedback good';
    feedbackEl.textContent = (LANG==='bm'?'✔ Betul!':'✔ Correct!');
  } else {
    feedbackEl.className='feedback bad';
    feedbackEl.textContent = (LANG==='bm'?'✘ Belum tepat. Jawapan sebenar: ':'✘ Not yet. True set: ') + '{ ' + [...state.answer].join(', ') + ' }';
  }
}

// Wiring
document.getElementById('newTaskBtn').addEventListener('click', newTask);
document.getElementById('checkBtn').addEventListener('click', checkAnswer);
document.getElementById('resetBtn').addEventListener('click', ()=>{ state.A.clear(); state.B.clear(); renderVenn(); feedbackEl.textContent=''; });

document.getElementById('setCountSeg').addEventListener('click', (e)=>{
  if(e.target.tagName!=='BUTTON') return;
  const count = e.target.dataset.count;
  document.querySelectorAll('#setCountSeg button').forEach(b=>b.setAttribute('aria-pressed', b===e.target?'true':'false'));
  state.setCount = +count;
  // 3-set visual is placeholder-ready; core logic remains 2-set in this prototype
});

document.getElementById('targetSeg').addEventListener('click', (e)=>{
  if(e.target.tagName!=='BUTTON') return;
  setTarget(e.target.dataset.target);
});

document.getElementById('langSeg').addEventListener('click', (e)=>{
  if(e.target.tagName!=='BUTTON') return;
  document.querySelectorAll('#langSeg button').forEach(b=>b.setAttribute('aria-pressed', b===e.target?'true':'false'));
  LANG = e.target.dataset.lang; applyI18n(); taskText.textContent = state.goal ? (LANG==='bm'? state.goal.labelBM : state.goal.labelEN) : '';
});

// About dialog
const aboutDlg = document.getElementById('aboutDlg');
document.getElementById('aboutBtn').addEventListener('click', ()=> aboutDlg.showModal());
document.getElementById('closeAbout').addEventListener('click', ()=> aboutDlg.close());

// Keyboard shortcuts 1–9 => toggle membership in current target
window.addEventListener('keydown', (e)=>{
  if(e.key>='1' && e.key<='9'){
    const idx = parseInt(e.key,10)-1; if(idx>=0 && idx<U.length){ toggleMembership(U[idx]); }
  }
});

// Init
buildUniverse();
setTarget('A');
renderVenn();
applyI18n();
