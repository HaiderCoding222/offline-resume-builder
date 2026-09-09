function renderTealTemplate(state) {
    if (state && state.resumeData) {
        Object.keys(state.resumeData).forEach(key => {
            if (tealLocalState.resumeData.hasOwnProperty(key)) {
                tealLocalState.resumeData[key] = state.resumeData[key];
            }
        });
    }
    renderTeal(true);
}

const tealLocalState = {
    resumeData: {
        name: "Henrietta Mitchell",
        title: "GRAPHIC DESIGNER",
        summary: "Experienced graphic designer with 8 years of experience. Excited to help your company expand social media engagement with captivating content, video and static assets.",
        phone: "+123-456-7890",
        email: "hello@reallygreatsite.com",
        website: "www.reallygreatsite.com",
        address: "123 Anywhere St., Any City, ST 12345",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300"
    },
    sectionsList: [
        {
            id: 'tsec_sum',
            type: 'summary',
            title: "About Me",
            visible: true,
            placement: 'main',
            value: "Experienced graphic designer with 8 years of experience. Excited to help your company expand social media engagement with captivating content, video and static assets."
        },
        {
            id: 'tsec_edu',
            type: 'education',
            title: "Education",
            visible: true,
            placement: 'main',
            items: [
                { year: "2010 - 2012", institute: "University of Keithston.", degree: "Bachelor Of Design" },
                { year: "2013 - 2015", institute: "University of Keithston.", degree: "Master Of Design" }
            ]
        },
        {
            id: 'tsec_exp',
            type: 'experience',
            title: "Work Experience",
            visible: true,
            placement: 'main',
            items: [
                { 
                    role: "Layout Designer", 
                    company: "Liconic & Co.", 
                    duration: "2011 - 2015", 
                    details: "Working with the video development team.\nManage website design, content, and SEO Marketing.\nBranding and Logo Design" 
                },
                {
                    role: "Senior Graphic Designer",
                    company: "Studio Shodwe",
                    duration: "2016 - 2020",
                    details: "Lead designer for major campaigns.\nMentored junior designers.\nCreated visual brand identities."
                }
            ]
        },
        {
            id: 'tsec_skills',
            type: 'skills',
            title: "Skills",
            visible: true,
            placement: 'sidebar',
            items: [
                { name: "Photography", level: 90 },
                { name: "Web Design", level: 85 },
                { name: "Video Editing", level: 80 },
                { name: "Graphic Design", level: 95 },
                { name: "Marketing", level: 75 },
                { name: "Branding", level: 88 },
                { name: "SEO", level: 70 }
            ]
        }
    ]
};

function renderTeal(shouldRefreshEditor = false) {
    syncPersonalInputs();
    updatePreview();
    renderDynamicSections();
    if (shouldRefreshEditor) {
        refreshTealEditorFields();
    }
    bindTealEvents();
}

function syncPersonalInputs() {
    const map = {
        'teal-input-name': 'name',
        'teal-input-title': 'title',
        'teal-input-phone': 'phone',
        'teal-input-email': 'email',
        'teal-input-website': 'website',
        'teal-input-address': 'address'
    };
    Object.keys(map).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.value = tealLocalState.resumeData[map[id]] || '';
        }
    });
}

