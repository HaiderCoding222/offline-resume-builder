function renderTealTemplate(state) {
    // Name & Title
    document.getElementById('teal-name').textContent = state.resumeData.name || '';
    document.getElementById('teal-name-main').textContent = state.resumeData.name || '';
    document.getElementById('teal-title').textContent = state.resumeData.title || '';

    // Summary
    document.getElementById('teal-summary').textContent = state.resumeData.summary || '';

    // Photo
    const photoImg = document.getElementById('teal-photo-img');
    if (state.resumeData.photo) {
        photoImg.src = state.resumeData.photo;
    } else {
        photoImg.src = 'https://via.placeholder.com/190/3d5c78/ffffff?text=Photo';
    }

    // Contact
    const contactHTML = `
        <p><i class="fas fa-phone"></i> ${state.resumeData.phone || ''}</p>
        <p><i class="fas fa-envelope"></i> ${state.resumeData.email || ''}</p>
    `;
    document.getElementById('teal-contact').innerHTML = contactHTML;

    // Skills with Progress (Randomized for beauty - you can improve later)
    const skillsContainer = document.getElementById('teal-skills');
    skillsContainer.innerHTML = '';
    state.skills.forEach(skill => {
        if (!skill.name) return;
        const progress = Math.floor(70 + Math.random() * 25); // 70-95%
        skillsContainer.innerHTML += `
            <div class="skill-item">
                <div class="skill-name">${skill.name}</div>
                <div class="skill-bar"><div class="skill-progress" style="width: ${progress}%"></div></div>
            </div>
        `;
    });

    // Experience
    const expContainer = document.getElementById('teal-experience');
    expContainer.innerHTML = '';
    state.experience.forEach(item => {
        expContainer.innerHTML += `
            <div class="experience-item">
                <strong class="job-title">${item.role || ''}</strong><br>
                <span class="company">${item.company || ''} | ${item.duration || ''}</span>
                <ul>${(item.details || '').split('\n').map(line => 
                    line.trim() ? `<li>${line.trim()}</li>` : ''
                ).join('')}</ul>
            </div>
        `;
    });

    // Education
    const eduContainer = document.getElementById('teal-education');
    eduContainer.innerHTML = '';
    state.education.forEach(item => {
        eduContainer.innerHTML += `
            <div class="education-item">
                <strong>${item.year || ''}</strong><br>
                <span class="job-title">${item.institute || ''}</span><br>
                ${item.degree || ''}
            </div>
        `;
    });

    // Custom Sections
    const customContainer = document.getElementById('teal-custom-sections');
    customContainer.innerHTML = '';
    state.customSections.forEach(section => {
        if (section.title && section.value) {
            customContainer.innerHTML += `
                <div class="section-header">${section.title.toUpperCase()}</div>
                <div class="about">
                    <p style="white-space: pre-line;">${section.value}</p>
                </div>
            `;
        }
    });
}

// Make it global
window.renderTealTemplate = renderTealTemplate;