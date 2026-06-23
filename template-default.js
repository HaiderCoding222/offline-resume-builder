function renderDefaultTemplate(state) {
    // Basic Info
    document.getElementById('tmpl-name').innerText = state.resumeData.name || '';
    document.getElementById('tmpl-title').innerText = state.resumeData.title || '';

    const emailEl = document.getElementById('tmpl-email');
    if (emailEl) emailEl.innerText = '✉ ' + (state.resumeData.email || '');

    const phoneEl = document.getElementById('tmpl-phone');
    if (phoneEl) phoneEl.innerText = '📞 ' + (state.resumeData.phone || '');

    const profileEl = document.getElementById('tmpl-profile-text');
    if (profileEl) profileEl.innerText = state.resumeData.summary || '';

    // Profile Photo
    const avatarEl = document.getElementById('tmpl-avatar');
    if (avatarEl) {
        if (state.resumeData.photo) {
            avatarEl.style.backgroundImage = `url('${state.resumeData.photo}')`;
            avatarEl.style.backgroundSize = 'cover';
            avatarEl.style.backgroundPosition = 'center';
        } else {
            avatarEl.style.backgroundImage = 'linear-gradient(135deg, #a5b4fc, #6366f1)';
        }
    }

    // Education
    const edList = document.getElementById('tmpl-education-list');
    if (edList) {
        edList.innerHTML = '';
        state.education.forEach(item => {
            edList.insertAdjacentHTML('beforeend', `
                <div class="cv-experience-node">
                    <div class="cv-node-bold-title">${item.institute || ''}</div>
                    <div class="cv-node-date-sub">${item.year || ''}</div>
                    <div class="cv-node-role-italic">${item.degree || ''}</div>
                </div>
            `);
        });
    }

    // Experience
    const exList = document.getElementById('tmpl-experience-list');
    if (exList) {
        exList.innerHTML = '';
        state.experience.forEach(item => {
            exList.insertAdjacentHTML('beforeend', `
                <div class="cv-experience-node">
                    <div class="cv-node-bold-title">${item.company || ''}</div>
                    <div class="cv-node-date-sub">${item.duration || ''}</div>
                    <div class="cv-node-role-italic">${item.role || ''}</div>
                    <p class="cv-node-details-para">${item.details || ''}</p>
                </div>
            `);
        });
    }

    // Skills
    const skList = document.getElementById('tmpl-skills-sidebar');
    if (skList) {
        skList.innerHTML = '';
        state.skills.forEach(item => {
            if (item.name && item.name.trim()) {
                skList.insertAdjacentHTML('beforeend', `<div class="sidebar-skill-bullet">• ${item.name}</div>`);
            }
        });
    }

    // Custom Sections
    const csContainer = document.getElementById('tmpl-custom-sidebar-container');
    if (csContainer) {
        csContainer.innerHTML = '';
        state.customSections.forEach(item => {
            if (item.title && item.value && item.value.trim()) {
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

window.renderDefaultTemplate = renderDefaultTemplate;