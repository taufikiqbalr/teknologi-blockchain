import { course, weeks, assessments } from "./course-data.js";

const qs = (s) => document.querySelector(s);
const escapeHtml = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));

const phases = [
  {id:"all",label:"All weeks",range:"1–16",desc:"Full semester"},
  {id:"foundation",label:"Foundation",range:"1–4",desc:"Concept → crypto"},
  {id:"mechanism",label:"Mechanism",range:"5–7",desc:"Consensus → design"},
  {id:"build",label:"Build",range:"9–12",desc:"DApp → Fabric"},
  {id:"evaluate",label:"Evaluate",range:"13–16",desc:"Security → UAS"}
];

let activePhase = "all";
let scheduleView = "journey";

function phaseOf(week){
  if (week <= 4) return "foundation";
  if (week <= 7) return "mechanism";
  if (week === 8) return "exam";
  if (week <= 12) return "build";
  if (week <= 16) return "evaluate";
  return "other";
}
function phaseLabel(week){
  const p = phaseOf(week);
  return ({foundation:"Foundation",mechanism:"Mechanism",exam:"Midterm",build:"Build",evaluate:"Evaluate"})[p] || "";
}
function tagClass(type){ return type === "quiz" ? "quiz" : type === "task" ? "task" : type === "exam" ? "exam" : "formative"; }
function tagLabel(type){ return type === "quiz" ? "Kuis" : type === "task" ? "Tugas" : type === "exam" ? "Ujian" : "Formatif"; }

function renderHeroClasses(){
  const dayShort = {Senin:"MON",Selasa:"TUE",Jumat:"FRI"};
  qs("#heroClasses").innerHTML = course.classes.map(c => `
    <article class="hero-class">
      <div class="day-badge">${dayShort[c.day] || c.day.slice(0,3).toUpperCase()}</div>
      <div>
        <strong>${escapeHtml(c.code)} · ${escapeHtml(c.track)}</strong>
        <span>${escapeHtml(c.day)} · ${escapeHtml(c.time)}</span>
      </div>
      <span class="mode-badge">${escapeHtml(c.mode)}</span>
    </article>`
  ).join("");
}

function renderClassGrid(){
  qs("#classGrid").innerHTML = course.classes.map((c,i) => `
    <article class="class-card">
      <span class="class-code">${escapeHtml(c.code)} · ${escapeHtml(c.track.toUpperCase())}</span>
      <h3>Teknologi Blockchain</h3>
      <div class="class-detail">
        <span class="class-icon">📅</span><span><strong>${escapeHtml(c.day)}</strong><br/>${escapeHtml(c.time)}</span>
        <span class="class-icon">${escapeHtml(c.icon)}</span><span><strong>${escapeHtml(c.mode)}</strong><br/>${c.mode==="Zoom"?"Online synchronous":"On-campus class"}</span>
      </div>
      <span class="class-action">↗</span>
    </article>`
  ).join("");
}

function renderPhaseRail(){
  qs("#phaseRail").innerHTML = phases.map(p => `
    <button class="phase-card ${activePhase===p.id?"active":""}" data-phase="${p.id}">
      <small>${p.range}</small>
      <strong>${p.label}</strong>
      <span>${p.desc}</span>
    </button>`
  ).join("");
  qs("#phaseRail").querySelectorAll("[data-phase]").forEach(btn => btn.addEventListener("click", () => {
    activePhase = btn.dataset.phase;
    renderPhaseRail();
    renderSchedule();
  }));
}

function scheduleRows(){
  const term = qs("#scheduleSearch").value.trim().toLowerCase();
  return weeks.filter(w => {
    const phaseMatch = activePhase === "all" || phaseOf(w.week) === activePhase;
    const hay = [w.week,w.topic,w.focus,w.sub,w.activity,w.assessment,...w.concepts].join(" ").toLowerCase();
    return phaseMatch && (!term || hay.includes(term));
  });
}

function renderSchedule(){
  const rows = scheduleRows();
  qs("#scheduleJourney").innerHTML = rows.map(w => `
    <article class="journey-card ${w.type==="exam"?"exam-week":""}">
      <div class="journey-week">
        <div class="week-pill">${w.week}</div>
      </div>
      <div class="journey-title">
        <span class="journey-phase">${phaseLabel(w.week)}</span>
        <strong>${escapeHtml(w.topic)}</strong>
        <span>${escapeHtml(w.sub || (w.type==="exam"?"Semester Assessment":"Enrichment"))}</span>
      </div>
      <div class="journey-focus">${escapeHtml(w.focus)}</div>
      <div class="journey-assessment">
        <span class="tag ${tagClass(w.assessmentType)}">${tagLabel(w.assessmentType)}</span>
        <strong>${escapeHtml(w.assessment)}</strong>
      </div>
    </article>`
  ).join("") || '<p class="section-sub">Tidak ada minggu yang cocok dengan pencarian.</p>';

  qs("#scheduleCompact").innerHTML = rows.map(w => `
    <article class="compact-card">
      <div class="material-top"><div class="week-pill">${w.week}</div><span class="tag ${tagClass(w.assessmentType)}">${tagLabel(w.assessmentType)}</span></div>
      <h3>${escapeHtml(w.topic)}</h3>
      <p>${escapeHtml(w.assessment)}</p>
    </article>`
  ).join("");
}

