// ====================================================
// ELEGANT TEMPLATE - COMPLETE LOGIC (FINAL)
// ====================================================

console.log("🎨 [Elegant] Template JS loaded!");

// ====================================================
// MAIN RENDER FUNCTION
// ====================================================
function renderElegantTemplate(state) {
    console.log("🎨 [Elegant] renderElegantTemplate called");

    if (!state.elegantSections) {
        console.log("🎨 [Elegant] Initializing default data...");
        state.elegantData = {
            name: "Anar Abbas",
            title: "Frontend Web Developer & UI Designer",
            email: "nimramumtaaz16@gmail.com",
            phone: "+92 300 1234567",
            summary: "Passionate Frontend Developer based in Sargodha, Pakistan. Specialized in building clean, responsive user interfaces using HTML, CSS, Vanilla JavaScript, and Bootstrap.",
            photo: "",
            linkedin: "linkedin.com/in/anar-abbas",
            portfolio: "myportfolio.com"
        };

        state.elegantSections = [
            {
                id: Date.now() + 1,
                title: "Skills",
                icon: "🛠️",
                type: "skills",
                side: "left",
                items: [
                    { name: "HTML5 & CSS3" },
                    { name: "Vanilla JavaScript" },
                    { name: "Bootstrap" },
                    { name: "UI/UX Design" }
                ]
            },
            {
                id: Date.now() + 2,
                title: "Education",
                icon: "🎓",
                type: "education",
                side: "right",
                items: [
                    { year: "2022 - 2026", institute: "University of Sargodha", degree: "Bachelors in Computer Science" }
                ]
            },
            {
                id: Date.now() + 3,
                title: "Experience",
                icon: "💼",
                type: "experience",
                side: "right",
                items: [
                    {
                        duration: "01/2026 - Present",
                        company: "Enfotrix Pvt Ltd.",
                        role: "Frontend Developer Intern",
                        details: "Developed clean, modular UI components using Vanilla JavaScript and Bootstrap."
                    }
                ]
            }
        ];
    }

    const d = state.elegantData;
    const leftSections = state.elegantSections.filter(s => s.side === 'left');
    const rightSections = state.elegantSections.filter(s => s.side === 'right');

    // ============ RENDER SECTION HELPER ============
    const renderPreviewSection = (sec) => {
        if (sec.type === 'skills') {
            return `
                <div class="elegant-section">
                    <h3 class="elegant-section-title">${sec.icon} ${sec.title}</h3>
                    <div class="elegant-skills-list">
                        ${sec.items.map(s => `<div>${s.name}</div>`).join('')}
                    </div>
                </div>`;
        }
        else if (sec.type === 'education' || sec.type === 'experience') {
            return `
                <div class="elegant-section">
                    <h3 class="elegant-section-title">${sec.icon} ${sec.title}</h3>
                    ${sec.items.map(item => {
                        if (sec.type === 'education') {
                            return `
                                <div class="cv-experience-node">
                                    <div class="cv-node-date-sub">${item.year || ''}</div>
                                    <div class="cv-node-bold-title">${item.institute || ''}</div>
                                    <div class="cv-node-role-italic">${item.degree || ''}</div>
                                </div>`;
                        } else {
                            return `
                                <div class="cv-experience-node">
                                    <div class="cv-node-date-sub">${item.duration || ''}</div>
                                    <div class="cv-node-bold-title">${item.company || ''}</div>
                                    <div class="cv-node-role-italic">${item.role || ''}</div>
                                    <p class="cv-node-details-para">${item.details || ''}</p>
                                </div>`;
                        }
                    }).join('')}
                </div>`;
        }
        return '';
    };

    // ============ BUILD PREVIEW HTML ============
    const previewHTML = `
        <div class="elegant-theme">
            <div class="elegant-header">
                <div class="elegant-photo-container">
                    <div class="elegant-avatar" style="background-image:url('${d.photo || ''}')"></div>
                </div>
                <div class="elegant-name-block">
                    <h1>${d.name || ''}</h1>
                    <h2 class="elegant-profession">${d.title || ''}</h2>
                </div>
            </div>

            <div class="elegant-body">
                <div class="elegant-left-column">
                    <div class="elegant-section">
                        <h3 class="elegant-section-title">👤 About Me</h3>
                        <p class="elegant-text">${d.summary || ''}</p>
                    </div>

                    <div class="elegant-section">
                        <h3 class="elegant-section-title">📞 Contact</h3>
                        <div class="elegant-contact-info">
                            ${d.phone ? `<div class="contact-item"><b>📞 Phone:</b> ${d.phone}</div>` : ''}
                            ${d.email ? `<div class="contact-item"><b>✉️ Email:</b> ${d.email}</div>` : ''}
                            ${d.linkedin ? `<div class="contact-item"><b>🔗 LinkedIn:</b> ${d.linkedin}</div>` : ''}
                            ${d.portfolio ? `<div class="contact-item"><b>🌐 Portfolio:</b> ${d.portfolio}</div>` : ''}
                        </div>
                    </div>

                    ${leftSections.map(sec => renderPreviewSection(sec)).join('')}
                </div>

                <div class="elegant-right-column">
                    ${rightSections.map(sec => renderPreviewSection(sec)).join('')}
                </div>
            </div>
        </div>
    `;

    // ============ INJECT INTO PREVIEW NODE ============
    const printNode = document.getElementById('elegant-print-node');
    if (printNode) {
        printNode.innerHTML = previewHTML;
        console.log("🎨 [Elegant] Preview HTML injected");
    } else {
        console.warn("⚠️ [Elegant] Print node NOT found!");
    }

    // ============ BIND PERSONAL INPUTS ============
    const bind = (id, key) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (document.activeElement !== el) el.value = d[key] || '';
        if (!el.dataset.bound) {
            el.dataset.bound = '1';
            el.addEventListener('input', () => {
                d[key] = el.value;
                renderElegantTemplate(state);
            });
        }
    };

    bind('el-input-name', 'name');
    bind('el-input-title', 'title');
    bind('el-input-summary', 'summary');
    bind('el-input-phone', 'phone');
    bind('el-input-email', 'email');
    bind('el-input-linkedin', 'linkedin');
    bind('el-input-portfolio', 'portfolio');

    // ============ PHOTO UPLOAD ============
    const photoInput = document.getElementById('el-photo-upload');
    if (photoInput && !photoInput.dataset.bound) {
        photoInput.dataset.bound = '1';
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                d.photo = ev.target.result;
                renderElegantTemplate(state);
            };
            reader.readAsDataURL(file);
        });
    }

    // ============ REFRESH DYNAMIC EDITOR ============
    const container = document.getElementById('elegant-dynamic-editor-fields');
    if (container) {
        const sectionCount = state.elegantSections.length;
        if (container.dataset.count != sectionCount || !container.innerHTML.trim()) {
            refreshElegantEditor();
            container.dataset.count = sectionCount;
        }
    }

    window.state = state;

    if (window.innerWidth <= 820) {
        console.log("📐 [Elegant] Mobile detected, applying scaling...");
        requestAnimationFrame(() => {
            applyElegantMobileScaling();
            setTimeout(applyElegantMobileScaling, 50);
        });
  }
}

