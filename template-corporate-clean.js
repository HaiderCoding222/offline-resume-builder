// ==========================================
// CORPORATE CLEAN TEMPLATE CONTROLLER 
// (WITH PLACEMENT DROPDOWN, CLONE & DELETE)
// ==========================================

(function() {
    console.log("🟢 [Corporate JS] Script successfully loaded and initialized!");

    // Default Fallback Data
    const defaultData = {
        resumeData: {
            name: "Korina Villanueva",
            role: "Business Consultant",
            photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
        },
        corporateSectionsList: [
            {
                id: 'corp_sec_contact',
                type: 'contact',
                title: "CONTACT",
                visible: true,
                placement: 'sidebar', // Added placement
                fontSize: 13,
                items: [
                    { icon: "📞", value: "123-456-7890" },
                    { icon: "✉️", value: "hello@reallygreatsite.com" },
                    { icon: "📍", value: "123 Anywhere St., Any City" }
                ]
            },
            {
                id: 'corp_sec_edu',
                type: 'education',
                title: "EDUCATION",
                visible: true,
                placement: 'sidebar', // Added placement
                fontSize: 13,
                items: [
                    { institute: "Borcelle Business School", degree: "Bachelor of Business Management", duration: "Completed in 2016" },
                    { institute: "Larana Business School", degree: "Certificate in Digital Marketing", duration: "Completed in 2014" }
                ]
            },
            {
                id: 'corp_sec_skills',
                type: 'skills',
                title: "SKILL",
                visible: true,
                placement: 'sidebar', // Added placement
                fontSize: 13,
                items: [
                    { value: "Management skills" },
                    { value: "Digital Marketing" },
                    { value: "Negotiation" },
                    { value: "Critical Thinking" },
                    { value: "Communication skills" }
                ]
            },
            {
                id: 'corp_sec_awards',
                type: 'awards',
                title: "AWARDS",
                visible: true,
                placement: 'sidebar', // Added placement
                fontSize: 13,
                items: [
                    { duration: "Oct 2019 | Ingoude Company", title: "The Best Employee of the Year" },
                    { duration: "May 2015 | Timmerman Industries", title: "The Best Employee of the Year" }
                ]
            },
            {
                id: 'corp_sec_profile',
                type: 'profile',
                title: "PROFILE",
                visible: true,
                placement: 'main', // Added placement
                fontSize: 13,
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                id: 'corp_sec_experience',
                type: 'experience',
                title: "WORK EXPERIENCE",
                visible: true,
                placement: 'main', // Added placement
                fontSize: 13,
                items: [
                    { company: "Ginyard International Co.", role: "Business Consultant", duration: "2020 - Present", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat." },
                    { company: "Ingoude Company", role: "Junior/ Business Consultant", duration: "2015-2020", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat." }
                ]
            },
            {
                id: 'corp_sec_refs',
                type: 'references',
                title: "REFERENCES",
                visible: true,
                placement: 'main', // Added placement
                fontSize: 13,
                items: [
                    { name: "Bailey Dupont", role: "Wardiere Inc. / CEO", phone: "123-456-7890", email: "hello@reallygreatsite.com" },
                    { name: "Harumi Kobayashi", role: "Wardiere Inc. / CEO", phone: "123-456-7890", email: "hello@reallygreatsite.com" }
                ]
            }
        ]
    };

    // Ensure state structure is available
    function checkState() {
        if (typeof window.state === 'undefined') {
            window.state = { currentTemplate: 'corporate-clean' };
        }
        if (!window.state.resumeData || Object.keys(window.state.resumeData).length === 0) {
            window.state.resumeData = JSON.parse(JSON.stringify(defaultData.resumeData));
        }
        if (!window.state.corporateSectionsList) {
            window.state.corporateSectionsList = JSON.parse(JSON.stringify(defaultData.corporateSectionsList));
        }
    }

    // MAIN RENDER TRIGGER (Renders paper preview)
    function renderCorporateCleanTemplate() {
        checkState();
        const activeState = window.state;

        const leftSidebarEl = document.getElementById('corp-left-sidebar');
        const rightMainEl = document.getElementById('corp-right-main');

        if (!leftSidebarEl || !rightMainEl) {
            console.warn("⚠️ [Corporate JS] DOM elements not ready yet. Skipping preview render.");
            return;
        }

        // Live paper updates for Name, Role and Photo
        const nameHeader = document.getElementById('p-corp-name');
        const roleHeader = document.getElementById('p-corp-role');
        if (nameHeader) nameHeader.textContent = activeState.resumeData.name || defaultData.resumeData.name;
        if (roleHeader) roleHeader.textContent = activeState.resumeData.role || defaultData.resumeData.role;

        const avatarImg = document.getElementById('avatar-img');
        if (avatarImg) {
            avatarImg.src = activeState.resumeData.photo || defaultData.resumeData.photo;
        }

        leftSidebarEl.innerHTML = '';
        rightMainEl.innerHTML = '';

        activeState.corporateSectionsList.forEach((sec) => {
            if (!sec.visible) return;

            // Decide Target Column based on placement dropdown
            const targetColumn = sec.placement === 'main' ? rightMainEl : leftSidebarEl;

            const baseFS = sec.fontSize || 13;
            const blockDiv = document.createElement('div');
            blockDiv.className = 'side-block';

            // Title styling based on placement
            const titleEl = document.createElement('div');
            titleEl.className = sec.placement === 'main' ? 'section-title' : 'side-title';
            titleEl.style.fontSize = (baseFS + 2.5) + "px";
            titleEl.textContent = sec.title;
            blockDiv.appendChild(titleEl);

            if (sec.type === 'contact') {
                const listDiv = document.createElement('div');
                listDiv.className = 'contact-list';
                sec.items.forEach(item => {
                    const iDiv = document.createElement('div');
                    iDiv.className = 'contact-item';
                    iDiv.style.fontSize = baseFS + "px";
                    iDiv.innerHTML = `<span class="icon" style="color: #8e9bb0;">${item.icon || '📍'}</span> <span>${item.value || ''}</span>`;
                    listDiv.appendChild(iDiv);
                });
                blockDiv.appendChild(listDiv);
                targetColumn.appendChild(blockDiv);
            }
            else if (sec.type === 'education') {
                const listDiv = document.createElement('div');
                listDiv.className = 'edu-list';
                sec.items.forEach(edu => {
                    const eduDiv = document.createElement('div');
                    eduDiv.className = 'edu-item';
                    eduDiv.style.fontSize = baseFS + "px";
                    eduDiv.innerHTML = `
                        <span class="edu-bullet">•</span>
                        <div style="flex:1;">
                            <div class="edu-inst" style="font-size: ${baseFS}px;">${edu.institute || ''}</div>
                            <div class="edu-degree" style="font-size: ${baseFS - 0.5}px;">${edu.degree || ''}</div>
                            <div class="edu-year" style="font-size: ${baseFS - 1}px;">${edu.duration || ''}</div>
                        </div>
                    `;
                    listDiv.appendChild(eduDiv);
                });
                blockDiv.appendChild(listDiv);
                targetColumn.appendChild(blockDiv);
            }
            else if (sec.type === 'skills') {
                const listUl = document.createElement('ul');
                listUl.className = 'skills-list';
                sec.items.forEach(sk => {
                    const li = document.createElement('li');
                    li.style.fontSize = baseFS + "px";
                    li.textContent = sk.value;
                    listUl.appendChild(li);
                });
                blockDiv.appendChild(listUl);
                targetColumn.appendChild(blockDiv);
            }
            else if (sec.type === 'awards') {
                sec.items.forEach(award => {
                    const awardDiv = document.createElement('div');
                    awardDiv.className = 'award-item';
                    awardDiv.style.fontSize = baseFS + "px";
                    awardDiv.innerHTML = `
                        <div class="award-date" style="font-size: ${baseFS - 1}px;">${award.duration || ''}</div>
                        <div class="award-title" style="font-size: ${baseFS}px;">${award.title || ''}</div>
                    `;
                    blockDiv.appendChild(awardDiv);
                });
                targetColumn.appendChild(blockDiv);
            }
            else if (sec.type === 'profile') {
                const p = document.createElement('p');
                p.className = 'profile-text';
                p.style.fontSize = baseFS + "px";
                p.textContent = sec.desc || '';
                blockDiv.appendChild(p);
                targetColumn.appendChild(blockDiv);
            }
            else if (sec.type === 'experience') {
                sec.items.forEach(job => {
                    const jobDiv = document.createElement('div');
                    jobDiv.className = 'job-item';
                    jobDiv.innerHTML = `
                        <div class="job-header" style="font-size: ${baseFS + 1}px;">
                            <span>${job.company || ''} | ${job.role || ''}</span>
                            <span style="font-size:${baseFS}px; font-weight:normal;">${job.duration || ''}</span>
                        </div>
                        <p class="job-desc" style="font-size:${baseFS}px;">${job.desc || ''}</p>
                    `;
                    blockDiv.appendChild(jobDiv);
                });
                targetColumn.appendChild(blockDiv);
            }
            else if (sec.type === 'references') {
                const gridDiv = document.createElement('div');
                gridDiv.className = 'references-grid';
                sec.items.forEach(ref => {
                    const col = document.createElement('div');
                    col.innerHTML = `
                        <div class="ref-name" style="font-size: ${baseFS + 1}px;">${ref.name || ''}</div>
                        <div class="ref-role" style="font-size: ${baseFS - 0.5}px;">${ref.role || ''}</div>
                        <div class="ref-detail" style="font-size: ${baseFS - 1}px;">Phone: ${ref.phone || ''}</div>
                        <div class="ref-detail" style="font-size: ${baseFS - 1}px;">Email: ${ref.email || ''}</div>
                    `;
                    gridDiv.appendChild(col);
                });
                blockDiv.appendChild(gridDiv);
                targetColumn.appendChild(blockDiv);
            }
        });
    }

    // EDITOR PANEL BUILDER (Creates inputs on Left Control Panel)
    function refreshCorporateEditorFields() {
        const container = document.getElementById('corporate-dynamic-editor-sections');
        if (!container) {
            console.warn("⚠️ [Corporate JS] Editor container not ready yet. Skipping editor fields render.");
            return;
        }

        container.innerHTML = '';
        checkState();
        const activeState = window.state;

        // Sync existing top panel inputs from HTML
        const nameInput = document.getElementById('corp-input-name');
        const roleInput = document.getElementById('corp-input-role');
        const photoInput = document.getElementById('corp-input-photo');

        if (nameInput) {
            if (!nameInput.value) nameInput.value = activeState.resumeData.name || defaultData.resumeData.name;
            nameInput.oninput = (e) => {
                window.state.resumeData.name = e.target.value;
                renderCorporateCleanTemplate();
            };
        }
        if (roleInput) {
            if (!roleInput.value) roleInput.value = activeState.resumeData.role || defaultData.resumeData.role;
            roleInput.oninput = (e) => {
                window.state.resumeData.role = e.target.value;
                renderCorporateCleanTemplate();
            };
        }
        if (photoInput) {
            photoInput.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        window.state.resumeData.photo = event.target.result;
                        renderCorporateCleanTemplate();
                    };
                    reader.readAsDataURL(file);
                }
            };
        }

        // 2. RENDER THE REST OF DYNAMIC SECTIONS
        activeState.corporateSectionsList.forEach((sec, sIdx) => {
            const secDiv = document.createElement('div');
            secDiv.className = 'editor-group-card';
            secDiv.style.marginBottom = "15px";

            // Control Buttons Header with Placement Dropdown, Add, Show, Clone and Delete
            let controlsHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #cbd5e1; padding-bottom:6px; margin-bottom:8px; gap:4px; flex-wrap:wrap;">
                    <input type="text" value="${sec.title}" oninput="window.state.corporateSectionsList[${sIdx}].title = this.value.toUpperCase(); window.renderCorporateCleanTemplate();" style="font-weight:700; font-size:11px; border:1px solid #cbd5e1; padding:4px; border-radius:4px; text-transform:uppercase; flex:1; min-width:100px;">
                    
                    <div style="display:flex; gap:4px; align-items:center;">
                        <!-- Placement Dropdown (Main or Sidebar) -->
                        <select onchange="window.state.corporateSectionsList[${sIdx}].placement = this.value; window.renderCorporateCleanTemplate();" style="font-size:10px; padding:2px; border-radius:4px; border:1px solid #cbd5e1;">
                            <option value="main" ${sec.placement === 'main' ? 'selected' : ''}>Main</option>
                            <option value="sidebar" ${sec.placement === 'sidebar' ? 'selected' : ''}>Sidebar</option>
                        </select>

                        <label style="font-size:11px; display:flex; align-items:center; gap:1px; color:#475569; font-weight:600;"><input type="checkbox" ${sec.visible ? 'checked' : ''} onchange="window.state.corporateSectionsList[${sIdx}].visible = this.checked; window.renderCorporateCleanTemplate();"> Show</label>
                        ${sec.type !== 'profile' ? `<button type="button" onclick="window.addCorporateItem(${sIdx})" style="background:#8e9bb0; color:#fff; border:none; padding:2px 4px; border-radius:4px; cursor:pointer; font-size:10px;">+ Item</button>` : ''}
                        <button type="button" onclick="window.duplicateCorporateSection(${sIdx})" style="background:#10b981; color:#fff; border:none; padding:2px 5px; border-radius:4px; cursor:pointer; font-size:10px; font-weight:600;">Clone</button>
                        <button type="button" onclick="window.state.corporateSectionsList.splice(${sIdx},1); window.refreshCorporateEditorFields(); window.renderCorporateCleanTemplate();" style="background:#ef4444; color:#fff; border:none; padding:2px 5px; border-radius:4px; cursor:pointer; font-size:10px; font-weight:600;">Del</button>
                    </div>
                </div>
            `;

            let bodyHTML = '';

            if (sec.type === 'contact') {
                sec.items.forEach((item, itemIdx) => {
                    bodyHTML += `
                        <div style="display:flex; gap:4px; margin-bottom:4px;">
                            <input type="text" value="${item.icon || ''}" style="width:30px; text-align:center; font-size:12px; border:1px solid #cbd5e1; border-radius:4px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].icon=this.value; window.renderCorporateCleanTemplate();">
                            <input type="text" value="${item.value || ''}" style="flex:1; padding:4px; font-size:12px; border:1px solid #cbd5e1; border-radius:4px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].value=this.value; window.renderCorporateCleanTemplate();">
                            <button type="button" onclick="window.state.corporateSectionsList[${sIdx}].items.splice(${itemIdx},1); window.refreshCorporateEditorFields(); window.renderCorporateCleanTemplate();" style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer;">×</button>
                        </div>
                    `;
                });
            }
            else if (sec.type === 'education') {
                sec.items.forEach((item, itemIdx) => {
                    bodyHTML += `
                        <div style="background:#f8fafc; padding:6px; border-radius:4px; border:1px solid #cbd5e1; margin-bottom:4px; position:relative;">
                            <input type="text" placeholder="Institution" value="${item.institute || ''}" style="width:90%; font-size:11px; margin-bottom:2.5px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].institute=this.value; window.renderCorporateCleanTemplate();">
                            <input type="text" placeholder="Degree" value="${item.degree || ''}" style="width:90%; font-size:11px; margin-bottom:2.5px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].degree=this.value; window.renderCorporateCleanTemplate();">
                            <input type="text" placeholder="Duration" value="${item.duration || ''}" style="width:90%; font-size:11px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].duration=this.value; window.renderCorporateCleanTemplate();">
                            <button type="button" onclick="window.state.corporateSectionsList[${sIdx}].items.splice(${itemIdx},1); window.refreshCorporateEditorFields(); window.renderCorporateCleanTemplate();" style="position:absolute; top:6px; right:6px; background:#ef4444; color:white; border:none; padding:2px 5px; border-radius:4px; font-size:9px; cursor:pointer;">×</button>
                        </div>
                    `;
                });
            }
            else if (sec.type === 'skills') {
                sec.items.forEach((item, itemIdx) => {
                    bodyHTML += `
                        <div style="display:flex; gap:4px; margin-bottom:4px;">
                            <input type="text" value="${item.value || ''}" style="flex:1; padding:4px; font-size:12px; border:1px solid #cbd5e1; border-radius:4px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].value=this.value; window.renderCorporateCleanTemplate();">
                            <button type="button" onclick="window.state.corporateSectionsList[${sIdx}].items.splice(${itemIdx},1); window.refreshCorporateEditorFields(); window.renderCorporateCleanTemplate();" style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer;">×</button>
                        </div>
                    `;
                });
            }
            else if (sec.type === 'awards') {
                sec.items.forEach((item, itemIdx) => {
                    bodyHTML += `
                        <div style="background:#f8fafc; padding:6px; border-radius:4px; border:1px solid #cbd5e1; margin-bottom:4px; position:relative;">
                            <input type="text" placeholder="Date" value="${item.duration || ''}" style="width:90%; font-size:11px; margin-bottom:2.5px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].duration=this.value; window.renderCorporateCleanTemplate();">
                            <input type="text" placeholder="Award Name" value="${item.title || ''}" style="width:90%; font-size:11px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].title=this.value; window.renderCorporateCleanTemplate();">
                            <button type="button" onclick="window.state.corporateSectionsList[${sIdx}].items.splice(${itemIdx},1); window.refreshCorporateEditorFields(); window.renderCorporateCleanTemplate();" style="position:absolute; top:6px; right:6px; background:#ef4444; color:white; border:none; padding:2px 5px; border-radius:4px; font-size:9px; cursor:pointer;">×</button>
                        </div>
                    `;
                });
            }
            else if (sec.type === 'profile') {
                bodyHTML += `
                    <textarea rows="4" style="width:100%; font-size:11px; font-family:inherit; padding:6px; border:1px solid #cbd5e1; border-radius:4px; resize:vertical;" oninput="window.state.corporateSectionsList[${sIdx}].desc=this.value; window.renderCorporateCleanTemplate();">${sec.desc || ''}</textarea>
                `;
            }
            else if (sec.type === 'experience') {
                sec.items.forEach((item, itemIdx) => {
                    bodyHTML += `
                        <div style="background:#f8fafc; padding:6px; border-radius:4px; border:1px solid #cbd5e1; margin-bottom:4px; position:relative;">
                            <input type="text" placeholder="Company" value="${item.company || ''}" style="width:90%; font-size:11px; margin-bottom:2.5px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].company=this.value; window.renderCorporateCleanTemplate();">
                            <input type="text" placeholder="Designation" value="${item.role || ''}" style="width:90%; font-size:11px; margin-bottom:2.5px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].role=this.value; window.renderCorporateCleanTemplate();">
                            <input type="text" placeholder="Duration" value="${item.duration || ''}" style="width:90%; font-size:11px; margin-bottom:2.5px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].duration=this.value; window.renderCorporateCleanTemplate();">
                            <textarea rows="2" placeholder="Description" style="width:100%; font-size:11px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].desc=this.value; window.renderCorporateCleanTemplate();">${item.desc || ''}</textarea>
                            <button type="button" onclick="window.state.corporateSectionsList[${sIdx}].items.splice(${itemIdx},1); window.refreshCorporateEditorFields(); window.renderCorporateCleanTemplate();" style="position:absolute; top:6px; right:6px; background:#ef4444; color:white; border:none; padding:2px 5px; border-radius:4px; font-size:9px; cursor:pointer;">×</button>
                        </div>
                    `;
                });
            }
            else if (sec.type === 'references') {
                sec.items.forEach((item, itemIdx) => {
                    bodyHTML += `
                        <div style="background:#f8fafc; padding:6px; border-radius:4px; border:1px solid #cbd5e1; margin-bottom:4px; position:relative;">
                            <input type="text" placeholder="Reference Name" value="${item.name || ''}" style="width:90%; font-size:11px; margin-bottom:2.5px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].name=this.value; window.renderCorporateCleanTemplate();">
                            <input type="text" placeholder="Role / Company" value="${item.role || ''}" style="width:90%; font-size:11px; margin-bottom:2.5px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].role=this.value; window.renderCorporateCleanTemplate();">
                            <input type="text" placeholder="Phone" value="${item.phone || ''}" style="width:90%; font-size:11px; margin-bottom:2.5px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].phone=this.value; window.renderCorporateCleanTemplate();">
                            <input type="text" placeholder="Email" value="${item.email || ''}" style="width:90%; font-size:11px;" oninput="window.state.corporateSectionsList[${sIdx}].items[${itemIdx}].email=this.value; window.renderCorporateCleanTemplate();">
                            <button type="button" onclick="window.state.corporateSectionsList[${sIdx}].items.splice(${itemIdx},1); window.refreshCorporateEditorFields(); window.renderCorporateCleanTemplate();" style="position:absolute; top:6px; right:6px; background:#ef4444; color:white; border:none; padding:2px 5px; border-radius:4px; font-size:9px; cursor:pointer;">×</button>
                        </div>
                    `;
                });
            }

            secDiv.innerHTML = controlsHTML + bodyHTML;
            container.appendChild(secDiv);
        });
    }

    // Clone/Duplicate Section Method
    window.duplicateCorporateSection = function(index) {
        checkState();
        const original = window.state.corporateSectionsList[index];
        if (!original) return;

        const clone = {
            id: 'corp_sec_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            type: original.type,
            title: original.title + " (COPY)",
            visible: original.visible,
            placement: original.placement, // Keep exact same placement on clone
            fontSize: original.fontSize || 13
        };

        if (original.type === 'profile') {
            clone.desc = original.desc;
        } else {
            clone.items = JSON.parse(JSON.stringify(original.items));
        }

        window.state.corporateSectionsList.splice(index + 1, 0, clone);
        window.refreshCorporateEditorFields();
        window.renderCorporateCleanTemplate();
    };

    // Add Dynamic Sub-Items Inside a Section
    window.addCorporateItem = function(secIdx) {
        const sec = window.state.corporateSectionsList[secIdx];
        if (!sec) return;

        if (sec.type === 'contact') sec.items.push({ icon: '📍', value: '' });
        else if (sec.type === 'education') sec.items.push({ institute: '', degree: '', duration: '' });
        else if (sec.type === 'skills') sec.items.push({ value: '' });
        else if (sec.type === 'awards') sec.items.push({ duration: '', title: '' });
        else if (sec.type === 'experience') sec.items.push({ company: '', role: '', duration: '', desc: '' });
        else if (sec.type === 'references') sec.items.push({ name: '', role: '', phone: '', email: '' });

        window.refreshCorporateEditorFields();
        window.renderCorporateCleanTemplate();
    };

    // MAIN EXPOSURE
    const handleTemplateRender = function(state) {
        console.log("🚀 [Corporate JS] Router triggered rendering sequence...");
        if (state) window.state = state;
        window.state.currentTemplate = 'corporate-clean';
        
        setTimeout(() => {
            window.renderCorporateCleanTemplate();
            window.refreshCorporateEditorFields();
        }, 50);
    };

    window.renderCorporateclean = handleTemplateRender;
    window.renderCorporateClean = handleTemplateRender;
    window.renderCorporateCleanTemplate = renderCorporateCleanTemplate;
    window.refreshCorporateEditorFields = refreshCorporateEditorFields;

    document.addEventListener('DOMContentLoaded', () => {
        if (window.state && window.state.currentTemplate === 'corporate-clean') {
            handleTemplateRender();
        }
    });

})();