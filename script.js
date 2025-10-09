// SetViz — script.js
// Language strings
const STRINGS = {
  en: {
    'Venn Diagram':'Venn Diagram', 'Choose number of sets':'Choose number of sets', 'Drag note':'Drag-and-drop optional later — this prototype uses clicks to toggle membership.',
    'Control Panel':'Control Panel', 'Elements U':'Elements in Universal Set U', 'Hint select':'Hint: select a target set below, then click chips to add/remove.',
    'Target set':'Target set', 'Operation':'Operation highlight', 'Practice Question':'Practice Question', 'New Task':'New Task', 'Check Answer':'Check Answer', 'Reset':'Reset',
    'Tip':'Toggle elements quickly by pressing the number key (1–9) matching a chip.',
    'Mode':'Mode', 'Practice':'Practice', 'Tutorial':'Tutorial', 'Previous':'Previous', 'Next Step':'Next Step', 'Restart Tutorial':'Restart',
    'tutorial-intro':'Learn basic set concepts step by step. Click "Next Step" to continue.',
    'step1-title':'What is a Set?', 'step1-desc':'A set is a collection of distinct objects. The symbol A represents a set. This circle shows set A.',
    'step2-title':'Elements in a Set', 'step2-desc':'Elements are the objects inside a set. Click the chip to add element "a" to set A. Notice how it appears inside the circle.',
    'step3-title':'Two Independent Sets', 'step3-desc':'Here we have two independent sets: A and B. Each set can have its own elements. Click chips to add elements to each set.',
    'step4-title':'Union Symbol (A ∪ B)', 'step4-desc':'The union symbol ∪ means "OR". A ∪ B means all elements that are in A OR B (or both). The highlighted area shows the union.',
    'step5-title':'Intersection Symbol (A ∩ B)', 'step5-desc':'The intersection symbol ∩ means "AND". A ∩ B means only elements that are in BOTH A AND B. The highlighted area shows the intersection.',
    'step6-title':'Set Difference Symbol (A \\ B)', 'step6-desc':'The set difference symbol \\ means "MINUS". A \\ B means elements that are in A but NOT in B. The highlighted area shows A \\ B.',
    'step7-title':'Complement Symbol (A ∪ B)′', 'step7-desc':'The complement symbol ′ means "NOT". (A ∪ B)′ means elements that are NOT in A and NOT in B. The highlighted area shows the complement.',
    'step8-title':'Mutually Exclusive Sets', 'step8-desc':'Mutually exclusive sets have NO common elements. Their intersection is empty (A ∩ B = ∅). Notice how the circles don\'t overlap.'
  },
  bm: {
    'Venn Diagram':'Rajah Venn', 'Choose number of sets':'Pilih bilangan set', 'Drag note':'Seret-lepas akan ditambah kemudian — prototaip ini guna klik untuk tambah/buang ahli.',
    'Control Panel':'Panel Kawalan', 'Elements U':'Ahli dalam Set Semesta U', 'Hint select':'Pilih set sasaran di bawah, kemudian klik cip untuk tambah/buang.',
    'Target set':'Set sasaran', 'Operation':'Sorotan operasi', 'Practice Question':'Soalan Latihan', 'New Task':'Soalan Baharu', 'Check Answer':'Semak Jawapan', 'Reset':'Set Semula',
    'Tip':'Togol ahli dengan cepat menggunakan kekunci nombor (1–9) sepadan dengan cip.',
    'Mode':'Mod', 'Practice':'Latihan', 'Tutorial':'Tutorial', 'Previous':'Sebelum', 'Next Step':'Langkah Seterusnya', 'Restart Tutorial':'Mula Semula',
    'tutorial-intro':'Pelajari konsep set asas langkah demi langkah. Klik "Langkah Seterusnya" untuk meneruskan.',
    'step1-title':'Apakah Set?', 'step1-desc':'Set adalah koleksi objek yang berbeza. Simbol A mewakili set. Bulatan ini menunjukkan set A.',
    'step2-title':'Elemen dalam Set', 'step2-desc':'Elemen adalah objek di dalam set. Klik cip untuk menambah elemen "a" ke set A. Perhatikan bagaimana ia muncul di dalam bulatan.',
    'step3-title':'Dua Set Bebas', 'step3-desc':'Di sini kita ada dua set bebas: A dan B. Setiap set boleh mempunyai elemen sendiri. Klik cip untuk menambah elemen ke setiap set.',
    'step4-title':'Simbol Kesatuan (A ∪ B)', 'step4-desc':'Simbol kesatuan ∪ bermaksud "ATAU". A ∪ B bermaksud semua elemen yang ada dalam A ATAU B (atau kedua-duanya). Kawasan yang disorot menunjukkan kesatuan.',
    'step5-title':'Simbol Persilangan (A ∩ B)', 'step5-desc':'Simbol persilangan ∩ bermaksud "DAN". A ∩ B bermaksud HANYA elemen yang ada dalam KEDUA-DUA A DAN B. Kawasan yang disorot menunjukkan persilangan.',
    'step6-title':'Simbol Perbezaan Set (A \\ B)', 'step6-desc':'Simbol perbezaan set \\ bermaksud "TOLAK". A \\ B bermaksud elemen yang ada dalam A tetapi TIDAK dalam B. Kawasan yang disorot menunjukkan A \\ B.',
    'step7-title':'Simbol Pelengkap (A ∪ B)′', 'step7-desc':'Simbol pelengkap ′ bermaksud "TIDAK". (A ∪ B)′ bermaksud elemen yang TIDAK dalam A dan TIDAK dalam B. Kawasan yang disorot menunjukkan pelengkap.',
    'step8-title':'Set Saling Eksklusif', 'step8-desc':'Set saling eksklusif TIDAK mempunyai elemen sepunya. Persilangan mereka kosong (A ∩ B = ∅). Perhatikan bagaimana bulatan tidak bertindih.'
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
  C: new Set(),
  goal: null, // {labelEN,labelBM,fn}
  answer: new Set(),
  setCount: 2,
  target: 'A',
  mode: 'practice', // 'practice' or 'tutorial'
  tutorialStep: 1,
  stats: { totalTasks: 0, correct: 0, streak: 0, maxStreak: 0 }
};

// Elements
const uniEl = document.getElementById('universe');
const regionA = document.getElementById('regionA');
const regionAB = document.getElementById('regionAB');
const regionB = document.getElementById('regionB');
const regionAC = document.getElementById('regionAC');
const regionBC = document.getElementById('regionBC');
const regionABC = document.getElementById('regionABC');
const regionC = document.getElementById('regionC');
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
  const A = state.A, B = state.B, C = state.C;
  if(state.target==='A'){
    if(A.has(x)) A.delete(x); else A.add(x);
  } else if(state.target==='B'){
    if(B.has(x)) B.delete(x); else B.add(x);
  } else if(state.target==='C'){
    if(C.has(x)) C.delete(x); else C.add(x);
  } else { // OUT: ensure x not in A, B, or C
    A.delete(x); B.delete(x); C.delete(x);
  }
  renderVenn();
  
  // Announce changes for screen readers
  const announcement = `Element ${x} ${state.target === 'A' ? (A.has(x) ? 'added to' : 'removed from') : 
                      state.target === 'B' ? (B.has(x) ? 'added to' : 'removed from') :
                      state.target === 'C' ? (C.has(x) ? 'added to' : 'removed from') : 'moved to outside'} set ${state.target}`;
  announceToScreenReader(announcement);
}