// ====================================================
// REFRESH DYNAMIC EDITOR
// ====================================================
function refreshElegantEditor() {
    const container = document.getElementById('elegant-dynamic-editor-fields');
    if (!container) return;
    container.innerHTML = '';

    state.elegantSections.forEach((section, index) => {
        let itemsHTML = '';

        if (section.type === 'skills') {
            itemsHTML = section.items.map((item, itemIdx) => `
                <div style="display:flex;gap:6px;margin-bottom:6px;">
                    <input type="text" value="${item.name || ''}" style="flex:1;padding:5px;border:1px solid #cbd5e1;border-radius:4px;font-size:12px;"
                        oninput="state.elegantSections[${index}].items[${itemIdx}].name=this.value;renderElegantTemplate(state);">
                    <button onclick="deleteElegantItem(${index}, ${itemIdx});" style="background:#ef4444;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">✕</button>
                </div>`).join('');
        }
        else if (section.type === 'education') {
            itemsHTML = section.items.map((item, itemIdx) => `
                <div style="border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px; margin-bottom: 8px;">
                    <input type="text" value="${item.year || ''}" placeholder="Year" style="width:100%;padding:5px;margin-bottom:4px;border:1px solid #cbd5e1;border-radius:4px;font-size:12px;"
                        oninput="state.elegantSections[${index}].items[${itemIdx}].year=this.value;renderElegantTemplate(state);">
                    <input type="text" value="${item.institute || ''}" placeholder="Institute" style="width:100%;padding:5px;margin-bottom:4px;border:1px solid #cbd5e1;border-radius:4px;font-size:12px;"
                        oninput="state.elegantSections[${index}].items[${itemIdx}].institute=this.value;renderElegantTemplate(state);">
                    <div style="display:flex;gap:4px;">
                        <input type="text" value="${item.degree || ''}" placeholder="Degree" style="flex:1;padding:5px;border:1px solid #cbd5e1;border-radius:4px;font-size:12px;"
                            oninput="state.elegantSections[${index}].items[${itemIdx}].degree=this.value;renderElegantTemplate(state);">
                        <button onclick="deleteElegantItem(${index}, ${itemIdx});" style="background:#ef4444;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">✕</button>
                    </div>
                </div>`).join('');
        }
        else if (section.type === 'experience') {
            itemsHTML = section.items.map((item, itemIdx) => `
                <div style="border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px; margin-bottom: 8px;">
                    <input type="text" value="${item.duration || ''}" placeholder="Duration" style="width:100%;padding:5px;margin-bottom:4px;border:1px solid #cbd5e1;border-radius:4px;font-size:12px;"
                        oninput="state.elegantSections[${index}].items[${itemIdx}].duration=this.value;renderElegantTemplate(state);">
                    <input type="text" value="${item.company || ''}" placeholder="Company" style="width:100%;padding:5px;margin-bottom:4px;border:1px solid #cbd5e1;border-radius:4px;font-size:12px;"
                        oninput="state.elegantSections[${index}].items[${itemIdx}].company=this.value;renderElegantTemplate(state);">
                    <input type="text" value="${item.role || ''}" placeholder="Role" style="width:100%;padding:5px;margin-bottom:4px;border:1px solid #cbd5e1;border-radius:4px;font-size:12px;"
                        oninput="state.elegantSections[${index}].items[${itemIdx}].role=this.value;renderElegantTemplate(state);">
                    <div style="display:flex;gap:4px;">
                        <textarea placeholder="Details" style="flex:1;padding:5px;border:1px solid #cbd5e1;border-radius:4px;resize:vertical;font-size:12px;"
                            oninput="state.elegantSections[${index}].items[${itemIdx}].details=this.value;renderElegantTemplate(state);">${item.details || ''}</textarea>
                        <button onclick="deleteElegantItem(${index}, ${itemIdx});" style="background:#ef4444;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;align-self:flex-start;">✕</button>
                    </div>
                </div>`).join('');
        }

        container.innerHTML += `
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:12px;margin-bottom:12px;">
                <div style="display:flex;gap:6px;margin-bottom:12px;">
                    <input type="text" value="${section.icon}" placeholder="Emoji" style="width:50px;padding:8px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-size:14px;"
                        oninput="updateElegantSectionIcon(${index},this.value);">
                    <input type="text" value="${section.title}" placeholder="Section Title" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:4px;font-weight:600;font-size:14px;"
                        oninput="updateElegantSectionTitle(${index},this.value);">
                </div>
                ${itemsHTML}
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:8px;border-top:1px solid #e2e8f0;flex-wrap:wrap;gap:6px;">
                    <select onchange="updateElegantSectionSide(${index},this.value);" style="padding:6px;border:1px solid #cbd5e1;border-radius:4px;font-size:12px;">
                        <option value="left" ${section.side === 'left' ? 'selected' : ''}>Left (Sidebar)</option>
                        <option value="right" ${section.side === 'right' ? 'selected' : ''}>Right (Main)</option>
                    </select>
                    <div style="display:flex;gap:6px;">
                        <button type="button" onclick="addElegantItem(${index});" style="background:#10b981;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">+ Add</button>
                        <button type="button" onclick="cloneElegantSection(${index});" style="background:#3b82f6;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">Clone</button>
                        <button type="button" onclick="deleteElegantSection(${index});" style="background:#ef4444;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">Delete</button>
                    </div>
                </div>
            </div>`;
    });
    console.log("🎨 [Elegant] Editor refreshed");
}