function updatePreview() {
    const data = tealLocalState.resumeData;
    const nameEl = document.getElementById('teal-p-name');
    if (nameEl) nameEl.textContent = data.name.toUpperCase();
    const titleEl = document.getElementById('teal-p-title');
    if (titleEl) titleEl.textContent = data.title.toUpperCase();
    const contactTarget = document.getElementById('teal-contact-target');
    if (contactTarget) {
        contactTarget.innerHTML = `
            <p style="margin-bottom:3mm; font-size:8pt; line-height:1.35; color:#ffffff; word-break:break-word;"><span style="font-weight:bold;">${data.phone || ''}</span></p>
            <p style="margin-bottom:3mm; font-size:8pt; line-height:1.35; color:#ffffff; word-break:break-word;">${data.email || ''}</p>
            <p style="margin-bottom:3mm; font-size:8pt; line-height:1.35; color:#ffffff; word-break:break-word;">${data.website || ''}</p>
            <p style="margin-bottom:3mm; font-size:8pt; line-height:1.35; color:#ffffff; word-break:break-word;">${data.address || ''}</p>
        `;
    }
    const photoImg = document.getElementById('teal-p-img');
    const placeholder = document.getElementById('teal-p-placeholder');
    if (photoImg) {
        if (data.photo && data.photo.trim() !== '') {
            photoImg.src = data.photo;
            photoImg.style.display = 'block';
            if (placeholder) placeholder.style.display = 'none';
        } else {
            photoImg.style.display = 'none';
            if (placeholder) placeholder.style.display = 'flex';
        }
    }
}

function renderDynamicSections() {
    const mainContainer = document.getElementById('teal-main-sections-container');
    const sidebarContainer = document.getElementById('teal-sidebar-sections-container');
    if (mainContainer) mainContainer.innerHTML = '';
    if (sidebarContainer) sidebarContainer.innerHTML = '';
    tealLocalState.sectionsList.forEach(sec => {
        if (!sec.visible) return;
        const target = sec.placement === 'sidebar' ? sidebarContainer : mainContainer;
        if (!target) return;
        const sectionEl = document.createElement('div');
        sectionEl.style.marginBottom = "22px";
        if (sec.title.trim() !== '') {
            if (sec.placement === 'sidebar') {
                const wrapper = document.createElement('div');
                wrapper.style.cssText = 'display:flex; align-items:center; margin:25px 0 15px 0;';
                const tab = document.createElement('div');
                tab.style.cssText = 'background:#ffffff; color:#3d5c78; padding:8px 15px; font-weight:700; font-size:13px; letter-spacing:1.5px; text-transform:uppercase; display:inline-block; border-right:20px solid transparent;';
                tab.textContent = sec.title.toUpperCase();
                const diagonal = document.createElement('div');
                diagonal.style.cssText = 'width:0; height:0; border-top:18px solid transparent; border-bottom:18px solid transparent; border-left:20px solid #ffffff; flex-shrink:0; margin-left:-1px;';
                wrapper.appendChild(tab);
                wrapper.appendChild(diagonal);
                sectionEl.appendChild(wrapper);
            } else {
                const wrapper = document.createElement('div');
                wrapper.style.cssText = 'display:flex; align-items:center; margin:22px 0 14px 0;';
                const header = document.createElement('div');
                header.style.cssText = 'background:#3d5c78; color:white; padding:8px 20px; font-size:14px; font-weight:700; text-transform:uppercase; display:inline-block; border-right:18px solid transparent; min-width:180px;';
                header.textContent = sec.title.toUpperCase();
                const diagonal = document.createElement('div');
                diagonal.style.cssText = 'width:0; height:0; border-top:19px solid transparent; border-bottom:19px solid transparent; border-left:18px solid #3d5c78; flex-shrink:0; margin-left:-1px;';
                wrapper.appendChild(header);
                wrapper.appendChild(diagonal);
                sectionEl.appendChild(wrapper);
            }
        }
        const contentEl = document.createElement('div');
        if (sec.type === 'summary') {
            contentEl.innerHTML = `<p style="font-size:13px; line-height:1.7; color:#334155; margin:0; white-space:pre-line;">${sec.value || ''}</p>`;
        }
        else if (sec.type === 'education') {
            const grid = document.createElement('div');
            grid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:20px;';
            sec.items.forEach((edu, idx) => {
                const item = document.createElement('div');
                item.style.cssText = 'font-size:13px; color:#334155;';
                if (idx > 0) {
                    item.style.borderLeft = '1px solid #ddc2bd';
                    item.style.paddingLeft = '20px';
                }
                item.innerHTML = `
                    <div style="font-weight:700; color:#3d5c78; margin-bottom:2px;">${edu.year || ''}</div>
                    <strong style="display:block; font-weight:600; color:#1e293b;">${edu.institute || ''}</strong>
                    <span>${edu.degree || ''}</span>
                `;
                grid.appendChild(item);
            });
            contentEl.appendChild(grid);
        }
        else if (sec.type === 'experience') {
            const timeline = document.createElement('div');
            timeline.style.cssText = 'position:relative; padding-left:15px; border-left:1.5px solid #ddc2bd;';
            sec.items.forEach(exp => {
                const lines = (exp.details || '').split('\n').filter(l => l.trim());
                const linesHTML = lines.map(line => `<li style="margin-bottom:4px;">${line.trim()}</li>`).join('');
                const item = document.createElement('div');
                item.style.cssText = 'position:relative; margin-bottom:20px;';
                item.innerHTML = `
                    <div style="position:absolute; left:-21px; top:5px; width:10px; height:10px; border-radius:50%; background:#3d5c78;"></div>
                    <div style="font-weight:700; font-size:14px; color:#1e293b;">${exp.role || ''}</div>
                    <div style="font-size:13px; color:#1e293b; font-weight:400; margin:2px 0 6px 0;">${exp.company || ''}<br><strong style="font-weight:700;">${exp.duration || ''}</strong></div>
                    <ul style="margin:0; padding-left:15px; font-size:12.5px; color:#1e293b; line-height:1.5; list-style-type:disc;">${linesHTML}</ul>
                `;
                timeline.appendChild(item);
            });
            contentEl.appendChild(timeline);
        }
        else if (sec.type === 'skills') {
            sec.items.forEach(skill => {
                const levelVal = parseInt(skill.level) || 0;
                const skillDiv = document.createElement('div');
                skillDiv.style.cssText = 'margin:14px 0;';
                skillDiv.innerHTML = `
                    <div style="display:flex; justify-content:space-between; font-size:12px; color:#f1f5f9;">
                        <span>${skill.name || ''}</span>
                        <span style="opacity:0.7;">${levelVal}%</span>
                    </div>
                    <div style="height:6px; background:#ffffff; border-radius:3px; overflow:hidden; margin-top:3px;">
                        <div style="height:100%; width:${levelVal}%; background:#ddc2bd; border-radius:3px;"></div>
                    </div>
                `;
                contentEl.appendChild(skillDiv);
            });
        }
        sectionEl.appendChild(contentEl);
        target.appendChild(sectionEl);
    });
}