function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
}

// Render Venn placements
function renderVenn(){
  const regions = [regionA, regionAB, regionB, regionAC, regionBC, regionABC, regionC, regionOut];
  regions.forEach(g=>g.innerHTML='');
  
  const stacks = {A:0, AB:0, B:0, AC:0, BC:0, ABC:0, C:0, OUT:0};
  U.forEach(x=>{
    const inA = state.A.has(x), inB = state.B.has(x), inC = state.C.has(x);
    let region = 'OUT';
    
    if(state.setCount === 2) {
      if(inA && inB) region='AB'; 
      else if(inA) region='A'; 
      else if(inB) region='B';
    } else {
      // 3-set logic
      if(inA && inB && inC) region='ABC';
      else if(inA && inB) region='AB';
      else if(inA && inC) region='AC';
      else if(inB && inC) region='BC';
      else if(inA) region='A';
      else if(inB) region='B';
      else if(inC) region='C';
    }
    
    const t = document.createElementNS('http://www.w3.org/2000/svg','text');
    t.setAttribute('font-size','14'); t.textContent = x;
    
    // Position elements based on region
    if(region==='A'){ t.setAttribute('x',150); t.setAttribute('y',130+stacks.A*18); stacks.A++; regionA.appendChild(t); }
    else if(region==='AB'){ t.setAttribute('x',240); t.setAttribute('y',160+stacks.AB*18); stacks.AB++; regionAB.appendChild(t); }
    else if(region==='B'){ t.setAttribute('x',330); t.setAttribute('y',130+stacks.B*18); stacks.B++; regionB.appendChild(t); }
    else if(region==='AC'){ t.setAttribute('x',200); t.setAttribute('y',100+stacks.AC*18); stacks.AC++; regionAC.appendChild(t); }
    else if(region==='BC'){ t.setAttribute('x',280); t.setAttribute('y',100+stacks.BC*18); stacks.BC++; regionBC.appendChild(t); }
    else if(region==='ABC'){ t.setAttribute('x',250); t.setAttribute('y',140+stacks.ABC*18); stacks.ABC++; regionABC.appendChild(t); }
    else if(region==='C'){ t.setAttribute('x',250); t.setAttribute('y',60+stacks.C*18); stacks.C++; regionC.appendChild(t); }
    else { t.setAttribute('x',60); t.setAttribute('y',70+stacks.OUT*18); stacks.OUT++; regionOut.appendChild(t); }
  });

  document.querySelectorAll('#universe .chip').forEach(ch=>{
    const x = ch.textContent.trim();
    const inA = state.A.has(x), inB = state.B.has(x), inC = state.C.has(x);
    ch.classList.toggle('active', inA || inB || inC);
    ch.setAttribute('aria-pressed', (inA||inB||inC) ? 'true':'false');
  });

  if(state.goal){
    state.answer = state.goal.fn(state.A, state.B, state.C);
    answerPeek.textContent = '{ ' + [...state.answer].join(', ') + ' }';
  } else {
    answerPeek.textContent = '';
  }
  
  // Update highlight styling based on current state
  const currentOp = document.getElementById('opSelect').value;
  setHighlight(currentOp);
}

