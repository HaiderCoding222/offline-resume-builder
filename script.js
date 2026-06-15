// ---------- Data Models ----------
let resumeData = {
  personal: { fullName: "Emma Watson", jobTitle: "Senior Product Designer", email: "emma.w@design.io", phone: "+1 415 777 1234", location: "New York, NY" },
  education: [{ degree: "B.Sc. Computer Science", institution: "Stanford University", year: "2020" }],
  work: [{ title: "Lead Frontend Developer", company: "TechCorp", startDate: "2021", endDate: "Present", description: "Built design system and PWA" }],
  skills: "React, TypeScript, Tailwind, UX Research",
  projects: [{ name: "Offline Resume Builder", description: "Full local storage & PDF generation", link: "" }],
  activeTemplate: "modern"
};

// Global escapeHtml function
window.escapeHtml = function(str) { 
  if(!str) return ''; 
  return str.replace(/[&<>]/g, function(m){ 
    if(m === '&') return '&amp;'; 
    if(m === '<') return '&lt;'; 
    if(m === '>') return '&gt;'; 
    return m;
  }); 
};

// Template rendering dispatcher
function renderCurrentTemplate() {
  const template = resumeData.activeTemplate;
  
  switch(template) {
    case 'modern':
      return renderModernTemplate(resumeData);
    case 'corporate':
      return renderCorporateTemplate(resumeData);
    case 'creative':
      return renderCreativeTemplate(resumeData);
    case 'classic':
      return renderClassicTemplate(resumeData);
    default:
      return renderModernTemplate(resumeData);
  }
}

function saveToLocalStorage() {
  localStorage.setItem("resumeBuilderData", JSON.stringify(resumeData));
  updatePreviewAndAutoSave();
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem("resumeBuilderData");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      resumeData = { ...resumeData, ...parsed };
      if (!resumeData.education) resumeData.education = [];
      if (!resumeData.work) resumeData.work = [];
      if (!resumeData.projects) resumeData.projects = [];
      if (!resumeData.personal) resumeData.personal = resumeData.personal || {};
    } catch(e) {}
  }
  renderAllForms();
  updatePreview();
  highlightActiveTemplate();
}

// form rendering helpers (dynamic sections)
function renderEducation() {
  const container = document.getElementById("educationContainer");
  container.innerHTML = "";
  resumeData.education.forEach((edu, idx) => {
    const div = document.createElement("div");
    div.className = "dynamic-item";
    div.innerHTML = `
      <div class="input-group"><label>Degree</label><input type="text" class="edu-degree" value="${escapeHtml(edu.degree || '')}" data-idx="${idx}"></div>
      <div class="input-group"><label>Institution</label><input type="text" class="edu-institution" value="${escapeHtml(edu.institution || '')}" data-idx="${idx}"></div>
      <div class="input-group"><label>Year</label><input type="text" class="edu-year" value="${escapeHtml(edu.year || '')}" data-idx="${idx}"></div>
      <button class="btn-icon btn-remove remove-edu" data-idx="${idx}">Remove</button>
    `;
    container.appendChild(div);
  });
  attachEduEvents();
}

function renderWork() {
  const container = document.getElementById("workContainer");
  container.innerHTML = "";
  resumeData.work.forEach((work, idx) => {
    const div = document.createElement("div");
    div.className = "dynamic-item";
    div.innerHTML = `
      <div class="input-group"><label>Job Title</label><input type="text" class="work-title" value="${escapeHtml(work.title || '')}" data-idx="${idx}"></div>
      <div class="input-group"><label>Company</label><input type="text" class="work-company" value="${escapeHtml(work.company || '')}" data-idx="${idx}"></div>
      <div class="input-group"><label>Start - End</label><div style="display:flex; gap:8px;"><input type="text" class="work-start" placeholder="2020" value="${escapeHtml(work.startDate || '')}" style="width:50%;" data-idx="${idx}"><input type="text" class="work-end" placeholder="Present" value="${escapeHtml(work.endDate || '')}" style="width:50%;" data-idx="${idx}"></div></div>
      <div class="input-group"><label>Description</label><textarea class="work-desc" rows="2" data-idx="${idx}">${escapeHtml(work.description || '')}</textarea></div>
      <button class="btn-icon btn-remove remove-work" data-idx="${idx}">Remove</button>
    `;
    container.appendChild(div);
  });
  attachWorkEvents();
}

