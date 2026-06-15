// Classic Template Renderer (with sidebar)
function renderClassicTemplate(data) {
  const personal = data.personal;
  const skillsArr = data.skills ? data.skills.split(',').map(s => s.trim()) : [];
  
  let html = `<div class="template-classic">`;
  
  // LEFT SIDEBAR - BLUE
  html += `<div class="sidebar-left">`;
  html += `<div class="contact-info">`;
  html += `<h3>CONTACT</h3>`;
  html += `<div class="contact-item"><i class="fas fa-phone"></i> ${escapeHtml(personal.phone || "+123-456-7890")}</div>`;
  html += `<div class="contact-item"><i class="fas fa-envelope"></i> ${escapeHtml(personal.email || "hello@example.com")}</div>`;
  html += `<div class="contact-item"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(personal.location || "Anywhere St., City")}</div>`;
  html += `</div>`;
  
  html += `<div class="skills-section">`;
  html += `<h3>SKILLS</h3>`;
  skillsArr.forEach(skill => {
    if(skill) html += `<span class="skill-tag-side">${escapeHtml(skill)}</span>`;
  });
  html += `</div>`;
  
  html += `<div class="languages-section">`;
  html += `<h3>LANGUAGES</h3>`;
  html += `<div class="lang-item">English (Fluent)</div>`;
  html += `<div class="lang-item">Urdu (Native)</div>`;
  html += `<div class="lang-item">Arabic (Intermediate)</div>`;
  html += `</div>`;
  html += `</div>`; // close sidebar-left
  
  // RIGHT CONTENT
  html += `<div class="content-right">`;
  html += `<h1>${escapeHtml(personal.fullName || "Your Name").toUpperCase()}</h1>`;
  html += `<div class="job-title-main">${escapeHtml(personal.jobTitle || "PROFESSIONAL").toUpperCase()}</div>`;
  
  // Profile
  html += `<div class="section-title-right">PROFILE</div>`;
  html += `<div class="profile-text">Experienced professional with a strong track record of delivering exceptional results. Dedicated to continuous improvement and passionate about creating innovative solutions that drive business growth.</div>`;
  
  // Work Experience
  html += `<div class="section-title-right">WORK EXPERIENCE</div>`;
  data.work.forEach(work => {
    html += `<div class="job-item-right">`;
    html += `<div class="job-title-right">${escapeHtml(work.title || 'Position')}</div>`;
    html += `<div class="job-company-right">${escapeHtml(work.company || 'Company')}</div>`;
    html += `<div class="job-dates-right">${escapeHtml(work.startDate || 'Start')} — ${escapeHtml(work.endDate || 'Present')}</div>`;
    html += `<div class="job-desc-right">${escapeHtml(work.description || 'Job description goes here...')}</div>`;
    html += `</div>`;
  });
  
  // Education
  html += `<div class="section-title-right">EDUCATION</div>`;
  data.education.forEach(edu => {
    html += `<div class="edu-item-right">`;
    html += `<div class="edu-degree-right">${escapeHtml(edu.degree || 'Degree')}</div>`;
    html += `<div class="edu-institution-right">${escapeHtml(edu.institution || 'Institution')}</div>`;
    html += `<div class="edu-year-right">${escapeHtml(edu.year || 'Year')}</div>`;
    html += `</div>`;
  });
  
  // Projects
  if(data.projects.length > 0) {
    html += `<div class="section-title-right">PROJECTS</div>`;
    data.projects.forEach(proj => {
      html += `<div class="job-item-right">`;
      html += `<div class="job-title-right">${escapeHtml(proj.name || 'Project')}</div>`;
      html += `<div class="job-desc-right">${escapeHtml(proj.description || 'Description')}</div>`;
      html += `</div>`;
    });
  }
  
  html += `</div>`; // close content-right
  html += `</div>`; // close template-classic
  
  return html;
}