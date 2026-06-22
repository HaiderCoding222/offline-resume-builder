const state = {
    currentTemplate: "default",
    resumeData: {
        name: "Nimra Mumtaaz",
        title: "Full Stack Web Developer",
        email: "nimra.dev@example.com"
    },
    education: [
        { id: "ed1", degree: "BS Computer Science", institute: "Sargodha University", year: "2024" },
        { id: "ed2", degree: "Intermediate in Humanities", institute: "BISE Sargodha", year: "2020" }
    ],
    experience: [
        { id: "ex1", role: "Frontend Web Developer", company: "Techsol Labs", duration: "2024 - Present", details: "Built responsive user interfaces using Vanilla JS, HTML5, and CSS3.\nDesigned complex UI tools with interactive systems." }
    ],
    skills: [
        { id: "sk1", name: "HTML5 / CSS3" },
        { id: "sk2", name: "JavaScript (ES6+)" },
        { id: "sk3", name: "Bootstrap & .NET Razor" },
        { id: "sk4", name: "UI/UX Design" }
    ],
    customSections: [
        { id: "cs1", title: "Projects", value: "GlassCraft UI Generator (2026)\nDeveloped a real-time CSS Glassmorphism tool for designers." }
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
        console.error(err);
    }
}

function renderAllFormInputs() {
    document.getElementById('input-name').value = state.resumeData.name;
    document.getElementById('input-title').value = state.resumeData.title;
    document.getElementById('input-email').value = state.resumeData.email;

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
                <input type="text" value="${item.duration}" placeholder="Duration (e.g. 2022 - 2024)" oninput="updateExItem('${item.id}', 'duration', this.value)">
                <textarea placeholder="Job Details / Responsibilities" oninput="updateExItem('${item.id}', 'details', this.value)">${item.details}</textarea>
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
                    <button type="button" class="btn-remove-item" onclick="removeCsItem('${item.id}')" style="margin-top:0;">❌ Remove</button>
                </div>
                <textarea placeholder="Details..." oninput="updateCsItem('${item.id}', this.value)">${item.value}</textarea>
            </div>
        `);
    });
}

resumeForm.addEventListener('input', (e) => {
    if(e.target.id === 'input-name' || e.target.id === 'input-title' || e.target.id === 'input-email') {
        state.resumeData.name = document.getElementById('input-name').value;
        state.resumeData.title = document.getElementById('input-title').value;
        state.resumeData.email = document.getElementById('input-email').value;
        updatePreviewRender();
    }
});

function updateEdItem(id, field, value) {
    const item = state.education.find(i => i.id === id);
    if(item) item[field] = value;
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
    if(item) item[field] = value;
    updatePreviewRender();
}
// 
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
    if(item) item.name = value;
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
    if(item) item.value = value;
    updatePreviewRender();
}
document.getElementById('btn-add-section').addEventListener('click', () => {
    const tInput = document.getElementById('new-section-title');
    const title = tInput.value.trim();
    if(!title) return;
    state.customSections.push({ id: "cs" + Date.now(), title, value: "" });
    tInput.value = "";
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
            <div class="template-thumb-preview">📄</div>
            <h3>${tmpl.name}</h3>
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