function renderProjects() {
  const container = document.getElementById("projectsContainer");
  container.innerHTML = "";
  resumeData.projects.forEach((proj, idx) => {
    const div = document.createElement("div");
    div.className = "dynamic-item";
    div.innerHTML = `
      <div class="input-group"><label>Project Name</label><input type="text" class="proj-name" value="${escapeHtml(proj.name || '')}" data-idx="${idx}"></div>
      <div class="input-group"><label>Description</label><textarea class="proj-desc" rows="2" data-idx="${idx}">${escapeHtml(proj.description || '')}</textarea></div>
      <div class="input-group"><label>Link (optional)</label><input type="text" class="proj-link" value="${escapeHtml(proj.link || '')}" data-idx="${idx}"></div>
      <button class="btn-icon btn-remove remove-proj" data-idx="${idx}">Remove</button>
    `;
    container.appendChild(div);
  });
  attachProjectEvents();
}

function attachEduEvents() {
  document.querySelectorAll('.edu-degree').forEach(inp => inp.addEventListener('input', (e) => { resumeData.education[e.target.dataset.idx].degree = e.target.value; saveToLocalStorage(); }));
  document.querySelectorAll('.edu-institution').forEach(inp => inp.addEventListener('input', (e) => { resumeData.education[e.target.dataset.idx].institution = e.target.value; saveToLocalStorage(); }));
  document.querySelectorAll('.edu-year').forEach(inp => inp.addEventListener('input', (e) => { resumeData.education[e.target.dataset.idx].year = e.target.value; saveToLocalStorage(); }));
  document.querySelectorAll('.remove-edu').forEach(btn => btn.addEventListener('click', (e) => { const idx = btn.dataset.idx; resumeData.education.splice(idx,1); renderEducation(); saveToLocalStorage(); }));
}

function attachWorkEvents() {
  document.querySelectorAll('.work-title').forEach(inp => inp.addEventListener('input', (e) => { resumeData.work[e.target.dataset.idx].title = e.target.value; saveToLocalStorage(); }));
  document.querySelectorAll('.work-company').forEach(inp => inp.addEventListener('input', (e) => { resumeData.work[e.target.dataset.idx].company = e.target.value; saveToLocalStorage(); }));
  document.querySelectorAll('.work-start').forEach(inp => inp.addEventListener('input', (e) => { resumeData.work[e.target.dataset.idx].startDate = e.target.value; saveToLocalStorage(); }));
  document.querySelectorAll('.work-end').forEach(inp => inp.addEventListener('input', (e) => { resumeData.work[e.target.dataset.idx].endDate = e.target.value; saveToLocalStorage(); }));
  document.querySelectorAll('.work-desc').forEach(inp => inp.addEventListener('input', (e) => { resumeData.work[e.target.dataset.idx].description = e.target.value; saveToLocalStorage(); }));
  document.querySelectorAll('.remove-work').forEach(btn => btn.addEventListener('click', (e) => { const idx = btn.dataset.idx; resumeData.work.splice(idx,1); renderWork(); saveToLocalStorage(); }));
}

function attachProjectEvents() {
  document.querySelectorAll('.proj-name').forEach(inp => inp.addEventListener('input', (e) => { resumeData.projects[e.target.dataset.idx].name = e.target.value; saveToLocalStorage(); }));
  document.querySelectorAll('.proj-desc').forEach(inp => inp.addEventListener('input', (e) => { resumeData.projects[e.target.dataset.idx].description = e.target.value; saveToLocalStorage(); }));
  document.querySelectorAll('.proj-link').forEach(inp => inp.addEventListener('input', (e) => { resumeData.projects[e.target.dataset.idx].link = e.target.value; saveToLocalStorage(); }));
  document.querySelectorAll('.remove-proj').forEach(btn => btn.addEventListener('click', (e) => { const idx = btn.dataset.idx; resumeData.projects.splice(idx,1); renderProjects(); saveToLocalStorage(); }));
}

function renderAllForms() {
  document.getElementById("fullName").value = resumeData.personal.fullName || '';
  document.getElementById("jobTitle").value = resumeData.personal.jobTitle || '';
  document.getElementById("email").value = resumeData.personal.email || '';
  document.getElementById("phone").value = resumeData.personal.phone || '';
  document.getElementById("location").value = resumeData.personal.location || '';
  document.getElementById("skillsInput").value = resumeData.skills || '';
  renderEducation();
  renderWork();
  renderProjects();
  attachPersonalEvents();
  attachSkillsEvent();
}

function attachPersonalEvents() {
  const personalIds = ['fullName','jobTitle','email','phone','location'];
  personalIds.forEach(id => {
    document.getElementById(id).addEventListener('input', (e) => { resumeData.personal[id] = e.target.value; saveToLocalStorage(); });
  });
}

function attachSkillsEvent() {
  document.getElementById("skillsInput").addEventListener('input', (e) => { resumeData.skills = e.target.value; saveToLocalStorage(); });
}

function updatePreview() {
  const container = document.getElementById("resumePreview");
  const html = renderCurrentTemplate();
  container.innerHTML = html;
}

function updatePreviewAndAutoSave() {
  updatePreview();
  showToast("✓ Auto-saved locally");
}