// Highlights
function setHighlight(op){
  const ids = ['hl-union','hl-intersection','hl-AminusB','hl-BminusA','hl-complement'];
  ids.forEach(id=>{ document.getElementById(id).setAttribute('opacity','0'); });
  
  // Check if sets are identical for special styling
  const setsIdentical = state.A.size === state.B.size && 
                       [...state.A].every(x => state.B.has(x)) && 
                       [...state.B].every(x => state.A.has(x));
  
  const vennEl = document.getElementById('venn');
  if(setsIdentical) {
    vennEl.classList.add('venn-identical');
  } else {
    vennEl.classList.remove('venn-identical');
  }
  
  if(op==='union') document.getElementById('hl-union').setAttribute('opacity','1');
  if(op==='intersection') {
    document.getElementById('hl-intersection').setAttribute('opacity','1');
    // Add extra emphasis for intersection when sets are identical
    if(setsIdentical) {
      document.getElementById('hl-intersection').classList.add('tutorial-highlight');
    } else {
      document.getElementById('hl-intersection').classList.remove('tutorial-highlight');
    }
  }
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
  {labelEN:'List elements of (A ∪ B)′', labelBM:'Senaraikan ahli bagi (A ∪ B)′', fn:(A,B)=> new Set([...U].filter(x=>!A.has(x) && !B.has(x)))},
  {labelEN:'List elements of A′', labelBM:'Senaraikan ahli bagi A′', fn:(A,B)=> new Set([...U].filter(x=>!A.has(x)))},
  {labelEN:'List elements of B′', labelBM:'Senaraikan ahli bagi B′', fn:(A,B)=> new Set([...U].filter(x=>!B.has(x)))},
  {labelEN:'List elements of A ∩ B′', labelBM:'Senaraikan ahli bagi A ∩ B′', fn:(A,B)=> new Set([...A].filter(x=>!B.has(x)))},
  {labelEN:'List elements of A′ ∩ B', labelBM:'Senaraikan ahli bagi A′ ∩ B', fn:(A,B)=> new Set([...B].filter(x=>!A.has(x)))},
];

