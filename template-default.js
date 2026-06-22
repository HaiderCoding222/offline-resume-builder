function renderDefaultTemplate(appState) {
    const nameEl = document.getElementById('tmpl-name');
    const titleEl = document.getElementById('tmpl-title');
    const emailEl = document.getElementById('tmpl-email');

    if(nameEl) nameEl.innerText = appState.resumeData.name || '';
    if(titleEl) titleEl.innerText = appState.resumeData.title || '';
    if(emailEl) emailEl.innerText = appState.resumeData.email ? "📧 " + appState.resumeData.email : '';

    const edList = document.getElementById('tmpl-education-list');
    if (edList) {
        edList.innerHTML = "";
        appState.education.forEach(item => {
            if(item.degree || item.institute) {
                edList.insertAdjacentHTML('beforeend', `
                    <div class="resume-item-node">
                        <div class="item-row-upper">
                            <span class="item-bold-text">${item.degree}</span>
                            <span class="item-light-date">${item.year}</span>
                        </div>
                        <div class="item-row-lower">${item.institute}</div>
                    </div>
                `);
            }
        });
    }

    const exList = document.getElementById('tmpl-experience-list');
    if (exList) {
        exList.innerHTML = "";
        appState.experience.forEach(item => {
            if(item.role || item.company) {
                exList.insertAdjacentHTML('beforeend', `
                    <div class="resume-item-node">
                        <div class="item-row-upper">
                            <span class="item-bold-text">${item.role}</span>
                            <span class="item-light-date">${item.duration}</span>
                        </div>
                        <div class="item-row-lower-company">${item.company}</div>
                        <p class="item-paragraph-details">${item.details}</p>
                    </div>
                `);
            }
        });
    }

    const skList = document.getElementById('tmpl-skills-list');
    if (skList) {
        skList.innerHTML = "";
        appState.skills.forEach(item => {
            if(item.name.trim()) {
                skList.insertAdjacentHTML('beforeend', `<span class="pill-skill-node">${item.name}</span>`);
            }
        });
    }

    const csContainer = document.getElementById('tmpl-custom-container');
    if (csContainer) {
        csContainer.innerHTML = "";
        appState.customSections.forEach(item => {
            if(item.title && item.value) {
                csContainer.insertAdjacentHTML('beforeend', `
                    <div class="resume-section">
                        <div class="section-title-bar">${item.title}</div>
                        <p class="item-paragraph-details" style="margin-top:8px;">${item.value}</p>
                    </div>
                `);
            }
        });
    }
}

window.renderDefaultTemplate = renderDefaultTemplate;