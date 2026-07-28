// Local self-contained schema optimized exactly like Blue Template structure
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
        { id: 'tsec_sum', type: 'summary', title: "About Me", visible: true, placement: 'main', value: "Experienced graphic designer with 8 years of experience. Excited to help your company expand social media engagement with captivating content, video and static assets." },
        { id: 'tsec_edu', type: 'education', title: "Education", visible: true, placement: 'main', items: [{ year: "2010 - 2012", institute: "University of Keithston.", degree: "Bachelor Of Design" }, { year: "2013 - 2015", institute: "University of Keithston.", degree: "Master Of Design" }] },
        { id: 'tsec_exp', type: 'experience', title: "Work Experience", visible: true, placement: 'main', items: [{ role: "Layout Designer", company: "Liconic & Co.", duration: "2011 - 2015", details: "Working with the video development team.\nManage website design, content, and SEO Marketing.\nBranding and Logo Design" }] },
        { id: 'tsec_skills', type: 'skills', title: "Skills", visible: true, placement: 'sidebar', items: [{ name: "Photography", level: 90 }, { name: "Web Design", level: 85 }, { name: "Video Editing", level: 80 }] }
    ]
};

// Target rendering function (Optimized to NOT rebuild dynamic fields on every keystroke)
function renderTeal(shouldRefreshEditor = false) {
    console.log("=== RENDERING TEAL TEMPLATE ===");
    console.log("Current State:", JSON.stringify(tealLocalState.resumeData));
    
    try {
        // --- A. Sync Standard Contact Inputs ---
        const inputName = document.getElementById('teal-input-name');
        if (inputName) inputName.value = tealLocalState.resumeData.name;
        const inputTitle = document.getElementById('teal-input-title');
        if (inputTitle) inputTitle.value = tealLocalState.resumeData.title;
        const inputPhone = document.getElementById('teal-input-phone');
        if (inputPhone) inputPhone.value = tealLocalState.resumeData.phone;
        const inputEmail = document.getElementById('teal-input-email');
        if (inputEmail) inputEmail.value = tealLocalState.resumeData.email;
        const inputWebsite = document.getElementById('teal-input-website');
        if (inputWebsite) inputWebsite.value = tealLocalState.resumeData.website;
        const inputAddress = document.getElementById('teal-input-address');
        if (inputAddress) inputAddress.value = tealLocalState.resumeData.address;

        // --- B. Draw Header/Static Views ---
        const nameEl = document.getElementById('teal-p-name');
        if (nameEl) {
            nameEl.textContent = tealLocalState.resumeData.name;
            console.log("Updated Name Preview:", nameEl.textContent);
        }
        const titleEl = document.getElementById('teal-p-title');
        if (titleEl) {
            titleEl.textContent = (tealLocalState.resumeData.title || '').toUpperCase();
            console.log("Updated Profession Preview:", titleEl.textContent);
        }

        const photoImg = document.getElementById('teal-p-img');
        const placeholder = document.getElementById('teal-p-placeholder');
        if (photoImg) {
            if (tealLocalState.resumeData.photo && tealLocalState.resumeData.photo.trim() !== '') {
                photoImg.src = tealLocalState.resumeData.photo;
                photoImg.style.display = 'block';
                if (placeholder) placeholder.style.display = 'none';
            } else {
                photoImg.style.display = 'none';
                if (placeholder) placeholder.style.display = 'flex';
            }
        }

        const contactTarget = document.getElementById('teal-contact-target');
        if (contactTarget) {
            contactTarget.innerHTML = `
                <p><span class="icon">📞</span> <span>${tealLocalState.resumeData.phone || ''}</span></p>
                <p><span class="icon">✉</span> <span>${tealLocalState.resumeData.email || ''}</span></p>
                <p><span class="icon">🌐</span> <span>${tealLocalState.resumeData.website || ''}</span></p>
                <p><span class="icon">📍</span> <span>${tealLocalState.resumeData.address || ''}</span></p>
            `;
            console.log("Updated Contact Info Area");
        }

        // --- C. Clear Dynamic Target Containers ---
        const mainContainer = document.getElementById('teal-main-sections-container');
        const sidebarContainer = document.getElementById('teal-sidebar-sections-container');
        if (mainContainer) mainContainer.innerHTML = '';
        if (sidebarContainer) sidebarContainer.innerHTML = '';

        // --- D. Render Interactive Sections Loop ---
        tealLocalState.sectionsList.forEach(sec => {
            if (!sec.visible) return;

            const target = sec.placement === 'sidebar' ? sidebarContainer : mainContainer;
            if (!target) return;

            const sectionEl = document.createElement('div');
            sectionEl.style.marginBottom = "22px";

            // Headers styles match exactly depending on side placement
            if (sec.title.trim() !== '') {
                const header = document.createElement('div');
                if (sec.placement === 'sidebar') {
                    header.className = 'teal-side-tab';
                } else {
                    header.className = 'teal-main-header';
                }
                header.textContent = sec.title.toUpperCase();
                sectionEl.appendChild(header);
            }

            const contentEl = document.createElement('div');

            // 1. Render Summary Type
            if (sec.type === 'summary') {
                contentEl.className = 'teal-about';
                contentEl.innerHTML = `<p style="white-space: pre-line;">${sec.value || ''}</p>`;
            } 
            // 2. Render Education Type
            else if (sec.type === 'education') {
                const grid = document.createElement('div');
                grid.className = 'teal-edu-grid';
                sec.items.forEach(edu => {
                    grid.innerHTML += `
                        <div class="teal-edu-item">
                            <div class="teal-edu-date">${edu.year || ''}</div>
                            <strong>${edu.institute || ''}</strong><br>
                            <span>${edu.degree || ''}</span>
                        </div>
                    `;
                });
                contentEl.appendChild(grid);
            } 
            // 3. Render Experience Type
            else if (sec.type === 'experience') {
                const timeline = document.createElement('div');
                timeline.className = 'teal-exp-timeline';
                sec.items.forEach(exp => {
                    const lines = (exp.details || '').split('\n').filter(l => l.trim());
                    const linesHTML = lines.map(line => `<li>${line.trim()}</li>`).join('');
                    timeline.innerHTML += `
                        <div class="teal-exp-item">
                            <div class="teal-exp-role">${exp.role || ''}</div>
                            <div class="teal-exp-meta">${exp.company || ''} | ${exp.duration || ''}</div>
                            <ul class="teal-exp-details">${linesHTML}</ul>
                        </div>
                    `;
                });
                contentEl.appendChild(timeline);
            } 
            // 4. Render Skills Type
            else if (sec.type === 'skills') {
                sec.items.forEach(skill => {
                    const levelVal = parseInt(skill.level) || 0;
                    contentEl.innerHTML += `
                        <div class="teal-skill-item">
                            <div class="teal-skill-label" style="display:flex; justify-content:space-between; width:100%; font-size:12px;">
                                <span>${skill.name || ''}</span>
                                <span style="opacity:0.7;">${levelVal}%</span>
                            </div>
                            <div class="teal-skill-bar" style="margin-top:3px;">
                                <div class="teal-skill-progress" style="width: ${levelVal}%"></div>
                            </div>
                        </div>
                    `;
                });
            }

            sectionEl.appendChild(contentEl);
            target.appendChild(sectionEl);
        });

        // Editor inputs tabhi rebuild honge jab Section add, delete, clone ya page init hoga. Keypress par nahi!
        if (shouldRefreshEditor) {
            console.log("Rebuilding Editor dynamic fields...");
            refreshTealEditorFields();
        }

        // AUTO-BINDING LOGIC: Har baar rendering hone par bindings check and apply ho jayengi safely!
        applyStaticBindingsDirectly();

    } catch (err) {
        console.error("Rendering critical error: ", err);
    }
}

