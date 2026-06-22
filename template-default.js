function renderDefaultTemplate(state) {
    // --- Personal Info ---
    const nameEl = document.getElementById('tmpl-name');
    const titleEl = document.getElementById('tmpl-title');
    const emailEl = document.getElementById('tmpl-email');
    const phoneEl = document.getElementById('tmpl-phone');
    const profileEl = document.getElementById('tmpl-profile-text');

    if (nameEl) nameEl.innerText = state.resumeData.name || '';
    if (titleEl) titleEl.innerText = state.resumeData.title || '';
    if (emailEl) emailEl.innerText = state.resumeData.email ? '✉ ' + state.resumeData.email : '';
    if (phoneEl) phoneEl.innerText = state.resumeData.phone ? '📞 ' + state.resumeData.phone : '';
    if (profileEl) profileEl.innerText = state.resumeData.summary || '';

    // --- Education ---
    const edList = document.getElementById('tmpl-education-list');
    if (edList) {
        edList.innerHTML = '';
        state.education.forEach(item => {
            if (item.degree || item.institute) {
                edList.insertAdjacentHTML('beforeend', `
                    <div class="cv-experience-node">
                        <div class="cv-node-bold-title">${item.institute || ''}</div>
                        <div class="cv-node-date-sub">${item.year || ''}</div>
                        <div class="cv-node-role-italic">${item.degree || ''}</div>
                    </div>
                `);
            }
        });
    }

    // --- Experience ---
    const exList = document.getElementById('tmpl-experience-list');
    if (exList) {
        exList.innerHTML = '';
        state.experience.forEach(item => {
            if (item.role || item.company) {
                exList.insertAdjacentHTML('beforeend', `
                    <div class="cv-experience-node">
                        <div class="cv-node-bold-title">${item.company || ''}</div>
                        <div class="cv-node-date-sub">${item.duration || ''}</div>
                        <div class="cv-node-role-italic">${item.role || ''}</div>
                        <p class="cv-node-details-para">${item.details || ''}</p>
                    </div>
                `);
            }
        });
    }

    // --- Skills ---
    const skList = document.getElementById('tmpl-skills-sidebar');
    if (skList) {
        skList.innerHTML = '';
        state.skills.forEach(item => {
            if (item.name && item.name.trim()) {
                skList.insertAdjacentHTML('beforeend', `<div class="sidebar-skill-bullet">• ${item.name}</div>`);
            }
        });
    }

    // --- Custom Sections (Sidebar) ---
    const csContainer = document.getElementById('tmpl-custom-sidebar-container');
    if (csContainer) {
        csContainer.innerHTML = '';
        state.customSections.forEach(item => {
            if (item.title && item.value) {
                csContainer.insertAdjacentHTML('beforeend', `
                    <div class="sidebar-section">
                        <h3 class="sidebar-heading">${item.title.toUpperCase()}</h3>
                        <p class="sidebar-text" style="white-space: pre-line;">${item.value}</p>
                    </div>
                `);
            }
        });
    }
}

// Make it globally accessible so app.js can call it
window.renderDefaultTemplate = renderDefaultTemplate;