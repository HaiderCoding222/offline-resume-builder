function renderDefaultTemplate(appState) {
    document.getElementById('tmpl-name').innerText = appState.resumeData.name || 'Your Name';
    document.getElementById('tmpl-title').innerText = appState.resumeData.title || 'Professional Title';
    document.getElementById('tmpl-email').innerText = appState.resumeData.email ? "📧 " + appState.resumeData.email : '';

    const edList = document.getElementById('tmpl-education-list');
    edList.innerHTML = "";
    appState.education.forEach(item => {
        if(item.degree || item.institute) {
            edList.insertAdjacentHTML('beforeend', `
                <div class="sub-item-view">
                    <div class="sub-item-header">
                        <span>${item.degree}</span>
                        <span>${item.year}</span>
                    </div>
                    <div class="sub-item-sub">${item.institute}</div>
                </div>
            `);
        }
    });

    const exList = document.getElementById('tmpl-experience-list');
    exList.innerHTML = "";
    appState.experience.forEach(item => {
        if(item.role || item.company) {
            exList.insertAdjacentHTML('beforeend', `
                <div class="sub-item-view">
                    <div class="sub-item-header">
                        <span>${item.role}</span>
                        <span>${item.duration}</span>
                    </div>
                    <div class="sub-item-sub">${item.company}</div>
                    <p>${item.details}</p>
                </div>
            `);
        }
    });

    const skList = document.getElementById('tmpl-skills-list');
    skList.innerHTML = "";
    appState.skills.forEach(item => {
        if(item.name.trim()) {
            skList.insertAdjacentHTML('beforeend', `<span class="skill-tag">${item.name}</span>`);
        }
    });

    const csContainer = document.getElementById('tmpl-custom-container');
    csContainer.innerHTML = "";
    appState.customSections.forEach(item => {
        if(item.title && item.value) {
            csContainer.insertAdjacentHTML('beforeend', `
                <div class="section-block">
                    <h2>${item.title}</h2>
                    <p style="font-size:13px; line-height:1.5; white-space:pre-line; color:#4a5568;">${item.value}</p>
                </div>
            `);
        }
    });
}

window.renderDefaultTemplate = renderDefaultTemplate;