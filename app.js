const state = {
    currentTemplate: "default",
    resumeData: {
        name: "Ansar Abbas",
        title: "Senior Dispenser/Paramedic",
        email: "hello@reallygreatsite.com",
        phone: "0345-8665835",
        summary: "Experienced Senior Dispenser/Paramedic with expertise in medication dispensing, patient care, and orthopedic assistance. Skilled in emergency response, wound management, and plaster application.",
        photo: ""
    },
    education: [
        { id: "ed1", degree: "Diploma in Dispensing", institute: "Government College of Pharmacy", year: "2020 - 2022" },
        { id: "ed2", degree: "Paramedic Training", institute: "Pakistan Institute of Medical Sciences", year: "2021 - 2023" }
    ],
    experience: [
        { 
            id: "ex1", 
            role: "Dispenser/Paramedic", 
            company: "Mubarak Medical Complex Sargodha", 
            duration: "06/08/2026 - 06/08/2026",
            details: "• Dispensed medications accurately as per doctor's prescriptions\n• Administered injections, IV drips, and performed wound dressing and basic first aid\n• Assisted doctors during patient consultations and minor surgical procedures\n• Maintained patient records and pharmacy stock management\n• Provided emergency support and patient counseling on medication usage"
        },
        { 
            id: "ex2", 
            role: "Orthopedic Assistant/Plaster Technician", 
            company: "FAIZ MEMORIAL HOSPITAL SARGODHA", 
            duration: "06/08/2026 - 06/08/2026",
            details: "• Worked in the Orthopedic Department handling OPD and indoor patients with bone, joint, and fracture-related cases\n• Applied and removed plaster of Paris (POP) casts for fracture patients under orthopedic surgeon supervision\n• Assisted in orthopedic procedures, dressing of wounds, and application of splints and slings\n• Dispensed orthopedic medicines, painkillers, calcium supplements, and provided proper dosage instructions to patients\n• Performed vital signs monitoring and assisted in minor orthopedic procedures and emergencies\n• Maintained inventory of orthopedic consumables including plaster bandages, cotton rolls, splints, and other casting materials"
        }
    ],
    skills: [
        { id: "sk1", name: "Medication Dispensing" },
        { id: "sk2", name: "IV Therapy & Injections" },
        { id: "sk3", name: "Wound Dressing & First Aid" },
        { id: "sk4", name: "Plaster of Paris (POP) Casting" },
        { id: "sk5", name: "Emergency Response" },
        { id: "sk6", name: "Patient Counseling" },
        { id: "sk7", name: "Inventory Management" },
        { id: "sk8", name: "Vital Signs Monitoring" }
    ],
    customSections: [
        { 
            id: "cs1", 
            title: "References", 
            value: "Bailey Dupont\nWardiere inc. / CEO\n📞 123-456-7890\n✉ hello@reallygreatsite.com\n\nHarumi Kobayashi\nWardiere inc. / CEO\n📞 123-456-7890\n✉ hello@reallygreatsite.com"
        }
    ]
};

const btnBuilder = document.getElementById('btn-builder');
const btnTemplates = document.getElementById('btn-templates');
const viewBuilder = document.getElementById('view-builder');
const viewTemplates = document.getElementById('view-templates');
const templatesList = document.getElementById('templates-list');
const resumeForm = document.getElementById('resume-form');

btnBuilder.addEventListener('click', () => switchView('builder'));
btnTemplates.addEventListener('click', () => switchView('templates'));

function switchView(view) {
    if (view === 'builder') {
        viewBuilder.classList.remove('hidden');
        viewTemplates.classList.add('hidden');
        btnBuilder.classList.add('active');
        btnTemplates.classList.remove('active');
        loadActiveTemplate();
    } else {
        viewBuilder.classList.add('hidden');
        viewTemplates.classList.remove('hidden');
        btnBuilder.classList.remove('active');
        btnTemplates.classList.add('active');
        renderTemplatesPage();
    }
}

async function loadActiveTemplate() {
    const config = AVAILABLE_TEMPLATES.find(t => t.id === state.currentTemplate);
    if (!config) return;

    document.getElementById('template-styles').href = config.cssFile;

    try {
        const response = await fetch(config.htmlFile);
        const htmlText = await response.text();
        document.getElementById('resume-preview-placeholder').innerHTML = htmlText;
        
        renderAllFormInputs();
        updatePreviewRender();
    } catch (err) {
        console.error('Error loading template:', err);
    }
}