// Static inputs par direct bina delay aur listener break kiye handlers apply karna
function applyStaticBindingsDirectly() {
    console.log("Directly checking and applying static bindings...");

    // 1. Photo Input Bind
    const fileInput = document.getElementById('teal-input-file');
    if (fileInput && !fileInput.dataset.bound) {
        console.log("✅ Photo Input Bound Successfully!");
        fileInput.onchange = function(e) {
            console.log("Image change event triggered!");
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    tealLocalState.resumeData.photo = evt.target.result;
                    renderTeal(false);
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.dataset.bound = "true";
    }

    // 2. Contact & Identity Inputs Bind
    const inputs = [
        { id: 'teal-input-name', key: 'name' },
        { id: 'teal-input-title', key: 'title' },
        { id: 'teal-input-phone', key: 'phone' },
        { id: 'teal-input-email', key: 'email' },
        { id: 'teal-input-website', key: 'website' },
        { id: 'teal-input-address', key: 'address' }
    ];

    inputs.forEach(item => {
        const inputEl = document.getElementById(item.id);
        if (inputEl && !inputEl.dataset.bound) {
            console.log(`✅ Static Input Bound Successfully: ${item.id}`);
            inputEl.oninput = function(e) {
                const val = e.target.value;
                console.log(`✍️ Static Type [${item.key}]: ${val}`);
                tealLocalState.resumeData[item.key] = val;
                renderTeal(false); // Live UI update karega bina dynamic panel rebuild kiye
            };
            inputEl.dataset.bound = "true";
        }
    });
}

// Draw and update inputs in layout forms with duplicate/remove handles
function refreshTealEditorFields() {
    const container = document.getElementById('teal-dynamic-editor-sections');
    if (!container) return;
    container.innerHTML = '';

    tealLocalState.sectionsList.forEach((sec, sIdx) => {
        const secDiv = document.createElement('div');
        secDiv.style.background = "#f8fafc";
        secDiv.style.padding = "12px";
        secDiv.style.borderRadius = "8px";
        secDiv.style.border = "1px solid #cbd5e1";
        secDiv.style.marginBottom = "15px";

        let controlsHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; gap:8px; flex-wrap:wrap;">
                <input type="text" value="${sec.title}" oninput="tealLocalState.sectionsList[${sIdx}].title = this.value; renderTeal(false);" style="font-weight:700; font-size:13px; border:1px solid #cbd5e1; padding:4px 8px; border-radius:4px; background:white; color:#3d5c78; text-transform:uppercase; flex:1; min-width:120px;" placeholder="Section Heading">
                <div style="display:flex; gap:8px; align-items:center;">
                    <select onchange="tealLocalState.sectionsList[${sIdx}].placement = this.value; renderTeal(true);" style="font-size:11px; padding:4px; border-radius:4px; border:1px solid #cbd5e1;">
                        <option value="main" ${sec.placement === 'main' ? 'selected' : ''}>Main</option>
                        <option value="sidebar" ${sec.placement === 'sidebar' ? 'selected' : ''}>Sidebar</option>
                    </select>
                    <label style="font-size:11px; color:#64748b; cursor:pointer; display:flex; align-items:center; gap:2px;"><input type="checkbox" ${sec.visible ? 'checked' : ''} onchange="tealLocalState.sectionsList[${sIdx}].visible = this.checked; renderTeal(true);"> Visible</label>
                    <button type="button" onclick="duplicateTealSection(${sIdx})" style="background:#10b981; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:600; font-size:11px;">Clone</button>
                    <button type="button" onclick="tealLocalState.sectionsList.splice(${sIdx},1); renderTeal(true);" style="background:#ef4444; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:600; font-size:11px;">Delete</button>
                </div>
            </div>
        `;

        let bodyHTML = '';

        if (sec.type === 'summary') {
            bodyHTML = `<textarea style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:6px; resize:vertical; font-family:inherit; box-sizing:border-box; font-size:13px;" rows="3" oninput="tealLocalState.sectionsList[${sIdx}].value = this.value; renderTeal(false);">${sec.value || ''}</textarea>`;
        } 
        else if (sec.type === 'experience') {
            bodyHTML = `<div style="display:flex; justify-content:flex-end; margin-bottom:6px;"><button type="button" onclick="addTealDynamicItem(${sIdx})" style="background:#3d5c78; color:white; border:none; padding:2px 8px; border-radius:4px; cursor:pointer; font-size:11px;">+ Add Work</button></div>`;
            sec.items.forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="background:#ffffff; padding:8px; border-radius:6px; margin-bottom:6px; border:1px solid #e2e8f0; position:relative;">
                        <input type="text" placeholder="Role/Title" value="${item.role || ''}" style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].role=this.value; renderTeal(false);">
                        <input type="text" placeholder="Company" value="${item.company || ''}" style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].company=this.value; renderTeal(false);">
                        <input type="text" placeholder="Duration" value="${item.duration || ''}" style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].duration=this.value; renderTeal(false);">
                        <textarea placeholder="Description" style="width:100%; padding:5px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; font-family:inherit;" oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].details=this.value; renderTeal(false);">${item.details || ''}</textarea>
                        <button type="button" onclick="tealLocalState.sectionsList[${sIdx}].items.splice(${itemIdx},1); renderTeal(true);" style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer; margin-top:4px;">Delete</button>
                    </div>
                `;
            });
        } 
        else if (sec.type === 'education') {
            bodyHTML = `<div style="display:flex; justify-content:flex-end; margin-bottom:6px;"><button type="button" onclick="addTealDynamicItem(${sIdx})" style="background:#3d5c78; color:white; border:none; padding:2px 8px; border-radius:4px; cursor:pointer; font-size:11px;">+ Add Edu</button></div>`;
            sec.items.forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="background:#ffffff; padding:8px; border-radius:6px; margin-bottom:6px; border:1px solid #e2e8f0;">
                        <input type="text" placeholder="Degree" value="${item.degree || ''}" style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].degree=this.value; renderTeal(false);">
                        <input type="text" placeholder="School" value="${item.institute || ''}" style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].institute=this.value; renderTeal(false);">
                        <input type="text" placeholder="Duration" value="${item.year || ''}" style="width:100%; padding:5px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].year=this.value; renderTeal(false);">
                        <button type="button" onclick="tealLocalState.sectionsList[${sIdx}].items.splice(${itemIdx},1); renderTeal(true);" style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer;">Delete</button>
                    </div>
                `;
            });
        } 
        else if (sec.type === 'skills') {
            bodyHTML = `<div style="display:flex; justify-content:flex-end; margin-bottom:6px;"><button type="button" onclick="addTealDynamicItem(${sIdx})" style="background:#3d5c78; color:white; border:none; padding:2px 8px; border-radius:4px; cursor:pointer; font-size:11px;">+ Add Item</button></div>`;
            bodyHTML += `<div style="display:grid; grid-template-columns: 1fr; gap:6px;">`;
            sec.items.forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="display:flex; gap:4px; align-items:center; background:#ffffff; padding:6px; border-radius:4px; border:1px solid #e2e8f0;">
                        <input type="text" value="${item.name || ''}" placeholder="Skill name" style="flex:2; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; min-width:0;" oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].name=this.value; renderTeal(false);">
                        <input type="number" value="${item.level || 80}" placeholder="Level %" style="flex:1; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; min-width:0;" oninput="tealLocalState.sectionsList[${sIdx}].items[${itemIdx}].level=parseInt(this.value) || 0; renderTeal(false);">
                        <button type="button" onclick="tealLocalState.sectionsList[${sIdx}].items.splice(${itemIdx},1); renderTeal(true);" style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer;">×</button>
                    </div>
                `;
            });
            bodyHTML += `</div>`;
        }

        secDiv.innerHTML = controlsHTML + bodyHTML;
        container.appendChild(secDiv);
    });
}

// Clone Section
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
        clone.items = JSON.parse(JSON.stringify(original.items));
    }

    tealLocalState.sectionsList.splice(index + 1, 0, clone);
    renderTeal(true);
}

// Add Item
function addTealDynamicItem(secIdx) {
    const sec = tealLocalState.sectionsList[secIdx];
    if (sec.type === 'experience') {
        sec.items.push({ role: '', company: '', duration: '', details: '' });
    } else if (sec.type === 'education') {
        sec.items.push({ degree: '', institute: '', year: '' });
    } else if (sec.type === 'skills') {
        sec.items.push({ name: 'New Skill', level: 80 });
    }
    renderTeal(true);
}

// Sync Contact Details & Photo (Purana redundant initialization function)
function initTealBindings() {
    // Iski zaroorat ab nahi rahi, renderTeal automatic call kar leta hai, par back-compatibility ke liye khali rakha hai.
    console.log("Bindings handled automatically inside rendering flow.");
}

// Standard Render call adapter used by your main application thread
function renderTealTemplate(state) {
    console.log("Initializing Teal Template with external state:", state);
    if (state && state.resumeData && state.resumeData.name) {
        tealLocalState.resumeData.name = state.resumeData.name;
        tealLocalState.resumeData.title = state.resumeData.title;
        tealLocalState.resumeData.email = state.resumeData.email;
        tealLocalState.resumeData.phone = state.resumeData.phone;
        tealLocalState.resumeData.website = state.resumeData.website || '';
        tealLocalState.resumeData.address = state.resumeData.address || '';
        if (state.resumeData.photo) {
            tealLocalState.resumeData.photo = state.resumeData.photo;
        }
    }
    renderTeal(true);
}

// Download handler specifically optimized for template layouts
function downloadTealPDF() {
    const element = document.querySelector('.cv-teal-content');
    if (!element) return;

    const opt = {
        margin:       0,
        filename:     `${tealLocalState.resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: 0, scrollX: 0 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(element).save();
    } else {
        window.print();
    }
}

