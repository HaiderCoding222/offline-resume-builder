const btnHome = document.getElementById('btn-home');
const btnBuilder = document.getElementById('btn-builder');
const btnTemplates = document.getElementById('btn-templates');
const btnBlogs = document.getElementById('btn-blogs');
const navLogo = document.getElementById('nav-logo');
const btnDownloadPDF = document.getElementById('btn-download-pdf');

const viewHome = document.getElementById('view-home');
const viewBuilder = document.getElementById('view-builder');
const viewTemplates = document.getElementById('view-templates');
const viewBlogs = document.getElementById('view-blogs');

const state = {
    currentTemplate: "default",
    resumeData: { name: "", title: "", email: "", phone: "", summary: "", photo: "" },
    education: [],
    experience: [],
    skills: [],
    customSections: []
};

btnHome.addEventListener('click', () => switchView('home'));
btnBuilder.addEventListener('click', () => switchView('builder'));
btnTemplates.addEventListener('click', () => switchView('templates'));
btnBlogs.addEventListener('click', () => switchView('blogs'));
navLogo.addEventListener('click', () => switchView('home'));

function switchView(view) {
    viewHome.classList.add('hidden');
    viewBuilder.classList.add('hidden');
    viewTemplates.classList.add('hidden');
    viewBlogs.classList.add('hidden');

    btnHome.classList.remove('active');
    btnBuilder.classList.remove('active');
    btnTemplates.classList.remove('active');
    btnBlogs.classList.remove('active');

    if (view === 'builder') btnDownloadPDF.classList.remove('hidden');
    else btnDownloadPDF.classList.add('hidden');

    if (view === 'home') { viewHome.classList.remove('hidden'); btnHome.classList.add('active'); }
    else if (view === 'builder') { viewBuilder.classList.remove('hidden'); btnBuilder.classList.add('active'); loadActiveTemplate(); }
    else if (view === 'templates') { viewTemplates.classList.remove('hidden'); btnTemplates.classList.add('active'); renderTemplatesPage(); }
    else if (view === 'blogs') { viewBlogs.classList.remove('hidden'); btnBlogs.classList.add('active'); }
}

async function loadActiveTemplate() {
    const config = AVAILABLE_TEMPLATES.find(t => t.id === state.currentTemplate);
    if (!config) return;

    document.getElementById('template-styles').href = config.cssFile;

    try {
        const response = await fetch(config.htmlFile);
        const htmlText = await response.text();
        document.getElementById('resume-preview-placeholder').innerHTML = htmlText;

        let fnName = 'render' + state.currentTemplate.charAt(0).toUpperCase() + 
                     state.currentTemplate.slice(1).replace(/-/g, '');

        if (fnName === 'renderDefault') fnName = 'renderDefaultTemplate';
        if (fnName === 'renderBlue') fnName = 'renderBlueTemplate';
        if (fnName === 'renderElegant') fnName = 'renderElegantTemplate';
        if (fnName === 'renderEmerald') fnName = 'renderEmeraldTemplate';
        if (fnName === 'renderTeal') fnName = 'renderTealTemplate';
        if (fnName === 'renderModern') fnName = 'renderModernTemplate';

        const renderFn = window[fnName];

        if (typeof renderFn === 'function') {
            renderFn(state);
            console.log(`✅ Successfully rendered: ${fnName}`);
        } else {
            console.warn(`Render function not found: ${fnName}`);
        }
    } catch (err) {
        console.error("Template load error:", err);
    }
}

function renderTemplatesPage() {
    const container = document.getElementById('templates-list');
    container.innerHTML = '';
    AVAILABLE_TEMPLATES.forEach(t => {
        const card = document.createElement('div');
        card.className = "template-card";
        card.innerHTML = `<img src="${t.thumbnail}" style="width:100%;height:100%;object-fit:cover;">`;
        card.onclick = () => { state.currentTemplate = t.id; switchView('builder'); };
        container.appendChild(card);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    loadActiveTemplate();
});

// ============================================================
// PDF DOWNLOAD - CALL TEMPLATE-SPECIFIC FUNCTION
// ============================================================
document.addEventListener('click', function(e) {
    // Debug: check what was clicked
    console.log("🖱️ Click detected on:", e.target);
    
    const downloadBtn = e.target.closest('#btn-download-pdf');
    if (!downloadBtn) return;

    console.log("📥 Download button clicked!");

    e.preventDefault();

    // Get current template
    const template = state.currentTemplate;
    console.log("📥 Current template:", template);
    
    // Build function name
    let fnName = 'download' + template.charAt(0).toUpperCase() + 
                 template.slice(1).replace(/-/g, '') + 'PDF';
    
    // Special cases mapping
    const templateMap = {
        'default': 'downloadDefaultPDF',
        'teal': 'downloadTealPDF',
        'modern': 'downloadModernPDF',
        'emerald': 'downloadEmeraldPDF',
        'blue': 'downloadBluePDF',
        'elegant': 'downloadElegantPDF',
        'corporate-clean': 'downloadCorporateCleanPDF'
    };
    
    if (templateMap[template]) {
        fnName = templateMap[template];
    }

    console.log(`📥 Calling function: ${fnName}`);
    console.log(`📥 Function exists? ${typeof window[fnName] === 'function'}`);

    if (typeof window[fnName] === 'function') {
        console.log(`🚀 Calling ${fnName}...`);
        window[fnName]();
    } else {
        console.error(`❌ Function not found: ${fnName}`);
        alert(`⚠️ PDF download function not found for "${template}" template!`);
    }
});