function renderAllFormInputs() {
    document.getElementById('input-name').value = state.resumeData.name;
    document.getElementById('input-title').value = state.resumeData.title;
    document.getElementById('input-email').value = state.resumeData.email;
    document.getElementById('input-phone').value = state.resumeData.phone || "";
    document.getElementById('input-summary').value = state.resumeData.summary || "";

    const photoPreview = document.getElementById('photo-preview');
    if (photoPreview && state.resumeData.photo) {
        photoPreview.innerHTML = `<img src="${state.resumeData.photo}" alt="Profile" style="max-width:100%; border-radius:50%;">`;
    }

    const edContainer = document.getElementById('education-fields-container');
    edContainer.innerHTML = "";
    state.education.forEach(item => {
        edContainer.insertAdjacentHTML('beforeend', `
            <div class="item-block" id="ed-block-${item.id}">
                <input type="text" value="${item.degree}" placeholder="Degree/Certificate" oninput="updateEdItem('${item.id}', 'degree', this.value)">
                <input type="text" value="${item.institute}" placeholder="Institute/University" oninput="updateEdItem('${item.id}', 'institute', this.value)">
                <input type="text" value="${item.year}" placeholder="Year" oninput="updateEdItem('${item.id}', 'year', this.value)">
                <button type="button" class="btn-remove-item" onclick="removeEdItem('${item.id}')">❌ Remove</button>
            </div>
        `);
    });

    const exContainer = document.getElementById('experience-fields-container');
    exContainer.innerHTML = "";
    state.experience.forEach(item => {
        exContainer.insertAdjacentHTML('beforeend', `
            <div class="item-block" id="ex-block-${item.id}">
                <input type="text" value="${item.role}" placeholder="Job Title / Role" oninput="updateExItem('${item.id}', 'role', this.value)">
                <input type="text" value="${item.company}" placeholder="Company Name" oninput="updateExItem('${item.id}', 'company', this.value)">
                <input type="text" value="${item.duration}" placeholder="Duration" oninput="updateExItem('${item.id}', 'duration', this.value)">
                <textarea placeholder="Job Details" oninput="updateExItem('${item.id}', 'details', this.value)">${item.details}</textarea>
                <button type="button" class="btn-remove-item" onclick="removeExItem('${item.id}')">❌ Remove</button>
            </div>
        `);
    });

    const skContainer = document.getElementById('skills-fields-container');
    skContainer.innerHTML = "";
    state.skills.forEach(item => {
        skContainer.insertAdjacentHTML('beforeend', `
            <div class="skill-item-inline" id="sk-block-${item.id}">
                <input type="text" value="${item.name}" placeholder="Skill Name" oninput="updateSkItem('${item.id}', this.value)">
                <button type="button" class="btn-remove-item" onclick="removeSkItem('${item.id}')">❌</button>
            </div>
        `);
    });

    const csContainer = document.getElementById('dynamic-sections');
    csContainer.innerHTML = "";
    state.customSections.forEach(item => {
        csContainer.insertAdjacentHTML('beforeend', `
            <div class="form-section item-block" id="cs-block-${item.id}" style="border-left:none; padding:10px; background:#fff;">
                <div class="section-header">
                    <h3>${item.title}</h3>
                    <button type="button" class="btn-remove-item" onclick="removeCsItem('${item.id}')">❌ Remove</button>
                </div>
                <textarea placeholder="Details..." oninput="updateCsItem('${item.id}', this.value)">${item.value}</textarea>
            </div>
        `);
    });
}

resumeForm.addEventListener('input', (e) => {
    const id = e.target.id;
    if (id === 'input-name') state.resumeData.name = e.target.value;
    if (id === 'input-title') state.resumeData.title = e.target.value;
    if (id === 'input-email') state.resumeData.email = e.target.value;
    if (id === 'input-phone') state.resumeData.phone = e.target.value;
    if (id === 'input-summary') state.resumeData.summary = e.target.value;

    updatePreviewRender();
});

document.getElementById('input-photo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            state.resumeData.photo = ev.target.result;
            const photoPreview = document.getElementById('photo-preview');
            if (photoPreview) {
                photoPreview.innerHTML = `<img src="${state.resumeData.photo}" alt="Profile" style="max-width:100%; border-radius:50%;">`;
            }
            updatePreviewRender();
        };
        reader.readAsDataURL(file);
    }
});