// Globally register execution templates
window.renderTealTemplate = renderTealTemplate;
window.downloadTealPDF = downloadTealPDF;
window.duplicateTealSection = duplicateTealSection;
window.addTealDynamicItem = addTealDynamicItem;

// ==========================================
// AUTO-BIND DOWNLOAD BUTTON FROM TEAL TEMPLATE
// ==========================================
(function() {
    function bindDownloadButton() {
        const downloadBtn = 
            document.getElementById('download-btn') || 
            document.querySelector('.btn-download') || 
            document.querySelector('button[id*="download"]') || 
            document.querySelector('button[class*="download"]');

        if (downloadBtn) {
            console.log("Teal Auto-Binder: Found download button, binding click event!", downloadBtn);
            
            downloadBtn.addEventListener('click', function(event) {
                const tealContainer = document.querySelector('.cv-teal-content');
                if (tealContainer && (tealContainer.offsetWidth > 0 || tealContainer.offsetHeight > 0)) {
                    console.log("Teal Auto-Binder: Triggering Teal PDF download...");
                    event.preventDefault();
                    event.stopPropagation();
                    
                    if (typeof window.downloadTealPDF === 'function') {
                        window.downloadTealPDF();
                    }
                }
            });
        } else {
            setTimeout(bindDownloadButton, 1000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindDownloadButton);
    } else {
        bindDownloadButton();
    }
})();