// ====================================================
// SECTION HELPERS
// ====================================================
function updateElegantSectionIcon(idx, val) {
    state.elegantSections[idx].icon = val;
    renderElegantTemplate(state);
}

function updateElegantSectionTitle(idx, val) {
    state.elegantSections[idx].title = val;
    renderElegantTemplate(state);
}

function updateElegantSectionSide(idx, val) {
    state.elegantSections[idx].side = val;
    renderElegantTemplate(state);
}

function addElegantItem(idx) {
    const sec = state.elegantSections[idx];
    if (sec.type === 'skills') sec.items.push({ name: "New Skill" });
    else if (sec.type === 'education') sec.items.push({ year: "", institute: "", degree: "" });
    else if (sec.type === 'experience') sec.items.push({ duration: "", company: "", role: "", details: "" });
    refreshElegantEditor();
    renderElegantTemplate(state);
}

function cloneElegantSection(idx) {
    const original = state.elegantSections[idx];
    const clone = JSON.parse(JSON.stringify(original));
    clone.id = Date.now();
    clone.title = clone.title + " (Copy)";
    state.elegantSections.splice(idx + 1, 0, clone);
    refreshElegantEditor();
    renderElegantTemplate(state);
}

function deleteElegantSection(idx) {
    if (state.elegantSections.length > 1) {
        if (confirm("Delete this section?")) {
            state.elegantSections.splice(idx, 1);
            refreshElegantEditor();
            renderElegantTemplate(state);
        }
    } else {
        alert("At least one section required.");
    }
}

