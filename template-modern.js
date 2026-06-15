// Modern Template Renderer - Enhanced with Drag, Inline Edit, Images, Dynamic Bullets
function renderModernTemplate(data) {
  const personal = data.personal || {};
  const skillsArr = (data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : []);
  
  let html = `<div class="template-modern" id="modernCanvas">`;
  
  html += `
    <div class="draggable" data-type="name" style="top:40px;left:50px;">
      <h1 contenteditable="false">${escapeHtml(personal.fullName || "Your Name")}</h1>
    </div>
    
    <div class="draggable" data-type="title" style="top:90px;left:50px;">
      <div style="font-weight: 500; font-size:1.1rem;">${escapeHtml(personal.jobTitle || "Professional Title")}</div>
    </div>
    
    <div class="draggable" data-type="contact" style="top:130px;left:50px;">
      <div class="contact-line">
        <span>📧 ${escapeHtml(personal.email || "email@example.com")}</span> 
        <span>📞 ${escapeHtml(personal.phone || "")}</span> 
        <span>📍 ${escapeHtml(personal.location || "")}</span>
      </div>
    </div>
  `;

  // Education
  html += `<div class="draggable section-block" data-type="education" style="top:220px;left:50px;width:80%;">`;
  html += `<div class="section-title-resume">🎓 Education</div>`;
  if (data.education.length === 0) {
    html += `<div style="font-size: 0.85rem; color: #888;">No education added yet</div>`;
  } else {
    data.education.forEach((edu, i) => {
      html += `<div class="edu-item" data-idx="${i}"><strong>${escapeHtml(edu.degree || 'Degree')}</strong>, ${escapeHtml(edu.institution || 'Institution')} (${escapeHtml(edu.year || 'Year')})</div>`;
    });
  }
  html += `</div>`;

  // Work Experience with bullet support
  html += `<div class="draggable section-block" data-type="work" style="top:380px;left:50px;width:80%;">`;
  html += `<div class="section-title-resume">💼 Work Experience</div>`;
  if (data.work.length === 0) {
    html += `<div style="font-size: 0.85rem; color: #888;">No work experience added yet</div>`;
  } else {
    data.work.forEach((work, i) => {
      html += `
        <div class="job-item" data-idx="${i}">
          <div class="job-title">${escapeHtml(work.title)} at ${escapeHtml(work.company)}</div>
          <div class="job-dates">${escapeHtml(work.startDate)} — ${escapeHtml(work.endDate)}</div>
          <div class="work-desc-list">${escapeHtml(work.description || '')}</div>
        </div>`;
    });
  }
  html += `</div>`;

  // Skills
  html += `<div class="draggable section-block" data-type="skills" style="top:620px;left:50px;width:80%;">`;
  html += `<div class="section-title-resume">⚙️ Skills</div>`;
  html += `<div class="skills-list">`;
  skillsArr.forEach(skill => {
    html += `<span class="skill-tag">${escapeHtml(skill)}</span>`;
  });
  html += `</div></div>`;

  // Projects
  html += `<div class="draggable section-block" data-type="projects" style="top:720px;left:50px;width:80%;">`;
  html += `<div class="section-title-resume">🚀 Projects</div>`;
  if (data.projects.length === 0) {
    html += `<div style="font-size: 0.85rem; color: #888;">No projects added yet</div>`;
  } else {
    data.projects.forEach((proj, i) => {
      html += `
        <div class="project-item" data-idx="${i}">
          <strong>${escapeHtml(proj.name || 'Project')}</strong><br/>
          ${escapeHtml(proj.description || '')}
          ${proj.link ? `<br/><a href="${escapeHtml(proj.link)}" target="_blank" style="font-size:0.8rem;color:#3b82f6;">${escapeHtml(proj.link)}</a>` : ''}
        </div>`;
    });
  }
  html += `</div>`;

  html += `</div>`; // end template-modern
  return html;
}