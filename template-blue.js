function renderBlueTemplate(state) {
    if (!state.blueSectionsList) {
        state.blueSectionsList = [
            { id: 'sec_' + Date.now() + '_1', type: 'summary', title: "Professional Summary", visible: true, placement: 'main', value: "Passionate Frontend Developer and UI Designer based in Sargodha, Pakistan. Specialized in building clean, responsive user interfaces using HTML, CSS, Vanilla JavaScript, and Bootstrap." },
            { id: 'sec_' + Date.now() + '_2', type: 'experience', title: "Work Experience", visible: true, placement: 'main', items: [{ role: "Senior Frontend Developer", company: "TechCraft Solutions, Pakistan", duration: "2024 - Present", desc: "Developed and maintained responsive web applications, optimized UI/UX elements, and managed client-side performance layout metrics." }] },
            { id: 'sec_' + Date.now() + '_3', type: 'education', title: "Education", visible: true, placement: 'main', items: [{ degree: "Bachelors in Computer Science", school: "University of Sargodha", duration: "2022 - 2026" }] },
            { id: 'sec_' + Date.now() + '_4', type: 'skills', title: "Key Skills", visible: true, placement: 'sidebar', items: [{ name: "HTML5 & CSS3" }, { name: "Vanilla JavaScript" }, { name: "Bootstrap 5" }, { name: "UI/UX Design" }, { name: "Git & GitHub" }] },
            { id: 'sec_' + Date.now() + '_5', type: 'languages', title: "Languages", visible: true, placement: 'sidebar', items: [{ name: "English (Professional)" }, { name: "Urdu (Native)" }, { name: "Punjabi" }] }
        ];

        state.resumeData = {
            name: "Anar Abbas",
            title: "Frontend Web Developer & UI Designer",
            email: "nimramumtaaz16@gmail.com",
            phone: "+92 300 1234567"
        };

        refreshEditorFields();
    }

    const els = {
        name: document.getElementById('p-blue-name'),
        title: document.getElementById('p-blue-title'),
        email: document.getElementById('p-blue-email'),
        phone: document.getElementById('p-blue-phone')
    };

    if (els.name) els.name.textContent = state.resumeData.name;
    if (els.title) els.title.textContent = state.resumeData.title.toUpperCase();
    if (els.email) els.email.textContent = state.resumeData.email;
    if (els.phone) els.phone.textContent = state.resumeData.phone;

    const mainPreview = document.getElementById('blue-main-preview');
    const sidebarPreview = document.getElementById('blue-sidebar-preview');

    if (mainPreview) mainPreview.innerHTML = '';
    if (sidebarPreview) sidebarPreview.innerHTML = '';

    state.blueSectionsList.forEach(sec => {
        if (!sec.visible) return;

        const targetContainer = sec.placement === 'sidebar' ? sidebarPreview : mainPreview;
        if (!targetContainer) return;

        const sectionHTML = document.createElement('section');
        sectionHTML.style.marginBottom = "20px";

        if (sec.title.trim() !== "") {
            const h2 = document.createElement('h2');
            if (sec.placement === 'sidebar') {
                h2.style.fontSize = "14px";
                h2.style.marginTop = "0";
                h2.style.textTransform = "uppercase";
            }
            h2.textContent = sec.title;
            sectionHTML.appendChild(h2);
        }

        const contentDiv = document.createElement('div');

        if (sec.type === 'summary') {
            contentDiv.style.fontSize = "14px";
            contentDiv.style.color = "#334155";
            contentDiv.style.lineHeight = "1.6";
            contentDiv.style.textAlign = "justify";
            contentDiv.style.whiteSpace = "pre-line";
            contentDiv.textContent = sec.value || '';
        } 
        else if (sec.type === 'experience') {
            sec.items.forEach(exp => {
                const item = document.createElement('div');
                item.style.marginBottom = "15px";
                item.innerHTML = `
                    <div style="display:flex; justify-content:space-between; font-weight:700; color:#0f172a; font-size:15px;">
                        <span>${exp.role || ''}</span>
                        <span style="font-weight:400; color:#64748b; font-size:13px;">${exp.duration || ''}</span>
                    </div>
                    <div style="color:#2563eb; font-size:14px; margin-bottom:4px; font-weight:500;">${exp.company || ''}</div>
                    <p style="margin:0; font-size:14px; color:#475569; line-height:1.5; white-space: pre-line;">${exp.desc || ''}</p>
                `;
                contentDiv.appendChild(item);
            });
        } 
        else if (sec.type === 'education') {
            sec.items.forEach(edu => {
                const item = document.createElement('div');
                item.style.marginBottom = "12px";
                item.innerHTML = `
                    <div style="display:flex; justify-content:space-between; font-weight:700; color:#0f172a; font-size:15px;">
                        <span>${edu.degree || ''}</span>
                        <span style="font-weight:400; color:#64748b; font-size:13px;">${edu.duration || ''}</span>
                    </div>
                    <div style="color:#475569; font-size:14px;">${edu.school || ''}</div>
                `;
                contentDiv.appendChild(item);
            });
        } 
        else if (sec.type === 'skills' || sec.type === 'languages') {
            if (sec.placement === 'sidebar') {
                sec.items.forEach(i => {
                    if (i.name) {
                        const div = document.createElement('div');
                        div.style.background = "white"; div.style.padding = "8px 12px"; div.style.margin = "8px 0";
                        div.style.borderRadius = "6px"; div.style.border = "1px solid #cbd5e1"; div.style.fontSize = "14px";
                        div.style.color = "#1e293b"; div.style.boxShadow = "0 1px 2px rgba(0,0,0,0.02)";
                        div.textContent = i.name;
                        contentDiv.appendChild(div);
                    }
                });
            } else {
                contentDiv.style.display = "flex"; contentDiv.style.flexWrap = "wrap"; contentDiv.style.gap = "8px";
                sec.items.forEach(i => {
                    if (i.name) {
                        const span = document.createElement('span');
                        span.style.background = "#f1f5f9"; span.style.padding = "4px 10px"; span.style.borderRadius = "4px";
                        span.style.fontSize = "13px"; span.style.border = "1px solid #e2e8f0";
                        span.textContent = i.name;
                        contentDiv.appendChild(span);
                    }
                });
            }
        }

        sectionHTML.appendChild(contentDiv);
        targetContainer.appendChild(sectionHTML);
    });
}

