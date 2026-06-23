// ================== MULTI-PAGE TABS NAVIGATION VIEW SYSTEM ==================
const btnHome = document.getElementById('btn-home');
const btnBuilder = document.getElementById('btn-builder');
const btnTemplates = document.getElementById('btn-templates');
const btnBlogs = document.getElementById('btn-blogs');

const viewHome = document.getElementById('view-home');
const viewBuilder = document.getElementById('view-builder');
const viewTemplates = document.getElementById('view-templates');
const viewBlogs = document.getElementById('view-blogs');
const navLogo = document.getElementById('nav-logo');
const btnDownloadPDF = document.getElementById('btn-download-pdf');
const templatesList = document.getElementById('templates-list');
const resumeForm = document.getElementById('resume-form');

// Global Application State
const state = {
    currentTemplate: "default",
    resumeData: {
        name: "Anar Abbas",
        title: "Frontend Web Developer & UI Designer",
        email: "nimramumtaaz16@gmail.com",
        phone: "+92 300 1234567",
        summary: "Passionate Frontend Developer and UI Designer based in Sargodha, Pakistan. Specialized in building clean, responsive user interfaces using HTML, CSS, Vanilla JavaScript, and Bootstrap.",
        photo: ""
    },
    education: [
        { id: "ed1", degree: "Bachelors in Computer Science", institute: "University of Sargodha", year: "2022 - 2026" }
    ],
    experience: [
        { 
            id: "ex1", 
            role: "Frontend Developer Intern", 
            company: "Enfotrix Pvt Ltd.", 
            duration: "01/2026 - Present",
            details: "• Developed clean, modular, and responsive UI components using Vanilla JavaScript and Bootstrap.\n• Optimized web app layouts for smooth performance and cross-device rendering.\n• Built intuitive drag-and-drop structural feature interfaces utilizing CSS absolute positioning layouts."
        }
    ],
    skills: [
        { id: "sk1", name: "HTML5" },
        { id: "sk2", name: "CSS3" },
        { id: "sk3", name: "JavaScript" },
        { id: "sk4", name: "Bootstrap" },
        { id: "sk5", name: "UI Design" },
        { id: "sk6", name: "DOM Manipulation" }
    ],
    customSections: [
        { 
            id: "cs1", 
            title: "Projects", 
            value: "GlassCraft UI\nModern CSS Glassmorphism Generator tool built with pristine frontend structures.\n\nSmart Resume Builder\nClient-side secure multi-template CV creation application platform."
        }
    ]
};

// Click Listeners for Navigation Routing
btnHome.addEventListener('click', () => switchView('home'));
btnBuilder.addEventListener('click', () => switchView('builder'));
btnTemplates.addEventListener('click', () => switchView('templates'));
btnBlogs.addEventListener('click', () => switchView('blogs'));
navLogo.addEventListener('click', () => switchView('home'));

// Master Consolidated Navigation Router
function switchView(view) {
    // Hide all view section nodes
    viewHome.classList.add('hidden');
    viewBuilder.classList.add('hidden');
    viewTemplates.classList.add('hidden');
    viewBlogs.classList.add('hidden');

    // Remove active style state token classes from headers
    btnHome.classList.remove('active');
    btnBuilder.classList.remove('active');
    btnTemplates.classList.remove('active');
    btnBlogs.classList.remove('active');

    // Manage download action panel item presence
    if (view === 'builder') {
        btnDownloadPDF.classList.remove('hidden');
    } else {
        btnDownloadPDF.classList.add('hidden');
    }

    // Toggle target content layout visible
    if (view === 'home') {
        viewHome.classList.remove('hidden');
        btnHome.classList.add('active');
    } else if (view === 'builder') {
        viewBuilder.classList.remove('hidden');
        btnBuilder.classList.add('active');
        loadActiveTemplate(); 
    } else if (view === 'templates') {
        viewTemplates.classList.remove('hidden');
        btnTemplates.classList.add('active');
        renderTemplatesPage(); 
    } else if (view === 'blogs') {
        viewBlogs.classList.remove('hidden');
        btnBlogs.classList.add('active');
        showBlogListing(); // Reset view back to dashboard cards listing grid
    }
}

