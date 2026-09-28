const modal = document.querySelector("#gameModal");
const stage = document.querySelector("#gameStage");
const closeBtn = document.querySelector("#closeGameModal");
let cleanup = null;

const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem("bcGame_" + key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) { localStorage.setItem("bcGame_" + key, JSON.stringify(value)); }
};

const GAME_XP = { runner:120, memory:100, chain:100, consensus:120 };

function updateProfile() {
  const cleared = Object.keys(GAME_XP).filter(k => store.get("cleared_" + k, false));
  const xp = cleared.reduce((sum, k) => sum + GAME_XP[k], 0);
  const rank = xp >= 400 ? "Validator Elite" : xp >= 300 ? "Consensus Pro" : xp >= 200 ? "Chain Builder" : xp >= 100 ? "Active Node" : "Rookie Node";
  document.querySelector("#gameXp").textContent = xp;
  document.querySelector("#gamesCleared").textContent = cleared.length + " / 4";
  document.querySelector("#gameRank").textContent = rank;
}

function markCleared(game) {
  if (!store.get("cleared_" + game, false)) {
    store.set("cleared_" + game, true);
    updateProfile();
  }
}

function gameShell(kicker, title, desc, label, value, body) {
  return `<div class="game-shell">
    <div class="game-shell-head">
      <div><span class="eyebrow">${kicker}</span><h2>${title}</h2><p>${desc}</p></div>
      <div class="game-scorebox"><small>${label}</small><strong id="gameScoreValue">${value}</strong></div>
    </div>
    ${body}
  </div>`;
}

function closeGame() {
  if (cleanup) { cleanup(); cleanup = null; }
  modal.close();
}

function openGame(type) {
  if (cleanup) { cleanup(); cleanup = null; }
  if (type === "runner") initRunner();
  if (type === "memory") initMemory();
  if (type === "chain") initChain();
  if (type === "consensus") initConsensus();
  modal.showModal();
}

closeBtn.addEventListener("click", closeGame);
modal.addEventListener("click", e => { if (e.target === modal) closeGame(); });
document.querySelectorAll(".play-game").forEach(btn => btn.addEventListener("click", () => openGame(btn.dataset.game)));

document.querySelector("#resetGameProgress").addEventListener("click", () => {
  if (confirm("Reset semua high score dan progress game di browser ini?")) {
    Object.keys(localStorage).filter(k => k.startsWith("bcGame_")).forEach(k => localStorage.removeItem(k));
    updateProfile();
  }
});

function initRunner() {
  const best = store.get("runner_best", 0);
  stage.innerHTML = gameShell("ARCADE · DINO STYLE","Block Runner","Tekan Space / Arrow Up / tombol Jump untuk melompati invalid block. Raih 250 poin untuk clear.","BEST",best,`
    <div class="runner-wrap"><canvas id="runnerCanvas" class="runner-canvas" width="760" height="280"></canvas></div>
    <div class="game-controls">
      <button class="arcade-btn" id="runnerStart">Start / Restart</button>
      <button class="arcade-btn secondary" id="runnerJump">Jump</button>
    </div>
    <div class="game-help">Desktop: Space / Arrow Up. Mobile: tap canvas atau tombol Jump.</div>
    <div id="runnerResult" class="game-result">Ready. Reach 250 points to clear.</div>`);

  const canvas = document.querySelector("#runnerCanvas");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.querySelector("#gameScoreValue");
  const result = document.querySelector("#runnerResult");
  const ground = 224;
  const player = { x:70, y:186, w:36, h:38, vy:0 };
  let obstacles = [], running = false, score = 0, speed = 5, spawn = 0, raf = 0;

  function reset() {
    running = true; score = 0; speed = 5; spawn = 0; obstacles = [];
    player.y = ground - player.h; player.vy = 0;
    result.className = "game-result"; result.textContent = "Go!";
    cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
  }
  function jump() {
    if (running && player.y >= ground - player.h - 1) player.vy = -13.2;
  }
  function collide(a,b) {
    return a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y;
  }
  function draw() {
    ctx.clearRect(0,0,760,280);
    ctx.fillStyle="#07131f"; ctx.fillRect(0,0,760,280);
    ctx.strokeStyle="#15313d"; ctx.lineWidth=1;
    for(let x=0;x<760;x+=38){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,280);ctx.stroke();}
    for(let y=0;y<280;y+=38){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(760,y);ctx.stroke();}
    ctx.fillStyle="#1a3a43"; ctx.fillRect(0,ground,760,3);
    ctx.fillStyle="#9ef4cf"; ctx.fillRect(player.x,player.y,player.w,player.h);
    ctx.fillStyle="#07131f"; ctx.fillRect(player.x+24,player.y+8,5,5);
    ctx.fillStyle="#ff63ab";
    obstacles.forEach(o=>{ctx.fillRect(o.x,o.y,o.w,o.h);ctx.fillStyle="#ffd35b";ctx.fillRect(o.x+5,o.y+7,o.w-10,4);ctx.fillStyle="#ff63ab";});
    ctx.fillStyle="#8098a2"; ctx.font="700 13px sans-serif"; ctx.fillText("BLOCK RUNNER // " + Math.floor(score),18,24);
  }
  function over() {
    running=false; cancelAnimationFrame(raf);
    const s=Math.floor(score), old=store.get("runner_best",0);
    if(s>old) store.set("runner_best",s);
    scoreEl.textContent=Math.max(s,old);
    result.className="game-result " + (s>=250?"win":"fail");
    result.textContent=s>=250 ? "Node survived. Game cleared! +120 XP" : "Invalid block hit. Score " + s + " — try again.";
    if(s>=250) markCleared("runner");
    draw();
  }
  function loop() {
    if(!running) return;
    player.vy += .72; player.y += player.vy;
    if(player.y > ground-player.h){player.y=ground-player.h;player.vy=0;}
    spawn--;
    if(spawn<=0){
      const h=28+Math.random()*32;
      obstacles.push({x:770,y:ground-h,w:22+Math.random()*18,h});
      spawn=65+Math.random()*55;
    }
    obstacles.forEach(o=>o.x-=speed);
    obstacles=obstacles.filter(o=>o.x>-50);
    if(obstacles.some(o=>collide(player,o))) return over();
    score += .72; speed=Math.min(9,5+score/180);
    draw(); raf=requestAnimationFrame(loop);
  }
  const key=e=>{if(["Space","ArrowUp"].includes(e.code)){e.preventDefault();jump();}};
  window.addEventListener("keydown",key);
  canvas.addEventListener("pointerdown",jump);
  document.querySelector("#runnerJump").onclick=jump;
  document.querySelector("#runnerStart").onclick=reset;
  draw();
  cleanup=()=>{running=false;cancelAnimationFrame(raf);window.removeEventListener("keydown",key);};
}

