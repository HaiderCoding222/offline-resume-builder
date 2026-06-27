function renderBlueTemplate(state) {
    // Header
    document.getElementById('tmpl-name-blue').innerText = state.resumeData.name || '';
    document.getElementById('tmpl-title-blue').innerText = state.resumeData.title || '';

    // Contact
    document.getElementById('tmpl-phone-blue').innerText = '📱 ' + (state.resumeData.phone || '');
    document.getElementById('tmpl-email-blue').innerText = '✉️ ' + (state.resumeData.email || '');

    // Profile
    const profileEl = document.getElementById('tmpl-profile-blue');
    if (profileEl) profileEl.innerText = state.resumeData.summary || '';

    // Photo
    const avatar = document.getElementById('tmpl-avatar-blue');
    if (avatar) {
        if (state.resumeData.photo) {
            avatar.style.backgroundImage = `url('${state.resumeData.photo}')`;
        } else {
            avatar.style.backgroundImage = 'linear-gradient(135deg, #60a5fa, #1e40af)';
        }
    }

    // Skills
    const skillsContainer = document.getElementById('tmpl-skills-blue');
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        state.skills.forEach(skill => {
            if (skill.name) {
                skillsContainer.innerHTML += `<div>• ${skill.name}</div>`;
            }
        });
    }

    // Education
    const eduContainer = document.getElementById('tmpl-education-blue');
    if (eduContainer) {
        eduContainer.innerHTML = '';
        state.education.forEach(item => {
            eduContainer.innerHTML += `
                <div class="blue-exp-item">
                    <div class="blue-exp-title">${item.institute}</div>
                    <div class="blue-exp-date">${item.year}</div>
                    <div style="font-size:13px;">${item.degree}</div>
                </div>
            `;
        });
    }

    // Experience
    const expContainer = document.getElementById('tmpl-experience-blue');
    if (expContainer) {
        expContainer.innerHTML = '';
        state.experience.forEach(item => {
            expContainer.innerHTML += `
                <div class="blue-exp-item">
                    <div class="blue-exp-title">${item.role} - ${item.company}</div>
                    <div class="blue-exp-date">${item.duration}</div>
                    <p style="font-size:12.8px; line-height:1.5; margin-top:6px;">${(item.details || '').replace(/\n/g, '<br>')}</p>
                </div>
            `;
        });
    }
}

window.renderBlueTemplate = renderBlueTemplate;