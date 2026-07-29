(function () {
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

    function injectMobileTabs() {
        if (document.getElementById('tmpl-mobile-tabs')) return;

        const mainLayout = document.querySelector('.app-layout-container');
        if (!mainLayout) return;

        const tabsBar = document.createElement('div');
        tabsBar.id = 'tmpl-mobile-tabs';
        tabsBar.className = 'tmpl-mobile-tabs-container';
        tabsBar.innerHTML = `
            <button id="tmpl-btn-tab-editor" class="tmpl-tab-btn active" onclick="window.tmplSwitchTab('editor')">✏️ Editor</button>
            <button id="tmpl-btn-tab-preview" class="tmpl-tab-btn" onclick="window.tmplSwitchTab('preview')">👁️ Preview</button>
        `;

        mainLayout.parentElement.insertBefore(tabsBar, mainLayout);
    }

    window.tmplSwitchTab = function (tab) {
        const editorPanel = document.querySelector('.left-editor-panel');
        const previewPanel = document.querySelector('.right-preview-panel');
        const btnEditor = document.getElementById('tmpl-btn-tab-editor');
        const btnPreview = document.getElementById('tmpl-btn-tab-preview');

        if (!editorPanel || !previewPanel) return;

        if (tab === 'editor') {
            editorPanel.classList.remove('mobile-hidden');
            previewPanel.classList.add('mobile-hidden');
            if (btnEditor) btnEditor.classList.add('active');
            if (btnPreview) btnPreview.classList.remove('active');
        } else {
            editorPanel.classList.add('mobile-hidden');
            previewPanel.classList.remove('mobile-hidden');
            if (btnPreview) btnPreview.classList.add('active');
            if (btnEditor) btnEditor.classList.remove('active');
            window.tmplAutoFitMobilePage();
        }
    };

    window.tmplAutoFitMobilePage = function () {
        const paperWrapper = document.querySelector('.paper-wrapper') || document.querySelector('.cv-page');
        const previewPanel = document.querySelector('.right-preview-panel');

        if (!paperWrapper || !previewPanel) return;

        if (window.innerWidth <= 820) {
            const containerWidth = previewPanel.clientWidth - 20;
            const pageWidth = paperWrapper.offsetWidth || 794;

            if (containerWidth < pageWidth && containerWidth > 0) {
                const scale = containerWidth / pageWidth;
                paperWrapper.style.transform = `scale(${scale})`;
                paperWrapper.style.transformOrigin = 'top center';
                paperWrapper.style.marginBottom = `-${(1123 * (1 - scale))}px`;
            } else {
                paperWrapper.style.transform = 'none';
                paperWrapper.style.marginBottom = '0';
            }
        } else {
            paperWrapper.style.transform = 'none';
            paperWrapper.style.marginBottom = '0';
        }
    };

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

        window.tmplAutoFitMobilePage();
    }

    function renderEditorPanel() {
        const container = document.getElementById('tmpl-dynamic-editor-sections');

        const nameInp = document.getElementById('tmpl-input-name');
        const titleInp = document.getElementById('tmpl-input-title');
        const phoneInp = document.getElementById('tmpl-input-phone');
        const emailInp = document.getElementById('tmpl-input-email');
        const photoInp = document.getElementById('tmpl-input-photo');

        if (nameInp) { nameInp.value = templateState.resumeData.name; nameInp.oninput = (e) => { templateState.resumeData.name = e.target.value; renderPreview(); }; }
        if (titleInp) { titleInp.value = templateState.resumeData.title; titleInp.oninput = (e) => { templateState.resumeData.title = e.target.value; renderPreview(); }; }
        if (phoneInp) { phoneInp.value = templateState.resumeData.phone; phoneInp.oninput = (e) => { templateState.resumeData.phone = e.target.value; renderPreview(); }; }
        if (emailInp) { emailInp.value = templateState.resumeData.email; emailInp.oninput = (e) => { templateState.resumeData.email = e.target.value; renderPreview(); }; }
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

            let itemsHTML = '';

            if (sec.type === 'profile') {
                itemsHTML = `
                    <div class="form-group">
                        <label>Summary / About Me</label>
                        <textarea rows="3" oninput="window.tmplUpdateSummary(this.value)" style="width:100%; font-size:13px; padding:6px;">${templateState.resumeData.summary || ''}</textarea>
                    </div>
                `;
            }
            else if (sec.type === 'skills') {
                templateState.skills.forEach((sk, i) => {
                    itemsHTML += `
                        <div style="display:flex; gap:6px; margin-bottom:6px; align-items:center; flex-wrap:wrap;">
                            <input type="text" value="${sk.name}" placeholder="Skill Name" oninput="window.tmplUpdateItem('skills', ${i}, 'name', this.value)" style="flex:1; font-size:13px; padding:6px; min-width:120px;">
                            <button onclick="window.tmplCloneItem('skills', ${i})" style="padding:6px 10px; font-size:12px; cursor:pointer;">📋</button>
                            <button onclick="window.tmplDeleteItem('skills', ${i})" style="padding:6px 10px; font-size:12px; color:red; cursor:pointer;">🗑️</button>
                        </div>
                    `;
                });
                itemsHTML += `<button onclick="window.tmplAddItem('skills')" style="width:100%; font-size:13px; padding:8px; margin-top:5px; cursor:pointer; background:#e2e8f0; border:1px solid #cbd5e1; border-radius:4px;">+ Add Skill</button>`;
            }
            else if (sec.type === 'experience') {
                templateState.experience.forEach((exp, i) => {
                    itemsHTML += `
                        <div style="border:1px dashed #cbd5e1; padding:8px; margin-bottom:8px; border-radius:4px; background:#fff;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:6px; flex-wrap:wrap; gap:4px;">
                                <strong style="font-size:12px; color:#475569;">Experience #${i + 1}</strong>
                                <div>
                                    <button onclick="window.tmplCloneItem('experience', ${i})" style="padding:4px 8px; font-size:12px; cursor:pointer;">📋 Clone</button>
                                    <button onclick="window.tmplDeleteItem('experience', ${i})" style="padding:4px 8px; font-size:12px; color:red; cursor:pointer;">🗑️</button>
                                </div>
                            </div>
                            <input type="text" value="${exp.company || ''}" placeholder="Company" oninput="window.tmplUpdateItem('experience', ${i}, 'company', this.value)" style="width:100%; font-size:13px; padding:6px; margin-bottom:4px;">
                            <input type="text" value="${exp.role || ''}" placeholder="Role / Designation" oninput="window.tmplUpdateItem('experience', ${i}, 'role', this.value)" style="width:100%; font-size:13px; padding:6px; margin-bottom:4px;">
                            <input type="text" value="${exp.duration || ''}" placeholder="Duration" oninput="window.tmplUpdateItem('experience', ${i}, 'duration', this.value)" style="width:100%; font-size:13px; padding:6px; margin-bottom:4px;">
                            <textarea rows="2" placeholder="Responsibilities" oninput="window.tmplUpdateItem('experience', ${i}, 'details', this.value)" style="width:100%; font-size:13px; padding:6px;">${exp.details || ''}</textarea>
                        </div>
                    `;
                });
                itemsHTML += `<button onclick="window.tmplAddItem('experience')" style="width:100%; font-size:13px; padding:8px; cursor:pointer; background:#e2e8f0; border:1px solid #cbd5e1; border-radius:4px;">+ Add Experience</button>`;
            }
            else if (sec.type === 'education') {
                templateState.education.forEach((edu, i) => {
                    itemsHTML += `
                        <div style="border:1px dashed #cbd5e1; padding:8px; margin-bottom:8px; border-radius:4px; background:#fff;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:6px; flex-wrap:wrap; gap:4px;">
                                <strong style="font-size:12px; color:#475569;">Education #${i + 1}</strong>
                                <div>
                                    <button onclick="window.tmplCloneItem('education', ${i})" style="padding:4px 8px; font-size:12px; cursor:pointer;">📋 Clone</button>
                                    <button onclick="window.tmplDeleteItem('education', ${i})" style="padding:4px 8px; font-size:12px; color:red; cursor:pointer;">🗑️</button>
                                </div>
                            </div>
                            <input type="text" value="${edu.institute || ''}" placeholder="Institute" oninput="window.tmplUpdateItem('education', ${i}, 'institute', this.value)" style="width:100%; font-size:13px; padding:6px; margin-bottom:4px;">
                            <input type="text" value="${edu.degree || ''}" placeholder="Degree" oninput="window.tmplUpdateItem('education', ${i}, 'degree', this.value)" style="width:100%; font-size:13px; padding:6px; margin-bottom:4px;">
                            <input type="text" value="${edu.year || ''}" placeholder="Year" oninput="window.tmplUpdateItem('education', ${i}, 'year', this.value)" style="width:100%; font-size:13px; padding:6px;">
                        </div>
                    `;
                });
                itemsHTML += `<button onclick="window.tmplAddItem('education')" style="width:100%; font-size:13px; padding:8px; cursor:pointer; background:#e2e8f0; border:1px solid #cbd5e1; border-radius:4px;">+ Add Education</button>`;
            }

            secCard.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:8px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; flex-wrap:wrap;">
                        <input type="text" value="${sec.title}" oninput="window.tmplUpdateSecTitle(${idx}, this.value)" style="font-weight:bold; font-size:13px; flex:1; padding:4px; min-width:100px;">
                        <select onchange="window.tmplUpdateSecPlacement(${idx}, this.value)" style="font-size:12px; padding:4px;">
                            <option value="sidebar" ${sec.placement === 'sidebar' ? 'selected' : ''}>Sidebar</option>
                            <option value="main" ${sec.placement === 'main' ? 'selected' : ''}>Main</option>
                        </select>
                        <label style="font-size:12px; display:flex; align-items:center; gap:4px;"><input type="checkbox" ${sec.visible ? 'checked' : ''} onchange="window.tmplToggleSecVisibility(${idx}, this.checked)"> Show</label>
                    </div>
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">
                        <button onclick="window.tmplCloneSection(${idx})" style="font-size:12px; padding:6px 10px; background:#dbeafe; color:#1e40af; border:1px solid #bfdbfe; border-radius:4px; cursor:pointer;">📋 Clone Section</button>
                        <button onclick="window.tmplDeleteSection(${idx})" style="font-size:12px; padding:6px 10px; background:#fee2e2; color:#991b1b; border:1px solid #fecaca; border-radius:4px; cursor:pointer;">🗑️ Delete Section</button>
                    </div>
                </div>
                <div>${itemsHTML}</div>
            `;

            container.appendChild(secCard);
        });
    }

    window.tmplCloneSection = function(idx) {
        const secToClone = templateState.sections[idx];
        if (!secToClone) return;
        const newSec = JSON.parse(JSON.stringify(secToClone));
        newSec.id = 'sec_' + secToClone.type + '_' + Date.now();
        newSec.title = secToClone.title + " (COPY)";
        templateState.sections.splice(idx + 1, 0, newSec);
        renderEditorPanel();
        renderPreview();
    };

    window.tmplDeleteSection = function(idx) {
        if (templateState.sections.length <= 1) {
            alert("Saare sections delete nahi ho sakte!");
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

    window.tmplUpdateItem = function(key, index, field, value) {
        if (templateState[key] && templateState[key][index]) {
            templateState[key][index][field] = value;
            renderPreview();
        }
    };

    window.tmplAddItem = function(key) {
        if (key === 'skills') {
            templateState.skills.push({ name: "New Skill" });
        } else if (key === 'experience') {
            templateState.experience.push({ company: "New Company", role: "Job Title", duration: "2026 - Present", details: "• Job details..." });
        } else if (key === 'education') {
            templateState.education.push({ institute: "New Institute", degree: "Degree Name", year: "2024 - 2026" });
        }
        renderEditorPanel();
        renderPreview();
    };

    window.tmplCloneItem = function(key, index) {
        if (templateState[key] && templateState[key][index]) {
            const clonedObj = JSON.parse(JSON.stringify(templateState[key][index]));
            if (clonedObj.company) clonedObj.company += " (Copy)";
            if (clonedObj.institute) clonedObj.institute += " (Copy)";
            if (clonedObj.name) clonedObj.name += " (Copy)";
            templateState[key].splice(index + 1, 0, clonedObj);
            renderEditorPanel();
            renderPreview();
        }
    };

    window.tmplDeleteItem = function(key, index) {
        if (templateState[key] && templateState[key][index]) {
            templateState[key].splice(index, 1);
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

    function downloadPDF() {
        const element = document.querySelector(".paper-wrapper") || document.querySelector(".cv-page");
        if (!element) {
            alert("PDF element nahi mila!");
            return;
        }

        const name = (templateState.resumeData.name && templateState.resumeData.name.trim()) 
            ? templateState.resumeData.name.trim().replace(/\s+/g, "_") 
            : "Resume";

        const currentTransform = element.style.transform;
        const currentMargin = element.style.marginBottom;
        element.style.transform = 'scale(1)';
        element.style.marginBottom = '0px';

        const options = {
            margin: 0,
            filename: `${name}_CV_Craft.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const downloadBtn = document.getElementById("btn-download-pdf");
        const originalText = downloadBtn ? downloadBtn.innerText : "📥 Download PDF";

        if (downloadBtn) {
            downloadBtn.innerText = "⏳ Generating PDF...";
            downloadBtn.disabled = true;
        }

        html2pdf().set(options).from(element).save().then(() => {
            element.style.transform = currentTransform;
            element.style.marginBottom = currentMargin;
            if (downloadBtn) {
                downloadBtn.innerText = originalText;
                downloadBtn.disabled = false;
            }
        }).catch((err) => {
            element.style.transform = currentTransform;
            element.style.marginBottom = currentMargin;
            alert("PDF generate karte waqt masla aaya hai!");
            if (downloadBtn) {
                downloadBtn.innerText = originalText;
                downloadBtn.disabled = false;
            }
        });
    }

    window.renderDefaultTemplate = function () {
        injectMobileTabs();
        renderEditorPanel();
        renderPreview();

        if (window.innerWidth <= 820) {
            window.tmplSwitchTab('editor');
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

    window.addEventListener('resize', function () {
        if (window.innerWidth > 820) {
            const editorPanel = document.querySelector('.left-editor-panel');
            const previewPanel = document.querySelector('.right-preview-panel');
            if (editorPanel) editorPanel.classList.remove('mobile-hidden');
            if (previewPanel) previewPanel.classList.remove('mobile-hidden');
        }
        window.tmplAutoFitMobilePage();
    });
})();