function updateEdItem(id, field, value) {
    const item = state.education.find(i => i.id === id);
    if (item) item[field] = value;
    updatePreviewRender();
}

function addEducationBlock() {
    const id = "ed" + Date.now();
    state.education.push({ id, degree: "", institute: "", year: "" });
    renderAllFormInputs();
    updatePreviewRender();
}

function removeEdItem(id) {
    state.education = state.education.filter(i => i.id !== id);
    renderAllFormInputs();
    updatePreviewRender();
}

function updateExItem(id, field, value) {
    const item = state.experience.find(i => i.id === id);
    if (item) item[field] = value;
    updatePreviewRender();
}

function addExperienceBlock() {
    const id = "ex" + Date.now();
    state.experience.push({ id, role: "", company: "", duration: "", details: "" });
    renderAllFormInputs();
    updatePreviewRender();
}

function removeExItem(id) {
    state.experience = state.experience.filter(i => i.id !== id);
    renderAllFormInputs();
    updatePreviewRender();
}

function updateSkItem(id, value) {
    const item = state.skills.find(i => i.id === id);
    if (item) item.name = value;
    updatePreviewRender();
}

function addSkillBlock() {
    const id = "sk" + Date.now();
    state.skills.push({ id, name: "" });
    renderAllFormInputs();
    updatePreviewRender();
}

function removeSkItem(id) {
    state.skills = state.skills.filter(i => i.id !== id);
    renderAllFormInputs();
    updatePreviewRender();
}

function updateCsItem(id, value) {
    const item = state.customSections.find(i => i.id === id);
    if (item) item.value = value;
    updatePreviewRender();
}

document.getElementById('btn-add-section').addEventListener('click', () => {
    const title = document.getElementById('new-section-title').value.trim();
    if (!title) return;
    state.customSections.push({ id: "cs" + Date.now(), title, value: "" });
    document.getElementById('new-section-title').value = "";
    renderAllFormInputs();
    updatePreviewRender();
});

function removeCsItem(id) {
    state.customSections = state.customSections.filter(i => i.id !== id);
    renderAllFormInputs();
    updatePreviewRender();
}

function updatePreviewRender() {
    if (state.currentTemplate === 'default' && typeof renderDefaultTemplate === 'function') {
        renderDefaultTemplate(state);
    }
}

function renderTemplatesPage() {
    templatesList.innerHTML = "";

    AVAILABLE_TEMPLATES.forEach(tmpl => {
        const card = document.createElement('div');
        card.className = "template-card";

        card.innerHTML = `
            <div class="template-preview">
                <img src="${tmpl.thumbnail}" alt="${tmpl.name}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">
            </div>
            <div class="template-info">
                <h3>${tmpl.name}</h3>
                <small>Professional • Clean Layout</small>
            </div>
        `;

        card.addEventListener('click', () => {
            state.currentTemplate = tmpl.id;
            switchView('builder');
        });

        templatesList.appendChild(card);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    loadActiveTemplate();
});
// ================== DOWNLOAD PDF - SINGLE PAGE FIX ==================
const btnDownloadPDF = document.getElementById('btn-download-pdf');

btnDownloadPDF.addEventListener('click', async () => {
    const placeholder = document.getElementById('resume-preview-placeholder');
    if (!placeholder || !placeholder.children.length) {
        alert("Resume preview load nahi hua!");
        return;
    }

    const cvElement = placeholder.querySelector('.cv-premium-container');
    if (!cvElement) {
        alert("CV container nahi mila. Page refresh karo.");
        return;
    }

    btnDownloadPDF.innerHTML = '⏳ Generating PDF...';
    btnDownloadPDF.disabled = true;

    const opt = {
        margin: [10, 8, 10, 8],           // Thoda margin better look ke liye
        filename: `${(state.resumeData.name || 'Resume').replace(/ /g, '_')}_CV.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            allowTaint: true,
            width: 794,
            height: Math.max(cvElement.scrollHeight, 1120)   // A4 height force
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        },
        pagebreak: { 
            mode: ['avoid-all', 'css'],     // Sabse important
            avoid: ['.cv-experience-node', '.sidebar-section', '.main-section']
        }
    };

    try {
        await html2pdf().set(opt).from(cvElement).save();
    } catch (err) {
        console.error(err);
        alert("PDF mein error aaya. Desktop pe try karo.");
    } finally {
        btnDownloadPDF.innerHTML = '📥 Download PDF';
        btnDownloadPDF.disabled = false;
    }
});