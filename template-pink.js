// ====================================================
// PINK EXECUTIVE TEMPLATE - COMPLETE LOGIC
// Colors: Navy #343d51 | Pink #e0cbd2
// Features: Section Placement (Main/Sidebar), Multi-Page
// ====================================================

const pinkLocalState = {
    resumeData: {
        name: "Emily Brooklyn",
        title: "INVENTORY CONTROL MANAGER",
        phone: "+0123 458 7898",
        email: "yourmailid@domain.com",
        linkedin: "linkedin.com/in/yourname",
        address: "123 Street name, town/city, state/country, poct/zip.",
        photo: ""
    },
    sectionsList: [
        {
            id: 'psec_sum',
            type: 'summary',
            title: "Professional Profile",
            visible: true,
            placement: 'main',  // 'main' or 'sidebar'
            value: "Over 5 years of rich experience in Inventory Management / Warehouse & Logistics Operations & Customer Service with a growth-oriented organization of repute. Planned, optimized and implemented service solutions that improve the performance of supply chains – Predictability, coals, and visibility, known for having excellent time management, communication and customer handling skills."
        },
        {
            id: 'psec_exp',
            type: 'experience',
            title: "Experience",
            visible: true,
            placement: 'main',
            items: [
                {
                    role: "Inventory Manager",
                    company: "Company / Institute Name",
                    duration: "2002-2004",
                    details: "Successfully confer with different departments to determine their requirements and device ways of cofferzing inventory processes.\nProjectively inspect levels of materials to identify shortages and create and maintain similar reports.\nAscertain that liovel levels are lesscable for all distribution channels and is capable of covering direct customer dentarts.\nPresimte present suppliers to decipher delivery capabilities, and identify new and cost-effective suppliers and vendors.\nCreate and maintain productive relationships with vendors and suppliers to ensure timely delivery of proceurs."
                },
                {
                    role: "Assistant Inventory Manager",
                    company: "Company / Institute Name",
                    duration: "2002-2004",
                    details: "Consulted with procurement managers to determine their specific requirements.\nOrdered supplied and followed up on orders to ensure time-efficient delivery.\nNegotiated conducts with vendors.\nHandled hands with tact and agency.\nCreated and marmalised correlating inventory documentation to avoid company shrinkage due to loss of theft.\nManaged handling and receipt, sampling, data entry, dispensing, control substance, distribution and destruction of materials."
                }
            ]
        },
        {
            id: 'psec_edu',
            type: 'education',
            title: "Education",
            visible: true,
            placement: 'sidebar',
            items: [
                { degree: "Business Administration", school: "University | College | Location", duration: "2002-2004" },
                { degree: "Business Administration", school: "University | College | Location", duration: "2002-2004" },
                { degree: "Business Administration", school: "University | College | Location", duration: "2002-2004" }
            ]
        },
        {
            id: 'psec_skills',
            type: 'skills',
            title: "Pro Skills",
            visible: true,
            placement: 'sidebar',
            items: [
                { name: "Stock Levels Maintenance" },
                { name: "Ageing Stock Management" },
                { name: "Procurement" },
                { name: "Shipment Coordination" },
                { name: "Budget Preparation" },
                { name: "Staff Training and Development" }
            ]
        }
    ]
};

// ===== MAIN RENDER =====
function renderPinkTemplate(state) {
    if (state && state.resumeData) {
        Object.keys(state.resumeData).forEach(key => {
            if (pinkLocalState.resumeData.hasOwnProperty(key)) {
                pinkLocalState.resumeData[key] = state.resumeData[key];
            }
        });
    }
    renderPink(true);
}

function renderPink(shouldRefreshEditor = false) {
    syncPinkPersonalInputs();
    updatePinkPreview();
    renderPinkDynamicSections();
    if (shouldRefreshEditor) refreshPinkEditorFields();
    bindPinkEvents();
}

function syncPinkPersonalInputs() {
    const map = {
        'pink-input-name': 'name',
        'pink-input-title': 'title',
        'pink-input-phone': 'phone',
        'pink-input-email': 'email',
        'pink-input-linkedin': 'linkedin',
        'pink-input-address': 'address'
    };
    Object.keys(map).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = pinkLocalState.resumeData[map[id]] || '';
    });
}

