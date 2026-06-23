function renderElegantTemplate(state) {
    // Header
    document.getElementById('tmpl-name').innerText = state.resumeData.name || '';
    document.getElementById('tmpl-title').innerText = state.resumeData.title || '';

    // Contact
    const emailEl = document.getElementById('tmpl-email');
    if (emailEl) emailEl.innerText = state.resumeData.email || '';

    const phoneEl = document.getElementById('tmpl-phone');
    if (phoneEl) phoneEl.innerText = state.resumeData.phone || '';

    // Profile
    const profileEl = document.getElementById('tmpl-profile-text');
    if (profileEl) profileEl.innerText = state.resumeData.summary || '';

    // Photo
    const avatarEl = document.getElementById('tmpl-avatar');
    if (avatarEl) {
        if (state.resumeData.photo) {
            avatarEl.style.backgroundImage = `url('${state.resumeData.photo}')`;
        } else {
            avatarEl.style.backgroundImage = 'linear-gradient(135deg, #bae6fd, #7dd3fc)';
        }
    }

    // Education
    const edList = document.getElementById('tmpl-education-list');
    if (edList) {
        edList.innerHTML = '';
        state.education.forEach(item => {
            edList.insertAdjacentHTML('beforeend', `
                <div class="cv-experience-node">
                    <div class="cv-node-date-sub">${item.year || ''}</div>
                    <div class="cv-node-bold-title">${item.institute || ''}</div>
                    <div class="cv-node-role-italic">${item.degree || ''}</div>
                </div>
            `);
        });
    }

    // Experience
    const expList = document.getElementById('tmpl-experience-list');
    if (expList) {
        expList.innerHTML = '';
        state.experience.forEach(item => {
            expList.insertAdjacentHTML('beforeend', `
                <div class="cv-experience-node">
                    <div class="cv-node-date-sub">${item.duration || ''}</div>
                    <div class="cv-node-bold-title">${item.company || ''}</div>
                    <div class="cv-node-role-italic">${item.role || ''}</div>
                    <p class="cv-node-details-para">${(item.details || '').replace(/\n/g, '<br>')}</p>
                </div>
            `);
        });
    }

    // Skills
    const skList = document.getElementById('tmpl-skills-sidebar');
    if (skList) {
        skList.innerHTML = '';
        state.skills.forEach(item => {
            if (item.name?.trim()) {
                skList.insertAdjacentHTML('beforeend', `<div>${item.name}</div>`);
            }
        });
    }

    // Custom Sections (Languages, etc.)
    const csContainer = document.getElementById('tmpl-custom-sidebar-container');
    if (csContainer) {
        csContainer.innerHTML = '';
        state.customSections.forEach(item => {
            if (item.title && item.value) {
                csContainer.insertAdjacentHTML('beforeend', `
                    <div class="elegant-section">
                        <h3 class="elegant-section-title">${item.title}</h3>
                        <p class="elegant-text" style="white-space: pre-line;">${item.value}</p>
                    </div>
                `);
            }
        });
    }
}

window.renderElegantTemplate = renderElegantTemplate;