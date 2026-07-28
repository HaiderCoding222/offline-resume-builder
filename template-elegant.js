function renderElegantTemplate(state) {
    if (!state.elegantSections) {
        state.elegantData = {
            name: "Anar Abbas",
            title: "Frontend Web Developer & UI Designer",
            email: "nimramumtaaz16@gmail.com",
            phone: "+92 300 1234567",
            summary: "Passionate Frontend Developer based in Sargodha, Pakistan.",
            photo: "",
            linkedin: "linkedin.com/in/anar-abbas", // New
            portfolio: "myportfolio.com" // New
        };

        state.elegantSections = [
            {
                id: Date.now() + 1,
                title: "Skills",
                icon: "🛠️",
                type: "skills",
                side: "left",
                items: [{name:"HTML5 & CSS3"},{name:"Vanilla JavaScript"},{name:"Bootstrap"},{name:"UI/UX Design"}]
            },
            {
                id: Date.now() + 2,
                title: "Education",
                icon: "🎓",
                type: "education",
                side: "right",
                items: [{year:"2022 - 2026",institute:"University of Sargodha",degree:"Bachelors in Computer Science"}]
            },
            {
                id: Date.now() + 3,
                title: "Experience",
                icon: "💼",
                type: "experience",
                side: "right",
                items: [{duration:"01/2026 - Present",company:"Enfotrix Pvt Ltd.",role:"Frontend Developer Intern",details:"Developed clean, modular UI components."}]
            }
        ];
    }

    const d = state.elegantData;

    const leftSections = state.elegantSections.filter(s => s.side === 'left');
    const rightSections = state.elegantSections.filter(s => s.side === 'right');

    // Preview Section Helper
    const renderPreviewSection = (sec) => {
        if (sec.type === 'skills') {
            return `
                <div class="elegant-section">
                    <h3 class="elegant-section-title">${sec.icon} ${sec.title}</h3>
                    <div class="elegant-skills-list">${sec.items.map(s => `<div>${s.name}</div>`).join('')}</div>
                </div>`;
        } else if (sec.type === 'education' || sec.type === 'experience') {
            return `
                <div class="elegant-section">
                    <h3 class="elegant-section-title">${sec.icon} ${sec.title}</h3>
                    ${sec.items.map(item => {
                        if (sec.type === 'education') {
                            return `
                                <div class="cv-experience-node">
                                    <div class="cv-node-date-sub">${item.year}</div>
                                    <div class="cv-node-bold-title">${item.institute}</div>
                                    <div class="cv-node-role-italic">${item.degree}</div>
                                </div>`;
                        } else {
                            return `
                                <div class="cv-experience-node">
                                    <div class="cv-node-date-sub">${item.duration}</div>
                                    <div class="cv-node-bold-title">${item.company}</div>
                                    <div class="cv-node-role-italic">${item.role}</div>
                                    <p class="cv-node-details-para">${item.details}</p>
                                </div>`;
                        }
                    }).join('')}
                </div>`;
        }
        return '';
    };

    // Preview Panel Render (Added LinkedIn & Portfolio links conditionally)
    let previewHTML = `
        <div class="elegant-theme">
            <div class="elegant-header">
                <div class="elegant-photo-container"><div class="elegant-avatar" style="background-image:url('${d.photo}')"></div></div>
                <div class="elegant-name-block"><h1>${d.name}</h1><h2 class="elegant-profession">${d.title}</h2></div>
            </div>
            <div class="elegant-body">
                <div class="elegant-left-column">
                    <div class="elegant-section"><h3 class="elegant-section-title">👤 About Me</h3><p class="elegant-text">${d.summary}</p></div>
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
        </div>`;
    document.getElementById('elegant-print-node').innerHTML = previewHTML;

    // Personal & Contact Details Binding
    const bind = (id, key) => {
        const el = document.getElementById(id);
        if (el) {
            el.value = d[key] || '';
            el.oninput = () => { d[key] = el.value; renderElegantTemplate(state); };
        }
    };
    bind('el-input-name', 'name');
    bind('el-input-title', 'title');
    bind('el-input-summary', 'summary');
    bind('el-input-phone', 'phone');
    bind('el-input-email', 'email');
    bind('el-input-linkedin', 'linkedin');
    bind('el-input-portfolio', 'portfolio');

    // Photo Upload
    const photoInput = document.getElementById('el-photo-upload');
    if (photoInput) {
        photoInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => { d.photo = ev.target.result; renderElegantTemplate(state); };
                reader.readAsDataURL(file);
            }
        };
    }

    // Dynamic Editor Generator
    const container = document.getElementById('elegant-dynamic-editor-fields');
    container.innerHTML = '';

    state.elegantSections.forEach((section, index) => {
        let itemsHTML = '';

        if (section.type === 'skills') {
            itemsHTML = section.items.map((item, itemIdx) => `
                <div style="display:flex;gap:6px;margin-bottom:6px;">
                    <input type="text" value="${item.name}" style="flex:1;padding:5px;border:1px solid #cbd5e1;border-radius:4px;" oninput="window.state.elegantSections[${index}].items[${itemIdx}].name=this.value;renderElegantTemplate(window.state);">
                    <button onclick="deleteChildItem(${index}, ${itemIdx});" style="background:#ef4444;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">✕</button>
                </div>`).join('');
        } 
        else if (section.type === 'education') {
            itemsHTML = section.items.map((item, itemIdx) => `
                <div style="border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px; margin-bottom: 8px;">
                    <input type="text" value="${item.year}" placeholder="Year" style="width:100%;padding:5px;margin-bottom:4px;border:1px solid #cbd5e1;border-radius:4px;" oninput="window.state.elegantSections[${index}].items[${itemIdx}].year=this.value;renderElegantTemplate(window.state);">
                    <input type="text" value="${item.institute}" placeholder="Institute" style="width:100%;padding:5px;margin-bottom:4px;border:1px solid #cbd5e1;border-radius:4px;" oninput="window.state.elegantSections[${index}].items[${itemIdx}].institute=this.value;renderElegantTemplate(window.state);">
                    <div style="display:flex;gap:4px;">
                        <input type="text" value="${item.degree}" placeholder="Degree" style="flex:1;padding:5px;border:1px solid #cbd5e1;border-radius:4px;" oninput="window.state.elegantSections[${index}].items[${itemIdx}].degree=this.value;renderElegantTemplate(window.state);">
                        <button onclick="deleteChildItem(${index}, ${itemIdx});" style="background:#ef4444;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">✕</button>
                    </div>
                </div>`).join('');
        } 
        else if (section.type === 'experience') {
            itemsHTML = section.items.map((item, itemIdx) => `
                <div style="border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px; margin-bottom: 8px;">
                    <input type="text" value="${item.duration}" placeholder="Duration" style="width:100%;padding:5px;margin-bottom:4px;border:1px solid #cbd5e1;border-radius:4px;" oninput="window.state.elegantSections[${index}].items[${itemIdx}].duration=this.value;renderElegantTemplate(window.state);">
                    <input type="text" value="${item.company}" placeholder="Company" style="width:100%;padding:5px;margin-bottom:4px;border:1px solid #cbd5e1;border-radius:4px;" oninput="window.state.elegantSections[${index}].items[${itemIdx}].company=this.value;renderElegantTemplate(window.state);">
                    <input type="text" value="${item.role}" placeholder="Role" style="width:100%;padding:5px;margin-bottom:4px;border:1px solid #cbd5e1;border-radius:4px;" oninput="window.state.elegantSections[${index}].items[${itemIdx}].role=this.value;renderElegantTemplate(window.state);">
                    <div style="display:flex;gap:4px;">
                        <textarea style="flex:1;padding:5px;border:1px solid #cbd5e1;border-radius:4px;resize:vertical;" oninput="window.state.elegantSections[${index}].items[${itemIdx}].details=this.value;renderElegantTemplate(window.state);">${item.details}</textarea>
                        <button onclick="deleteChildItem(${index}, ${itemIdx});" style="background:#ef4444;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;align-self:flex-start;">✕</button>
                    </div>
                </div>`).join('');
        }

        container.innerHTML += createSection(section.title, section.icon, itemsHTML, index, section.type, section.side);
    });

    window.state = state;
}

