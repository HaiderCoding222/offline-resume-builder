// ====================================================
// EMERALD TEMPLATE - COMPLETE EDITOR & PREVIEW LOGIC
// ====================================================

function renderEmeraldTemplate(state) {
    if (!state.emeraldSectionsList) {
        state.emeraldSectionsList = [
            {
                id: 'sec_' + Date.now() + '_1',
                type: 'experience',
                title: 'Work Experience',
                placement: 'main',
                visible: true,
                items: [
                    {
                        role: 'Graphic Designer Internship',
                        company: 'Studio Shodwe',
                        duration: '2014 - 2015',
                        bullets: 'Creating Visual Designs\nCollaborating with Teams'
                    },
                    {
                        role: 'Junior Graphic Designer',
                        company: 'Liceria Company',
                        duration: '2016 - 2021',
                        bullets: 'Design Creation\nRevising and Editing'
                    },
                    {
                        role: 'Senior Graphic Designer',
                        company: 'Borcelle Studios',
                        duration: '2022 - 2024',
                        bullets: 'Leading Design Projects\nMentoring Junior Designers'
                    }
                ]
            },
            {
                id: 'sec_' + Date.now() + '_2',
                type: 'education',
                title: 'Education',
                placement: 'sidebar',
                visible: true,
                items: [
                    {
                        degree: "Bachelor's Degree In Graphic Designer",
                        school: 'Rimberio University',
                        duration: '2010 - 2014'
                    },
                    {
                        degree: "Master's Degree In Graphic Designer",
                        school: 'Borcelle University',
                        duration: '2015 - 2017'
                    }
                ]
            },
            {
                id: 'sec_' + Date.now() + '_3',
                type: 'skills',
                title: 'Skills',
                placement: 'main',
                visible: true,
                items: [
                    { name: 'Design Software', level: 90 },
                    { name: 'UI/UX Design', level: 85 },
                    { name: 'Typography', level: 80 },
                    { name: 'Branding and Logo', level: 88 },
                    { name: 'Concept Development', level: 75 }
                ]
            },
            {
                id: 'sec_' + Date.now() + '_4',
                type: 'award',
                title: 'Award',
                placement: 'sidebar',
                visible: true,
                items: [
                    {
                        title: 'Rimberio Competition',
                        detail: 'First Logo Design',
                        year: '2020'
                    }
                ]
            }
        ];

        state.resumeData = {
            name: 'Richard Sanchez',
            title: 'Graphic Designer',
            summary: "I'm a creative Graphic Designer with expertise in branding, digital design, and visual communication, passionate about delivering innovative solutions.",
            email: 'hello@reallygreatsite.com',
            phone: '+123-456-7890',
            website: 'www.reallygreatsite.com',
            address: '123 Anywhere St., Any City',
            photo: ''
        };

        refreshEmeraldEditor();
    }

    const setText = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val || '';
    };

    setText('p-em-name', state.resumeData.name);
    setText('p-em-title', state.resumeData.title);
    setText('p-em-summary', state.resumeData.summary);
    setText('p-em-phone', state.resumeData.phone);
    setText('p-em-email', state.resumeData.email);
    setText('p-em-website', state.resumeData.website);
    setText('p-em-address', state.resumeData.address);

    const photoEl = document.getElementById('p-em-photo');
    if (photoEl) {
        if (state.resumeData.photo) {
            photoEl.innerHTML = `<img src="${state.resumeData.photo}" alt="Profile">`;
        } else {
            photoEl.innerHTML = `<span class="em-photo-placeholder">Photo</span>`;
        }
    }

    const sidebarTarget = document.getElementById('em-sidebar-dynamic-target');
    const mainTarget = document.getElementById('em-main-dynamic-target');

    if (sidebarTarget) sidebarTarget.innerHTML = '';
    if (mainTarget) mainTarget.innerHTML = '';

    state.emeraldSectionsList.forEach(sec => {
        if (!sec.visible) return;

        const placement = sec.placement || (sec.type === 'education' || sec.type === 'award' ? 'sidebar' : 'main');
        const target = placement === 'sidebar' ? sidebarTarget : mainTarget;
        if (!target) return;

        if (sec.type === 'experience') {
            const secDiv = document.createElement('div');
            secDiv.className = placement === 'sidebar' ? 'em-side-block' : 'em-section';
            
            let html = placement === 'sidebar' 
                ? `<div class="em-pill">${sec.title || 'Experience'}</div>`
                : `<div class="em-section-title">${sec.title || 'Work Experience'}</div>`;

            (sec.items || []).forEach(item => {
                const bullets = (item.bullets || '')
                    .split('\n')
                    .map(b => b.trim())
                    .filter(Boolean)
                    .map(b => `<li>${b}</li>`)
                    .join('');

                html += `
                    <div class="em-exp-item">
                        <div class="em-exp-header">
                            <div>
                                <div class="em-exp-company" style="${placement === 'sidebar' ? 'color:#6ee7b7;' : ''}">${item.company || ''} ${item.duration ? `(${item.duration})` : ''}</div>
                                <div class="em-exp-role" style="${placement === 'sidebar' ? 'color:#ffffff;' : ''}">${item.role || ''}</div>
                            </div>
                        </div>
                        ${bullets ? `<ul class="em-exp-bullets">${bullets}</ul>` : ''}
                    </div>
                `;
            });
            secDiv.innerHTML = html;
            target.appendChild(secDiv);
        }

        if (sec.type === 'skills') {
            const secDiv = document.createElement('div');
            secDiv.className = placement === 'sidebar' ? 'em-side-block' : 'em-section';

            let html = placement === 'sidebar' 
                ? `<div class="em-pill">${sec.title || 'Skills'}</div>`
                : `<div class="em-section-title">${sec.title || 'Skills'}</div>`;

            (sec.items || []).forEach(item => {
                const level = Math.min(100, Math.max(0, Number(item.level) || 70));
                html += `
                    <div class="em-skill-row">
                        <div class="em-skill-name" style="${placement === 'sidebar' ? 'color:#d1fae5; width:100px;' : ''}">${item.name || ''}</div>
                        <div class="em-skill-bar-track">
                            <div class="em-skill-bar-fill" style="width:${level}%"></div>
                        </div>
                    </div>
                `;
            });
            secDiv.innerHTML = html;
            target.appendChild(secDiv);
        }

        if (sec.type === 'education') {
            const secDiv = document.createElement('div');
            secDiv.className = placement === 'sidebar' ? 'em-side-block' : 'em-section';

            let html = placement === 'sidebar' 
                ? `<div class="em-pill">${sec.title || 'Education'}</div>`
                : `<div class="em-section-title">${sec.title || 'Education'}</div>`;

            (sec.items || []).forEach(item => {
                html += `
                    <div class="em-edu-item">
                        <h4 style="${placement === 'main' ? 'color:#0f172a;' : ''}">${item.school || ''}</h4>
                        <p style="${placement === 'main' ? 'color:#334155;' : ''}">${item.degree || ''}</p>
                        <div class="em-year" style="${placement === 'main' ? 'color:#64748b;' : ''}">${item.duration || ''}</div>
                    </div>
                `;
            });
            secDiv.innerHTML = html;
            target.appendChild(secDiv);
        }

        if (sec.type === 'award') {
            const secDiv = document.createElement('div');
            secDiv.className = placement === 'sidebar' ? 'em-side-block' : 'em-section';

            let html = placement === 'sidebar' 
                ? `<div class="em-pill">${sec.title || 'Award'}</div>`
                : `<div class="em-section-title">${sec.title || 'Award'}</div>`;

            (sec.items || []).forEach(item => {
                html += `
                    <div class="em-award-item">
                        <h4 style="${placement === 'main' ? 'color:#0f172a;' : ''}">${item.title || ''}</h4>
                        <p style="${placement === 'main' ? 'color:#334155;' : ''}">${item.detail || ''}${item.year ? ' | ' + item.year : ''}</p>
                    </div>
                `;
            });
            secDiv.innerHTML = html;
            target.appendChild(secDiv);
        }
    });
}

