// Data structure for the template
const appState = {
    resumeData: {
        name: 'Ansar Abbas',
        title: 'Senior Dispenser/Paramedic',
        email: 'hello@reallygreatsite.com',
        phone: '0345-8665835',
        summary: 'Experienced Senior Dispenser/Paramedic with expertise in medication dispensing, patient care, and orthopedic assistance. Skilled in emergency response, wound management, and plaster application.'
    },
    experience: [
        {
            company: 'Mubarak Medical Complex Sargodha',
            duration: '06/08/2026 - 06/08/2026',
            role: 'Dispenser/Paramedic',
            details: '• Dispensed medications accurately as per doctor\'s prescriptions\n• Administered injections, IV drips, and performed wound dressing and basic first aid\n• Assisted doctors during patient consultations and minor surgical procedures\n• Maintained patient records and pharmacy stock management\n• Provided emergency support and patient counseling on medication usage'
        },
        {
            company: 'FAIZ MEMORIAL HOSPITAL SARGODHA',
            duration: '06/08/2026 - 06/08/2026',
            role: 'Orthopedic Assistant/Plaster Technician',
            details: '• Worked in the Orthopedic Department handling OPD and indoor patients with bone, joint, and fracture-related cases\n• Applied and removed plaster of Paris (POP) casts for fracture patients under orthopedic surgeon supervision\n• Assisted in orthopedic procedures, dressing of wounds, and application of splints and slings\n• Dispensed orthopedic medicines, painkillers, calcium supplements, and provided proper dosage instructions to patients\n• Performed vital signs monitoring and assisted in minor orthopedic procedures and emergencies\n• Maintained inventory of orthopedic consumables including plaster bandages, cotton rolls, splints, and other casting materials'
        }
    ],
    education: [
        {
            institute: 'Government College of Pharmacy',
            year: '2020 - 2022',
            degree: 'Diploma in Dispensing'
        },
        {
            institute: 'Pakistan Institute of Medical Sciences',
            year: '2021 - 2023',
            degree: 'Paramedic Training'
        }
    ],
    skills: [
        { name: 'Medication Dispensing' },
        { name: 'IV Therapy & Injections' },
        { name: 'Wound Dressing & First Aid' },
        { name: 'Plaster of Paris (POP) Casting' },
        { name: 'Emergency Response' },
        { name: 'Patient Counseling' },
        { name: 'Inventory Management' },
        { name: 'Vital Signs Monitoring' }
    ],
    customSections: [
        {
            title: 'REFERENCES',
            value: 'Bailey Dupont\nWardiere inc. / CEO\n📞 123-456-7890\n✉ hello@reallygreatsite.com\n\nHarumi Kobayashi\nWardiere inc. / CEO\n📞 123-456-7890\n✉ hello@reallygreatsite.com'
        }
    ]
};

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