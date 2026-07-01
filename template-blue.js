function renderBlueTemplate(state) {
    const placeholder = document.getElementById('resume-preview-placeholder');
    if (!placeholder) return;

    // === PERSONAL INFO ===
    const nameEl = placeholder.querySelector('.user-name');
    if (nameEl) nameEl.textContent = state.resumeData.name || '';

    const titleEl = placeholder.querySelector('.user-title');
    if (titleEl) titleEl.textContent = state.resumeData.title || '';

    const emailEl = placeholder.querySelector('#pdf-email');
    if (emailEl) emailEl.textContent = state.resumeData.email || '';

    const phoneEl = placeholder.querySelector('#pdf-phone');
    if (phoneEl) phoneEl.textContent = state.resumeData.phone || '';

    const summaryEl = placeholder.querySelector('#pdf-summary');
    if (summaryEl) summaryEl.textContent = state.resumeData.summary || '';

    // === EDUCATION ===
    const eduList = placeholder.querySelector('#pdf-education-list');
    if (eduList) {
        eduList.innerHTML = '';
        state.education.forEach(item => {
            eduList.insertAdjacentHTML('beforeend', `
                <div class="cv-experience-node">
                    <div class="exp-header">
                        <span class="exp-role">${item.degree || ''}</span>
                        <span class="exp-date">${item.year || ''}</span>
                    </div>
                    <div class="exp-company">${item.institute || ''}</div>
                </div>
            `);
        });
    }

    // === EXPERIENCE ===
    const expList = placeholder.querySelector('#pdf-experience-list');
    if (expList) {
        expList.innerHTML = '';
        state.experience.forEach(item => {
            const detailsHTML = (item.details || '').split('\n').filter(line => line.trim()).map(line => 
                `<p class="exp-desc" style="margin-bottom:3px;">${line.trim().startsWith('•') ? line.trim() : '• ' + line.trim()}</p>`
            ).join('');

            expList.insertAdjacentHTML('beforeend', `
                <div class="cv-experience-node">
                    <div class="exp-header">
                        <span class="exp-role">${item.role || ''}</span>
                        <span class="exp-date">${item.duration || ''}</span>
                    </div>
                    <div class="exp-company">${item.company || ''}</div>
                    ${detailsHTML}
                </div>
            `);
        });
    }

    // === SKILLS ===
    const skillsList = placeholder.querySelector('#pdf-skills-list');
    if (skillsList) {
        skillsList.innerHTML = '';
        state.skills.forEach(item => {
            if (item.name && item.name.trim()) {
                skillsList.insertAdjacentHTML('beforeend', `<li>${item.name}</li>`);
            }
        });
    }

    // === CUSTOM SECTIONS (Projects, etc.) ===
    const sidebar = placeholder.querySelector('.cv-blue-sidebar');
    if (sidebar) {
        // Remove only custom sections (keep Skills & Languages)
        const oldCustoms = sidebar.querySelectorAll('.custom-sidebar-section');
        oldCustoms.forEach(el => el.remove());

        state.customSections.forEach(item => {
            if (item.title && item.value && item.value.trim()) {
                const sectionHTML = `
                    <div class="sidebar-section custom-sidebar-section">
                        <h3 class="sidebar-title">${item.title.toUpperCase()}</h3>
                        <div class="sidebar-line"></div>
                        <p style="font-size:13px; color:#475569; white-space:pre-line; line-height:1.6;">${item.value}</p>
                    </div>
                `;
                sidebar.insertAdjacentHTML('beforeend', sectionHTML);
            }
        });
    }
}

// Make globally available
window.renderBlueTemplate = renderBlueTemplate;