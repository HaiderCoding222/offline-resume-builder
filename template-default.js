// ====================================================
// TEMPLATE DEFAULT - SELF CONTAINED EDITOR, PREVIEW & PDF
// ====================================================

(function () {
    console.log("🟢 [Default Template JS] Loaded!");

    const defaultData = {
        resumeData: {
            name: "Ansar Abbas",
            title: "Senior Dispenser/Paramedic",
            phone: "0345-8665835",
            email: "hello@reallygreatsite.com",
            summary: "Experienced Senior Dispenser/Paramedic with expertise in medication dispensing, patient care, and orthopedic assistance. Skilled in emergency response, wound management, and plaster application.",
            photo: ""
        },
        sections: [
            { id: 'sec_profile_' + Date.now(), type: 'profile', title: "PROFILE", visible: true, placement: 'sidebar' },
            { id: 'sec_skills_' + Date.now(), type: 'skills', title: "SKILLS", visible: true, placement: 'sidebar' },
            { id: 'sec_exp_' + Date.now(), type: 'experience', title: "EXPERIENCES", visible: true, placement: 'main' },
            { id: 'sec_edu_' + Date.now(), type: 'education', title: "EDUCATION", visible: true, placement: 'main' }
        ],
        experience: [
            {
                company: "Mubarak Medical Complex Sargodha",
                duration: "06/08/2026 - Present",
                role: "Dispenser/Paramedic",
                details: "• Dispensed medications accurately as per doctor's prescriptions\n• Administered injections, IV drips, and performed wound dressing and basic first aid"
            },
            {
                company: "FAIZ MEMORIAL HOSPITAL SARGODHA",
                duration: "01/01/2024 - 05/08/2026",
                role: "Orthopedic Assistant/Plaster Technician",
                details: "• Worked in the Orthopedic Department handling OPD and indoor patients with bone, joint, and fracture cases"
            }
        ],
        education: [
            { institute: "Government College of Pharmacy", year: "2020 - 2022", degree: "Diploma in Dispenser" }
        ],
        skills: [
            { name: "Medication Dispensing" },
            { name: "IV Therapy & Injections" },
            { name: "Wound Dressing & First Aid" },
            { name: "Plaster of Paris (POP) Casting" }
        ]
    };

    let templateState = JSON.parse(JSON.stringify(defaultData));

    // MOBILE TAB SWITCHING (< 600px)
    window.switchDefaultTab = function (tab) {
        const editorPanel = document.getElementById('tmpl-editor-panel');
        const previewPanel = document.getElementById('tmpl-preview-panel');
        const btnEditor = document.getElementById('btn-show-editor');
        const btnPreview = document.getElementById('btn-show-preview');

        if (!editorPanel || !previewPanel) return;

        if (tab === 'editor') {
            editorPanel.classList.remove('tmpl-mobile-hidden');
            previewPanel.classList.add('tmpl-mobile-hidden');

            if (btnEditor) btnEditor.classList.add('active');
            if (btnPreview) btnPreview.classList.remove('active');
        } else if (tab === 'preview') {
            previewPanel.classList.remove('tmpl-mobile-hidden');
            editorPanel.classList.add('tmpl-mobile-hidden');

            if (btnPreview) btnPreview.classList.add('active');
            if (btnEditor) btnEditor.classList.remove('active');
        }
    };

    // RENDER PREVIEW PAPER
    function renderPreview() {
        const nameEl = document.getElementById('tmpl-name');
        const titleEl = document.getElementById('tmpl-title');
        const emailEl = document.getElementById('tmpl-email');
        const phoneEl = document.getElementById('tmpl-phone');
        const avatarEl = document.getElementById('tmpl-avatar');

        if (nameEl) nameEl.innerText = templateState.resumeData.name || '';
        if (titleEl) titleEl.innerText = templateState.resumeData.title || '';
        if (emailEl) emailEl.innerText = templateState.resumeData.email ? '✉ ' + templateState.resumeData.email : '';
        if (phoneEl) phoneEl.innerText = templateState.resumeData.phone ? '📞 ' + templateState.resumeData.phone : '';

        if (avatarEl) {
            if (templateState.resumeData.photo) {
                avatarEl.style.backgroundImage = `url('${templateState.resumeData.photo}')`;
            } else {
                avatarEl.style.backgroundImage = 'none';
            }
        }

        const sidebarTarget = document.getElementById('tmpl-sidebar-dynamic-target');
        const mainTarget = document.getElementById('tmpl-main-dynamic-target');

        if (!sidebarTarget || !mainTarget) return;

        sidebarTarget.innerHTML = '';
        mainTarget.innerHTML = '';

        templateState.sections.forEach(sec => {
            if (!sec.visible) return;

            const target = sec.placement === 'main' ? mainTarget : sidebarTarget;
            const isSidebar = sec.placement === 'sidebar';

            if (sec.type === 'profile') {
                const block = document.createElement('div');
                block.className = isSidebar ? 'sidebar-section' : 'main-section';
                block.innerHTML = `
                    <h3 class="${isSidebar ? 'sidebar-heading' : 'main-section-heading'}">${sec.title}</h3>
                    <p class="sidebar-text" style="${isSidebar ? 'color:#e2e8f0;' : 'color:#334155;'}">${templateState.resumeData.summary || ''}</p>
                `;
                target.appendChild(block);
            }
            else if (sec.type === 'skills') {
                const block = document.createElement('div');
                block.className = isSidebar ? 'sidebar-section' : 'main-section';
                let html = `<h3 class="${isSidebar ? 'sidebar-heading' : 'main-section-heading'}">${sec.title}</h3>`;
                templateState.skills.forEach(sk => {
                    if (sk.name) html += `<div class="sidebar-skill-bullet" style="${isSidebar ? 'color:#e2e8f0;' : 'color:#334155;'}">• ${sk.name}</div>`;
                });
                block.innerHTML = html;
                target.appendChild(block);
            }
            else if (sec.type === 'experience') {
                const block = document.createElement('div');
                block.className = isSidebar ? 'sidebar-section' : 'main-section';
                let html = `<h3 class="${isSidebar ? 'sidebar-heading' : 'main-section-heading'}">${sec.title}</h3>`;
                templateState.experience.forEach(item => {
                    html += `
                        <div class="cv-experience-node">
                            <div class="cv-node-bold-title" style="${isSidebar ? 'color:#fff;' : 'color:#0f172a;'}">${item.company || ''}</div>
                            <div class="cv-node-date-sub">${item.duration || ''}</div>
                            <div class="cv-node-role-italic">${item.role || ''}</div>
                            <p class="cv-node-details-para" style="${isSidebar ? 'color:#e2e8f0;' : 'color:#334155;'}">${item.details || ''}</p>
                        </div>
                    `;
                });
                block.innerHTML = html;
                target.appendChild(block);
            }
            else if (sec.type === 'education') {
                const block = document.createElement('div');
                block.className = isSidebar ? 'sidebar-section' : 'main-section';
                let html = `<h3 class="${isSidebar ? 'sidebar-heading' : 'main-section-heading'}">${sec.title}</h3>`;
                templateState.education.forEach(item => {
                    html += `
                        <div class="cv-experience-node">
                            <div class="cv-node-bold-title" style="${isSidebar ? 'color:#fff;' : 'color:#0f172a;'}">${item.institute || ''}</div>
                            <div class="cv-node-date-sub">${item.year || ''}</div>
                            <div class="cv-node-role-italic">${item.degree || ''}</div>
                        </div>
                    `;
                });
                block.innerHTML = html;
                target.appendChild(block);
            }
        });
    }

    // RENDER EDITOR PANEL WITH COMPLETE SECTION CLONING & ITEM CONTROLS
   function renderEditorPanel() {
    const container = document.getElementById('tmpl-dynamic-editor-sections');

    // Personal Info Input Binds
    const nameInp = document.getElementById('tmpl-input-name');
    const titleInp = document.getElementById('tmpl-input-title');
    const phoneInp = document.getElementById('tmpl-input-phone');
    const emailInp = document.getElementById('tmpl-input-email');
    const photoInp = document.getElementById('tmpl-input-photo');

    if (nameInp) { nameInp.value = templateState.resumeData.name || ''; nameInp.oninput = (e) => { templateState.resumeData.name = e.target.value; renderPreview(); }; }
    if (titleInp) { titleInp.value = templateState.resumeData.title || ''; titleInp.oninput = (e) => { templateState.resumeData.title = e.target.value; renderPreview(); }; }
    if (phoneInp) { phoneInp.value = templateState.resumeData.phone || ''; phoneInp.oninput = (e) => { templateState.resumeData.phone = e.target.value; renderPreview(); }; }
    if (emailInp) { emailInp.value = templateState.resumeData.email || ''; emailInp.oninput = (e) => { templateState.resumeData.email = e.target.value; renderPreview(); }; }
    if (photoInp) {
        photoInp.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => { templateState.resumeData.photo = ev.target.result; renderPreview(); };
                reader.readAsDataURL(file);
            }
        };
    }

    if (!container) return;
    container.innerHTML = '';

    templateState.sections.forEach((sec, idx) => {
        const secCard = document.createElement('div');
        secCard.className = 'editor-section';

        // Direct isolated items determination: cloned array (sec.items) or global array fallback
        const itemsList = (sec.items !== undefined) ? sec.items : templateState[sec.type];

        let itemsHTML = '';

        if (sec.type === 'profile') {
            itemsHTML = `
                <div class="form-group">
                    <label>Summary / About Me</label>
                    <textarea rows="3" oninput="window.tmplUpdateSummary(this.value)" style="width:100%; font-size:11px; padding:4px;">${templateState.resumeData.summary || ''}</textarea>
                </div>
            `;
        }
        else if (sec.type === 'skills') {
            if (Array.isArray(itemsList)) {
                itemsList.forEach((sk, i) => {
                    itemsHTML += `
                        <div style="display:flex; gap:4px; margin-bottom:5px; align-items:center;">
                            <input type="text" value="${sk.name || ''}" placeholder="Skill Name" oninput="window.tmplUpdateItem('${sec.id}', '${sec.type}', ${i}, 'name', this.value)" style="flex:1; font-size:11px; padding:3px;">
                            <button onclick="window.tmplCloneItem('${sec.id}', '${sec.type}', ${i})" style="padding:2px 5px; font-size:10px; cursor:pointer;" title="Clone Item">📋</button>
                            <button onclick="window.tmplDeleteItem('${sec.id}', '${sec.type}', ${i})" style="padding:2px 5px; font-size:10px; color:red; cursor:pointer;" title="Delete Item">🗑️</button>
                        </div>
                    `;
                });
            }
            itemsHTML += `<button onclick="window.tmplAddItem('${sec.id}', '${sec.type}')" style="width:100%; font-size:11px; padding:4px; margin-top:5px; cursor:pointer; background:#e2e8f0; border:1px solid #cbd5e1; border-radius:3px;">+ Add Item</button>`;
        }
        else if (sec.type === 'experience') {
            if (Array.isArray(itemsList)) {
                itemsList.forEach((exp, i) => {
                    itemsHTML += `
                        <div style="border:1px dashed #cbd5e1; padding:6px; margin-bottom:6px; border-radius:4px; background:#fff;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                                <strong style="font-size:10px; color:#475569;">Item #${i + 1}</strong>
                                <div>
                                    <button onclick="window.tmplCloneItem('${sec.id}', '${sec.type}', ${i})" style="padding:1px 4px; font-size:10px; cursor:pointer;" title="Clone Item">📋 Clone Item</button>
                                    <button onclick="window.tmplDeleteItem('${sec.id}', '${sec.type}', ${i})" style="padding:1px 4px; font-size:10px; color:red; cursor:pointer;" title="Delete Item">🗑️</button>
                                </div>
                            </div>
                            <input type="text" value="${exp.company || ''}" placeholder="Company / Organization" oninput="window.tmplUpdateItem('${sec.id}', '${sec.type}', ${i}, 'company', this.value)" style="width:100%; font-size:11px; padding:3px; margin-bottom:3px;">
                            <input type="text" value="${exp.role || ''}" placeholder="Role / Designation" oninput="window.tmplUpdateItem('${sec.id}', '${sec.type}', ${i}, 'role', this.value)" style="width:100%; font-size:11px; padding:3px; margin-bottom:3px;">
                            <input type="text" value="${exp.duration || ''}" placeholder="Duration (e.g. 2026 - Present)" oninput="window.tmplUpdateItem('${sec.id}', '${sec.type}', ${i}, 'duration', this.value)" style="width:100%; font-size:11px; padding:3px; margin-bottom:3px;">
                            <textarea rows="2" placeholder="Responsibilities / Details" oninput="window.tmplUpdateItem('${sec.id}', '${sec.type}', ${i}, 'details', this.value)" style="width:100%; font-size:11px; padding:3px;">${exp.details || ''}</textarea>
                        </div>
                    `;
                });
            }
            itemsHTML += `<button onclick="window.tmplAddItem('${sec.id}', '${sec.type}')" style="width:100%; font-size:11px; padding:4px; cursor:pointer; background:#e2e8f0; border:1px solid #cbd5e1; border-radius:3px;">+ Add Item</button>`;
        }
        else if (sec.type === 'education') {
            if (Array.isArray(itemsList)) {
                itemsList.forEach((edu, i) => {
                    itemsHTML += `
                        <div style="border:1px dashed #cbd5e1; padding:6px; margin-bottom:6px; border-radius:4px; background:#fff;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                                <strong style="font-size:10px; color:#475569;">Item #${i + 1}</strong>
                                <div>
                                    <button onclick="window.tmplCloneItem('${sec.id}', '${sec.type}', ${i})" style="padding:1px 4px; font-size:10px; cursor:pointer;" title="Clone Item">📋 Clone Item</button>
                                    <button onclick="window.tmplDeleteItem('${sec.id}', '${sec.type}', ${i})" style="padding:1px 4px; font-size:10px; color:red; cursor:pointer;" title="Delete Item">🗑️</button>
                                </div>
                            </div>
                            <input type="text" value="${edu.institute || ''}" placeholder="Institute / University" oninput="window.tmplUpdateItem('${sec.id}', '${sec.type}', ${i}, 'institute', this.value)" style="width:100%; font-size:11px; padding:3px; margin-bottom:3px;">
                            <input type="text" value="${edu.degree || ''}" placeholder="Degree / Certificate" oninput="window.tmplUpdateItem('${sec.id}', '${sec.type}', ${i}, 'degree', this.value)" style="width:100%; font-size:11px; padding:3px; margin-bottom:3px;">
                            <input type="text" value="${edu.year || ''}" placeholder="Year (e.g. 2024 - 2026)" oninput="window.tmplUpdateItem('${sec.id}', '${sec.type}', ${i}, 'year', this.value)" style="width:100%; font-size:11px; padding:3px;">
                        </div>
                    `;
                });
            }
            itemsHTML += `<button onclick="window.tmplAddItem('${sec.id}', '${sec.type}')" style="width:100%; font-size:11px; padding:4px; cursor:pointer; background:#e2e8f0; border:1px solid #cbd5e1; border-radius:3px;">+ Add Item</button>`;
        }

        secCard.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:5px; margin-bottom:8px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
                    <input type="text" value="${sec.title}" oninput="window.tmplUpdateSecTitle(${idx}, this.value)" style="font-weight:bold; font-size:11px; flex:1; padding:3px;">
                    <select onchange="window.tmplUpdateSecPlacement(${idx}, this.value)" style="font-size:10px; padding:2px;">
                        <option value="sidebar" ${sec.placement === 'sidebar' ? 'selected' : ''}>Sidebar</option>
                        <option value="main" ${sec.placement === 'main' ? 'selected' : ''}>Main</option>
                    </select>
                    <label style="font-size:10px;"><input type="checkbox" ${sec.visible ? 'checked' : ''} onchange="window.tmplToggleSecVisibility(${idx}, this.checked)"> Show</label>
                </div>
                
                <div style="display:flex; gap:4px; justify-content:flex-end;">
                    <button onclick="window.tmplCloneSection(${idx})" style="font-size:10px; padding:2px 6px; background:#dbeafe; color:#1e40af; border:1px solid #bfdbfe; border-radius:3px; cursor:pointer;">📋 Clone Section</button>
                    <button onclick="window.tmplDeleteSection(${idx})" style="font-size:10px; padding:2px 6px; background:#fee2e2; color:#991b1b; border:1px solid #fecaca; border-radius:3px; cursor:pointer;">🗑️ Delete Section</button>
                </div>
            </div>
            <div>${itemsHTML}</div>
        `;

        container.appendChild(secCard);
    });
}

    // SCOPED ACTIONS
    window.tmplCloneSection = function(idx) {
    const secToClone = templateState.sections[idx];
    if (!secToClone) return;

    // Deep Copy section structure
    const newSec = JSON.parse(JSON.stringify(secToClone));
    newSec.id = 'sec_' + secToClone.type + '_' + Date.now();
    newSec.title = secToClone.title + " (COPY)";

    // Clone items list specifically for this section so array memory is detached
    if (secToClone.items) {
        newSec.items = JSON.parse(JSON.stringify(secToClone.items));
    } else if (secToClone.type === 'skills') {
        newSec.items = JSON.parse(JSON.stringify(templateState.skills));
    } else if (secToClone.type === 'experience') {
        newSec.items = JSON.parse(JSON.stringify(templateState.experience));
    } else if (secToClone.type === 'education') {
        newSec.items = JSON.parse(JSON.stringify(templateState.education));
    }

    templateState.sections.splice(idx + 1, 0, newSec);
    renderEditorPanel();
    renderPreview();
   };

    window.tmplDeleteSection = function(idx) {
        if (templateState.sections.length <= 1) {
            alert("Aap saare sections delete nahi kar sakte!");
            return;
        }
        templateState.sections.splice(idx, 1);
        renderEditorPanel();
        renderPreview();
    };

    window.tmplUpdateSummary = function(val) {
        templateState.resumeData.summary = val;
        renderPreview();
    };

   window.tmplUpdateItem = function(secId, type, itemIdx, field, value) {
    const sec = templateState.sections.find(s => s.id === secId);
    const targetArr = (sec && sec.items !== undefined) ? sec.items : templateState[type];

    if (targetArr && targetArr[itemIdx]) {
        targetArr[itemIdx][field] = value;
        renderPreview();
    }
};

    window.tmplAddItem = function(secId, type) {
    const sec = templateState.sections.find(s => s.id === secId);
    const targetArr = (sec && sec.items) ? sec.items : templateState[type];
    
    if (!targetArr) return;

    if (type === 'skills') {
        targetArr.push({ name: "New Skill / Item" });
    } else if (type === 'experience') {
        targetArr.push({ company: "New Project / Organization", role: "Role / Tech", duration: "2026", details: "• Project details..." });
    } else if (type === 'education') {
        targetArr.push({ institute: "New Institute", degree: "Degree Name", year: "2026" });
    }

    renderEditorPanel();
    renderPreview();
};

window.tmplCloneItem = function(secId, type, itemIdx) {
    const sec = templateState.sections.find(s => s.id === secId);
    const targetArr = (sec && sec.items) ? sec.items : templateState[type];

    if (targetArr && targetArr[itemIdx]) {
        const clonedObj = JSON.parse(JSON.stringify(targetArr[itemIdx]));
        if (clonedObj.company) clonedObj.company += " (Copy)";
        if (clonedObj.institute) clonedObj.institute += " (Copy)";
        if (clonedObj.name) clonedObj.name += " (Copy)";

        targetArr.splice(itemIdx + 1, 0, clonedObj);
        renderEditorPanel();
        renderPreview();
    }
};

window.tmplDeleteItem = function(secId, type, itemIdx) {
    const sec = templateState.sections.find(s => s.id === secId);
    const targetArr = (sec && sec.items) ? sec.items : templateState[type];

    if (targetArr && targetArr[itemIdx]) {
        targetArr.splice(itemIdx, 1);
        renderEditorPanel();
        renderPreview();
    }
};

    window.tmplUpdateSecTitle = function (idx, val) {
        templateState.sections[idx].title = val.toUpperCase();
        renderPreview();
    };

    window.tmplUpdateSecPlacement = function (idx, val) {
        templateState.sections[idx].placement = val;
        renderPreview();
    };

    window.tmplToggleSecVisibility = function (idx, val) {
        templateState.sections[idx].visible = val;
        renderPreview();
    };

    // PDF DOWNLOAD FUNCTIONALITY
    function downloadPDF() {
        const element = document.querySelector(".paper-wrapper") || document.querySelector(".cv-premium-container");

        if (!element) {
            alert("PDF download ke liye CV preview element nahi mila!");
            return;
        }

        const name = (templateState.resumeData.name && templateState.resumeData.name.trim()) 
            ? templateState.resumeData.name.trim().replace(/\s+/g, "_") 
            : "Resume";
        
        const fileName = `${name}_CV_Craft.pdf`;

        const options = {
            margin:       0,
            filename:     fileName,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false, letterRendering: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const downloadBtn = document.getElementById("btn-download-pdf");
        const originalText = downloadBtn ? downloadBtn.innerText : "📥 Download PDF";

        if (downloadBtn) {
            downloadBtn.innerText = "⏳ Generating PDF...";
            downloadBtn.disabled = true;
        }

        html2pdf().set(options).from(element).save().then(() => {
            if (downloadBtn) {
                downloadBtn.innerText = originalText;
                downloadBtn.disabled = false;
            }
        }).catch((err) => {
            console.error("PDF generation error:", err);
            alert("PDF generate karte waqt masla aaya hai!");
            if (downloadBtn) {
                downloadBtn.innerText = originalText;
                downloadBtn.disabled = false;
            }
        });
    }

    // EXPOSE GLOBAL RENDER FOR APP.JS
    window.renderDefaultTemplate = function () {
        console.log("🚀 [Default Template] Render Executed!");
        renderEditorPanel();
        renderPreview();
        if (window.innerWidth <= 600) {
            window.switchDefaultTab('editor');
        }
    };

    setTimeout(() => {
        if (typeof window.renderDefaultTemplate === 'function') {
            window.renderDefaultTemplate();
        }

        const downloadBtn = document.getElementById("btn-download-pdf");
        if (downloadBtn) {
            downloadBtn.classList.remove("hidden");
            downloadBtn.style.display = "inline-block";

            downloadBtn.replaceWith(downloadBtn.cloneNode(true));
            const newBtn = document.getElementById("btn-download-pdf");
            newBtn.addEventListener("click", downloadPDF);
        }
    }, 100);

})();