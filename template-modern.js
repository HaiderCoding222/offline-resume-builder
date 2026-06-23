function renderModernTemplate(state) {
    // Basic Info[cite: 1]
    document.getElementById('tmpl-name').innerText = state.resumeData.name || '';
    
    const emailEl = document.getElementById('tmpl-email');
    if (emailEl) emailEl.innerText = 'Email: ' + (state.resumeData.email || '');

    const phoneEl = document.getElementById('tmpl-phone');
    if (phoneEl) phoneEl.innerText = 'Mobile: ' + (state.resumeData.phone || '');

    // Education (Split Format: Institute left, Year right)[cite: 1]
    const edList = document.getElementById('tmpl-education-list');
    if (edList) {
        edList.innerHTML = '';
        state.education.forEach(item => {
            edList.insertAdjacentHTML('beforeend', `
                <div style="margin-bottom: 8px;">
                    <div class="ats-row-split">
                        <span class="ats-bold">${item.institute || ''}</span>
                        <span>${item.year || ''}</span>
                    </div>
                    <div class="ats-row-split">
                        <span class="ats-italic">${item.degree || ''}</span>
                        <span></span>
                    </div>
                </div>
            `);
        });
    }

    // Experience (Split Format: Company left, Duration right)[cite: 1]
    const exList = document.getElementById('tmpl-experience-list');
    if (exList) {
        exList.innerHTML = '';
        state.experience.forEach(item => {
            // Newlines ko breakdown karke formal text blocks banana
            let formattedDetails = '';
            if (item.details) {
                formattedDetails = item.details.split('\n').map(line => {
                    if(!line.trim()) return '';
                    // Agar bullet pehle se nahi laga toh add karein
                    return `<div style="margin-bottom: 2px;">${line.trim().startsWith('•') ? line.trim() : '• ' + line.trim()}</div>`;
                }).join('');
            }

            exList.insertAdjacentHTML('beforeend', `
                <div style="margin-bottom: 10px;">
                    <div class="ats-row-split">
                        <span class="ats-bold">${item.company || ''}</span>
                        <span>${item.duration || ''}</span>
                    </div>
                    <div class="ats-row-split">
                        <span class="ats-italic">${item.role || ''}</span>
                        <span></span>
                    </div>
                    <div class="ats-details-box">${formattedDetails}</div>
                </div>
            `);
        });
    }

    // Skills (Comma separated list like the image)[cite: 1]
    const skContainer = document.getElementById('tmpl-skills-container');
    if (skContainer) {
        const skillsArray = state.skills.map(item => item.name).filter(name => name && name.trim());
        skContainer.innerHTML = `<strong>Skills:</strong> ${skillsArray.join(', ')}`;
    }

    // Custom Sections (Dynamically building full width sections)[cite: 1]
    const csContainer = document.getElementById('tmpl-custom-sections-container');
    if (csContainer) {
        csContainer.innerHTML = '';
        state.customSections.forEach(item => {
            if (item.title && item.value && item.value.trim()) {
                let formattedValue = item.value.split('\n').map(line => {
                    if(!line.trim()) return '';
                    return `<div style="margin-bottom: 2px;">${line.trim().startsWith('•') ? line.trim() : '• ' + line.trim()}</div>`;
                }).join('');

                csContainer.insertAdjacentHTML('beforeend', `
                    <div class="ats-section">
                        <h3 class="ats-section-heading">${item.title.toUpperCase()}</h3>
                        <hr class="ats-hr">
                        <div class="ats-details-box" style="padding-left: 15px;">${formattedValue}</div>
                    </div>
                `);
            }
        });
    }
}

window.renderModernTemplate = renderModernTemplate;