function refreshEmeraldEditor() {
    const container = document.getElementById('emerald-dynamic-sections');
    if (!container) return;
    container.innerHTML = '';

    // Inputs value sync up for personal info
    const nameInp = document.getElementById('emerald-name');
    const titleInp = document.getElementById('emerald-title');
    const summaryInp = document.getElementById('emerald-summary');
    const phoneInp = document.getElementById('emerald-phone');
    const emailInp = document.getElementById('emerald-email');
    const webInp = document.getElementById('emerald-website');
    const addrInp = document.getElementById('emerald-address');

    if (nameInp) nameInp.value = state.resumeData.name || '';
    if (titleInp) titleInp.value = state.resumeData.title || '';
    if (summaryInp) summaryInp.value = state.resumeData.summary || '';
    if (phoneInp) phoneInp.value = state.resumeData.phone || '';
    if (emailInp) emailInp.value = state.resumeData.email || '';
    if (webInp) webInp.value = state.resumeData.website || '';
    if (addrInp) addrInp.value = state.resumeData.address || '';

    state.emeraldSectionsList.forEach((sec, sIdx) => {
        const secDiv = document.createElement('div');
        secDiv.style.cssText = 'background:#fff; padding:12px; border-radius:8px; border:1px solid #cbd5e1; margin-bottom:12px;';

        const currentPlacement = sec.placement || (sec.type === 'education' || sec.type === 'award' ? 'sidebar' : 'main');

        let controls = `
            <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:10px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; flex-wrap:wrap;">
                    <input type="text" value="${sec.title}" 
                        oninput="state.emeraldSectionsList[${sIdx}].title=this.value; renderEmeraldTemplate(state);"
                        style="font-weight:700; font-size:12px; border:1px solid #cbd5e1; padding:4px 6px; border-radius:4px; color:#064e3b; flex:1; min-width:110px;"
                        placeholder="Section Heading">
                    
                    <select onchange="state.emeraldSectionsList[${sIdx}].placement=this.value; renderEmeraldTemplate(state);" style="font-size:11px; padding:3px; border-radius:4px; border:1px solid #cbd5e1;">
                        <option value="main" ${currentPlacement === 'main' ? 'selected' : ''}>Main</option>
                        <option value="sidebar" ${currentPlacement === 'sidebar' ? 'selected' : ''}>Sidebar</option>
                    </select>

                    <label style="font-size:11px; color:#64748b; cursor:pointer; display:flex; align-items:center; gap:2px;">
                        <input type="checkbox" ${sec.visible ? 'checked' : ''} 
                            onchange="state.emeraldSectionsList[${sIdx}].visible=this.checked; renderEmeraldTemplate(state);"> Show
                    </label>
                </div>
                <div style="display:flex; gap:6px; justify-content:flex-end;">
                    <button type="button" onclick="duplicateEmeraldSection(${sIdx})"
                        style="background:#dbeafe; color:#1e40af; border:1px solid #bfdbfe; padding:2px 6px; border-radius:4px; cursor:pointer; font-size:10px; font-weight:600;">📋 Clone Section</button>
                    <button type="button" onclick="deleteEmeraldSection(${sIdx})"
                        style="background:#fee2e2; color:#991b1b; border:1px solid #fecaca; padding:2px 6px; border-radius:4px; cursor:pointer; font-size:10px; font-weight:600;">🗑️ Delete Section</button>
                </div>
            </div>
        `;

        let body = '';

        if (sec.type === 'experience') {
            (sec.items || []).forEach((item, iIdx) => {
                body += `
                    <div style="background:#f0fdf4; padding:8px; border-radius:6px; margin-bottom:8px; border:1px solid #d1fae5;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                            <strong style="font-size:10px; color:#047857;">Item #${iIdx + 1}</strong>
                            <div>
                                <button type="button" onclick="cloneEmeraldItem(${sIdx}, ${iIdx})" style="padding:1px 5px; font-size:10px; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;" title="Clone Item">📋 Item</button>
                                <button type="button" onclick="deleteEmeraldItem(${sIdx}, ${iIdx})" style="padding:1px 5px; font-size:10px; color:red; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;" title="Delete Item">🗑️</button>
                            </div>
                        </div>
                        <input type="text" placeholder="Role" value="${item.role || ''}"
                            style="width:100%; padding:4px 6px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].role=this.value; renderEmeraldTemplate(state);">
                        <input type="text" placeholder="Company" value="${item.company || ''}"
                            style="width:100%; padding:4px 6px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].company=this.value; renderEmeraldTemplate(state);">
                        <input type="text" placeholder="Duration" value="${item.duration || ''}"
                            style="width:100%; padding:4px 6px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].duration=this.value; renderEmeraldTemplate(state);">
                        <textarea placeholder="Bullet points (one per line)" rows="2"
                            style="width:100%; padding:4px 6px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px; font-family:inherit;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].bullets=this.value; renderEmeraldTemplate(state);">${item.bullets || ''}</textarea>
                    </div>
                `;
            });
            body += `<button type="button" onclick="addEmeraldItem(${sIdx})" style="width:100%; background:#064e3b; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:600;">+ Add Item</button>`;
        }

        if (sec.type === 'education') {
            (sec.items || []).forEach((item, iIdx) => {
                body += `
                    <div style="background:#f0fdf4; padding:8px; border-radius:6px; margin-bottom:8px; border:1px solid #d1fae5;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                            <strong style="font-size:10px; color:#047857;">Item #${iIdx + 1}</strong>
                            <div>
                                <button type="button" onclick="cloneEmeraldItem(${sIdx}, ${iIdx})" style="padding:1px 5px; font-size:10px; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;" title="Clone Item">📋 Item</button>
                                <button type="button" onclick="deleteEmeraldItem(${sIdx}, ${iIdx})" style="padding:1px 5px; font-size:10px; color:red; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;" title="Delete Item">🗑️</button>
                            </div>
                        </div>
                        <input type="text" placeholder="School / University" value="${item.school || ''}"
                            style="width:100%; padding:4px 6px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].school=this.value; renderEmeraldTemplate(state);">
                        <input type="text" placeholder="Degree" value="${item.degree || ''}"
                            style="width:100%; padding:4px 6px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].degree=this.value; renderEmeraldTemplate(state);">
                        <input type="text" placeholder="Duration" value="${item.duration || ''}"
                            style="width:100%; padding:4px 6px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].duration=this.value; renderEmeraldTemplate(state);">
                    </div>
                `;
            });
            body += `<button type="button" onclick="addEmeraldItem(${sIdx})" style="width:100%; background:#064e3b; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:600;">+ Add Item</button>`;
        }

        if (sec.type === 'skills') {
            (sec.items || []).forEach((item, iIdx) => {
                body += `
                    <div style="display:flex; gap:4px; align-items:center; background:#f0fdf4; padding:6px; border-radius:4px; margin-bottom:5px; border:1px solid #d1fae5;">
                        <input type="text" value="${item.name || ''}" placeholder="Skill name"
                            style="flex:1; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px; min-width:0;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].name=this.value; renderEmeraldTemplate(state);">
                        <input type="number" min="0" max="100" value="${item.level || 70}" title="Level %"
                            style="width:50px; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].level=Number(this.value); renderEmeraldTemplate(state);">
                        <button type="button" onclick="cloneEmeraldItem(${sIdx}, ${iIdx})" style="padding:2px 5px; font-size:10px; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;" title="Clone Skill">📋</button>
                        <button type="button" onclick="deleteEmeraldItem(${sIdx}, ${iIdx})" style="padding:2px 5px; font-size:10px; color:red; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;" title="Delete Skill">🗑️</button>
                    </div>
                `;
            });
            body += `<button type="button" onclick="addEmeraldItem(${sIdx})" style="width:100%; background:#064e3b; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:600; margin-top:4px;">+ Add Item</button>`;
        }

        if (sec.type === 'award') {
            (sec.items || []).forEach((item, iIdx) => {
                body += `
                    <div style="background:#f0fdf4; padding:8px; border-radius:6px; margin-bottom:8px; border:1px solid #d1fae5;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                            <strong style="font-size:10px; color:#047857;">Item #${iIdx + 1}</strong>
                            <div>
                                <button type="button" onclick="cloneEmeraldItem(${sIdx}, ${iIdx})" style="padding:1px 5px; font-size:10px; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;" title="Clone Item">📋 Item</button>
                                <button type="button" onclick="deleteEmeraldItem(${sIdx}, ${iIdx})" style="padding:1px 5px; font-size:10px; color:red; cursor:pointer; background:#fff; border:1px solid #cbd5e1; border-radius:3px;" title="Delete Item">🗑️</button>
                            </div>
                        </div>
                        <input type="text" placeholder="Award Title" value="${item.title || ''}"
                            style="width:100%; padding:4px 6px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].title=this.value; renderEmeraldTemplate(state);">
                        <input type="text" placeholder="Detail" value="${item.detail || ''}"
                            style="width:100%; padding:4px 6px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].detail=this.value; renderEmeraldTemplate(state);">
                        <input type="text" placeholder="Year" value="${item.year || ''}"
                            style="width:100%; padding:4px 6px; border:1px solid #cbd5e1; border-radius:4px; font-size:11px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].year=this.value; renderEmeraldTemplate(state);">
                    </div>
                `;
            });
            body += `<button type="button" onclick="addEmeraldItem(${sIdx})" style="width:100%; background:#064e3b; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:600;">+ Add Item</button>`;
        }

        secDiv.innerHTML = controls + body;
        container.appendChild(secDiv);
    });
}