function newTask(){
  state.A = new Set(U.filter(()=>Math.random()<0.5));
  state.B = new Set(U.filter(()=>Math.random()<0.5));
  const t = tasks[Math.floor(Math.random()*tasks.length)];
  state.goal = t;
  taskText.textContent = (LANG==='bm'? t.labelBM : t.labelEN);
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  renderVenn();
  
  // Auto-highlight the relevant operation
  const opKey = taskText.textContent.includes('∩') ? 'intersection'
             : taskText.textContent.includes('∪') ? 'union'
             : taskText.textContent.includes('A \\ B') ? 'AminusB'
             : taskText.textContent.includes('B \\ A') ? 'BminusA'
             : taskText.textContent.includes('(A ∪ B)′') ? 'complement'
             : 'none';
  document.getElementById('opSelect').value = opKey; 
  setHighlight(opKey);
  
  // Add pulse animation to task text
  taskText.classList.add('pulse');
  setTimeout(() => taskText.classList.remove('pulse'), 600);
}

function checkAnswer(){
  if(!state.goal){ 
    feedbackEl.className='feedback bad'; 
    feedbackEl.textContent = (LANG==='bm'?'Tiada soalan. Klik Soalan Baharu.':'No task yet. Click New Task.'); 
    return; 
  }
  
  state.stats.totalTasks++;
  const user = state.goal.fn(state.A, state.B);
  const ok = user.size===state.answer.size && [...user].every(x=>state.answer.has(x));
  
  if(ok){
    state.stats.correct++;
    state.stats.streak++;
    if(state.stats.streak > state.stats.maxStreak) {
      state.stats.maxStreak = state.stats.streak;
    }
    
    feedbackEl.className='feedback good';
    const accuracy = Math.round((state.stats.correct / state.stats.totalTasks) * 100);
    const streakText = state.stats.streak > 1 ? ` (${state.stats.streak} streak!)` : '';
    feedbackEl.textContent = (LANG==='bm'?'✔ Betul!':'✔ Correct!') + streakText;
    
    // Add celebration animation
    feedbackEl.classList.add('pulse');
    setTimeout(() => feedbackEl.classList.remove('pulse'), 1000);
  } else {
    state.stats.streak = 0;
    feedbackEl.className='feedback bad';
    feedbackEl.textContent = (LANG==='bm'?'✘ Belum tepat. Jawapan sebenar: ':'✘ Not yet. True set: ') + '{ ' + [...state.answer].join(', ') + ' }';
  }
  
  updateStats();
}

function updateStats(){
  const accuracy = state.stats.totalTasks > 0 ? Math.round((state.stats.correct / state.stats.totalTasks) * 100) : 0;
  const statsText = `Accuracy: ${accuracy}% | Streak: ${state.stats.streak} | Best: ${state.stats.maxStreak}`;
  
  // Update or create stats display
  let statsEl = document.getElementById('statsDisplay');
  if(!statsEl) {
    statsEl = document.createElement('div');
    statsEl.id = 'statsDisplay';
    statsEl.className = 'tiny';
    statsEl.style.cssText = 'margin-top: 8px; padding: 8px; background: #f1f5f9; border-radius: 8px; font-family: monospace;';
    document.querySelector('.card.soft').appendChild(statsEl);
  }
  statsEl.textContent = statsText;
}

// Wiring
document.getElementById('newTaskBtn').addEventListener('click', newTask);
document.getElementById('checkBtn').addEventListener('click', checkAnswer);
document.getElementById('resetBtn').addEventListener('click', ()=>{ state.A.clear(); state.B.clear(); state.C.clear(); renderVenn(); feedbackEl.textContent=''; });

document.getElementById('setCountSeg').addEventListener('click', (e)=>{
  if(e.target.tagName!=='BUTTON') return;
  const count = e.target.dataset.count;
  document.querySelectorAll('#setCountSeg button').forEach(b=>b.setAttribute('aria-pressed', b===e.target?'true':'false'));
  state.setCount = +count;
  
  // Show/hide 3rd circle and update target options
  const circleC = document.querySelector('.baseC');
  const textC = document.querySelector('text[style*="display: none"]');
  const targetSeg = document.getElementById('targetSeg');
  
  if(count === '3') {
    circleC.style.display = 'block';
    textC.style.display = 'block';
    document.getElementById('venn').classList.add('venn-3-set');
    
    // Add C option to target selector
    if(!document.querySelector('[data-target="C"]')) {
      const cBtn = document.createElement('button');
      cBtn.setAttribute('data-target', 'C');
      cBtn.setAttribute('aria-pressed', 'false');
      cBtn.textContent = 'C';
      targetSeg.appendChild(cBtn);
    }
  } else {
    circleC.style.display = 'none';
    textC.style.display = 'none';
    document.getElementById('venn').classList.remove('venn-3-set');
    
    // Remove C option and reset target if needed
    const cBtn = document.querySelector('[data-target="C"]');
    if(cBtn) cBtn.remove();
    if(state.target === 'C') setTarget('A');
  }
  
  // Clear sets and re-render
  state.A.clear();
  state.B.clear();
  state.C.clear();
  renderVenn();
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

// Tutorial controls
document.getElementById('tutorialBtn').addEventListener('click', () => setMode('tutorial'));
document.getElementById('modeSeg').addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    setMode(e.target.dataset.mode);
  }
});
document.getElementById('nextStepBtn').addEventListener('click', nextTutorialStep);
document.getElementById('prevStepBtn').addEventListener('click', prevTutorialStep);
document.getElementById('resetTutorialBtn').addEventListener('click', startTutorial);

