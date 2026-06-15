// Classic Template Renderer - FIXED & Enhanced
function renderClassicTemplate(data) {
  const personal = data.personal || {};
  const skillsArr = (data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : []);
  
  let html = `<div class="template-classic" id="classicCanvas">`;
  
  // LEFT SIDEBAR
  html += `<div class="sidebar-left">`;
  
  // Contact Section
  html += `<div class="draggable-classic" data-type="contact">`;
  html += `<div class="contact-info">`;
  html += `<h3>CONTACT</h3>`;
  html += `<div class="contact-item"><i class="fas fa-phone"></i> <span>${escapeHtml(personal.phone || "+123-456-7890")}</span></div>`;
  html += `<div class="contact-item"><i class="fas fa-envelope"></i> <span>${escapeHtml(personal.email || "hello@example.com")}</span></div>`;
  html += `<div class="contact-item"><i class="fas fa-map-marker-alt"></i> <span>${escapeHtml(personal.location || "City, Country")}</span></div>`;
  html += `</div></div>`;
  
  // Skills
  html += `<div class="draggable-classic" data-type="skills">`;
  html += `<div class="skills-section">`;
  html += `<h3>SKILLS</h3>`;
  html += `<div class="skills-list-side">`;
  skillsArr.forEach(skill => {
    if(skill) html += `<span class="skill-tag-side">${escapeHtml(skill)}</span>`;
  });
  html += `</div></div></div>`;
  
  // Languages
  html += `<div class="draggable-classic" data-type="languages">`;
  html += `<div class="languages-section">`;
  html += `<h3>LANGUAGES</h3>`;
  html += `<div class="lang-item">English (Fluent)</div>`;
  html += `<div class="lang-item">Urdu (Native)</div>`;
  html += `<div class="lang-item">Arabic (Intermediate)</div>`;
  html += `</div></div>`;
  
  html += `</div>`; // End Sidebar

  // RIGHT CONTENT
  html += `<div class="content-right">`;
  
  html += `<div class="draggable-classic header-area">`;
  html += `<h1>${escapeHtml(personal.fullName || "Your Name").toUpperCase()}</h1>`;
  html += `<div class="job-title-main">${escapeHtml(personal.jobTitle || "PROFESSIONAL").toUpperCase()}</div>`;
  html += `</div>`;
  
  // Profile
  html += `<div class="draggable-classic section-block">`;
  html += `<div class="section-title-right">PROFILE</div>`;
  html += `<div class="profile-text">Experienced professional with a strong track record of delivering exceptional results...</div>`;
  html += `</div>`;
  
  // Work Experience
  html += `<div class="draggable-classic section-block">`;
  html += `<div class="section-title-right">WORK EXPERIENCE</div>`;
  if (data.work.length === 0) {
    html += `<p style="color:#888;">No work experience added yet</p>`;
  } else {
    data.work.forEach((work, i) => {
      html += `<div class="job-item-right">`;
      html += `<div class="job-title-right">${escapeHtml(work.title)}</div>`;
      html += `<div class="job-company-right">${escapeHtml(work.company)}</div>`;
      html += `<div class="job-dates-right">${escapeHtml(work.startDate)} — ${escapeHtml(work.endDate)}</div>`;
      html += `<div class="job-desc-right">${escapeHtml(work.description)}</div>`;
      html += `</div>`;
    });
  }
  html += `</div>`;
  
  // Education
  html += `<div class="draggable-classic section-block">`;
  html += `<div class="section-title-right">EDUCATION</div>`;
  if (data.education.length === 0) {
    html += `<p style="color:#888;">No education added yet</p>`;
  } else {
    data.education.forEach((edu, i) => {
      html += `<div class="edu-item-right">`;
      html += `<div class="edu-degree-right">${escapeHtml(edu.degree)}</div>`;
      html += `<div class="edu-institution-right">${escapeHtml(edu.institution)}</div>`;
      html += `<div class="edu-year-right">${escapeHtml(edu.year)}</div>`;
      html += `</div>`;
    });
  }
  html += `</div>`;
  
  // Projects
  if (data.projects.length > 0) {
    html += `<div class="draggable-classic section-block">`;
    html += `<div class="section-title-right">PROJECTS</div>`;
    data.projects.forEach(proj => {
      html += `<div class="job-item-right">`;
      html += `<div class="job-title-right">${escapeHtml(proj.name)}</div>`;
      html += `<div class="job-desc-right">${escapeHtml(proj.description)}</div>`;
      html += `</div>`;
    });
    html += `</div>`;
  }
  
  html += `</div>`; // End content-right
  html += `</div>`; // End template-classic
  
  return html;
}