function deleteElegantItem(secIdx, itemIdx) {
    if (state.elegantSections[secIdx].items.length > 1) {
        state.elegantSections[secIdx].items.splice(itemIdx, 1);
        refreshElegantEditor();
        renderElegantTemplate(state);
    } else {
        alert("At least one item required!");
    }
}

window.clearContactField = function (key) {
    if (window.state && window.state.elegantData) {
        window.state.elegantData[key] = '';
        renderElegantTemplate(window.state);
    }
};

function applyElegantMobileScaling() {
    console.log("📐 [Elegant] applyElegantMobileScaling called");

    const previewContainer = document.getElementById('el-preview-panel');
    const scaleWrapper = document.getElementById('elegant-scale-wrapper');
    const printNode = document.getElementById('elegant-print-node');

    if (!previewContainer || !printNode || !scaleWrapper) return;

    // DESKTOP RESET
    if (window.innerWidth > 820) {
        printNode.style.cssText = '';
        scaleWrapper.style.cssText = '';
        return;
    }

    // MOBILE
    const containerWidth = previewContainer.clientWidth;
    if (containerWidth < 50) {
        requestAnimationFrame(() => applyElegantMobileScaling());
        return;
    }

    const baseWidth = 794;
    const baseHeight = 1123;
    
    // Thora sa padding chhor kar scale karein (10px)
    const scaleRatio = (containerWidth - 10) / baseWidth;
    const scaledHeight = baseHeight * scaleRatio;

    console.log("📐 [Elegant] Container:", containerWidth, "| Scale:", scaleRatio.toFixed(4), "| Height:", scaledHeight.toFixed(0));

    // Wrapper: Exact scaled height set karein
    scaleWrapper.style.height = scaledHeight + 'px';
    scaleWrapper.style.overflow = 'hidden';
    scaleWrapper.style.position = 'relative';
    scaleWrapper.style.display = 'flex';
    scaleWrapper.style.justifyContent = 'center';
    scaleWrapper.style.alignItems = 'flex-start';
    scaleWrapper.style.width = '100%';
    scaleWrapper.style.margin = '0 auto';

    // PrintNode: A4 size, scale from top center
    printNode.style.width = '794px';
    printNode.style.minWidth = '794px';
    printNode.style.maxWidth = '794px';
    printNode.style.height = '1123px';
    printNode.style.minHeight = '1123px';
    printNode.style.maxHeight = '1123px';
    printNode.style.transformOrigin = 'top center';
    printNode.style.transform = `scale(${scaleRatio})`;
    
    // Position ko relative rakhein taake wrapper ki height kaam kare
    printNode.style.position = 'relative';
    printNode.style.top = 'auto';
    printNode.style.left = 'auto';
    printNode.style.margin = '0';
    printNode.style.boxShadow = 'none';
    printNode.style.flexShrink = '0';

    console.log("✅ [Elegant] Applied Scaling");
}
// ====================================================
// MOBILE TAB SWITCHER
// ====================================================
function elSwitchMobileTab(tab) {
    console.log("🔵 [Elegant] Tab switch:", tab);

    const editor = document.getElementById('el-editor-panel');
    const preview = document.getElementById('el-preview-panel');
    const btnEditor = document.getElementById('el-tab-editor');
    const btnPreview = document.getElementById('el-tab-preview');

    if (!editor || !preview) {
        console.error("❌ [Elegant] Editor or Preview not found!");
        return;
    }

    if (tab === 'editor') {
        editor.classList.remove('mobile-hidden');
        preview.classList.add('mobile-hidden');
        if (btnEditor) btnEditor.classList.add('active');
        if (btnPreview) btnPreview.classList.remove('active');
        console.log("✅ [Elegant] Switched to EDITOR");
    } else {
        editor.classList.add('mobile-hidden');
        preview.classList.remove('mobile-hidden');
        if (btnEditor) btnEditor.classList.remove('active');
        if (btnPreview) btnPreview.classList.add('active');
        console.log("✅ [Elegant] Switched to PREVIEW");

        setTimeout(() => { console.log("🔵 [Elegant] Retry 1"); applyElegantMobileScaling(); }, 50);
        setTimeout(() => { console.log("🔵 [Elegant] Retry 2"); applyElegantMobileScaling(); }, 150);
        setTimeout(() => { console.log("🔵 [Elegant] Retry 3"); applyElegantMobileScaling(); }, 300);
    }
}