function createSection(title, icon, itemsHTML, idx, type, side) {
    return `
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:12px;margin-bottom:12px;">
            <div style="display:flex;gap:6px;margin-bottom:12px;">
                <input type="text" value="${icon}" placeholder="Emoji" style="width:50px;padding:8px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-size:14px;" oninput="updateSectionIcon(${idx},this.value);">
                <input type="text" value="${title}" placeholder="Section Title" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:4px;font-weight:600;font-size:14px;" oninput="updateSectionTitle(${idx},this.value);">
            </div>
            ${itemsHTML}
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:8px;border-top:1px solid #e2e8f0;">
                <select onchange="updateSectionSide(${idx},this.value);" style="padding:6px;border:1px solid #cbd5e1;border-radius:4px;">
                    <option value="left" ${side === 'left' ? 'selected' : ''}>Left (Sidebar)</option>
                    <option value="right" ${side === 'right' ? 'selected' : ''}>Right (Main)</option>
                </select>
                <div style="display:flex;gap:6px;">
                    <button onclick="addNewItem(${idx});" style="background:#10b981;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">+ Add Item</button>
                    <button onclick="cloneSection(${idx});" style="background:#3b82f6;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">Clone Section</button>
                    <button onclick="deleteSection(${idx});" style="background:#ef4444;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">Delete Section</button>
                </div>
            </div>
        </div>`;
}