function updatePinkPreview() {
    const data = pinkLocalState.resumeData;

    const nameParts = (data.name || 'Emily Brooklyn').trim().split(/\s+/);
    let line1 = nameParts[0] || '';
    let line2 = nameParts.slice(1).join(' ') || '';

    const nameEl1 = document.getElementById('pink-p-name1');
    const nameEl2 = document.getElementById('pink-p-name2');
    if (nameEl1) nameEl1.textContent = line1.toUpperCase();
    if (nameEl2) nameEl2.textContent = line2.toUpperCase();

    const monoTop = document.getElementById('pink-mono-top');
    const monoBottom = document.getElementById('pink-mono-bottom');
    if (monoTop) monoTop.textContent = (line1.charAt(0) || 'E').toUpperCase();
    if (monoBottom) monoBottom.textContent = (line2.charAt(0) || 'B').toUpperCase();

    const titleEl = document.getElementById('pink-p-title');
    if (titleEl) titleEl.textContent = (data.title || '').toUpperCase();

    // Photo update
    const photoWrapper = document.getElementById('pink-monogram-photo');
    const monogramCircle = document.getElementById('pink-monogram-circle');
    
    if (photoWrapper) {
        if (data.photo && data.photo.trim() !== '') {
            photoWrapper.innerHTML = `<img src="${data.photo}" alt="Profile">`;
            photoWrapper.style.display = 'block';
            if (monogramCircle) monogramCircle.style.display = 'none';
        } else {
            photoWrapper.innerHTML = '';
            photoWrapper.style.display = 'none';
            if (monogramCircle) monogramCircle.style.display = 'flex';
        }
    }
}