function refreshTealEditorFields() {
    const container = document.getElementById('teal-dynamic-editor-sections');
    if (!container) return;
    container.innerHTML = '';
    tealLocalState.sectionsList.forEach((sec, sIdx) => {
        const secDiv = document.createElement('div');
        secDiv.style.cssText = 'background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #cbd5e1; margin-bottom:15px;';
        let controlsHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; gap:8px; flex-wrap:wrap;">
                <input type="text" value="${sec.title}" 
                    oninput="tealLocalState.sectionsList[${sIdx}].title = this.value; renderTeal(false);" 
                    style="font-weight:700; font-size:13px; border:1px solid #cbd5e1; padding:4px 8px; border-radius:4px; background:white; color:#3d5c78; text-transform:uppercase; flex:1; min-width:120px;" 
                    placeholder="Section Heading">
                <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                    <select onchange="tealLocalState.sectionsList[${sIdx}].placement = this.value; renderTeal(true);" 
                        style="font-size:11px; padding:4px; border-radius:4px; border:1px solid #cbd5e1;">
                        <option value="main" ${sec.placement === 'main' ? 'selected' : ''}>Main</option>
                        <option value="sidebar" ${sec.placement === 'sidebar' ? 'selected' : ''}>Sidebar</option>
                    </select>
                    <label style="font-size:11px; color:#64748b; cursor:pointer; display:flex; align-items:center; gap:2px;">
                        <input type="checkbox" ${sec.visible ? 'checked' : ''} 
                            onchange="tealLocalState.sectionsList[${sIdx}].visible = this.checked; renderTeal(true);"> Show
                    </label>
                    <button type="button" onclick="duplicateTealSection(${sIdx})" 
                        style="background:#10b981; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:600; font-size:11px;">Clone</button>
                    <button type="button" onclick="deleteTealSection(${sIdx})" 
                        style="background:#ef4444; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:600; font-size:11px;">Delete</button>
                </div>
            </div>
        `;
        let bodyHTML = '';
        if (sec.type === 'summary') {
            bodyHTML = `
                <textarea style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:6px; resize:vertical; font-family:inherit; box-sizing:border-box; font-size:13px;" 
                    rows="3" 
                    oninput="tealLocalState.sectionsList[${sIdx}].value = this.value; renderTeal(false);">${sec.value || ''}</textarea>
            `;
        }
        else if (sec.type === 'experience') {
            bodyHTML = `
                <div style="display:flex; justify-content:flex-end; margin-bottom:6px;">
                    <button type="button" onclick="addTealDynamicItem(${sIdx})" 
                        style="background:#3d5c78; color:white; border:none; padding:2px 12px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:600;">+ Add Experience</button>
                </div>
            `;
            sec.items.forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="background:#ffffff; padding:8px; border-radius:6px; margin-bottom:6px; border:1px solid #e2e8f0; position:relative;">
                        <input type="text" placeholder="Role/Title" value="${item.role || ''}" 
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; box-sizing:border-box;" 
                            oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].role=this.value; renderTeal(false);">
                        <input type="text" placeholder="Company" value="${item.company || ''}" 
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; box-sizing:border-box;" 
                            oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].company=this.value; renderTeal(false);">
                        <input type="text" placeholder="Duration" value="${item.duration || ''}" 
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; box-sizing:border-box;" 
                            oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].duration=this.value; renderTeal(false);">
                        <textarea placeholder="Description (one per line)" 
                            style="width:100%; padding:5px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; font-family:inherit; box-sizing:border-box; resize:vertical;" 
                            rows="2"
                            oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].details=this.value; renderTeal(false);">${item.details || ''}</textarea>
                        <div style="display:flex; gap:6px; margin-top:4px;">
                            <button type="button" onclick="cloneTealItem(${sIdx}, ${itemIdx})" 
                                style="background:#3b82f6; color:white; border:none; padding:2px 8px; border-radius:4px; font-size:10px; cursor:pointer;">Clone</button>
                            <button type="button" onclick="deleteTealItem(${sIdx}, ${itemIdx})" 
                                style="background:#ef4444; color:white; border:none; padding:2px 8px; border-radius:4px; font-size:10px; cursor:pointer;">Delete</button>
                        </div>
                    </div>
                `;
            });
        }
        else if (sec.type === 'education') {
            bodyHTML = `
                <div style="display:flex; justify-content:flex-end; margin-bottom:6px;">
                    <button type="button" onclick="addTealDynamicItem(${sIdx})" 
                        style="background:#3d5c78; color:white; border:none; padding:2px 12px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:600;">+ Add Education</button>
                </div>
            `;
            sec.items.forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="background:#ffffff; padding:8px; border-radius:6px; margin-bottom:6px; border:1px solid #e2e8f0;">
                        <input type="text" placeholder="Degree" value="${item.degree || ''}" 
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; box-sizing:border-box;" 
                            oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].degree=this.value; renderTeal(false);">
                        <input type="text" placeholder="School/Institute" value="${item.institute || ''}" 
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; box-sizing:border-box;" 
                            oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].institute=this.value; renderTeal(false);">
                        <input type="text" placeholder="Duration" value="${item.year || ''}" 
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; box-sizing:border-box;" 
                            oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].year=this.value; renderTeal(false);">
                        <div style="display:flex; gap:6px; margin-top:4px;">
                            <button type="button" onclick="cloneTealItem(${sIdx}, ${itemIdx})" 
                                style="background:#3b82f6; color:white; border:none; padding:2px 8px; border-radius:4px; font-size:10px; cursor:pointer;">Clone</button>
                            <button type="button" onclick="deleteTealItem(${sIdx}, ${itemIdx})" 
                                style="background:#ef4444; color:white; border:none; padding:2px 8px; border-radius:4px; font-size:10px; cursor:pointer;">Delete</button>
                        </div>
                    </div>
                `;
            });
        }
        else if (sec.type === 'skills') {
            bodyHTML = `
                <div style="display:flex; justify-content:flex-end; margin-bottom:6px;">
                    <button type="button" onclick="addTealDynamicItem(${sIdx})" 
                        style="background:#3d5c78; color:white; border:none; padding:2px 12px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:600;">+ Add Skill</button>
                </div>
                <div style="display:grid; grid-template-columns:1fr; gap:6px;">
            `;
            sec.items.forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="display:flex; gap:4px; align-items:center; background:#ffffff; padding:6px; border-radius:4px; border:1px solid #e2e8f0;">
                        <input type="text" value="${item.name || ''}" placeholder="Skill name" 
                            style="flex:2; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; min-width:0;" 
                            oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].name=this.value; renderTeal(false);">
                        <input type="number" value="${item.level || 80}" placeholder="Level %" 
                            style="flex:1; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; min-width:0; width:60px;" 
                            oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].level=parseInt(this.value) || 0; renderTeal(false);">
                        <button type="button" onclick="cloneTealItem(${sIdx}, ${itemIdx})" 
                            style="background:#3b82f6; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer;">📋</button>
                        <button type="button" onclick="deleteTealItem(${sIdx}, ${itemIdx})" 
                            style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer;">✕</button>
                    </div>
                `;
            });
            bodyHTML += `</div>`;
        }
        secDiv.innerHTML = controlsHTML + bodyHTML;
        container.appendChild(secDiv);
    });
}