function showToast(msg) {
  let toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

function highlightActiveTemplate() {
  document.querySelectorAll('.template-btn').forEach(btn => {
    if(btn.dataset.template === resumeData.activeTemplate) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

// PDF Generation using html2pdf
async function downloadPDF() {
  const element = document.getElementById("resumePreview");
  if(!element) return;
  const opt = {
    margin:        [0.5, 0.5, 0.5, 0.5],
    filename:     `${resumeData.personal.fullName || "Resume"}_Resume.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, letterRendering: true },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  showToast("Generating PDF ...");
  try {
    await html2pdf().set(opt).from(element).save();
    showToast("PDF Downloaded!");
  } catch(e) { showToast("PDF Error, try again."); }
}

function exportJSON() {
  const dataStr = JSON.stringify(resumeData, null, 2);
  const blob = new Blob([dataStr], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "resume_backup.json";
  a.click();
  URL.revokeObjectURL(url);
  showToast("Exported JSON");
}

function importJSON(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      resumeData = { ...resumeData, ...imported };
      if(!resumeData.education) resumeData.education = [];
      if(!resumeData.work) resumeData.work = [];
      if(!resumeData.projects) resumeData.projects = [];
      renderAllForms();
      updatePreview();
      saveToLocalStorage();
      highlightActiveTemplate();
      showToast("Imported successfully!");
    } catch(err) { showToast("Invalid JSON file"); }
  };
  reader.readAsText(file);
}

// Event listeners + dynamic buttons
document.getElementById("addEducationBtn").addEventListener('click', () => { resumeData.education.push({ degree: "", institution: "", year: "" }); renderEducation(); saveToLocalStorage(); });
document.getElementById("addWorkBtn").addEventListener('click', () => { resumeData.work.push({ title: "", company: "", startDate: "", endDate: "", description: "" }); renderWork(); saveToLocalStorage(); });
document.getElementById("addProjectBtn").addEventListener('click', () => { resumeData.projects.push({ name: "", description: "", link: "" }); renderProjects(); saveToLocalStorage(); });
document.querySelectorAll(".template-btn").forEach(btn => {
  btn.addEventListener('click', (e) => {
    resumeData.activeTemplate = e.currentTarget.dataset.template;
    saveToLocalStorage();
    highlightActiveTemplate();
    updatePreview();
  });
});
document.getElementById("downloadPdfBtn").addEventListener('click', downloadPDF);
document.getElementById("exportJsonBtn").addEventListener('click', exportJSON);
document.getElementById("importJsonBtn").addEventListener('click', () => { document.getElementById("importFileInput").click(); });
document.getElementById("importFileInput").addEventListener('change', (e) => { if(e.target.files.length) importJSON(e.target.files[0]); e.target.value=''; });

// init load & set autosave
loadFromLocalStorage();

function resetAllData() {
  if (confirm("Are you sure you want to reset all data? This will clear your current resume and restore default example data.")) {
    resumeData = {
      personal: { fullName: "Emma Watson", jobTitle: "Senior Product Designer", email: "emma.w@design.io", phone: "+1 415 777 1234", location: "New York, NY" },
      education: [{ degree: "B.Sc. Computer Science", institution: "Stanford University", year: "2020" }],
      work: [{ title: "Lead Frontend Developer", company: "TechCorp", startDate: "2021", endDate: "Present", description: "Built design system and PWA" }],
      skills: "React, TypeScript, Tailwind, UX Research",
      projects: [{ name: "Offline Resume Builder", description: "Full local storage & PDF generation", link: "" }],
      activeTemplate: "modern"
    };
    
    renderAllForms();
    updatePreview();
    saveToLocalStorage();
    highlightActiveTemplate();
    showToast("✓ All data reset to default!");
  }
}

// Theme toggle functionality
let isDarkMode = false;

function toggleTheme() {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.body.style.background = "#0f172a";
    document.body.style.color = "#e2e8f0";
    document.querySelector('.form-panel').style.background = "#1e293b";
    document.querySelector('.preview-panel').style.background = "#0f172a";
    document.querySelectorAll('.dynamic-item').forEach(el => el.style.background = "#334155");
    document.getElementById('themeToggleBtn').innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.style.background = "#f1f4f8";
    document.body.style.color = "#1e293b";
    document.querySelector('.form-panel').style.background = "white";
    document.querySelector('.preview-panel').style.background = "#e2e8f0";
    document.querySelectorAll('.dynamic-item').forEach(el => el.style.background = "#f8fafc");
    document.getElementById('themeToggleBtn').innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Event listeners for new features
document.getElementById("resetBtnNav").addEventListener('click', resetAllData);
document.getElementById("themeToggleBtn").addEventListener('click', toggleTheme);