// ===== DYNAMIC SECTIONS (Main + Sidebar) =====
function renderPinkDynamicSections() {
    const mainContainer = document.getElementById('pink-main-sections-container');
    const sidebarContainer = document.getElementById('pink-sidebar-sections-container');

    if (mainContainer) mainContainer.innerHTML = '';
    if (sidebarContainer) sidebarContainer.innerHTML = '';

    // Contact always in sidebar
    if (sidebarContainer) {
        const contactSection = document.createElement('div');
        contactSection.className = 'pink-side-section';
        contactSection.innerHTML = `
            <div class="pink-side-header">
                <div class="pink-side-header-white"></div>
                <div class="pink-side-header-navy">CONTACT</div>
                <div class="pink-side-header-lines"><span></span><span></span></div>
            </div>
            <div class="pink-contact-list" id="pink-contact-target"></div>
        `;
        sidebarContainer.appendChild(contactSection);
        
        // Fill contact
        setTimeout(() => {
            const contactTarget = document.getElementById('pink-contact-target');
            if (contactTarget) {
                const data = pinkLocalState.resumeData;
                contactTarget.innerHTML = `
                    <div class="pink-contact-item">
                        <span>${data.phone || ''}</span>
                        <div class="pink-contact-icon">📞</div>
                    </div>
                    <div class="pink-contact-item">
                        <span>${data.email || ''}</span>
                        <div class="pink-contact-icon">✉</div>
                    </div>
                    <div class="pink-contact-item">
                        <span>${data.linkedin || ''}</span>
                        <div class="pink-contact-icon">in</div>
                    </div>
                    <div class="pink-contact-item">
                        <span>${data.address || ''}</span>
                        <div class="pink-contact-icon">📍</div>
                    </div>
                `;
            }
        }, 0);
    }

    // Render all sections based on placement
    pinkLocalState.sectionsList.forEach(sec => {
        if (!sec.visible) return;

        const placement = sec.placement || 'main';
        const target = placement === 'sidebar' ? sidebarContainer : mainContainer;
        if (!target) return;

        if (sec.type === 'summary') {
            const el = document.createElement('div');
            if (placement === 'sidebar') {
                el.className = 'pink-side-section';
                el.innerHTML = `
                    <div class="pink-side-header">
                        <div class="pink-side-header-white"></div>
                        <div class="pink-side-header-navy">${(sec.title || 'PROFILE').toUpperCase()}</div>
                        <div class="pink-side-header-lines"><span></span><span></span></div>
                    </div>
                    <p style="font-size:11.5px; line-height:1.5; color:#343d51; padding:0 22px; margin:0; text-align:justify;">${sec.value || ''}</p>
                `;
            } else {
                el.className = 'pink-main-section';
                el.innerHTML = `
                    <div class="pink-main-header">${(sec.title || 'PROFESSIONAL PROFILE').toUpperCase()}</div>
                    <p class="pink-summary-text">${sec.value || ''}</p>
                `;
            }
            target.appendChild(el);
        }

        if (sec.type === 'experience') {
            const el = document.createElement('div');
            if (placement === 'sidebar') {
                el.className = 'pink-side-section';
                let html = `
                    <div class="pink-side-header">
                        <div class="pink-side-header-white"></div>
                        <div class="pink-side-header-navy">${(sec.title || 'EXPERIENCE').toUpperCase()}</div>
                        <div class="pink-side-header-lines"><span></span><span></span></div>
                    </div>
                `;
                (sec.items || []).forEach(item => {
                    const lines = (item.details || '').split('\n').map(l => l.trim()).filter(Boolean);
                    html += `
                        <div style="padding:0 22px; margin-bottom:14px;">
                            <div style="font-size:12px; font-weight:700; color:#343d51;">${item.role || ''}</div>
                            <div style="font-size:11px; color:#343d51; font-style:italic; margin-bottom:4px;">${item.company || ''} ${item.duration ? '| ' + item.duration : ''}</div>
                            ${lines.length ? `<ul style="margin:4px 0 0 0; padding-left:14px; font-size:11px; color:#343d51; line-height:1.45;">${lines.map(l => `<li>${l}</li>`).join('')}</ul>` : ''}
                        </div>
                    `;
                });
                el.innerHTML = html;
            } else {
                el.className = 'pink-main-section';
                let html = `<div class="pink-main-header">${(sec.title || 'EXPERIENCE').toUpperCase()}</div>`;
                (sec.items || []).forEach(item => {
                    const lines = (item.details || '').split('\n').map(l => l.trim()).filter(Boolean);
                    const bulletsHTML = lines.map(l => `<li>${l}</li>`).join('');
                    html += `
                        <div class="pink-exp-item">
                            <div class="pink-exp-header">
                                <div class="pink-exp-role">${item.role || ''}</div>
                                <div class="pink-exp-date">${item.duration || ''}</div>
                            </div>
                            <span class="pink-exp-company">${item.company || ''}</span>
                            ${bulletsHTML ? `<ul class="pink-exp-bullets">${bulletsHTML}</ul>` : ''}
                        </div>
                    `;
                });
                el.innerHTML = html;
            }
            target.appendChild(el);
        }

        if (sec.type === 'education') {
            const el = document.createElement('div');
            if (placement === 'sidebar') {
                el.className = 'pink-side-section';
                let html = `
                    <div class="pink-side-header">
                        <div class="pink-side-header-white"></div>
                        <div class="pink-side-header-navy">${(sec.title || 'EDUCATION').toUpperCase()}</div>
                        <div class="pink-side-header-lines"><span></span><span></span></div>
                    </div>
                `;
                (sec.items || []).forEach(item => {
                    html += `
                        <div class="pink-edu-item">
                            <h4>${item.degree || ''}</h4>
                            <p>${item.school || ''}</p>
                            <div class="pink-edu-year">${item.duration || ''}</div>
                        </div>
                    `;
                });
                el.innerHTML = html;
            } else {
                el.className = 'pink-main-section';
                let html = `<div class="pink-main-header">${(sec.title || 'EDUCATION').toUpperCase()}</div>`;
                (sec.items || []).forEach(item => {
                    html += `
                        <div class="pink-exp-item">
                            <div class="pink-exp-header">
                                <div class="pink-exp-role">${item.degree || ''}</div>
                                <div class="pink-exp-date">${item.duration || ''}</div>
                            </div>
                            <span class="pink-exp-company">${item.school || ''}</span>
                        </div>
                    `;
                });
                el.innerHTML = html;
            }
            target.appendChild(el);
        }

        if (sec.type === 'skills') {
            const el = document.createElement('div');
            if (placement === 'sidebar') {
                el.className = 'pink-side-section';
                let html = `
                    <div class="pink-side-header">
                        <div class="pink-side-header-white"></div>
                        <div class="pink-side-header-navy">${(sec.title || 'PRO SKILLS').toUpperCase()}</div>
                        <div class="pink-side-header-lines"><span></span><span></span></div>
                    </div>
                    <div class="pink-skills-list">
                `;
                (sec.items || []).forEach(item => {
                    html += `<div class="pink-skill-item"><span>${item.name || ''}</span></div>`;
                });
                html += `</div>`;
                el.innerHTML = html;
            } else {
                el.className = 'pink-main-section';
                let html = `<div class="pink-main-header">${(sec.title || 'SKILLS').toUpperCase()}</div>`;
                html += `<div style="display:flex; flex-wrap:wrap; gap:8px;">`;
                (sec.items || []).forEach(item => {
                    html += `<span style="background:#e0cbd2; color:#343d51; padding:5px 12px; border-radius:14px; font-size:11.5px; font-weight:600;">${item.name || ''}</span>`;
                });
                html += `</div>`;
                el.innerHTML = html;
            }
            target.appendChild(el);
        }
    });
}