function duplicateTealSection(index) {
    const original = tealLocalState.sectionsList[index];
    const clone = {
        id: 'tsec_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        type: original.type,
        title: original.title + " (Copy)",
        visible: original.visible,
        placement: original.placement
    };
    if (original.type === 'summary') {
        clone.value = original.value;
    } else {
        clone.items = JSON.parse(JSON.stringify(original.items || []));
    }
    tealLocalState.sectionsList.splice(index + 1, 0, clone);
    renderTeal(true);
}

function deleteTealSection(index) {
    if (tealLocalState.sectionsList.length <= 1) {
        alert("❌ Aap saare sections delete nahi kar sakte!");
        return;
    }
    tealLocalState.sectionsList.splice(index, 1);
    renderTeal(true);
}

function addTealDynamicItem(secIdx) {
    const sec = tealLocalState.sectionsList[secIdx];
    if (!sec.items) sec.items = [];
    if (sec.type === 'experience') {
        sec.items.push({ role: 'New Role', company: 'Company Name', duration: '2024 - Present', details: '• Key responsibility\n• Achievement' });
    } else if (sec.type === 'education') {
        sec.items.push({ degree: 'Degree Name', institute: 'University Name', year: '2024' });
    } else if (sec.type === 'skills') {
        sec.items.push({ name: 'New Skill', level: 80 });
    }
    renderTeal(true);
}