// Section & Item Scope Helpers
function duplicateEmeraldSection(index) {
    const original = state.emeraldSectionsList[index];
    const clone = {
        id: 'sec_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        type: original.type,
        title: original.title + ' (COPY)',
        placement: original.placement,
        visible: original.visible,
        items: JSON.parse(JSON.stringify(original.items || []))
    };
    state.emeraldSectionsList.splice(index + 1, 0, clone);
    refreshEmeraldEditor();
    renderEmeraldTemplate(state);
}

function deleteEmeraldSection(index) {
    if (state.emeraldSectionsList.length <= 1) {
        alert("Aap saare sections delete nahi kar sakte!");
        return;
    }
    state.emeraldSectionsList.splice(index, 1);
    refreshEmeraldEditor();
    renderEmeraldTemplate(state);
}

function addEmeraldItem(secIdx) {
    const sec = state.emeraldSectionsList[secIdx];
    if (!sec.items) sec.items = [];

    if (sec.type === 'experience') {
        sec.items.push({ role: 'New Role', company: 'New Company', duration: '2026', bullets: '• Key responsibility' });
    } else if (sec.type === 'education') {
        sec.items.push({ degree: 'Degree Name', school: 'University Name', duration: '2026' });
    } else if (sec.type === 'skills') {
        sec.items.push({ name: 'New Skill', level: 75 });
    } else if (sec.type === 'award') {
        sec.items.push({ title: 'Award Title', detail: 'Achievement Detail', year: '2026' });
    }
    refreshEmeraldEditor();
    renderEmeraldTemplate(state);
}

