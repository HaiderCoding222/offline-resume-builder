function renderEmeraldTemplate(state) {
    if (!state.emeraldSectionsList) {
        state.emeraldSectionsList = [
            {
                id: 'sec_' + Date.now() + '_1',
                type: 'experience',
                title: 'Work Experience',
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

    const expPreview = document.getElementById('em-experience-preview');
    const skillsPreview = document.getElementById('em-skills-preview');
    const eduPreview = document.getElementById('em-education-preview');
    const awardPreview = document.getElementById('em-award-preview');

    if (expPreview) expPreview.innerHTML = '';
    if (skillsPreview) skillsPreview.innerHTML = '';
    if (eduPreview) eduPreview.innerHTML = '';
    if (awardPreview) awardPreview.innerHTML = '';

    state.emeraldSectionsList.forEach(sec => {
        if (!sec.visible) return;

        if (sec.type === 'experience' && expPreview) {
            const title = document.createElement('div');
            title.className = 'em-section-title';
            title.textContent = sec.title || 'Work Experience';
            expPreview.appendChild(title);

            (sec.items || []).forEach(item => {
                const div = document.createElement('div');
                div.className = 'em-exp-item';
                const bullets = (item.bullets || '')
                    .split('\n')
                    .map(b => b.trim())
                    .filter(Boolean)
                    .map(b => `<li>${b}</li>`)
                    .join('');
                div.innerHTML = `
                    <div class="em-exp-header">
                        <div>
                            <div class="em-exp-company">${item.company || ''} ${item.duration ? `(${item.duration})` : ''}</div>
                            <div class="em-exp-role">${item.role || ''}</div>
                        </div>
                    </div>
                    ${bullets ? `<ul class="em-exp-bullets">${bullets}</ul>` : ''}
                `;
                expPreview.appendChild(div);
            });
        }

        if (sec.type === 'skills' && skillsPreview) {
            const title = document.createElement('div');
            title.className = 'em-section-title';
            title.textContent = sec.title || 'Skills';
            skillsPreview.appendChild(title);

            (sec.items || []).forEach(item => {
                const level = Math.min(100, Math.max(0, Number(item.level) || 70));
                const row = document.createElement('div');
                row.className = 'em-skill-row';
                row.innerHTML = `
                    <div class="em-skill-name">${item.name || ''}</div>
                    <div class="em-skill-bar-track">
                        <div class="em-skill-bar-fill" style="width:${level}%"></div>
                    </div>
                `;
                skillsPreview.appendChild(row);
            });
        }

        if (sec.type === 'education' && eduPreview) {
            const pill = document.createElement('div');
            pill.className = 'em-pill';
            pill.textContent = sec.title || 'Education';
            eduPreview.appendChild(pill);

            (sec.items || []).forEach(item => {
                const div = document.createElement('div');
                div.className = 'em-edu-item';
                div.innerHTML = `
                    <h4>${item.school || ''}</h4>
                    <p>${item.degree || ''}</p>
                    <div class="em-year">${item.duration || ''}</div>
                `;
                eduPreview.appendChild(div);
            });
        }

        if (sec.type === 'award' && awardPreview) {
            const pill = document.createElement('div');
            pill.className = 'em-pill';
            pill.textContent = sec.title || 'Award';
            awardPreview.appendChild(pill);

            (sec.items || []).forEach(item => {
                const div = document.createElement('div');
                div.className = 'em-award-item';
                div.innerHTML = `
                    <h4>${item.title || ''}</h4>
                    <p>${item.detail || ''}${item.year ? ' | ' + item.year : ''}</p>
                `;
                awardPreview.appendChild(div);
            });
        }
    });
}

function refreshEmeraldEditor() {
    const container = document.getElementById('emerald-dynamic-sections');
    if (!container) return;
    container.innerHTML = '';

    state.emeraldSectionsList.forEach((sec, sIdx) => {
        const secDiv = document.createElement('div');
        secDiv.style.cssText = 'background:#fff; padding:12px; border-radius:8px; border:1px solid #e2e8f0; margin-bottom:15px;';

        let controls = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; gap:8px; flex-wrap:wrap;">
                <input type="text" value="${sec.title}" 
                    oninput="state.emeraldSectionsList[${sIdx}].title=this.value; renderEmeraldTemplate(state);"
                    style="font-weight:700; font-size:13px; border:1px solid #cbd5e1; padding:4px 8px; border-radius:4px; background:white; color:#064e3b; flex:1; min-width:120px;"
                    placeholder="Section Heading">
                <div style="display:flex; gap:8px; align-items:center;">
                    <label style="font-size:11px; color:#64748b; cursor:pointer; display:flex; align-items:center; gap:2px;">
                        <input type="checkbox" ${sec.visible ? 'checked' : ''} 
                            onchange="state.emeraldSectionsList[${sIdx}].visible=this.checked; renderEmeraldTemplate(state);"> Visible
                    </label>
                    <button type="button" onclick="duplicateEmeraldSection(${sIdx})"
                        style="background:#10b981; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:600; font-size:11px;">Clone</button>
                    <button type="button" onclick="state.emeraldSectionsList.splice(${sIdx},1); refreshEmeraldEditor(); renderEmeraldTemplate(state);"
                        style="background:#ef4444; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:600; font-size:11px;">Delete</button>
                </div>
            </div>
        `;

        let body = '';

        if (sec.type === 'experience') {
            body = `<div style="display:flex; justify-content:flex-end; margin-bottom:6px;">
                <button type="button" onclick="addEmeraldItem(${sIdx})"
                    style="background:#064e3b; color:white; border:none; padding:2px 8px; border-radius:4px; cursor:pointer; font-size:11px;">+ Add Experience</button>
            </div>`;
            (sec.items || []).forEach((item, iIdx) => {
                body += `
                    <div style="background:#f0fdf4; padding:8px; border-radius:6px; margin-bottom:6px;">
                        <input type="text" placeholder="Role" value="${item.role || ''}"
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].role=this.value; renderEmeraldTemplate(state);">
                        <input type="text" placeholder="Company" value="${item.company || ''}"
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].company=this.value; renderEmeraldTemplate(state);">
                        <input type="text" placeholder="Duration" value="${item.duration || ''}"
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].duration=this.value; renderEmeraldTemplate(state);">
                        <textarea placeholder="Bullet points (one per line)" rows="2"
                            style="width:100%; padding:5px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; font-family:inherit;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].bullets=this.value; renderEmeraldTemplate(state);">${item.bullets || ''}</textarea>
                        <button type="button" onclick="state.emeraldSectionsList[${sIdx}].items.splice(${iIdx},1); refreshEmeraldEditor(); renderEmeraldTemplate(state);"
                            style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer; margin-top:4px;">Delete</button>
                    </div>
                `;
            });
        }

        if (sec.type === 'education') {
            body = `<div style="display:flex; justify-content:flex-end; margin-bottom:6px;">
                <button type="button" onclick="addEmeraldItem(${sIdx})"
                    style="background:#064e3b; color:white; border:none; padding:2px 8px; border-radius:4px; cursor:pointer; font-size:11px;">+ Add Education</button>
            </div>`;
            (sec.items || []).forEach((item, iIdx) => {
                body += `
                    <div style="background:#f0fdf4; padding:8px; border-radius:6px; margin-bottom:6px;">
                        <input type="text" placeholder="School / University" value="${item.school || ''}"
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].school=this.value; renderEmeraldTemplate(state);">
                        <input type="text" placeholder="Degree" value="${item.degree || ''}"
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].degree=this.value; renderEmeraldTemplate(state);">
                        <input type="text" placeholder="Duration" value="${item.duration || ''}"
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].duration=this.value; renderEmeraldTemplate(state);">
                        <button type="button" onclick="state.emeraldSectionsList[${sIdx}].items.splice(${iIdx},1); refreshEmeraldEditor(); renderEmeraldTemplate(state);"
                            style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer;">Delete</button>
                    </div>
                `;
            });
        }

        if (sec.type === 'skills') {
            body = `<div style="display:flex; justify-content:flex-end; margin-bottom:6px;">
                <button type="button" onclick="addEmeraldItem(${sIdx})"
                    style="background:#064e3b; color:white; border:none; padding:2px 8px; border-radius:4px; cursor:pointer; font-size:11px;">+ Add Skill</button>
            </div>`;
            (sec.items || []).forEach((item, iIdx) => {
                body += `
                    <div style="display:flex; gap:6px; align-items:center; background:#f0fdf4; padding:6px; border-radius:4px; margin-bottom:4px;">
                        <input type="text" value="${item.name || ''}" placeholder="Skill name"
                            style="flex:1; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; min-width:0;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].name=this.value; renderEmeraldTemplate(state);">
                        <input type="number" min="0" max="100" value="${item.level || 70}" title="Level %"
                            style="width:55px; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].level=Number(this.value); renderEmeraldTemplate(state);">
                        <button type="button" onclick="state.emeraldSectionsList[${sIdx}].items.splice(${iIdx},1); refreshEmeraldEditor(); renderEmeraldTemplate(state);"
                            style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer;">×</button>
                    </div>
                `;
            });
        }

        if (sec.type === 'award') {
            body = `<div style="display:flex; justify-content:flex-end; margin-bottom:6px;">
                <button type="button" onclick="addEmeraldItem(${sIdx})"
                    style="background:#064e3b; color:white; border:none; padding:2px 8px; border-radius:4px; cursor:pointer; font-size:11px;">+ Add Award</button>
            </div>`;
            (sec.items || []).forEach((item, iIdx) => {
                body += `
                    <div style="background:#f0fdf4; padding:8px; border-radius:6px; margin-bottom:6px;">
                        <input type="text" placeholder="Award Title" value="${item.title || ''}"
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].title=this.value; renderEmeraldTemplate(state);">
                        <input type="text" placeholder="Detail" value="${item.detail || ''}"
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].detail=this.value; renderEmeraldTemplate(state);">
                        <input type="text" placeholder="Year" value="${item.year || ''}"
                            style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;"
                            oninput="state.emeraldSectionsList[${sIdx}].items[${iIdx}].year=this.value; renderEmeraldTemplate(state);">
                        <button type="button" onclick="state.emeraldSectionsList[${sIdx}].items.splice(${iIdx},1); refreshEmeraldEditor(); renderEmeraldTemplate(state);"
                            style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer;">Delete</button>
                    </div>
                `;
            });
        }

        secDiv.innerHTML = controls + body;
        container.appendChild(secDiv);
    });
}

function duplicateEmeraldSection(index) {
    const original = state.emeraldSectionsList[index];
    const clone = {
        id: 'sec_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        type: original.type,
        title: original.title + ' (Copy)',
        visible: original.visible,
        items: JSON.parse(JSON.stringify(original.items || []))
    };
    state.emeraldSectionsList.splice(index + 1, 0, clone);
    refreshEmeraldEditor();
    renderEmeraldTemplate(state);
}

function addEmeraldItem(secIdx) {
    const sec = state.emeraldSectionsList[secIdx];
    if (sec.type === 'experience') {
        sec.items.push({ role: '', company: '', duration: '', bullets: '' });
    } else if (sec.type === 'education') {
        sec.items.push({ degree: '', school: '', duration: '' });
    } else if (sec.type === 'skills') {
        sec.items.push({ name: 'New Skill', level: 70 });
    } else if (sec.type === 'award') {
        sec.items.push({ title: '', detail: '', year: '' });
    }
    refreshEmeraldEditor();
    renderEmeraldTemplate(state);
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
window.addEmeraldItem = addEmeraldItem;

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

// Mobile pe default: Editor dikhao, Preview chhupao
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 820) {
        emSwitchMobileTab('editor');
    }
});