function refreshEditorFields() {
    const container = document.getElementById('dynamic-editor-sections');
    if (!container) return;
    container.innerHTML = '';

    state.blueSectionsList.forEach((sec, sIdx) => {
        const secDiv = document.createElement('div');
        secDiv.style.background = "#ffffff";
        secDiv.style.padding = "12px";
        secDiv.style.borderRadius = "8px";
        secDiv.style.border = "1px solid #e2e8f0";
        secDiv.style.marginBottom = "15px";

        let controlsHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; gap:8px; flex-wrap:wrap;">
                <input type="text" value="${sec.title}" oninput="state.blueSectionsList[${sIdx}].title = this.value; renderBlueTemplate(state);" style="font-weight:700; font-size:13px; border:1px solid #cbd5e1; padding:4px 8px; border-radius:4px; background:white; color:#1e3a8a; text-transform:uppercase; flex:1; min-width:120px;" placeholder="Section Heading">
                <div style="display:flex; gap:8px; align-items:center;">
                    <select onchange="state.blueSectionsList[${sIdx}].placement = this.value; renderBlueTemplate(state);" style="font-size:11px; padding:4px; border-radius:4px; border:1px solid #cbd5e1;">
                        <option value="main" ${sec.placement === 'main' ? 'selected' : ''}>Main</option>
                        <option value="sidebar" ${sec.placement === 'sidebar' ? 'selected' : ''}>Sidebar</option>
                    </select>
                    <label style="font-size:11px; color:#64748b; cursor:pointer; display:flex; align-items:center; gap:2px;"><input type="checkbox" ${sec.visible ? 'checked' : ''} onchange="state.blueSectionsList[${sIdx}].visible = this.checked; renderBlueTemplate(state);"> Visible</label>
                    <button type="button" onclick="duplicateSection(${sIdx})" style="background:#10b981; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:600; font-size:11px;">Clone Section</button>
                    <button type="button" onclick="state.blueSectionsList.splice(${sIdx},1); refreshEditorFields(); renderBlueTemplate(state);" style="background:#ef4444; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:600; font-size:11px;">Delete Sec</button>
                </div>
            </div>
        `;

        let bodyHTML = '';

        if (sec.type === 'summary') {
            bodyHTML = `<textarea style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:6px; resize:vertical; font-family:inherit; box-sizing:border-box; font-size:13px;" rows="3" oninput="state.blueSectionsList[${sIdx}].value = this.value; renderBlueTemplate(state);">${sec.value || ''}</textarea>`;
        } 
        else if (sec.type === 'experience') {
            bodyHTML = `<div style="display:flex; justify-content:flex-end; margin-bottom:6px;"><button type="button" onclick="addDynamicItem(${sIdx})" style="background:#1e3a8a; color:white; border:none; padding:2px 8px; border-radius:4px; cursor:pointer; font-size:11px;">+ Add Work</button></div>`;
            sec.items.forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="background:#f1f5f9; padding:8px; border-radius:6px; margin-bottom:6px; position:relative;">
                        <input type="text" placeholder="Role/Title" value="${item.role || ''}" style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="state.blueSectionsList[${sIdx}].items[${itemIdx}].role=this.value; renderBlueTemplate(state);">
                        <input type="text" placeholder="Company" value="${item.company || ''}" style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="state.blueSectionsList[${sIdx}].items[${itemIdx}].company=this.value; renderBlueTemplate(state);">
                        <input type="text" placeholder="Duration" value="${item.duration || ''}" style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="state.blueSectionsList[${sIdx}].items[${itemIdx}].duration=this.value; renderBlueTemplate(state);">
                        <textarea placeholder="Description" style="width:100%; padding:5px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; font-family:inherit;" oninput="state.blueSectionsList[${sIdx}].items[${itemIdx}].desc=this.value; renderBlueTemplate(state);">${item.desc || ''}</textarea>
                        <button type="button" onclick="state.blueSectionsList[${sIdx}].items.splice(${itemIdx},1); refreshEditorFields(); renderBlueTemplate(state);" style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer; margin-top:4px;">Delete</button>
                    </div>
                `;
            });
        } 
        else if (sec.type === 'education') {
            bodyHTML = `<div style="display:flex; justify-content:flex-end; margin-bottom:6px;"><button type="button" onclick="addDynamicItem(${sIdx})" style="background:#1e3a8a; color:white; border:none; padding:2px 8px; border-radius:4px; cursor:pointer; font-size:11px;">+ Add Edu</button></div>`;
            sec.items.forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="background:#f1f5f9; padding:8px; border-radius:6px; margin-bottom:6px;">
                        <input type="text" placeholder="Degree" value="${item.degree || ''}" style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="state.blueSectionsList[${sIdx}].items[${itemIdx}].degree=this.value; renderBlueTemplate(state);">
                        <input type="text" placeholder="School" value="${item.school || ''}" style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="state.blueSectionsList[${sIdx}].items[${itemIdx}].school=this.value; renderBlueTemplate(state);">
                        <input type="text" placeholder="Duration" value="${item.duration || ''}" style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="state.blueSectionsList[${sIdx}].items[${itemIdx}].duration=this.value; renderBlueTemplate(state);">
                        <button type="button" onclick="state.blueSectionsList[${sIdx}].items.splice(${itemIdx},1); refreshEditorFields(); renderBlueTemplate(state);" style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer;">Delete</button>
                    </div>
                `;
            });
        } 
        else if (sec.type === 'skills' || sec.type === 'languages') {
            bodyHTML = `<div style="display:flex; justify-content:flex-end; margin-bottom:6px;"><button type="button" onclick="addDynamicItem(${sIdx})" style="background:#1e3a8a; color:white; border:none; padding:2px 8px; border-radius:4px; cursor:pointer; font-size:11px;">+ Add Item</button></div>`;
            bodyHTML += `<div style="display:grid; grid-template-columns: 1fr 1fr; gap:6px;">`;
            sec.items.forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="display:flex; gap:4px; align-items:center; background:#f1f5f9; padding:4px; border-radius:4px;">
                        <input type="text" value="${item.name || ''}" style="flex:1; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; min-width:0;" oninput="state.blueSectionsList[${sIdx}].items[${itemIdx}].name=this.value; renderBlueTemplate(state);">
                        <button type="button" onclick="state.blueSectionsList[${sIdx}].items.splice(${itemIdx},1); refreshEditorFields(); renderBlueTemplate(state);" style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer;">×</button>
                    </div>
                `;
            });
            bodyHTML += `</div>`;
        }

        secDiv.innerHTML = controlsHTML + bodyHTML;
        container.appendChild(secDiv);
    });
}

function duplicateSection(index) {
    const original = state.blueSectionsList[index];
    const clone = {
        id: 'sec_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        type: original.type,
        title: original.title + " (Copy)",
        visible: original.visible,
        placement: original.placement
    };

    if (original.type === 'summary') {
        clone.value = original.value;
    } else {
        clone.items = JSON.parse(JSON.stringify(original.items));
    }

    state.blueSectionsList.splice(index + 1, 0, clone);
    refreshEditorFields();
    renderBlueTemplate(state);
}

function addDynamicItem(secIdx) {
    const sec = state.blueSectionsList[secIdx];
    if (sec.type === 'experience') {
        sec.items.push({ role: '', company: '', duration: '', desc: '' });
    } else if (sec.type === 'education') {
        sec.items.push({ degree: '', school: '', duration: '' });
    } else if (sec.type === 'skills' || sec.type === 'languages') {
        sec.items.push({ name: 'New Item' });
    }
    refreshEditorFields();
    renderBlueTemplate(state);
}

document.addEventListener('input', (e) => {
    if (!e.target) return;
    if (e.target.id === 'blue-name') state.resumeData.name = e.target.value;
    if (e.target.id === 'blue-title') state.resumeData.title = e.target.value;
    if (e.target.id === 'blue-email') state.resumeData.email = e.target.value;
    if (e.target.id === 'blue-phone') state.resumeData.phone = e.target.value;
    if (state.currentTemplate === 'blue') renderBlueTemplate(state);
});

window.renderBlueTemplate = renderBlueTemplate;
window.duplicateSection = duplicateSection;
window.refreshEditorFields = refreshEditorFields;
window.addDynamicItem = addDynamicItem;

function downloadBluePDF() {
    const element = document.querySelector('.cv-blue-content'); //[cite: 9, 10]
    if (!element) {
        alert("Preview element not found!");
        return;
    }

    const opt = {
        margin:       0,
        filename:     (state.resumeData.name || 'Resume') + '_CV.pdf', //[cite: 11]
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            useCORS: true,
            scrollY: 0,          // Yeh line ooper ki extra space ko khatam karegi
            scrollX: 0
        },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Safe render download aur scroll resetting
    const currentScroll = window.scrollY;
    window.scrollTo(0, 0);

    html2pdf().set(opt).from(element).save().then(() => {
        window.scrollTo(0, currentScroll); // Download ke baad screen wapis apni jagah le aayein
    });
}

window.downloadBluePDF = downloadBluePDF;

document.getElementById('btn-download-pdf')?.addEventListener('click', () => {
    if (state.currentTemplate === 'blue') {
        window.downloadBluePDF();
    }
});