// Keyboard shortcuts 1–9 => toggle membership in current target
window.addEventListener('keydown', (e)=>{
  if(e.key>='1' && e.key<='9'){
    const idx = parseInt(e.key,10)-1; if(idx>=0 && idx<U.length){ toggleMembership(U[idx]); }
  }
});

// Tutorial functionality
const tutorialSteps = [
  {
    title: 'step1-title',
    desc: 'step1-desc',
    setup: () => {
      state.A = new Set();
      state.B = new Set();
      setHighlight('none');
      showSingleSet();
    }
  },
  {
    title: 'step2-title',
    desc: 'step2-desc',
    setup: () => {
      state.A = new Set(['a']);
      state.B = new Set();
      setHighlight('none');
      showSingleSet();
    }
  },
  {
    title: 'step3-title',
    desc: 'step3-desc',
    setup: () => {
      state.A = new Set(['a']);
      state.B = new Set(['b']);
      setHighlight('none');
      showTwoSets();
    }
  },
  {
    title: 'step4-title',
    desc: 'step4-desc',
    setup: () => {
      state.A = new Set(['a']);
      state.B = new Set(['b']);
      setHighlight('union');
      showTwoSets();
    }
  },
  {
    title: 'step5-title',
    desc: 'step5-desc',
    setup: () => {
      state.A = new Set(['a', 'c']);
      state.B = new Set(['b', 'c']);
      setHighlight('intersection');
      showTwoSets();
    }
  },
  {
    title: 'step6-title',
    desc: 'step6-desc',
    setup: () => {
      state.A = new Set(['a', 'c']);
      state.B = new Set(['b', 'c']);
      setHighlight('AminusB');
      showTwoSets();
    }
  },
  {
    title: 'step7-title',
    desc: 'step7-desc',
    setup: () => {
      state.A = new Set(['a', 'c']);
      state.B = new Set(['b', 'c']);
      setHighlight('complement');
      showTwoSets();
    }
  },
  {
    title: 'step8-title',
    desc: 'step8-desc',
    setup: () => {
      state.A = new Set(['a']);
      state.B = new Set(['b']);
      setHighlight('none');
      showMutuallyExclusive();
    }
  }
];

function setMode(mode) {
  state.mode = mode;
  document.querySelectorAll('#modeSeg button').forEach(b => {
    b.setAttribute('aria-pressed', b.dataset.mode === mode ? 'true' : 'false');
  });
  
  const practicePanel = document.getElementById('practicePanel');
  const tutorialPanel = document.getElementById('tutorialPanel');
  
  if (mode === 'tutorial') {
    practicePanel.style.display = 'none';
    tutorialPanel.style.display = 'block';
    startTutorial();
  } else {
    practicePanel.style.display = 'block';
    tutorialPanel.style.display = 'none';
  }
}

function startTutorial() {
  state.tutorialStep = 1;
  updateTutorialStep();
}