function initMemory() {
  const pairs=[
    ["Hash","Sidik jari data"],["Nonce","Nilai yang dicoba saat mining"],["Merkle Root","Ringkasan hash transaksi"],
    ["Private Key","Rahasia untuk signing"],["Consensus","Kesepakatan antar-node"],["Genesis Block","Blok pertama"]
  ];
  const cards=pairs.flatMap((p,i)=>[{pair:i,text:p[0]},{pair:i,text:p[1]}]).sort(()=>Math.random()-.5);
  const best=store.get("memory_best",null);
  stage.innerHTML=gameShell("PUZZLE · MEMORY","Hash Flip","Buka dua kartu. Match concept dengan clue yang benar. Selesaikan dengan moves sesedikit mungkin.","BEST MOVES",best||"—",`
    <div id="memoryBoard" class="memory-board"></div>
    <div id="memoryResult" class="game-result">0 / 6 pairs matched.</div>`);

  const board=document.querySelector("#memoryBoard"), result=document.querySelector("#memoryResult"), score=document.querySelector("#gameScoreValue");
  let first=null, second=null, lock=false, moves=0, matched=0;
  board.innerHTML=cards.map((c,i)=>'<button class="memory-tile" data-i="'+i+'">?</button>').join("");

  function click(e){
    const btn=e.target.closest(".memory-tile");
    if(!btn||lock||btn.classList.contains("matched")||btn===first) return;
    const c=cards[+btn.dataset.i]; btn.textContent=c.text; btn.classList.add("revealed");
    if(!first){first=btn;return;}
    second=btn; moves++; score.textContent=moves;
    const a=cards[+first.dataset.i], b=cards[+second.dataset.i];
    if(a.pair===b.pair){
      first.classList.add("matched"); second.classList.add("matched");
      first=null; second=null; matched++; result.textContent=matched+" / 6 pairs matched.";
      if(matched===6){
        const old=store.get("memory_best",null);
        if(old===null||moves<old) store.set("memory_best",moves);
        result.className="game-result win"; result.textContent="All pairs matched in "+moves+" moves. +100 XP";
        markCleared("memory");
      }
    } else {
      lock=true;
      setTimeout(()=>{first.textContent="?";second.textContent="?";first.classList.remove("revealed");second.classList.remove("revealed");first=null;second=null;lock=false;},650);
    }
  }
  board.addEventListener("click",click);
  cleanup=()=>board.removeEventListener("click",click);
}

