// Creative Template Renderer
function renderCreativeTemplate(data) {
  const personal = data.personal;
  const skillsArr = data.skills ? data.skills.split(',').map(s => s.trim()) : [];
  
  let html = `<div class="template-creative">`;
  html += `<div style="padding: 32px 36px;">`;
  html += `<h1>${escapeHtml(personal.fullName || "Your Name")}</h1>`;
  html += `<div style="font-weight: 500; margin-bottom: 8px; color: #6b21a5;">${escapeHtml(personal.jobTitle || "Professional")}</div>`;
  html += `<div class="contact-line"><span>📧 ${escapeHtml(personal.email || "email@example.com")}</span> <span>📞 ${escapeHtml(personal.phone || "")}</span> <span>📍 ${escapeHtml(personal.location || "")}</span></div>`;
  
  // Education
  html += `<div class="section-title-resume">🎓 Education</div>`;
  if (data.education.length === 0) {
    html += `<div style="font-size: 0.8rem; color: #888;">No education added yet</div>`;
  } else {
    data.education.forEach(edu => {
      html += `<div class="edu-item"><strong>${escapeHtml(edu.degree || 'Degree')}</strong>, ${escapeHtml(edu.institution || 'Inst')} (${escapeHtml(edu.year || 'Year')})</div>`;
    });
  }
  
  // Work Experience
  html += `<div class="section-title-resume">💼 Work Experience</div>`;
  if (data.work.length === 0) {
    html += `<div style="font-size: 0.8rem; color: #888;">No work experience added yet</div>`;
  } else {
    data.work.forEach(work => {
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
  if (data.projects.length === 0) {
    html += `<div style="font-size: 0.8rem; color: #888;">No projects added yet</div>`;
  } else {
    data.projects.forEach(proj => {
      html += `<div class="project-item"><strong>${escapeHtml(proj.name || 'Project Name')}</strong><br/>`;
      html += `${escapeHtml(proj.description || 'Project description...')}`;
      if(proj.link) html += `<br/><a href="#" style="font-size:0.7rem;">${escapeHtml(proj.link)}</a>`;
      html += `</div>`;
    });
  }
  
  html += `</div></div>`;
  return html;
}