// ===== EDITOR FIELDS (WITH PLACEMENT TOGGLE) =====
function refreshPinkEditorFields() {
    const container = document.getElementById('pink-dynamic-editor-sections');
    if (!container) return;
    container.innerHTML = '';

    pinkLocalState.sectionsList.forEach((sec, sIdx) => {
        const secDiv = document.createElement('div');
        secDiv.style.cssText = 'background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #cbd5e1; margin-bottom:15px;';

        const currentPlacement = sec.placement || 'main';

        let controlsHTML = `
            <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:10px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; flex-wrap:wrap;">
                    <input type="text" value="${sec.title}"
                        oninput="pinkLocalState.sectionsList[${sIdx}].title = this.value; renderPink(false);"
                        style="font-weight:700; font-size:12px; border:1px solid #cbd5e1; padding:4px 6px; border-radius:4px; color:#343d51; flex:1; min-width:110px;"
                        placeholder="Section Heading">

                    <select onchange="pinkLocalState.sectionsList[${sIdx}].placement=this.value; renderPink(true);"
                        style="font-size:11px; padding:3px; border-radius:4px; border:1px solid #cbd5e1;">
                        <option value="main" ${currentPlacement === 'main' ? 'selected' : ''}>Main</option>
                        <option value="sidebar" ${currentPlacement === 'sidebar' ? 'selected' : ''}>Sidebar</option>
                    </select>

                    <label style="font-size:11px; color:#64748b; cursor:pointer; display:flex; align-items:center; gap:2px;">
                        <input type="checkbox" ${sec.visible ? 'checked' : ''}
                            onchange="pinkLocalState.sectionsList[${sIdx}].visible = this.checked; renderPink(true);"> Show
                    </label>
                </div>
                <div style="display:flex; gap:6px; justify-content:flex-end;">
                    <button type="button" onclick="duplicatePinkSection(${sIdx})"
                        style="background:#dbeafe; color:#1e40af; border:1px solid #bfdbfe; padding:2px 6px; border-radius:4px; cursor:pointer; font-size:10px; font-weight:600;">📋 Clone Section</button>
                    <button type="button" onclick="deletePinkSection(${sIdx})"
                        style="background:#fee2e2; color:#991b1b; border:1px solid #fecaca; padding:2px 6px; border-radius:4px; cursor:pointer; font-size:10px; font-weight:600;">🗑️ Delete Section</button>
                </div>
            </div>
        `;

        let bodyHTML = '';

        if (sec.type === 'summary') {
            bodyHTML = `
                <textarea style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:6px; resize:vertical; font-family:inherit; box-sizing:border-box; font-size:12px;"
                    rows="4"
                    oninput="pinkLocalState.sectionsList[${sIdx}].value = this.value; renderPink(false);">${sec.value || ''}</textarea>
            `;
        }
        else if (sec.type === 'experience') {
            bodyHTML = `
                <div style="display:flex; justify-content:flex-end; margin-bottom:6px;">
                    <button type="button" onclick="addPinkDynamicItem(${sIdx})"
                        style="background:#343d51; color:white; border:none; padding:2px 12px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:600;">+ Add Experience</button>
                </div>
            `;
            (sec.items || []).forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="background:#ffffff; padding:8px; border-radius:6px; margin-bottom:6px; border:1px solid #e2e8f0;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                            <strong style="font-size:10px; color:#343d51;">Item #${itemIdx + 1}</strong>
                            <div>
                                <button type="button" onclick="clonePinkItem(${sIdx}, ${itemIdx})"
                                    style="padding:1px 5px; font-size:10px; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;">📋</button>
                                <button type="button" onclick="deletePinkItem(${sIdx}, ${itemIdx})"
                                    style="padding:1px 5px; font-size:10px; color:red; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;">🗑️</button>
                            </div>
                        </div>
                        <input type="text" placeholder="Role/Title" value="${item.role || ''}"
                            style="width:100%; padding:4px 6px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="pinkLocalState.sectionsList[${sIdx}].items[${itemIdx}].role=this.value; renderPink(false);">
                        <input type="text" placeholder="Company" value="${item.company || ''}"
                            style="width:100%; padding:4px 6px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="pinkLocalState.sectionsList[${sIdx}].items[${itemIdx}].company=this.value; renderPink(false);">
                        <input type="text" placeholder="Duration" value="${item.duration || ''}"
                            style="width:100%; padding:4px 6px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="pinkLocalState.sectionsList[${sIdx}].items[${itemIdx}].duration=this.value; renderPink(false);">
                        <textarea placeholder="Bullet points (one per line)"
                            style="width:100%; padding:4px 6px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px; font-family:inherit; resize:vertical;"
                            rows="3"
                            oninput="pinkLocalState.sectionsList[${sIdx}].items[${itemIdx}].details=this.value; renderPink(false);">${item.details || ''}</textarea>
                    </div>
                `;
            });
        }
        else if (sec.type === 'education') {
            bodyHTML = `
                <div style="display:flex; justify-content:flex-end; margin-bottom:6px;">
                    <button type="button" onclick="addPinkDynamicItem(${sIdx})"
                        style="background:#343d51; color:white; border:none; padding:2px 12px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:600;">+ Add Education</button>
                </div>
            `;
            (sec.items || []).forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="background:#ffffff; padding:8px; border-radius:6px; margin-bottom:6px; border:1px solid #e2e8f0;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                            <strong style="font-size:10px; color:#343d51;">Item #${itemIdx + 1}</strong>
                            <div>
                                <button type="button" onclick="clonePinkItem(${sIdx}, ${itemIdx})"
                                    style="padding:1px 5px; font-size:10px; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;">📋</button>
                                <button type="button" onclick="deletePinkItem(${sIdx}, ${itemIdx})"
                                    style="padding:1px 5px; font-size:10px; color:red; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;">🗑️</button>
                            </div>
                        </div>
                        <input type="text" placeholder="Degree" value="${item.degree || ''}"
                            style="width:100%; padding:4px 6px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="pinkLocalState.sectionsList[${sIdx}].items[${itemIdx}].degree=this.value; renderPink(false);">
                        <input type="text" placeholder="School/Institute" value="${item.school || ''}"
                            style="width:100%; padding:4px 6px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="pinkLocalState.sectionsList[${sIdx}].items[${itemIdx}].school=this.value; renderPink(false);">
                        <input type="text" placeholder="Duration" value="${item.duration || ''}"
                            style="width:100%; padding:4px 6px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="pinkLocalState.sectionsList[${sIdx}].items[${itemIdx}].duration=this.value; renderPink(false);">
                    </div>
                `;
            });
        }
        else if (sec.type === 'skills') {
            bodyHTML = `
                <div style="display:flex; justify-content:flex-end; margin-bottom:6px;">
                    <button type="button" onclick="addPinkDynamicItem(${sIdx})"
                        style="background:#343d51; color:white; border:none; padding:2px 12px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:600;">+ Add Skill</button>
                </div>
            `;
            (sec.items || []).forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="display:flex; gap:4px; align-items:center; background:#ffffff; padding:6px; border-radius:4px; border:1px solid #e2e8f0; margin-bottom:5px;">
                        <input type="text" value="${item.name || ''}" placeholder="Skill name"
                            style="flex:1; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px; min-width:0;"
                            oninput="pinkLocalState.sectionsList[${sIdx}].items[${itemIdx}].name=this.value; renderPink(false);">
                        <button type="button" onclick="clonePinkItem(${sIdx}, ${itemIdx})"
                            style="padding:2px 5px; font-size:10px; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;">📋</button>
                        <button type="button" onclick="deletePinkItem(${sIdx}, ${itemIdx})"
                            style="padding:2px 5px; font-size:10px; color:red; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;">🗑️</button>
                    </div>
                `;
            });
        }

        secDiv.innerHTML = controlsHTML + bodyHTML;
        container.appendChild(secDiv);
    });
}

function duplicatePinkSection(index) {
    const original = pinkLocalState.sectionsList[index];
    const clone = {
        id: 'psec_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
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
    pinkLocalState.sectionsList.splice(index + 1, 0, clone);
    renderPink(true);
}

function deletePinkSection(index) {
    if (pinkLocalState.sectionsList.length <= 1) {
        alert("❌ Aap saare sections delete nahi kar sakte!");
        return;
    }
    pinkLocalState.sectionsList.splice(index, 1);
    renderPink(true);
}

function addPinkDynamicItem(secIdx) {
    const sec = pinkLocalState.sectionsList[secIdx];
    if (!sec.items) sec.items = [];
    if (sec.type === 'experience') {
        sec.items.push({ role: 'New Role', company: 'Company Name', duration: '2024 - Present', details: 'Key responsibility\nAchievement' });
    } else if (sec.type === 'education') {
        sec.items.push({ degree: 'Degree Name', school: 'University Name', duration: '2024' });
    } else if (sec.type === 'skills') {
        sec.items.push({ name: 'New Skill' });
    }
    renderPink(true);
}

function clonePinkItem(secIdx, itemIdx) {
    const sec = pinkLocalState.sectionsList[secIdx];
    if (sec && sec.items && sec.items[itemIdx]) {
        const itemClone = JSON.parse(JSON.stringify(sec.items[itemIdx]));
        if (itemClone.role) itemClone.role += ' (Copy)';
        if (itemClone.school) itemClone.school += ' (Copy)';
        if (itemClone.name) itemClone.name += ' (Copy)';
        if (itemClone.degree) itemClone.degree += ' (Copy)';
        sec.items.splice(itemIdx + 1, 0, itemClone);
        renderPink(true);
    }
}

function deletePinkItem(secIdx, itemIdx) {
    const sec = pinkLocalState.sectionsList[secIdx];
    if (sec && sec.items && sec.items[itemIdx]) {
        sec.items.splice(itemIdx, 1);
        renderPink(true);
    }
}

function bindPinkEvents() {
    const personalInputs = ['pink-input-name', 'pink-input-title', 'pink-input-phone', 'pink-input-email', 'pink-input-linkedin', 'pink-input-address'];
    personalInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.dataset.bound) {
            el.dataset.bound = 'true';
            el.addEventListener('input', function() {
                const keyMap = {
                    'pink-input-name': 'name',
                    'pink-input-title': 'title',
                    'pink-input-phone': 'phone',
                    'pink-input-email': 'email',
                    'pink-input-linkedin': 'linkedin',
                    'pink-input-address': 'address'
                };
                pinkLocalState.resumeData[keyMap[this.id]] = this.value;
                renderPink(false);
            });
        }
    });

    const fileInput = document.getElementById('pink-input-file');
    if (fileInput && !fileInput.dataset.bound) {
        fileInput.dataset.bound = 'true';
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(evt) {
                pinkLocalState.resumeData.photo = evt.target.result;
                const preview = document.getElementById('pink-photo-preview');
                if (preview) {
                    preview.innerHTML = `<img src="${evt.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
                }
                renderPink(false);
            };
            reader.readAsDataURL(file);
        });
    }
}