function materialCard(w){
  const files = [];
  if(w.slides) files.push('<span class="file-pill">PPTX · '+escapeHtml(w.slides)+'</span>');
  if(w.handson) files.push('<span class="file-pill">PDF · '+escapeHtml(w.handson)+'</span>');
  return `
    <article class="material-card">
      <div class="material-top">
        <span class="material-week">WEEK ${String(w.week).padStart(2,"0")}</span>
        <span class="tag ${tagClass(w.assessmentType)}">${tagLabel(w.assessmentType)}</span>
      </div>
      <h3>${escapeHtml(w.topic)}</h3>
      <div class="subcpmk">${escapeHtml(w.sub || (w.type==="exam"?"ASSESSMENT":"ENRICHMENT"))}</div>
      <p>${escapeHtml(w.focus)}</p>
      <div class="concept-list">${w.concepts.map(c => '<span>'+escapeHtml(c)+'</span>').join("")}</div>
      <div class="material-foot">
        <strong>Class activity</strong><br/>${escapeHtml(w.activity)}
        <div class="file-map">${files.length?files.join(""):'<span class="file-pill">No material file</span>'}</div>
      </div>
    </article>`;
}

function renderMaterials(){
  const term = qs("#materialSearch").value.trim().toLowerCase();
  const type = qs("#materialType").value;
  const rows = weeks.filter(w => {
    const okType = type==="all" || (type==="exam" ? w.type==="exam" : w.type==="lecture");
    const hay = [w.topic,w.focus,w.activity,...w.concepts].join(" ").toLowerCase();
    return okType && (!term || hay.includes(term));
  });
  qs("#materialGrid").innerHTML = rows.map(materialCard).join("");
}

function renderAssessments(){
  const groupCount = assessments.filter(a => a.group==="Kelompok").length;
  qs("#assessmentSummary").innerHTML = [
    ["50%","Non-exam assessment"],
    ["02","Kuis"],
    ["07","Task / presentation"],
    [String(groupCount).padStart(2,"0"),"Group assessments"]
  ].map(([n,l]) => '<div class="summary-card"><strong>'+n+'</strong><span>'+l+'</span></div>').join("");

  qs("#assessmentList").innerHTML = assessments.map(a => `
    <article class="assessment-row">
      <div class="assessment-week">W${String(a.week).padStart(2,"0")}</div>
      <div><h4>${escapeHtml(a.title)}</h4><p>${escapeHtml(a.kind)} · ${escapeHtml(a.group)}</p></div>
      <div class="subcpmk">${escapeHtml(a.sub)}</div>
      <div class="weight">${a.weight}%</div>
    </article>`
  ).join("");
}

function renderGrading(){
  qs("#gradingBars").innerHTML = course.grading.map(g => `
    <div class="grade-line">
      <strong>${escapeHtml(g.name)}</strong>
      <div class="bar"><i style="width:${Math.min(g.weight*3.25,100)}%"></i></div>
      <span>${g.weight}%</span>
    </div>`
  ).join("");
}

function renderReferences(){
  qs("#referenceGrid").innerHTML = course.references.map((r,i) => `
    <div class="reference-card">
      <strong>REF ${String(i+1).padStart(2,"0")}</strong>
      <span>${escapeHtml(r)}</span>
    </div>`
  ).join("");
}

function initInteractions(){
  qs("#navToggle").addEventListener("click",()=>qs("#mainNav").classList.toggle("open"));
  qs("#mainNav").querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>qs("#mainNav").classList.remove("open")));
  qs("#scheduleSearch").addEventListener("input",renderSchedule);
  qs("#materialSearch").addEventListener("input",renderMaterials);
  qs("#materialType").addEventListener("change",renderMaterials);
  qs("#scheduleViewSwitch").querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{
    scheduleView=btn.dataset.view;
    qs("#scheduleViewSwitch").querySelectorAll("button").forEach(b=>b.classList.toggle("active",b===btn));
    qs("#scheduleJourney").classList.toggle("hidden",scheduleView!=="journey");
    qs("#scheduleCompact").classList.toggle("hidden",scheduleView!=="compact");
  }));
}

renderHeroClasses();
renderClassGrid();
renderPhaseRail();
renderSchedule();
renderMaterials();
renderAssessments();
renderGrading();
renderReferences();
initInteractions();