function updateTutorialStep() {
  const step = tutorialSteps[state.tutorialStep - 1];
  const titleEl = document.getElementById('tutorialTitle');
  const contentEl = document.getElementById('tutorialContent');
  const stepCounter = document.getElementById('stepCounter');
  const progressFill = document.getElementById('progressFill');
  const prevBtn = document.getElementById('prevStepBtn');
  const nextBtn = document.getElementById('nextStepBtn');
  
  // Update content
  titleEl.textContent = (LANG === 'bm' ? STRINGS.bm[step.title] : STRINGS.en[step.title]);
  
  // Check if sets are identical and add special note for intersection step
  const setsIdentical = state.A.size === state.B.size && 
                       [...state.A].every(x => state.B.has(x)) && 
                       [...state.B].every(x => state.A.has(x));
  
  let content = `<p>${LANG === 'bm' ? STRINGS.bm[step.desc] : STRINGS.en[step.desc]}</p>`;
  
  if(setsIdentical && state.tutorialStep === 3) { // Intersection step
    const identicalNote = LANG === 'bm' ? 
      '<p style="background: #fef3c7; padding: 8px; border-radius: 6px; border-left: 4px solid #f59e0b; margin-top: 8px;"><strong>Nota:</strong> Set A dan B adalah sama! Intersection (A ∩ B) = A = B. Perhatikan kawasan yang disorot dengan warna ungu.</p>' :
      '<p style="background: #fef3c7; padding: 8px; border-radius: 6px; border-left: 4px solid #f59e0b; margin-top: 8px;"><strong>Note:</strong> Sets A and B are identical! Intersection (A ∩ B) = A = B. Notice the highlighted purple area.</p>';
    content += identicalNote;
  }
  
  contentEl.innerHTML = content;
  
  // Update progress
  const progress = (state.tutorialStep / tutorialSteps.length) * 100;
  progressFill.style.width = `${progress}%`;
  stepCounter.textContent = `Step ${state.tutorialStep} of ${tutorialSteps.length}`;
  
  // Update buttons
  prevBtn.disabled = state.tutorialStep === 1;
  nextBtn.textContent = state.tutorialStep === tutorialSteps.length ? 
    (LANG === 'bm' ? '✅ Selesai' : '✅ Complete') : 
    (LANG === 'bm' ? '➡️ Langkah Seterusnya' : '➡️ Next Step');
  
  // Setup the step
  step.setup();
  renderVenn();
}

function nextTutorialStep() {
  if (state.tutorialStep < tutorialSteps.length) {
    state.tutorialStep++;
    updateTutorialStep();
  } else {
    // Tutorial complete - switch to practice mode
    setMode('practice');
  }
}

function prevTutorialStep() {
  if (state.tutorialStep > 1) {
    state.tutorialStep--;
    updateTutorialStep();
  }
}

// Helper functions for different set configurations
function showSingleSet() {
  const circleB = document.querySelector('.baseB');
  const textB = document.querySelector('text[style*="display: none"]');
  const circleC = document.querySelector('.baseC');
  const textC = document.querySelector('text[style*="display: none"]');
  const vennEl = document.getElementById('venn');
  
  // Hide set B and C
  circleB.style.display = 'none';
  textB.style.display = 'none';
  circleC.style.display = 'none';
  textC.style.display = 'none';
  
  // Remove any special styling
  vennEl.classList.remove('venn-mutually-exclusive');
  
  // Update universe to show only single elements
  updateUniverseForTutorial(['a', 'b', 'c', 'd']);
}

function showTwoSets() {
  const circleB = document.querySelector('.baseB');
  const textB = document.querySelector('text[style*="display: none"]');
  const circleC = document.querySelector('.baseC');
  const textC = document.querySelector('text[style*="display: none"]');
  const vennEl = document.getElementById('venn');
  
  // Show set B, hide set C
  circleB.style.display = 'block';
  textB.style.display = 'block';
  circleC.style.display = 'none';
  textC.style.display = 'none';
  
  // Remove any special styling
  vennEl.classList.remove('venn-mutually-exclusive');
  
  // Update universe to show elements
  updateUniverseForTutorial(['a', 'b', 'c', 'd']);
}

function showMutuallyExclusive() {
  const circleB = document.querySelector('.baseB');
  const textB = document.querySelector('text[style*="display: none"]');
  const circleC = document.querySelector('.baseC');
  const textC = document.querySelector('text[style*="display: none"]');
  const vennEl = document.getElementById('venn');
  
  // Show set B, hide set C
  circleB.style.display = 'block';
  textB.style.display = 'block';
  circleC.style.display = 'none';
  textC.style.display = 'none';
  
  // Apply mutually exclusive styling
  vennEl.classList.add('venn-mutually-exclusive');
  
  // Update universe to show elements
  updateUniverseForTutorial(['a', 'b', 'c', 'd']);
}

function updateUniverseForTutorial(elements) {
  uniEl.innerHTML = '';
  elements.forEach(x => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = x;
    chip.setAttribute('aria-pressed', 'false');
    chip.addEventListener('click', () => toggleMembership(x));
    uniEl.appendChild(chip);
  });
}

// Init
buildUniverse();
setTarget('A');
renderVenn();
applyI18n();