// ====================================================
// WINDOW RESIZE HANDLER (DEBOUNCED)
// ====================================================
let elegantResizeTimer = null;
window.addEventListener('resize', () => {
    if (elegantResizeTimer) clearTimeout(elegantResizeTimer);
    elegantResizeTimer = setTimeout(() => {
        console.log("🔵 [Elegant] Resize detected, width:", window.innerWidth);
        if (window.innerWidth > 820) {
            const editor = document.getElementById('el-editor-panel');
            const preview = document.getElementById('el-preview-panel');
            if (editor) editor.classList.remove('mobile-hidden');
            if (preview) preview.classList.remove('mobile-hidden');
            applyElegantMobileScaling();
        } else {
            applyElegantMobileScaling();
        }
    }, 100);
});

// ====================================================
// EXPORTS
// ====================================================
window.renderElegantTemplate = renderElegantTemplate;
window.elSwitchMobileTab = elSwitchMobileTab;
window.refreshElegantEditor = refreshElegantEditor;
window.updateElegantSectionIcon = updateElegantSectionIcon;
window.updateElegantSectionTitle = updateElegantSectionTitle;
window.updateElegantSectionSide = updateElegantSectionSide;
window.addElegantItem = addElegantItem;
window.cloneElegantSection = cloneElegantSection;
window.deleteElegantSection = deleteElegantSection;
window.deleteElegantItem = deleteElegantItem;

