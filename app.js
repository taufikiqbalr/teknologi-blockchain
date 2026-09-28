import { course, weeks, assessments } from "./course-data.js";

const q = (s) => document.querySelector(s);

function tagClass(type){
  return type === "quiz" ? "quiz" : type === "task" ? "task" : type === "exam" ? "exam" : "formative";
}
function tagLabel(type){
  return type === "quiz" ? "Kuis" : type === "task" ? "Tugas" : type === "exam" ? "Ujian" : "Formatif";
}
function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, function(ch){
    return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[ch];
  });
}

function renderHeroClasses(){
  q("#heroClasses").innerHTML = course.classes.map(function(c){
    return '<div class="hero-class"><strong>'+escapeHtml(c.code)+' · '+escapeHtml(c.track)+'</strong><span>'+escapeHtml(c.day)+' · '+escapeHtml(c.time)+' · '+escapeHtml(c.mode)+'</span></div>';
  }).join("");
}

function renderClassGrid(){
  q("#classGrid").innerHTML = course.classes.map(function(c){
    return '<article class="class-card"><span class="class-code">'+escapeHtml(c.code)+' · '+escapeHtml(c.track.toUpperCase())+'</span><h3>Teknologi Blockchain</h3><div class="class-detail"><span>📅</span><span><strong>'+escapeHtml(c.day)+'</strong></span><span>⏰</span><span>'+escapeHtml(c.time)+'</span><span>'+escapeHtml(c.icon)+'</span><span>'+escapeHtml(c.mode)+'</span></div></article>';
  }).join("");
}

let activeWeekFilter = "all";
function renderWeekFilters(){
  const filters = [
    ["all","Semua"],["1-7","Pra-UTS"],["8","UTS"],["9-15","Pasca-UTS"],["16","UAS"]
  ];
  q("#weekFilters").innerHTML = filters.map(function(f){
    return '<button class="chip '+(activeWeekFilter===f[0]?"active":"")+'" data-filter="'+f[0]+'">'+f[1]+'</button>';
  }).join("");
  q("#weekFilters").querySelectorAll("button").forEach(function(btn){
    btn.addEventListener("click", function(){
      activeWeekFilter = btn.dataset.filter;
      renderWeekFilters(); renderSchedule();
    });
  });
}

function weekMatches(w, filter){
  if(filter==="all") return true;
  if(filter==="1-7") return w.week>=1 && w.week<=7;
  if(filter==="8") return w.week===8;
  if(filter==="9-15") return w.week>=9 && w.week<=15;
  if(filter==="16") return w.week===16;
  return true;
}

function renderSchedule(){
  const term = q("#scheduleSearch").value.trim().toLowerCase();
  const rows = weeks.filter(function(w){
    const hay = [w.topic,w.focus,w.sub,w.activity,w.assessment].join(" ").toLowerCase();
    return weekMatches(w,activeWeekFilter) && (!term || hay.includes(term));
  });
  q("#scheduleBody").innerHTML = rows.map(function(w){
    return '<tr><td><div class="week-number">'+w.week+'</div></td><td><strong>'+escapeHtml(w.topic)+'</strong><div class="subcpmk">'+escapeHtml(w.sub || "—")+'</div></td><td>'+escapeHtml(w.focus)+'</td><td><span class="tag '+tagClass(w.assessmentType)+'">'+tagLabel(w.assessmentType)+'</span><div style="margin-top:7px">'+escapeHtml(w.assessment)+'</div></td></tr>';
  }).join("");
}

function materialCard(w){
  const files = [];
  if(w.slides) files.push('<span class="file-pill">PPTX: '+escapeHtml(w.slides)+'</span>');
  if(w.handson) files.push('<span class="file-pill">PDF: '+escapeHtml(w.handson)+'</span>');
  const concepts = w.concepts.map(function(c){ return '<span>'+escapeHtml(c)+'</span>'; }).join("");
  return '<article class="material-card"><div class="material-top"><div class="week-number">'+w.week+'</div><span class="tag '+tagClass(w.assessmentType)+'">'+tagLabel(w.assessmentType)+'</span></div><h3>'+escapeHtml(w.topic)+'</h3><div class="subcpmk">'+escapeHtml(w.sub || (w.type==="exam"?"ASSESSMENT":"ENRICHMENT"))+'</div><p>'+escapeHtml(w.focus)+'</p><div class="concept-list">'+concepts+'</div><div class="material-foot"><strong>Aktivitas kelas:</strong> '+escapeHtml(w.activity)+'<div class="file-map">'+(files.length?files.join(""):'<span class="file-pill">Tidak ada file materi</span>')+'</div></div></article>';
}

function renderMaterials(){
  const term = q("#materialSearch").value.trim().toLowerCase();
  const type = q("#materialType").value;
  const rows = weeks.filter(function(w){
    const okType = type==="all" || (type==="exam" ? w.type==="exam" : w.type==="lecture");
    const hay = [w.topic,w.focus,w.activity,w.concepts.join(" ")].join(" ").toLowerCase();
    return okType && (!term || hay.includes(term));
  });
  q("#materialGrid").innerHTML = rows.map(materialCard).join("");
}

function renderAssessments(){
  const totalFormal = assessments.filter(a => !["UTS","UAS"].includes(a.kind)).reduce((s,a)=>s+a.weight,0);
  const groupCount = assessments.filter(a=>a.group==="Kelompok").length;
  const quizCount = assessments.filter(a=>a.kind==="Kuis").length;
  q("#assessmentSummary").innerHTML = [
    ["50%","Non-ujian formal"],["2",quizCount+" kuis"],["7","Tugas/presentasi"],[String(groupCount),"Asesmen kelompok"]
  ].map(function(x){return '<div class="summary-card"><strong>'+x[0]+'</strong><span>'+x[1]+'</span></div>';}).join("");
  q("#assessmentList").innerHTML = assessments.map(function(a){
    return '<article class="assessment-row"><div class="week-number">'+a.week+'</div><div><h4>'+escapeHtml(a.title)+'</h4><p>'+escapeHtml(a.kind)+' · '+escapeHtml(a.group)+'</p></div><div class="subcpmk">'+escapeHtml(a.sub)+'</div><div class="weight">'+a.weight+'%</div></article>';
  }).join("");
}

function renderGrading(){
  q("#gradingBars").innerHTML = course.grading.map(function(g){
    return '<div class="grade-line"><strong>'+escapeHtml(g.name)+'</strong><div class="bar"><i style="width:'+g.weight*3.2+'%"></i></div><span>'+g.weight+'%</span></div>';
  }).join("");
}

function renderReferences(){
  q("#referenceGrid").innerHTML = course.references.map(function(r,i){
    return '<div class="reference-card"><strong>Referensi '+(i+1)+'</strong><span>'+escapeHtml(r)+'</span></div>';
  }).join("");
}

function initNav(){
  q("#navToggle").addEventListener("click", function(){ q("#mainNav").classList.toggle("open"); });
  q("#mainNav").querySelectorAll("a").forEach(function(a){ a.addEventListener("click",function(){q("#mainNav").classList.remove("open");});});
}

renderHeroClasses();
renderClassGrid();
renderWeekFilters();
renderSchedule();
renderMaterials();
renderAssessments();
renderGrading();
renderReferences();
initNav();

q("#scheduleSearch").addEventListener("input", renderSchedule);
q("#materialSearch").addEventListener("input", renderMaterials);
q("#materialType").addEventListener("change", renderMaterials);