function updateSectionIcon(idx, val) { 
    window.state.elegantSections[idx].icon = val; 
    renderElegantTemplate(window.state); 
}

function updateSectionTitle(idx, val) { 
    window.state.elegantSections[idx].title = val; 
    renderElegantTemplate(window.state); 
}

function updateSectionSide(idx, val) { 
    window.state.elegantSections[idx].side = val; 
    renderElegantTemplate(window.state); 
}

function addNewItem(idx) {
    const sec = window.state.elegantSections[idx];
    if (sec.type === 'skills') sec.items.push({name:"New Skill"});
    else if (sec.type === 'education') sec.items.push({year:"",institute:"",degree:""});
    else if (sec.type === 'experience') sec.items.push({duration:"",company:"",role:"",details:""});
    renderElegantTemplate(window.state);
}

function cloneSection(idx) {
    const sectionToClone = window.state.elegantSections[idx];
    const clonedSection = JSON.parse(JSON.stringify(sectionToClone));
    
    clonedSection.id = Date.now();
    clonedSection.title = clonedSection.title + " (Copy)";
    clonedSection.icon = sectionToClone.icon; 
    
    window.state.elegantSections.splice(idx + 1, 0, clonedSection);
    renderElegantTemplate(window.state);
}

function deleteSection(idx) {
    if (window.state.elegantSections.length > 1) {
        if (confirm("Kya aap sach mein yeh poora section delete karna chahte hain?")) {
            window.state.elegantSections.splice(idx, 1);
            renderElegantTemplate(window.state);
        }
    } else {
        alert("Kam az kam ek section ka hona lazmi hai.");
    }
}

function deleteChildItem(secIdx, itemIdx) {
    if (window.state.elegantSections[secIdx].items.length > 1) {
        window.state.elegantSections[secIdx].items.splice(itemIdx, 1);
        renderElegantTemplate(window.state);
    } else {
        alert("Section mein kam se kam ek item hona chahiye!");
    }
}

// Global scope clear function for specific static contact fields
window.clearContactField = function(key) {
    if (window.state && window.state.elegantData) {
        window.state.elegantData[key] = '';
        renderElegantTemplate(window.state);
    }
};

window.renderElegantTemplate = renderElegantTemplate;

document.addEventListener("DOMContentLoaded", () => {
    const downloadPdfBtn = document.getElementById('btn-download-pdf');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', downloadResumePDF);
    }
});

function downloadResumePDF() {
    // Target element jahan resume template ka HTML render hota hai
    const element = document.getElementById('elegant-print-node');
    
    if (!element || !element.innerHTML.trim()) {
        alert("Pehle preview panel mein resume ka data load hone dein!");
        return;
    }

    // PDF quality aur page configuration options
    const options = {
        margin:       [0, 0, 0, 0], // Custom themes edge-to-edge bleed karne ke liye
        filename:     'My_Professional_Resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2,           // High resolution text render karne ke liye
            useCORS: true,      // Profile image (base64) allow karne ke liye
            letterRendering: true
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // html2pdf library function execution
    html2pdf().set(options).from(element).save()
    .then(() => {
        console.log("PDF successfully downloaded!");
    })
    .catch((error) => {
        console.error("PDF generation layout error: ", error);
    });
}