function initChain() {
  const blocks=[
    {id:"A",hash:"8FA1",prev:"GENESIS"},
    {id:"B",hash:"C2D4",prev:"8FA1"},
    {id:"C",hash:"44B7",prev:"C2D4"},
    {id:"D",hash:"9AE2",prev:"44B7"}
  ];
  const shuffled=[...blocks].sort(()=>Math.random()-.5);
  const best=store.get("chain_best",null);
  stage.innerHTML=gameShell("LOGIC · HASH LINKS","Build the Chain","Klik blok dalam urutan valid. Mulai dari previous_hash = GENESIS, lalu cocokkan hash antarblok.","BEST TIME",best?best+"s":"—",`
    <div id="chainBoard" class="chain-board"></div>
    <div id="chainOutput" class="chain-output"></div>
    <div class="game-controls"><button id="chainReset" class="arcade-btn secondary">Shuffle / Reset</button></div>
    <div id="chainResult" class="game-result">Start from the genesis-linked block.</div>`);

  let expected="GENESIS", picked=[], start=null;
  const board=document.querySelector("#chainBoard"), output=document.querySelector("#chainOutput"), result=document.querySelector("#chainResult"), score=document.querySelector("#gameScoreValue");

  function render(){
    board.innerHTML=shuffled.map(b=>'<button class="chain-block '+(picked.includes(b.id)?"selected":"")+'" data-id="'+b.id+'"><strong>Block '+b.id+' · '+b.hash+'</strong><span>previous_hash: '+b.prev+'</span></button>').join("");
    output.innerHTML=picked.map(id=>'<span>Block '+id+'</span>').join("");
  }
  function onClick(e){
    const btn=e.target.closest(".chain-block"); if(!btn) return;
    const b=blocks.find(x=>x.id===btn.dataset.id);
    if(!start) start=performance.now();
    if(b.prev!==expected){
      picked=[]; expected="GENESIS"; start=performance.now();
      result.className="game-result fail"; result.textContent="Broken link. Chain reset — cek previous_hash.";
      render(); return;
    }
    picked.push(b.id); expected=b.hash; render();
    if(picked.length===blocks.length){
      const t=((performance.now()-start)/1000).toFixed(1), old=store.get("chain_best",null);
      if(old===null||+t<+old) store.set("chain_best",t);
      score.textContent=(old===null||+t<+old)?t+"s":old+"s";
      result.className="game-result win"; result.textContent="Valid chain built in "+t+"s. +100 XP";
      markCleared("chain");
    } else {
      result.className="game-result"; result.textContent="Good link. Next previous_hash must equal "+expected+".";
    }
  }
  board.addEventListener("click",onClick);
  document.querySelector("#chainReset").onclick=()=>{picked=[];expected="GENESIS";start=null;shuffled.sort(()=>Math.random()-.5);result.className="game-result";result.textContent="Shuffled. Start from GENESIS.";render();};
  render();
  cleanup=()=>board.removeEventListener("click",onClick);
}

function initConsensus() {
  const questions=[
    {q:"Public network dengan peserta tidak dikenal dan ingin tahan Sybil secara ekonomi?",opts:["PoW","RAFT","PBFT","Single leader"],a:0},
    {q:"Permissioned consortium, peserta dikenal, butuh finality cepat dan Byzantine fault tolerance?",opts:["PBFT","PoW","Solo","Random"],a:0},
    {q:"Cluster internal dengan node tepercaya dan fokus crash fault tolerance?",opts:["RAFT","PoW","PoS","Lottery"],a:0},
    {q:"Public chain yang memilih validator berdasarkan stake ekonomi?",opts:["PoS","RAFT","PBFT","Round-robin database"],a:0},
    {q:"Kriteria apa yang paling relevan saat memilih consensus?",opts:["Trust model, finality, fault tolerance, throughput","Warna UI","Ukuran logo","Nama token saja"],a:0}
  ];
  let idx=0, points=0, started=performance.now();
  const best=store.get("consensus_best",0);
  stage.innerHTML=gameShell("QUIZ · SPEED ROUND","Consensus Rush","Jawab 5 skenario consensus. Dapatkan minimal 4/5 untuk clear. Bonus jika cepat.","BEST SCORE",best+"/5",`
    <div id="consensusCard"></div>
    <div id="consensusResult" class="game-result">Question 1 / 5</div>`);

  const card=document.querySelector("#consensusCard"), result=document.querySelector("#consensusResult"), score=document.querySelector("#gameScoreValue");

  function render(){
    const item=questions[idx];
    card.innerHTML='<div class="consensus-question"><span>SCENARIO '+(idx+1)+'</span><h3>'+item.q+'</h3><div class="consensus-options">'+item.opts.map((o,i)=>'<button data-i="'+i+'">'+o+'</button>').join("")+'</div></div>';
  }
  function choose(e){
    const btn=e.target.closest("[data-i]"); if(!btn) return;
    const choice=+btn.dataset.i, item=questions[idx];
    if(choice===item.a) points++;
    idx++;
    if(idx>=questions.length){
      const seconds=((performance.now()-started)/1000).toFixed(1), old=store.get("consensus_best",0);
      if(points>old) store.set("consensus_best",points);
      score.textContent=Math.max(points,old)+"/5";
      card.innerHTML='<div class="consensus-finish"><strong>'+points+'/5</strong><span>'+seconds+' seconds</span></div>';
      result.className="game-result "+(points>=4?"win":"fail");
      result.textContent=points>=4 ? "Consensus mastered. +120 XP" : "Belum clear — butuh minimal 4 jawaban benar.";
      if(points>=4) markCleared("consensus");
      return;
    }
    result.textContent="Question "+(idx+1)+" / 5 · Score "+points;
    render();
  }
  card.addEventListener("click",choose); render();
  cleanup=()=>card.removeEventListener("click",choose);
}

updateProfile();