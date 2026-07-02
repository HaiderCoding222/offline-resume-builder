function renderTealTemplate(state) {
    // Name & Title
    document.getElementById('teal-name').textContent = state.resumeData.name || '';
    document.getElementById('teal-name-main').textContent = state.resumeData.name || '';
    document.getElementById('teal-title').textContent = state.resumeData.title || '';

    // Summary
    document.getElementById('teal-summary').textContent = state.resumeData.summary || '';

    // Photo
    const photoImg = document.getElementById('teal-photo-img');
    const placeholder = document.getElementById('teal-photo-placeholder');
    
    if (state.resumeData.photo && state.resumeData.photo.trim() !== '') {
        photoImg.src = state.resumeData.photo;
        photoImg.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
    } else {
        photoImg.style.display = 'none';
        if (placeholder) {
            placeholder.style.display = 'flex';
            placeholder.textContent = '📷 Add Photo';
        }
    }

    // Contact
    const contactHTML = `
        <p><span style="margin-right:8px;">📞</span> ${state.resumeData.phone || ''}</p>
        <p><span style="margin-right:8px;">✉</span> ${state.resumeData.email || ''}</p>
    `;
    document.getElementById('teal-contact').innerHTML = contactHTML;

    // Skills with Progress
    const skillsContainer = document.getElementById('teal-skills');
    skillsContainer.innerHTML = '';
    const skillNames = state.skills.filter(s => s.name && s.name.trim());
    
    if (skillNames.length === 0) {
        skillsContainer.innerHTML = '<p style="color:#a3c4d9; font-size:0.9rem;">No skills added yet</p>';
    } else {
        skillNames.forEach((skill, index) => {
            const progress = Math.min(95, 65 + (index * 5));
            skillsContainer.innerHTML += `
                <div class="skill-item">
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-bar"><div class="skill-progress" style="width: ${progress}%"></div></div>
                </div>
            `;
        });
    }

    // Experience
    const expContainer = document.getElementById('teal-experience');
    expContainer.innerHTML = '';
    state.experience.forEach(item => {
        const details = (item.details || '').split('\n').filter(line => line.trim());
        const detailsHTML = details.length > 0 
            ? `<ul>${details.map(line => `<li>${line.trim()}</li>`).join('')}</ul>`
            : '';
        
        expContainer.innerHTML += `
            <div class="experience-item">
                <strong class="job-title">${item.role || ''}</strong><br>
                <span class="company">${item.company || ''}${item.duration ? ' | ' + item.duration : ''}</span>
                ${detailsHTML}
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
        if (section.title && section.value && section.value.trim()) {
            customContainer.innerHTML += `
                <div class="section-header">${section.title.toUpperCase()}</div>
                <div class="about">
                    <p style="white-space: pre-line; margin-top:8px;">${section.value}</p>
                </div>
            `;
        }
    });
}

window.renderTealTemplate = renderTealTemplate;