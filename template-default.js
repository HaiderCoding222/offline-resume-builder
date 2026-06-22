function renderDefaultTemplate(appState) {
    const nameEl = document.getElementById('tmpl-name');
    const titleEl = document.getElementById('tmpl-title');
    const emailEl = document.getElementById('tmpl-email');
    const phoneEl = document.getElementById('tmpl-phone');
    const profileEl = document.getElementById('tmpl-profile-text');

    if(nameEl) nameEl.innerText = appState.resumeData.name || '';
    if(titleEl) titleEl.innerText = appState.resumeData.title || '';
    if(emailEl) emailEl.innerText = appState.resumeData.email ? "✉ " + appState.resumeData.email : '';
    if(phoneEl) phoneEl.innerText = appState.resumeData.phone ? "📞 " + appState.resumeData.phone : '';
    
    if(profileEl) profileEl.innerText = appState.resumeData.summary || '';

    const exList = document.getElementById('tmpl-experience-list');
    if (exList) {
        exList.innerHTML = "";
        appState.experience.forEach(item => {
            if(item.role || item.company) {
                exList.insertAdjacentHTML('beforeend', `
                    <div class="cv-experience-node">
                        <div class="cv-node-bold-title">${item.company}</div>
                        <div class="cv-node-date-sub">${item.duration || ''}</div>
                        <div class="cv-node-role-italic">${item.role}</div>
                        <p class="cv-node-details-para">${item.details}</p>
                    </div>
                `);
            }
        });
    }

    const edList = document.getElementById('tmpl-education-list');
    if (edList) {
        edList.innerHTML = "";
        appState.education.forEach(item => {
            if(item.degree || item.institute) {
                edList.insertAdjacentHTML('beforeend', `
                    <div class="cv-experience-node">
                        <div class="cv-node-bold-title">${item.institute}</div>
                        <div class="cv-node-date-sub">${item.year || ''}</div>
                        <div class="cv-node-role-italic">${item.degree}</div>
                    </div>
                `);
            }
        });
    }

    const skList = document.getElementById('tmpl-skills-sidebar');
    if (skList) {
        skList.innerHTML = "";
        appState.skills.forEach(item => {
            if(item.name.trim()) {
                skList.insertAdjacentHTML('beforeend', `<div class="sidebar-skill-bullet">• ${item.name}</div>`);
            }
        });
    }

    const csContainer = document.getElementById('tmpl-custom-sidebar-container');
    if (csContainer) {
        csContainer.innerHTML = "";
        appState.customSections.forEach(item => {
            if(item.title && item.value) {
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