function cloneEmeraldItem(secIdx, itemIdx) {
    const sec = state.emeraldSectionsList[secIdx];
    if (sec && sec.items && sec.items[itemIdx]) {
        const itemClone = JSON.parse(JSON.stringify(sec.items[itemIdx]));
        if (itemClone.role) itemClone.role += ' (Copy)';
        if (itemClone.school) itemClone.school += ' (Copy)';
        if (itemClone.name) itemClone.name += ' (Copy)';
        if (itemClone.title) itemClone.title += ' (Copy)';

        sec.items.splice(itemIdx + 1, 0, itemClone);
        refreshEmeraldEditor();
        renderEmeraldTemplate(state);
    }
}

function deleteEmeraldItem(secIdx, itemIdx) {
    const sec = state.emeraldSectionsList[secIdx];
    if (sec && sec.items && sec.items[itemIdx]) {
        sec.items.splice(itemIdx, 1);
        refreshEmeraldEditor();
        renderEmeraldTemplate(state);
    }
}

document.addEventListener('input', (e) => {
    if (!e.target || state.currentTemplate !== 'emerald') return;
    const id = e.target.id;
    if (id === 'emerald-name') state.resumeData.name = e.target.value;
    if (id === 'emerald-title') state.resumeData.title = e.target.value;
    if (id === 'emerald-summary') state.resumeData.summary = e.target.value;
    if (id === 'emerald-phone') state.resumeData.phone = e.target.value;
    if (id === 'emerald-email') state.resumeData.email = e.target.value;
    if (id === 'emerald-website') state.resumeData.website = e.target.value;
    if (id === 'emerald-address') state.resumeData.address = e.target.value;
    
    if (['emerald-name','emerald-title','emerald-summary','emerald-phone','emerald-email','emerald-website','emerald-address'].includes(id)) {
        renderEmeraldTemplate(state);
    }
});