// ================== BLOG SYSTEM ==================
// Make functions globally accessible
window.openBlogArticle = openBlogArticle;
window.showBlogListing = showBlogListing;

/**
 * Open a specific blog article by its ID
 * @param {string} articleId - The ID of the article to open (e.g., 'ats-guide', 'mistakes-guide')
 */
function openBlogArticle(articleId) {
    // Hide the blog listing view
    const listingView = document.getElementById('blog-listing-view');
    if (listingView) listingView.classList.add('hidden');
    
    // Show the full content view
    const fullContentView = document.getElementById('blog-full-content-view');
    if (fullContentView) fullContentView.classList.remove('hidden');
    
    // Hide all individual articles first
    const allArticles = document.querySelectorAll('.full-article-body');
    allArticles.forEach(article => article.classList.add('hidden'));
    
    // Show the specific article
    const activeArticle = document.getElementById(`article-${articleId}`);
    if (activeArticle) {
        activeArticle.classList.remove('hidden');
    } else {
        // Fallback: If article not found, show listing
        showBlogListing();
    }
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Show the blog listing view and hide the full content view
 */
function showBlogListing() {
    const listingView = document.getElementById('blog-listing-view');
    const fullContentView = document.getElementById('blog-full-content-view');
    
    if (listingView) listingView.classList.remove('hidden');
    if (fullContentView) fullContentView.classList.add('hidden');
}

// ================== CORE BUILDER ENGINE LOGIC ==================
async function loadActiveTemplate() {
    const config = AVAILABLE_TEMPLATES.find(t => t.id === state.currentTemplate);
    if (!config) return;

    document.getElementById('template-styles').href = config.cssFile;

    try {
        const response = await fetch(config.htmlFile);
        const htmlText = await response.text();
        const placeholder = document.getElementById('resume-preview-placeholder');
        placeholder.innerHTML = htmlText;
        
        const container = placeholder.querySelector('.cv-premium-container');
        if (container) {
            container.style.width = '100%';
            container.style.maxWidth = '794px';
            container.style.margin = '0 auto';
        }
        
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

// Global Form Synchronization Listeners
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

// Structural Array Appenders & Modifiers
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
    } else if (state.currentTemplate === 'modern' && typeof renderModernTemplate === 'function') {
        renderModernTemplate(state);
    } else if (state.currentTemplate === 'elegant' && typeof renderElegantTemplate === 'function') {
        renderElegantTemplate(state);
    }
}

// Gallery Page Grid Builders
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

// Initial Core Bootstrapping Hook
window.addEventListener('DOMContentLoaded', () => {
    loadActiveTemplate();
});

// ================== DOWNLOAD PDF CONFIGURATION ==================
btnDownloadPDF.addEventListener('click', async () => {
    const placeholder = document.getElementById('resume-preview-placeholder');
    const cvElement = placeholder.querySelector('.cv-premium-container') || placeholder.querySelector('.cv-ats-theme');

    if (!cvElement) {
        alert("CV load nahi hui. Page refresh karke try karo.");
        return;
    }

    btnDownloadPDF.innerHTML = '⏳ Generating...';
    btnDownloadPDF.disabled = true;

    const opt = {
        margin: [6, 6, 6, 6],
        filename: `${(state.resumeData.name || 'Resume').replace(/ /g, '_')}_CV.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { 
            scale: 2.2,
            useCORS: true,
            letterRendering: true,
            allowTaint: true,
            width: 794,
            height: 1123,           
            scrollY: 0
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        },
        pagebreak: { 
            mode: ['avoid-all', 'css'],
            avoid: ['.cv-experience-node', '.sidebar-section', '.ats-section']
        }
    };

    try {
        await html2pdf().set(opt).from(cvElement).save();
    } catch (err) {
        console.error(err);
        alert("PDF error aaya. Desktop pe try karo.");
    } finally {
        btnDownloadPDF.innerHTML = '📥 Download PDF';
        btnDownloadPDF.disabled = false;
    }
});