// ====================================================
// PDF DOWNLOAD
// ====================================================
function downloadElegantPDF() {
    console.log("🚀 [Elegant PDF] Download initiated...");

    let element = document.querySelector('#elegant-print-node .elegant-theme');
    if (!element) element = document.querySelector('.elegant-theme');
    if (!element) {
        alert("❌ Elegant preview not found!");
        return;
    }

    console.log("🚀 [Elegant PDF] Element found");

    const clone = element.cloneNode(true);
    clone.querySelectorAll('form, input, button, select, textarea, .no-print, .tmpl-mobile-tabs-container').forEach(el => el.remove());

    // Reset transform on clone for PDF
    clone.style.transform = 'none';
    clone.style.position = 'relative';
    clone.style.left = 'auto';
    clone.style.top = 'auto';
    clone.style.transformOrigin = 'top center';
    clone.style.margin = '0 auto';

    const styles = document.createElement('style');
    styles.textContent = `
        .elegant-theme {
            width: 794px !important; min-width: 794px !important; max-width: 794px !important;
            height: 1123px !important; min-height: 1123px !important; max-height: 1123px !important;
            margin: 0 auto !important; padding: 0 !important;
            background: #ffffff !important; overflow: hidden !important;
            box-sizing: border-box !important; transform: none !important;
            box-shadow: none !important; border-radius: 0 !important;
            font-family: 'Segoe UI', system-ui, sans-serif !important;
        }
        .elegant-header {
            background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%) !important;
            padding: 35px 40px 25px !important;
            display: flex !important; align-items: center !important; gap: 30px !important;
            border-bottom: 4px solid #0ea5e9 !important;
        }
        .elegant-avatar {
            width: 125px !important; height: 125px !important; border-radius: 50% !important;
            background-size: cover !important; background-position: center !important;
            border: 5px solid white !important;
        }
        .elegant-name-block h1 {
            font-size: 34px !important; margin: 0 0 4px 0 !important;
            color: #0f172a !important; font-weight: 700 !important;
        }
        .elegant-profession {
            font-size: 17px !important; color: #475569 !important;
            margin: 0 !important; font-weight: 500 !important;
        }
        .elegant-body {
            display: flex !important; padding: 30px 40px !important;
            gap: 35px !important; background: #ffffff !important;
        }
        .elegant-left-column { width: 38% !important; }
        .elegant-right-column { width: 62% !important; }
        .elegant-section { margin-bottom: 22px !important; }
        .elegant-section-title {
            font-size: 13.5px !important; font-weight: 700 !important;
            color: #0f172a !important; margin-bottom: 12px !important;
            display: flex !important; align-items: center !important;
            gap: 8px !important; border-bottom: 2px solid #bae6fd !important;
            padding-bottom: 6px !important; text-transform: uppercase !important;
        }
        .elegant-text {
            font-size: 12px !important; line-height: 1.55 !important;
            color: #334155 !important; margin: 0 !important;
        }
        .elegant-contact-info .contact-item {
            font-size: 12px !important; margin-bottom: 6px !important; color: #475569 !important;
        }
        .elegant-skills-list {
            display: flex !important; flex-direction: column !important; gap: 6px !important;
        }
        .elegant-skills-list div {
            font-size: 12px !important; padding-left: 2px !important; color: #334155 !important;
        }
        .cv-node-bold-title { font-size: 13px !important; font-weight: 700 !important; color: #0f172a !important; }
        .cv-node-date-sub { font-size: 11px !important; color: #64748b !important; margin: 1px 0 3px !important; }
        .cv-node-role-italic { font-size: 12px !important; color: #334155 !important; font-style: italic !important; margin-bottom: 4px !important; }
        .cv-node-details-para { font-size: 11.5px !important; line-height: 1.5 !important; color: #475569 !important; margin: 0 !important; }
    `;
    clone.prepend(styles);

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
        position: fixed !important;
        top: -9999px !important;
        left: -9999px !important;
        width: 794px !important;
        height: 1123px !important;
        z-index: -99999 !important;
        opacity: 0.01 !important;
        pointer-events: none !important;
        background: #ffffff !important;
        overflow: hidden !important;
    `;
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    const userName = window.state?.elegantData?.name
        ? window.state.elegantData.name.trim().replace(/\s+/g, '_')
        : 'Resume';

    const opt = {
        margin: 0,
        filename: `${userName}_CV_Elegant.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            width: 794,
            height: 1123,
            backgroundColor: '#ffffff',
            scrollX: 0,
            scrollY: 0
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
        .set(opt)
        .from(clone)
        .save()
        .then(() => console.log("✅ [Elegant PDF] Generated!"))
        .catch(err => {
            console.error("❌ [Elegant PDF] Error:", err);
            alert("PDF generation failed!");
        })
        .finally(() => {
            if (document.body.contains(wrapper)) {
                document.body.removeChild(wrapper);
            }
        });
}

window.downloadElegantPDF = downloadElegantPDF;

console.log("✅ [Elegant] Template loaded & registered!");