function cloneTealItem(secIdx, itemIdx) {
    const sec = tealLocalState.sectionsList[secIdx];
    if (sec && sec.items && sec.items[itemIdx]) {
        const itemClone = JSON.parse(JSON.stringify(sec.items[itemIdx]));
        if (itemClone.role) itemClone.role += ' (Copy)';
        if (itemClone.school) itemClone.school += ' (Copy)';
        if (itemClone.name) itemClone.name += ' (Copy)';
        if (itemClone.degree) itemClone.degree += ' (Copy)';
        sec.items.splice(itemIdx + 1, 0, itemClone);
        renderTeal(true);
    }
}

function deleteTealItem(secIdx, itemIdx) {
    const sec = tealLocalState.sectionsList[secIdx];
    if (sec && sec.items && sec.items[itemIdx]) {
        sec.items.splice(itemIdx, 1);
        renderTeal(true);
    }
}

function bindTealEvents() {
    const personalInputs = ['teal-input-name', 'teal-input-title', 'teal-input-phone', 'teal-input-email', 'teal-input-website', 'teal-input-address'];
    personalInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.dataset.bound) {
            el.dataset.bound = 'true';
            el.addEventListener('input', function() {
                const keyMap = {
                    'teal-input-name': 'name',
                    'teal-input-title': 'title',
                    'teal-input-phone': 'phone',
                    'teal-input-email': 'email',
                    'teal-input-website': 'website',
                    'teal-input-address': 'address'
                };
                tealLocalState.resumeData[keyMap[this.id]] = this.value;
                renderTeal(false);
            });
        }
    });
    const fileInput = document.getElementById('teal-input-file');
    if (fileInput && !fileInput.dataset.bound) {
        fileInput.dataset.bound = 'true';
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(evt) {
                tealLocalState.resumeData.photo = evt.target.result;
                renderTeal(false);
            };
            reader.readAsDataURL(file);
        });
    }
}