function pinkSwitchMobileTab(tab) {
    const editor = document.getElementById('pink-editor-panel');
    const preview = document.getElementById('pink-preview-panel');
    const btnEditor = document.getElementById('pink-tab-editor');
    const btnPreview = document.getElementById('pink-tab-preview');
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

// ============================================================
// PDF DOWNLOAD FOR PINK TEMPLATE (MULTI-PAGE SUPPORT)
// ============================================================
function downloadPinkPDF() {
    console.log("📥 [Pink] Downloading PDF...");

    let element = document.querySelector('.cv-pink-content');
    if (!element) {
        const previewContainer = document.getElementById('resume-preview-placeholder');
        if (previewContainer) element = previewContainer.querySelector('.cv-pink-content');
    }
    if (!element) {
        const container = document.querySelector('.cv-pink-container');
        if (container) element = container.querySelector('.cv-pink-content');
    }
    if (!element) {
        alert("❌ Pink preview element not found!");
        return;
    }

    const clone = element.cloneNode(true);
    clone.querySelectorAll('.pink-editor, .builder-editor, .editor-panel, .editor-controls, form, input, button, select, textarea, .no-print, .tmpl-mobile-tabs-container')
        .forEach(el => el.remove());

    // Ensure multi-page support
    clone.style.height = 'auto';
    clone.style.minHeight = '1123px';
    clone.style.overflow = 'visible';

    const styles = document.createElement('style');
    styles.textContent = `
        .cv-pink-content {
            width: 794px !important;
            min-height: 1123px !important;
            margin: 0 auto !important;
            padding: 0 !important;
            background: #ffffff !important;
            overflow: visible !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            transform: none !important;
            position: relative !important;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        }
        .pink-main-table {
            width: 100% !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            position: relative !important;
            z-index: 2 !important;
        }
        .pink-sidebar {
            width: 285px !important;
            vertical-align: top !important;
            padding: 35px 0 30px 0 !important;
            background: #e0cbd2 !important;
            box-sizing: border-box !important;
        }
        .pink-main-content {
            vertical-align: top !important;
            padding: 40px 45px 30px 35px !important;
            background: #ffffff !important;
            box-sizing: border-box !important;
        }
        .pink-monogram-box {
            width: 150px !important;
            height: 150px !important;
            margin: 0 auto 35px auto !important;
            border: 2.5px solid #343d51 !important;
            background: #ffffff !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            position: relative !important;
            overflow: hidden !important;
        }
        .pink-monogram-photo img {
            width: 100% !important; height: 100% !important;
            object-fit: cover !important;
        }
        .pink-monogram-circle {
            width: 105px !important;
            height: 105px !important;
            border: 2.5px solid #343d51 !important;
            border-radius: 50% !important;
            position: relative !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 2 !important;
        }
        .pink-mono-letter {
            position: absolute !important;
            font-size: 24px !important;
            font-weight: 700 !important;
            color: #343d51 !important;
            font-family: 'Georgia', serif !important;
        }
        .pink-mono-top { top: 14px !important; left: 16px !important; }
        .pink-mono-bottom { bottom: 14px !important; right: 16px !important; }
        .pink-mono-diagonal {
            position: absolute !important;
            width: 75% !important;
            height: 2.5px !important;
            background: #343d51 !important;
            transform: rotate(-45deg) !important;
            top: 50% !important;
            left: 12.5% !important;
        }
        .pink-name-line1, .pink-name-line2 {
            font-size: 48px !important;
            font-weight: 800 !important;
            color: #343d51 !important;
            margin: 0 !important;
            line-height: 1 !important;
            letter-spacing: 1.5px !important;
            text-transform: uppercase !important;
        }
        .pink-name-line1 { margin-bottom: 6px !important; }
        .pink-title-bar {
            display: flex !important;
            align-items: center !important;
            margin-top: 20px !important;
            gap: 10px !important;
        }
        .pink-title-line {
            display: inline-block !important;
            height: 2.5px !important;
            background: #343d51 !important;
        }
        .pink-title-line-left, .pink-title-line-right { width: 28px !important; }
        .pink-title-text {
            display: inline-block !important;
            background: #e0cbd2 !important;
            color: #343d51 !important;
            padding: 7px 22px !important;
            font-size: 13px !important;
            font-weight: 700 !important;
            letter-spacing: 2px !important;
            text-transform: uppercase !important;
        }
        .pink-side-header {
            display: flex !important;
            align-items: stretch !important;
            height: 38px !important;
            margin-bottom: 16px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
        }
        .pink-side-header-white { width: 50px !important; background: #ffffff !important; }
        .pink-side-header-navy {
            background: #343d51 !important;
            color: #ffffff !important;
            padding: 0 18px !important;
            font-size: 14px !important;
            font-weight: 700 !important;
            letter-spacing: 2px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex: 1 !important;
            text-transform: uppercase !important;
            clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%) !important;
            margin-left: -10px !important;
        }
        .pink-side-header-lines {
            display: flex !important;
            align-items: center !important;
            gap: 4px !important;
            padding-left: 6px !important;
        }
        .pink-side-header-lines span {
            display: block !important;
            background: #343d51 !important;
            height: 100% !important;
        }
        .pink-side-header-lines span:first-child { width: 2px !important; }
        .pink-side-header-lines span:last-child { width: 6px !important; }
        .pink-contact-item {
            display: flex !important;
            align-items: center !important;
            justify-content: flex-end !important;
            gap: 10px !important;
            font-size: 12px !important;
            color: #343d51 !important;
            text-align: right !important;
        }
        .pink-contact-icon {
            width: 22px !important;
            height: 22px !important;
            background: #343d51 !important;
            color: #ffffff !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 11px !important;
            font-weight: 700 !important;
        }
        .pink-edu-item {
            text-align: center !important;
            margin-bottom: 18px !important;
            padding: 0 22px !important;
        }
        .pink-edu-item h4 {
            font-size: 12.5px !important;
            font-weight: 700 !important;
            color: #343d51 !important;
            text-transform: uppercase !important;
        }
        .pink-edu-item p { font-size: 11.5px !important; color: #343d51 !important; }
        .pink-edu-year { font-size: 11.5px !important; color: #343d51 !important; font-weight: 700 !important; }
        .pink-skill-item {
            display: flex !important;
            align-items: center !important;
            justify-content: flex-end !important;
            gap: 8px !important;
            font-size: 12px !important;
            color: #343d51 !important;
            text-align: right !important;
        }
        .pink-skill-item::after {
            content: "•" !important;
            color: #343d51 !important;
            font-size: 16px !important;
        }
        .pink-main-header {
            font-size: 16px !important;
            font-weight: 800 !important;
            color: #343d51 !important;
            text-transform: uppercase !important;
            letter-spacing: 1.5px !important;
            border-bottom: 2px solid #343d51 !important;
            padding-bottom: 6px !important;
            margin-bottom: 14px !important;
        }
        .pink-summary-text {
            font-size: 12.5px !important;
            line-height: 1.65 !important;
            color: #333333 !important;
            text-align: justify !important;
            white-space: pre-line !important;
        }
        .pink-exp-role {
            font-size: 14px !important;
            font-weight: 700 !important;
            color: #343d51 !important;
        }
        .pink-exp-date {
            background: #e0cbd2 !important;
            color: #343d51 !important;
            font-size: 11px !important;
            font-weight: 700 !important;
            padding: 4px 12px !important;
        }
        .pink-exp-company {
            font-size: 12.5px !important;
            color: #333333 !important;
            font-style: italic !important;
        }
        .pink-exp-bullets li {
            font-size: 12px !important;
            color: #333333 !important;
            line-height: 1.55 !important;
        }
        /* Multi-page rules */
        .pink-main-section,
        .pink-side-section,
        .pink-exp-item,
        .pink-edu-item,
        .pink-side-header,
        .pink-main-header {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
        }
    `;
    clone.prepend(styles);

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
        position: fixed !important;
        top: -9999px !important;
        left: -9999px !important;
        width: 794px !important;
        z-index: -99999 !important;
        opacity: 0.01 !important;
        pointer-events: none !important;
        background: #ffffff !important;
    `;
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    const userName = window.state?.resumeData?.name
        ? window.state.resumeData.name.trim().replace(/\s+/g, '_')
        : 'Resume';

    const opt = {
        margin: 0,
        filename: `${userName}_CV_Pink.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            width: 794,
            backgroundColor: '#ffffff',
            scrollX: 0,
            scrollY: 0,
            windowWidth: 794
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf()
        .set(opt)
        .from(clone)
        .save()
        .then(() => {
            console.log("✅ [Pink] PDF generated successfully!");
            if (document.body.contains(wrapper)) document.body.removeChild(wrapper);
        })
        .catch(err => {
            console.error("❌ [Pink] PDF Error:", err);
            alert("PDF Download mein problem aayi!");
            if (document.body.contains(wrapper)) document.body.removeChild(wrapper);
        });
}

// ===== EXPOSE GLOBALLY =====
window.renderPinkTemplate = renderPinkTemplate;
window.renderPink = renderPink;
window.refreshPinkEditorFields = refreshPinkEditorFields;
window.duplicatePinkSection = duplicatePinkSection;
window.deletePinkSection = deletePinkSection;
window.addPinkDynamicItem = addPinkDynamicItem;
window.clonePinkItem = clonePinkItem;
window.deletePinkItem = deletePinkItem;
window.downloadPinkPDF = downloadPinkPDF;
window.pinkSwitchMobileTab = pinkSwitchMobileTab;

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 820) {
        pinkSwitchMobileTab('editor');
    }
});

console.log("✅ Pink template fully loaded with placement toggle + multi-page!");