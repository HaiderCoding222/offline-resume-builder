function renderBlueTemplate(state) {
    // === PERSONAL INFO ===
    const nameEl = document.querySelector('#resume-preview-placeholder .user-name');
    if (nameEl) nameEl.textContent = state.resumeData.name || '';

    const titleEl = document.querySelector('#resume-preview-placeholder .user-title');
    if (titleEl) titleEl.textContent = state.resumeData.title || '';

    const emailEl = document.querySelector('#resume-preview-placeholder #pdf-email');
    if (emailEl) emailEl.textContent = state.resumeData.email || '';

    const phoneEl = document.querySelector('#resume-preview-placeholder #pdf-phone');
    if (phoneEl) phoneEl.textContent = state.resumeData.phone || '';

    const summaryEl = document.querySelector('#resume-preview-placeholder #pdf-summary');
    if (summaryEl) summaryEl.textContent = state.resumeData.summary || '';

    // === EDUCATION ===
    const eduList = document.querySelector('#resume-preview-placeholder #pdf-education-list');
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
    const expList = document.querySelector('#resume-preview-placeholder #pdf-experience-list');
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
    const skillsList = document.querySelector('#resume-preview-placeholder #pdf-skills-list');
    if (skillsList) {
        skillsList.innerHTML = '';
        state.skills.forEach(item => {
            if (item.name && item.name.trim()) {
                skillsList.insertAdjacentHTML('beforeend', `<li>${item.name}</li>`);
            }
        });
    }

    // === CUSTOM SECTIONS (Dynamic) ===
    const customContainer = document.querySelector('#resume-preview-placeholder .cv-blue-sidebar');
    if (customContainer) {
        // Remove old custom sections (keep skills and languages)
        const oldCustoms = customContainer.querySelectorAll('.custom-sidebar-section');
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
                customContainer.insertAdjacentHTML('beforeend', sectionHTML);
            }
        });
    }
}

// Make it globally accessible
window.renderBlueTemplate = renderBlueTemplate;