document.addEventListener('change', (e) => {
    if (e.target && e.target.id === 'emerald-photo') {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            state.resumeData.photo = ev.target.result;
            const preview = document.getElementById('emerald-photo-preview');
            if (preview) {
                preview.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
            }
            renderEmeraldTemplate(state);
        };
        reader.readAsDataURL(file);
    }
});

window.renderEmeraldTemplate = renderEmeraldTemplate;
window.refreshEmeraldEditor = refreshEmeraldEditor;
window.duplicateEmeraldSection = duplicateEmeraldSection;
window.deleteEmeraldSection = deleteEmeraldSection;
window.addEmeraldItem = addEmeraldItem;
window.cloneEmeraldItem = cloneEmeraldItem;
window.deleteEmeraldItem = deleteEmeraldItem;

function downloadEmeraldPDF() {
    const element = document.querySelector('.cv-emerald-content');
    if (!element) {
        alert('Preview element not found!');
        return;
    }
    const opt = {
        margin: 0,
        filename: (state.resumeData.name || 'Resume') + '_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0, scrollX: 0 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    const currentScroll = window.scrollY;
    window.scrollTo(0, 0);
    html2pdf().set(opt).from(element).save().then(() => {
        window.scrollTo(0, currentScroll);
    });
}

window.downloadEmeraldPDF = downloadEmeraldPDF;

document.getElementById('btn-download-pdf')?.addEventListener('click', () => {
    if (state.currentTemplate === 'emerald') {
        window.downloadEmeraldPDF();
    }
});

function emSwitchMobileTab(tab) {
    const editor = document.getElementById('em-editor-panel');
    const preview = document.getElementById('em-preview-panel');
    const btnEditor = document.getElementById('em-tab-editor');
    const btnPreview = document.getElementById('em-tab-preview');

    if (!editor || !preview) return;

    if (tab === 'editor') {
        editor.classList.remove('mobile-hidden');
        preview.classList.add('mobile-hidden');
        btnEditor?.classList.add('active');
        btnPreview?.classList.remove('active');
    } else {
        editor.classList.add('mobile-hidden');
        preview.classList.remove('mobile-hidden');
        btnEditor?.classList.remove('active');
        btnPreview?.classList.add('active');
    }
}

window.emSwitchMobileTab = emSwitchMobileTab;

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 820) {
        emSwitchMobileTab('editor');
    }
});