function tealSwitchMobileTab(tab) {
    const editor = document.getElementById('teal-editor-panel');
    const preview = document.getElementById('teal-preview-panel');
    const btnEditor = document.getElementById('teal-tab-editor');
    const btnPreview = document.getElementById('teal-tab-preview');
    if (!editor || !preview) return;
    if (tab === 'editor') {
        editor.classList.remove('mobile-hidden');
        preview.classList.add('mobile-hidden');
        if (btnEditor) btnEditor.classList.add('active');
        if (btnPreview) btnPreview.classList.remove('active');
    } else {
        editor.classList.add('mobile-hidden');
        preview.classList.remove('mobile-hidden');
        if (btnEditor) btnEditor.classList.remove('active');
        if (btnPreview) btnPreview.classList.add('active');
    }
}

function downloadTealPDF() {
    console.log("📥 [Teal] Downloading PDF...");
    let element = document.querySelector('.cv-teal-content');
    if (!element) {
        const previewContainer = document.getElementById('resume-preview-placeholder');
        if (previewContainer) {
            element = previewContainer.querySelector('.cv-teal-content');
        }
    }
    if (!element) {
        const container = document.querySelector('.cv-teal-container');
        if (container) {
            element = container.querySelector('.cv-teal-content');
        }
    }
    if (!element) {
        alert("❌ Teal preview element not found!");
        return;
    }
    const clone = element.cloneNode(true);
    clone.querySelectorAll('.teal-editor, .builder-editor, .editor-panel, .editor-controls, form, input, button, select, textarea, .no-print, .tmpl-mobile-tabs-container')
        .forEach(el => el.remove());

    // --- FIX: Add triangle as SVG image for PDF ---
    const triangleSVG = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cpolygon points='200,0 200,200 0,0' fill='%233d6079'/%3E%3C/svg%3E`;

    // Add triangle using an img element positioned absolutely
    const triangleImg = document.createElement('img');
    triangleImg.src = triangleSVG;
    triangleImg.style.cssText = `
        position: absolute !important;
        top: 0 !important;
        right: 0 !important;
        width: 200px !important;
        height: 200px !important;
        z-index: 10 !important;
        pointer-events: none !important;
        display: block !important;
    `;
    clone.style.position = 'relative';
    clone.prepend(triangleImg);

    // Remove any existing triangle divs to avoid duplicates
    clone.querySelectorAll('.top-right-triangle').forEach(el => el.remove());

    const styles = document.createElement('style');
    styles.textContent = `
        .cv-teal-content {
            width: 794px !important;
            height: 1123px !important;
            min-height: 1123px !important;
            max-height: 1123px !important;
            margin: 0 auto !important;
            padding: 0 !important;
            background: #ffffff !important;
            display: flex !important;
            flex-direction: row !important;
            overflow: hidden !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            transform: none !important;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
            position: relative !important;
        }
        .cv-main-table {
            width: 100% !important;
            height: 100% !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
        }
        .teal-sidebar {
            width: 275px !important;
            min-width: 275px !important;
            max-width: 275px !important;
            background: #3d6079 !important;
            color: #ffffff !important;
            padding: 40px 20px !important;
            display: table-cell !important;
            vertical-align: top !important;
            box-sizing: border-box !important;
        }
        .teal-main-content {
            padding: 45px 40px 40px 35px !important;
            display: table-cell !important;
            vertical-align: top !important;
            background: #ffffff !important;
            box-sizing: border-box !important;
        }
        .teal-main-header-wrapper, .teal-side-tab-wrapper, .teal-job-pill-wrapper {
            display: flex !important;
            align-items: center !important;
        }
        .teal-main-header {
            background: #3d5c78 !important;
            color: white !important;
            padding: 8px 20px !important;
            font-size: 14px !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            display: inline-block !important;
            border-right: 18px solid transparent !important;
        }
        .teal-main-header-diagonal {
            width: 0 !important;
            height: 0 !important;
            border-top: 19px solid transparent !important;
            border-bottom: 19px solid transparent !important;
            border-left: 18px solid #3d5c78 !important;
            flex-shrink: 0 !important;
            margin-left: -1px !important;
        }
        .teal-side-tab {
            background: #ffffff !important;
            color: #3d5c78 !important;
            padding: 8px 15px !important;
            font-weight: 700 !important;
            font-size: 13px !important;
            letter-spacing: 1.5px !important;
            text-transform: uppercase !important;
            display: inline-block !important;
            border-right: 20px solid transparent !important;
        }
        .teal-side-tab-diagonal {
            width: 0 !important;
            height: 0 !important;
            border-top: 18px solid transparent !important;
            border-bottom: 18px solid transparent !important;
            border-left: 20px solid #ffffff !important;
            flex-shrink: 0 !important;
            margin-left: -1px !important;
        }
        .teal-job-pill {
            background: #3d5c78 !important;
            color: white !important;
            padding: 8px 20px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            display: inline-block !important;
            border-right: 18px solid transparent !important;
        }
        .teal-job-pill-diagonal {
            width: 0 !important;
            height: 0 !important;
            border-top: 19px solid transparent !important;
            border-bottom: 19px solid transparent !important;
            border-left: 18px solid #3d5c78 !important;
            flex-shrink: 0 !important;
            margin-left: -1px !important;
        }
        .teal-name-header h1 {
            font-size: 38px !important;
            color: #3d5c78 !important;
            margin: 0 !important;
            font-weight: 800 !important;
            text-transform: uppercase !important;
        }
        .teal-photo-wrapper {
            margin: 0 auto 35px !important;
            width: 168px !important;
            height: 208px !important;
            position: relative !important;
        }
        .teal-photo {
            width: 150px !important;
            height: 190px !important;
            border-radius: 50% / 38% !important;
            border: 4px solid #ffffff !important;
            outline: 1.5px solid #7d9bb5 !important;
            outline-offset: 5px !important;
            overflow: hidden !important;
            margin: 9px auto !important;
            background: #2c4a66 !important;
            box-sizing: border-box !important;
        }
        .teal-photo img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            border-radius: 50% / 38% !important;
        }
        .teal-contact-info p {
            font-size: 12px !important;
            margin: 12px 0 !important;
            color: #f1f5f9 !important;
        }
        .teal-skill-item {
            margin: 14px 0 !important;
        }
        .teal-skill-label {
            font-size: 12px !important;
            margin-bottom: 5px !important;
            color: #f1f5f9 !important;
            display: flex !important;
            justify-content: space-between !important;
        }
        .teal-skill-bar {
            height: 6px !important;
            background: #ffffff !important;
            border-radius: 3px !important;
            overflow: hidden !important;
        }
        .teal-skill-progress {
            height: 100% !important;
            background: #ddc2bd !important;
            border-radius: 3px !important;
        }
        .teal-about p {
            font-size: 13px !important;
            line-height: 1.7 !important;
            color: #334155 !important;
            margin: 0 0 10px 0 !important;
            white-space: pre-line !important;
        }
        .teal-edu-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
        }
        .teal-edu-item {
            font-size: 13px !important;
            color: #334155 !important;
        }
        .teal-edu-item + .teal-edu-item {
            border-left: 1px solid #ddc2bd !important;
            padding-left: 20px !important;
        }
        .teal-edu-date {
            font-weight: 700 !important;
            color: #3d5c78 !important;
        }
        .teal-exp-timeline {
            position: relative !important;
            padding-left: 15px !important;
            border-left: 1.5px solid #ddc2bd !important;
        }
        .teal-exp-item {
            position: relative !important;
            margin-bottom: 20px !important;
        }
        .teal-exp-item::before {
            content: '' !important;
            position: absolute !important;
            left: -21px !important;
            top: 5px !important;
            width: 10px !important;
            height: 10px !important;
            border-radius: 50% !important;
            background: #3d5c78 !important;
        }
        .teal-exp-role {
            font-weight: 700 !important;
            font-size: 14px !important;
            color: #1e293b !important;
        }
        .teal-exp-meta {
            font-size: 13px !important;
            color: #1e293b !important;
            font-weight: 400 !important;
            margin: 2px 0 6px 0 !important;
        }
        .teal-exp-details {
            margin: 0 !important;
            padding-left: 15px !important;
            font-size: 12.5px !important;
            color: #1e293b !important;
            line-height: 1.5 !important;
            list-style-type: disc !important;
        }
        .teal-exp-details li {
            margin-bottom: 4px !important;
        }
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

    const userName = window.state?.resumeData?.name 
        ? window.state.resumeData.name.trim().replace(/\s+/g, '_') 
        : 'Resume';

    const opt = {
        margin: 0,
        filename: `${userName}_CV_Teal.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2.5, 
            useCORS: true,
            logging: false,
            width: 794,
            height: 1123,
            backgroundColor: '#ffffff',
            scrollX: 0,
            scrollY: 0,
            onclone: function(doc) {
                // Ensure triangle is visible in cloned document
                const tri = doc.querySelector('img[src*="triangle"]');
                if (tri) {
                    tri.style.display = 'block';
                }
            }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
        .set(opt)
        .from(clone)
        .save()
        .then(() => {
            console.log("✅ [Teal] PDF generated successfully!");
            if (document.body.contains(wrapper)) {
                document.body.removeChild(wrapper);
            }
        })
        .catch(err => {
            console.error("❌ [Teal] PDF Error:", err);
            alert("PDF Download mein problem aayi!");
            if (document.body.contains(wrapper)) {
                document.body.removeChild(wrapper);
            }
        });
}

window.renderTealTemplate = renderTealTemplate;
window.renderTeal = renderTeal;
window.refreshTealEditorFields = refreshTealEditorFields;
window.duplicateTealSection = duplicateTealSection;
window.deleteTealSection = deleteTealSection;
window.addTealDynamicItem = addTealDynamicItem;
window.cloneTealItem = cloneTealItem;
window.deleteTealItem = deleteTealItem;
window.downloadTealPDF = downloadTealPDF;
window.tealSwitchMobileTab = tealSwitchMobileTab;

console.log("✅ Teal template fully loaded!");