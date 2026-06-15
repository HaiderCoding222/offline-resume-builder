// ---------- Data Models ----------
  let resumeData = {
    personal: { fullName: "Emma Watson", jobTitle: "Senior Product Designer", email: "emma.w@design.io", phone: "+1 415 777 1234", location: "New York, NY" },
    education: [{ degree: "B.Sc. Computer Science", institution: "Stanford University", year: "2020" }],
    work: [{ title: "Lead Frontend Developer", company: "TechCorp", startDate: "2021", endDate: "Present", description: "Built design system and PWA" }],
    skills: "React, TypeScript, Tailwind, UX Research",
    projects: [{ name: "Offline Resume Builder", description: "Full local storage & PDF generation", link: "" }],
    activeTemplate: "modern"
  };

  // helper: deep copy
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
        // ensure arrays exist
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
    // personal fields
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
  const template = resumeData.activeTemplate;
  let templateClass = "template-modern";
  if (template === "corporate") templateClass = "template-corporate";
  if (template === "creative") templateClass = "template-creative";
  if (template === "classic") templateClass = "template-classic";
  
  const personal = resumeData.personal;
  const skillsArr = resumeData.skills ? resumeData.skills.split(',').map(s=>s.trim()) : [];
  
  let html = `<div class="${templateClass}">`;
  
  // ========== TEMPLATE 1: MODERN MINIMAL ==========
  if (template === "modern") {
    html += `<div style="padding: 32px 36px;">`;
    html += `<h1>${escapeHtml(personal.fullName || "Your Name")}</h1>`;
    html += `<div style="font-weight: 500; margin-bottom: 8px;">${escapeHtml(personal.jobTitle || "Professional")}</div>`;
    html += `<div class="contact-line"><span>📧 ${escapeHtml(personal.email || "email@example.com")}</span> <span>📞 ${escapeHtml(personal.phone || "")}</span> <span>📍 ${escapeHtml(personal.location || "")}</span></div>`;
  }
  
  // ========== TEMPLATE 2: PROFESSIONAL CORPORATE ==========
  else if (template === "corporate") {
    html += `<div style="padding: 32px 36px;">`;
    html += `<h1>${escapeHtml(personal.fullName || "Your Name")}</h1>`;
    html += `<div style="font-weight: 500; margin-bottom: 8px; color: #2c3e2f;">${escapeHtml(personal.jobTitle || "Professional")}</div>`;
    html += `<div class="contact-line"><span>📧 ${escapeHtml(personal.email || "email@example.com")}</span> <span>📞 ${escapeHtml(personal.phone || "")}</span> <span>📍 ${escapeHtml(personal.location || "")}</span></div>`;
  }
  
  // ========== TEMPLATE 3: CREATIVE / TECH ==========
  else if (template === "creative") {
    html += `<div style="padding: 32px 36px;">`;
    html += `<h1>${escapeHtml(personal.fullName || "Your Name")}</h1>`;
    html += `<div style="font-weight: 500; margin-bottom: 8px; color: #6b21a5;">${escapeHtml(personal.jobTitle || "Professional")}</div>`;
    html += `<div class="contact-line"><span>📧 ${escapeHtml(personal.email || "email@example.com")}</span> <span>📞 ${escapeHtml(personal.phone || "")}</span> <span>📍 ${escapeHtml(personal.location || "")}</span></div>`;
  }
  
  // ========== TEMPLATE 4: CLASSIC WITH LEFT SIDEBAR (Richard Sanchez Style) ==========
  else if (template === "classic") {
    html += `
      <!-- LEFT SIDEBAR - BLUE -->
      <div class="sidebar-left">
        <div class="contact-info">
          <h3>CONTACT</h3>
          <div class="contact-item"><i class="fas fa-phone"></i> ${escapeHtml(personal.phone || "+123-456-7890")}</div>
          <div class="contact-item"><i class="fas fa-envelope"></i> ${escapeHtml(personal.email || "hello@example.com")}</div>
          <div class="contact-item"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(personal.location || "Anywhere St., City")}</div>
        </div>
        
        <div class="skills-section">
          <h3>SKILLS</h3>
    `;
    
    const skillsArrSide = resumeData.skills ? resumeData.skills.split(',').map(s=>s.trim()) : [];
    skillsArrSide.forEach(skill => {
      if(skill) html += `<span class="skill-tag-side">${escapeHtml(skill)}</span>`;
    });
    
    html += `</div><div class="languages-section"><h3>LANGUAGES</h3>`;
    html += `<div class="lang-item">English (Fluent)</div>`;
    html += `<div class="lang-item">Urdu (Native)</div>`;
    html += `<div class="lang-item">Arabic (Intermediate)</div>`;
    html += `</div></div>`;
    
    // RIGHT CONTENT
    html += `<div class="content-right">`;
    html += `<h1>${escapeHtml(personal.fullName || "Your Name").toUpperCase()}</h1>`;
    html += `<div class="job-title-main">${escapeHtml(personal.jobTitle || "PROFESSIONAL").toUpperCase()}</div>`;
    
    // Profile
    html += `<div class="section-title-right">PROFILE</div>`;
    html += `<div class="profile-text">Experienced professional with a strong track record of delivering exceptional results. Dedicated to continuous improvement and passionate about creating innovative solutions that drive business growth.</div>`;
    
    // Work Experience
    html += `<div class="section-title-right">WORK EXPERIENCE</div>`;
    resumeData.work.forEach(work => {
      html += `<div class="job-item-right">`;
      html += `<div class="job-title-right">${escapeHtml(work.title || 'Position')}</div>`;
      html += `<div class="job-company-right">${escapeHtml(work.company || 'Company')}</div>`;
      html += `<div class="job-dates-right">${escapeHtml(work.startDate || 'Start')} — ${escapeHtml(work.endDate || 'Present')}</div>`;
      html += `<div class="job-desc-right">${escapeHtml(work.description || 'Job description goes here...')}</div>`;
      html += `</div>`;
    });
    
    // Education
    html += `<div class="section-title-right">EDUCATION</div>`;
    resumeData.education.forEach(edu => {
      html += `<div class="edu-item-right">`;
      html += `<div class="edu-degree-right">${escapeHtml(edu.degree || 'Degree')}</div>`;
      html += `<div class="edu-institution-right">${escapeHtml(edu.institution || 'Institution')}</div>`;
      html += `<div class="edu-year-right">${escapeHtml(edu.year || 'Year')}</div>`;
      html += `</div>`;
    });
    
    // Projects
    if(resumeData.projects.length > 0) {
      html += `<div class="section-title-right">PROJECTS</div>`;
      resumeData.projects.forEach(proj => {
        html += `<div class="job-item-right">`;
        html += `<div class="job-title-right">${escapeHtml(proj.name || 'Project')}</div>`;
        html += `<div class="job-desc-right">${escapeHtml(proj.description || 'Description')}</div>`;
        html += `</div>`;
      });
    }
    
    html += `</div>`; // close content-right
  }
  
  // ========== COMMON SECTIONS FOR TEMPLATES 1,2,3 ==========
  if (template !== "classic") {
    // Education
    html += `<div class="section-title-resume">🎓 Education</div>`;
    if (resumeData.education.length === 0) {
      html += `<div style="font-size: 0.8rem; color: #888;">No education added yet</div>`;
    } else {
      resumeData.education.forEach(edu => {
        html += `<div class="edu-item"><strong>${escapeHtml(edu.degree || 'Degree')}</strong>, ${escapeHtml(edu.institution || 'Inst')} (${escapeHtml(edu.year || 'Year')})</div>`;
      });
    }
    
    // Work Experience
    html += `<div class="section-title-resume">💼 Work Experience</div>`;
    if (resumeData.work.length === 0) {
      html += `<div style="font-size: 0.8rem; color: #888;">No work experience added yet</div>`;
    } else {
      resumeData.work.forEach(work => {
        html += `<div class="job-item"><div class="job-title">${escapeHtml(work.title)} at ${escapeHtml(work.company)}</div>`;
        html += `<div class="job-dates">${escapeHtml(work.startDate)} — ${escapeHtml(work.endDate)}</div>`;
        html += `<div>${escapeHtml(work.description || '')}</div></div>`;
      });
    }
    
    // Skills
    html += `<div class="section-title-resume">⚙️ Skills</div>`;
    if (skillsArr.length === 0 || (skillsArr.length === 1 && skillsArr[0] === '')) {
      html += `<div style="font-size: 0.8rem; color: #888;">No skills added yet</div>`;
    } else {
      html += `<div class="skills-list">`;
      skillsArr.forEach(skill => { 
        if(skill) html += `<span class="skill-tag">${escapeHtml(skill)}</span>`; 
      });
      html += `</div>`;
    }
    
    // Projects
    html += `<div class="section-title-resume">📁 Projects</div>`;
    if (resumeData.projects.length === 0) {
      html += `<div style="font-size: 0.8rem; color: #888;">No projects added yet</div>`;
    } else {
      resumeData.projects.forEach(proj => {
        html += `<div class="project-item"><strong>${escapeHtml(proj.name || 'Project Name')}</strong><br/>`;
        html += `${escapeHtml(proj.description || 'Project description...')}`;
        if(proj.link) html += `<br/><a href="#" style="font-size:0.7rem;">${escapeHtml(proj.link)}</a>`;
        html += `</div>`;
      });
    }
    
    html += `</div>`; // close padding div for templates 1,2,3
  }
  
  html += `</div>`;
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

  function escapeHtml(str) { if(!str) return ''; return str.replace(/[&<>]/g, function(m){ if(m === '&') return '&amp;'; if(m === '<') return '&lt;'; if(m === '>') return '&gt;'; return m;}); }
  
  // init load & set autosave
  loadFromLocalStorage();

  function resetAllData() {
  if (confirm("Are you sure you want to reset all data? This will clear your current resume and restore default example data.")) {
    // Default data
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


