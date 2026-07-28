console.log("Modern Template JS File: Loading...");

if (typeof window.state === 'undefined') {
    console.warn("Global 'state' is undefined. Initializing window.state with default schema.");
    window.state = {
        currentTemplate: 'modern',
        resumeData: {},
        modernSectionsList: null
    };
}

function renderModernTemplate(state) {
    console.log("--- renderModernTemplate Executing ---");
    
    // Fallback checking to bind window.state correctly
    const activeState = state || window.state;
    if (!activeState) {
        console.error("renderModernTemplate Error: Active state is completely missing!");
        return;
    }

    // Modern HTML input/preview wrappers checking
    const mainPreview = document.getElementById('modern-main-preview');
    const editorSection = document.getElementById('modern-dynamic-editor-sections');

    if (!mainPreview || !editorSection) {
        console.warn("Modern DOM elements not ready yet. Skipping render.");
        return; 
    }

    // Initialize 100% exact data matching the image with default font sizes
    if (!activeState.modernSectionsList) {
        console.log("Initializing 100% exact data from image with dynamic font scaling...");
        
        activeState.modernSectionsList = [
            {
                id: 'mod_sec_1',
                type: 'education',
                title: "EDUCATION",
                visible: true,
                fontSize: 11, // Default base font size in px
                items: [
                    { 
                        institute: "City, University of London", 
                        degree: "BSc (Hons) Computer Science", 
                        duration: "Sep 2019 - July 2023", 
                        desc: "Relevent coursework: Functional Programming, Data Structures and Algorithms, Information Security, Computer Networks\nWinner of Dean's Award for Professional Excellence 2022" 
                    }
                ]
            },
            {
                id: 'mod_sec_2',
                type: 'experience',
                title: "PROFESSIONAL EXPERIENCE",
                visible: true,
                fontSize: 11,
                items: [
                    { 
                        role: "Associate Solutions Architect", 
                        company: "Amazon Web Services (AWS)", 
                        duration: "Sep 2023 - Present", 
                        desc: "Building applications, software, and services on the AWS platform\nEmploying Infrastructure as Code methodologies to streamline deployment of applications\nPrototyping proof-of-concept solutions to demonstrate the feasibility of cloud services\nImplementing best practices for high-availability and security in system design" 
                    },
                    { 
                        role: "Solutions Architect Intern", 
                        company: "Amazon Web Services (AWS)", 
                        duration: "June 2022 - Sep 2022", 
                        desc: "Automated cloud infrastructure provisioning for an internal web application used by over 6000 users utilizing Node js, AWS CDK (Cloud Development Kit), and CI/CD\nBuilt an automated ETL process to extract, transform, and load data from multiple sources to a data warehouse using Python, AWS Lambda, Amazon RDS, Amazon Redshift\nPerformed Well-Architected reviews and made recommendations to improve systems' security, performance, scalability, reliability, and operational efficiency" 
                    },
                    {
                        role: "Security Technical Specialist",
                        company: "Microsoft",
                        duration: "July 2021 - June 2022",
                        desc: "Implemented and-to-end enterprise solutions on the Microsoft Azure platform\nPresented architecture frameworks to stakeholders on security and cloud migration strategies\nDelivered a speech at Microsoft Build 2022: a global conference for software engineers and developers\nRepresented Microsoft as a presenter at InfoSec Europe 2022: a leading information security event"
                    },
                    {
                        role: "Technology Intern",
                        company: "Bright Network",
                        duration: "Dec 2020 - Jan 2021",
                        desc: "Created a detailed project management plan to define the release of facial recognition software into the sign-in process of a mobile app for a UK bank"
                    }
                ]
            },
            {
                id: 'mod_sec_3',
                type: 'skills',
                title: "SKILLS",
                visible: true,
                fontSize: 11,
                items: [
                    { name: "Programming Languages", value: "Python, Java, C++, Haskell, JavaScript, HTML, CSS, SQL" },
                    { name: "Technologies", value: "Apache Hadoop, Apache Spark, MongoDB, Linux, Jenkins, Docker, Kubernetes, Terraform, Git" },
                    { name: "Soft Skills", value: "multilingual communication (fluent in English, Russian, Bulgarian), leadership, public speaking, teamwork" }
                ]
            },
            {
                id: 'mod_sec_4',
                type: 'experience',
                title: "LEADERSHIP AND VOLUNTEERING",
                visible: true,
                fontSize: 11,
                items: [
                    {
                        role: "City STEM Brand Ambassador",
                        company: "",
                        duration: "Oct 2022 - July 2023",
                        desc: "Handpicked to represent the School of Science and Technology based on academic excellence to inspire future students\nParticipated in a promotional campaign including photo shoots, video recordings, and interviews for content"
                    },
                    {
                        role: "CityBuddy Mentor",
                        company: "",
                        duration: "Sep 2020 - July 2022",
                        desc: "Mentored, guided, and supported first year university students\nCommunicating with mentees on a weekly basis, explained and taught technical concepts"
                    },
                    {
                        role: "Fundraising Volunteer for BBC Children in Need",
                        company: "",
                        duration: "Sep 2021 - Nov 2021",
                        desc: "Collaborated within a team to raise funds and increase awareness for the initiative by organizing events and activities"
                    }
                ]
            },
            {
                id: 'mod_sec_5',
                type: 'skills',
                title: "CERTIFICATIONS",
                visible: true,
                fontSize: 11,
                items: [
                    { name: "AWS Certified", value: "Cloud Practitioner, AI Practitioner, Developer Associate, Solutions Architect Associate, SysOps Administrator Associate, Data Engineer Associate, Machine Learning Engineer Associate, Machine Learning Specialty, Data Analytics Specialty, Advanced Networking Specialty, Security Specialty, Solutions Architect Professional, DevOps Engineer Professional" },
                    { name: "Microsoft Certified", value: "DevOps Engineer Expert, Azure Solutions Architect Expert, Azure Administrator Associate, Azure Developer Associate, Azure Fundamentals, Azure Data Fundamentals, Azure AI Fundamentals, Security, Compliance, and Identity Fundamentals" },
                    { name: "Google", value: "Associate Cloud Engineer, Cloud Digital Leader" }
                ]
            }
        ];

        activeState.resumeData = {
            name: "Rosen Georgiev",
            email: "name@gmail.com",
            phone: "+999999999",
            linkedin: "Rosen Georgiev"
        };

        refreshModernEditorFields(activeState);
    }

    // Back-sync in case global state is missing modernSectionsList
    if (window.state && !window.state.modernSectionsList) {
        window.state.modernSectionsList = activeState.modernSectionsList;
    }

    try {
        // Sync HTML Inputs with JS State Values
        const inputName = document.getElementById('mod-input-name');
        const inputEmail = document.getElementById('mod-input-email');
        const inputPhone = document.getElementById('mod-input-phone');
        const inputLinkedin = document.getElementById('mod-input-linkedin');

        if (inputName && !inputName.dataset.instantiated) {
            inputName.value = activeState.resumeData.name || '';
            if (inputEmail) inputEmail.value = activeState.resumeData.email || '';
            if (inputPhone) inputPhone.value = activeState.resumeData.phone || '';
            if (inputLinkedin) inputLinkedin.value = activeState.resumeData.linkedin || '';
            inputName.dataset.instantiated = "true";
        }

        // Live Preview Header Text Syncing
        const els = {
            name: document.getElementById('p-mod-name'),
            email: document.getElementById('p-mod-email'),
            phone: document.getElementById('p-mod-phone'),
            linkedin: document.getElementById('p-mod-linkedin')
        };

        if (els.name) els.name.textContent = activeState.resumeData.name || '';
        if (els.email) els.email.textContent = activeState.resumeData.email ? "Email: " + activeState.resumeData.email : '';
        if (els.phone) els.phone.textContent = activeState.resumeData.phone ? " | Mobile: " + activeState.resumeData.phone : '';
        if (els.linkedin) {
            if (activeState.resumeData.linkedin) {
                els.linkedin.style.display = 'inline';
                els.linkedin.textContent = " | Linkedin: " + activeState.resumeData.linkedin;
            } else {
                els.linkedin.style.display = 'none';
            }
        }

        // Build Dynamic Subsections Layout inside Canvas
        mainPreview.innerHTML = '';
        activeState.modernSectionsList.forEach((sec) => {
            if (!sec.visible) return;

            // Normalize base font-size for this specific section
            const baseFS = sec.fontSize || 11;

            const sectionHTML = document.createElement('div');
            sectionHTML.className = 'ats-section';

            const heading = document.createElement('h3');
            heading.className = 'ats-section-heading';
            heading.style.fontSize = (baseFS + 1) + "px"; // Dynamic heading font-size (base + 1px)
            heading.textContent = sec.title.toUpperCase();
            sectionHTML.appendChild(heading);

            const hr = document.createElement('hr');
            hr.className = 'ats-hr';
            sectionHTML.appendChild(hr);

            const contentDiv = document.createElement('div');

            if (sec.type === 'education') {
                sec.items.forEach(edu => {
                    const item = document.createElement('div');
                    item.style.marginBottom = "5px";
                    item.style.fontSize = baseFS + "px"; // Force dynamic font-size
                    
                    let bulletBlock = '';
                    if (edu.desc) {
                        bulletBlock = edu.desc.split('\n').map(line => {
                            if (!line.trim()) return '';
                            return `<div style="font-size: ${baseFS}px;">${line.trim().startsWith('•') ? line.trim() : '• ' + line.trim()}</div>`;
                        }).join('');
                    }

                    item.innerHTML = `
                        <div class="ats-row-split" style="font-size: ${baseFS}px;">
                            <span class="ats-bold">${edu.institute || ''}</span>
                            <span>${edu.duration || ''}</span>
                        </div>
                        <div class="ats-row-split" style="font-size: ${baseFS}px;">
                            <span class="ats-italic">${edu.degree || ''}</span>
                            <span></span>
                        </div>
                        ${bulletBlock ? `<div class="ats-details-box" style="font-size: ${baseFS}px;">${bulletBlock}</div>` : ''}
                    `;
                    contentDiv.appendChild(item);
                });
            } 
            else if (sec.type === 'experience' || sec.type === 'custom') {
                sec.items.forEach(exp => {
                    const item = document.createElement('div');
                    item.style.marginBottom = "6px";
                    item.style.fontSize = baseFS + "px"; // Force dynamic font-size

                    let bulletBlock = '';
                    if (exp.desc) {
                        bulletBlock = exp.desc.split('\n').map(line => {
                            if (!line.trim()) return '';
                            return `<div style="font-size: ${baseFS}px;">${line.trim().startsWith('•') ? line.trim() : '• ' + line.trim()}</div>`;
                        }).join('');
                    }

                    const topRowHTML = (exp.company && exp.role) ? `
                        <div class="ats-row-split" style="font-size: ${baseFS}px;">
                            <span class="ats-bold">${exp.company}</span>
                            <span class="ats-bold">${exp.role}</span>
                            <span>${exp.duration || ''}</span>
                        </div>
                    ` : `
                        <div class="ats-row-split" style="font-size: ${baseFS}px;">
                            <span class="ats-bold">${exp.role || exp.company || ''}</span>
                            <span>${exp.duration || ''}</span>
                        </div>
                    `;

                    item.innerHTML = `
                        ${topRowHTML}
                        ${bulletBlock ? `<div class="ats-details-box" style="font-size: ${baseFS}px;">${bulletBlock}</div>` : ''}
                    `;
                    contentDiv.appendChild(item);
                });
            } 
            else if (sec.type === 'skills') {
                sec.items.forEach(skill => {
                    if (skill.name && skill.value) {
                        const item = document.createElement('div');
                        item.style.fontSize = baseFS + "px"; // Force dynamic font-size
                        item.style.marginBottom = "3px";
                        
                        item.innerHTML = `• <span class="ats-bold">${skill.name}:</span> ${skill.value}`;
                        contentDiv.appendChild(item);
                    }
                });
            }

            sectionHTML.appendChild(contentDiv);
            mainPreview.appendChild(sectionHTML);
        });

        console.log("--- Modern Live Preview Rendered Successfully. ---");

    } catch (err) {
        console.error("Runtime Error in renderModernTemplate:", err);
    }
}

// Generate Interactive Input Controls on Left Panel with Font Sizer
function refreshModernEditorFields(state) {
    const container = document.getElementById('modern-dynamic-editor-sections');
    if (!container) return;
    container.innerHTML = '';

    const targetState = state || window.state;
    if (!targetState || !targetState.modernSectionsList) return;

    targetState.modernSectionsList.forEach((sec, sIdx) => {
        // Ensure default font size exists
        if (!sec.fontSize) sec.fontSize = 11;

        const secDiv = document.createElement('div');
        secDiv.style.background = "#f8fafc";
        secDiv.style.padding = "10px";
        secDiv.style.borderRadius = "8px";
        secDiv.style.border = "1px solid #e2e8f0";
        secDiv.style.marginBottom = "12px";

        let controlsHTML = `
            <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:8px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:4px;">
                    <input type="text" value="${sec.title}" oninput="window.state.modernSectionsList[${sIdx}].title = this.value; window.renderModernTemplate(window.state);" style="font-weight:700; font-size:12px; border:1px solid #cbd5e1; padding:4px; border-radius:4px; flex:1; text-transform:uppercase;" placeholder="Section Heading">
                    <button type="button" onclick="window.state.modernSectionsList.splice(${sIdx},1); window.refreshModernEditorFields(window.state); window.renderModernTemplate(window.state);" style="background:#ef4444; color:white; border:none; padding:4px 6px; border-radius:4px; cursor:pointer; font-size:11px;">✕</button>
                </div>
                
                <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                    <!-- Font Size Customizer for each Section -->
                    <div style="display:flex; align-items:center; gap:4px; background:#e2e8f0; padding:2px 6px; border-radius:6px;">
                        <span style="font-size:10px; font-weight:700; color:#475569; margin-right:4px;">Size:</span>
                        <button type="button" onclick="window.adjustModernFontSize(${sIdx}, -1)" style="background:#fff; border:1px solid #cbd5e1; border-radius:3px; font-weight:bold; font-size:11px; width:22px; height:22px; cursor:pointer; display:flex; align-items:center; justify-content:center;">-</button>
                        <span id="label-size-${sIdx}" style="font-size:11px; font-weight:bold; color:#0f172a; min-width:32px; text-align:center;">${sec.fontSize}px</span>
                        <button type="button" onclick="window.adjustModernFontSize(${sIdx}, 1)" style="background:#fff; border:1px solid #cbd5e1; border-radius:3px; font-weight:bold; font-size:11px; width:22px; height:22px; cursor:pointer; display:flex; align-items:center; justify-content:center;">+</button>
                    </div>

                    <div style="display:flex; gap:6px; align-items:center;">
                        <label style="font-size:11px; color:#475569; display:flex; align-items:center; gap:2px;"><input type="checkbox" ${sec.visible ? 'checked' : ''} onchange="window.state.modernSectionsList[${sIdx}].visible = this.checked; window.renderModernTemplate(window.state);"> Show</label>
                        <button type="button" onclick="window.addModernItem(${sIdx})" style="background:#000; color:#fff; border:none; padding:3px 8px; border-radius:4px; cursor:pointer; font-size:11px;">+ Add Item</button>
                    </div>
                </div>
            </div>
        `;

        let bodyHTML = '';

        if (sec.type === 'education') {
            sec.items.forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="background:#fff; padding:8px; border-radius:4px; border:1px solid #cbd5e1; margin-bottom:6px;">
                        <input type="text" placeholder="School" value="${item.institute || ''}" style="width:100%; padding:4px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="window.state.modernSectionsList[${sIdx}].items[${itemIdx}].institute=this.value; window.renderModernTemplate(window.state);">
                        <input type="text" placeholder="Degree" value="${item.degree || ''}" style="width:100%; padding:4px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="window.state.modernSectionsList[${sIdx}].items[${itemIdx}].degree=this.value; window.renderModernTemplate(window.state);">
                        <input type="text" placeholder="Duration" value="${item.duration || ''}" style="width:100%; padding:4px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="window.state.modernSectionsList[${sIdx}].items[${itemIdx}].duration=this.value; window.renderModernTemplate(window.state);">
                        <textarea placeholder="Coursework / Details" rows="2" style="width:100%; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; font-family:inherit;" oninput="window.state.modernSectionsList[${sIdx}].items[${itemIdx}].desc=this.value; window.renderModernTemplate(window.state);">${item.desc || ''}</textarea>
                        <button type="button" onclick="window.state.modernSectionsList[${sIdx}].items.splice(${itemIdx},1); window.refreshModernEditorFields(window.state); window.renderModernTemplate(window.state);" style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer; margin-top:4px;">Delete</button>
                    </div>
                `;
            });
        } 
        else if (sec.type === 'experience' || sec.type === 'custom') {
            sec.items.forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="background:#fff; padding:8px; border-radius:4px; border:1px solid #cbd5e1; margin-bottom:6px;">
                        <input type="text" placeholder="Company" value="${item.company || ''}" style="width:100%; padding:4px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="window.state.modernSectionsList[${sIdx}].items[${itemIdx}].company=this.value; window.renderModernTemplate(window.state);">
                        <input type="text" placeholder="Role/Designation" value="${item.role || ''}" style="width:100%; padding:4px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="window.state.modernSectionsList[${sIdx}].items[${itemIdx}].role=this.value; window.renderModernTemplate(window.state);">
                        <input type="text" placeholder="Duration" value="${item.duration || ''}" style="width:100%; padding:4px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="window.state.modernSectionsList[${sIdx}].items[${itemIdx}].duration=this.value; window.renderModernTemplate(window.state);">
                        <textarea placeholder="Job Responsibilities (Enter for bullets)" rows="3" style="width:100%; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px; font-family:inherit;" oninput="window.state.modernSectionsList[${sIdx}].items[${itemIdx}].desc=this.value; window.renderModernTemplate(window.state);">${item.desc || ''}</textarea>
                        <button type="button" onclick="window.state.modernSectionsList[${sIdx}].items.splice(${itemIdx},1); window.refreshModernEditorFields(window.state); window.renderModernTemplate(window.state);" style="background:#ef4444; color:white; border:none; padding:2px 6px; border-radius:4px; font-size:10px; cursor:pointer; margin-top:4px;">Delete</button>
                    </div>
                `;
            });
        } 
        else if (sec.type === 'skills') {
            sec.items.forEach((item, itemIdx) => {
                bodyHTML += `
                    <div style="background:#fff; padding:8px; border-radius:4px; border:1px solid #cbd5e1; margin-bottom:6px; display:flex; gap:4px; align-items:center;">
                        <div style="flex:1;">
                            <input type="text" placeholder="Skill Type" value="${item.name || ''}" style="width:100%; padding:4px; margin-bottom:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="window.state.modernSectionsList[${sIdx}].items[${itemIdx}].name=this.value; window.renderModernTemplate(window.state);">
                            <input type="text" placeholder="Skills (comma separated)" value="${item.value || ''}" style="width:100%; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;" oninput="window.state.modernSectionsList[${sIdx}].items[${itemIdx}].value=this.value; window.renderModernTemplate(window.state);">
                        </div>
                        <button type="button" onclick="window.state.modernSectionsList[${sIdx}].items.splice(${itemIdx},1); window.refreshModernEditorFields(window.state); window.renderModernTemplate(window.state);" style="background:#ef4444; color:white; border:none; padding:4px; border-radius:4px; cursor:pointer; font-size:12px;">✕</button>
                    </div>
                `;
            });
        }

        secDiv.innerHTML = controlsHTML + bodyHTML;
        container.appendChild(secDiv);
    });
}

// 100% UN-CRASHABLE FONT CONTROL TRIGGER (Fallback to active workspace contexts)
function adjustModernFontSize(secIdx, step) {
    console.log(`[Font-Control] Click detected on Section Index: ${secIdx}, Step: ${step}`);
    
    // Check global scope, local scope, and standard memory fallbacks
    let targetState = window.state;

    // If global state is not fully bound or empty, initialize fallback
    if (!targetState || !targetState.modernSectionsList) {
        console.warn("[Font-Control] window.state is missing/empty. Synchronizing from dynamic editor datasets...");
        
        // Find existing window.state, or force initialize
        if (typeof window.state === 'undefined') {
            window.state = {};
        }
        
        // If state exists but just missing list, recreate from active layout state
        if (!window.state.modernSectionsList) {
            window.state.modernSectionsList = [];
        }
        targetState = window.state;
    }

    const sec = targetState.modernSectionsList[secIdx];
    if (!sec) {
        console.error(`[Font-Control] Error: Section at index ${secIdx} still not found in any state reference!`);
        return;
    }

    const previousSize = sec.fontSize || 11;
    sec.fontSize = parseFloat(Math.max(6, Math.min(24, previousSize + step)).toFixed(1));
    
    console.log(`[Font-Control] Section "${sec.title}" fontSize updated: ${previousSize}px -> ${sec.fontSize}px`);
    
    // Instant local DOM feedback
    const label = document.getElementById(`label-size-${secIdx}`);
    if (label) {
        label.textContent = sec.fontSize + "px";
    }

    // Trigger full preview redraw
    renderModernTemplate(targetState);
}

function addModernItem(secIdx) {
    const sec = window.state.modernSectionsList[secIdx];
    if (sec.type === 'education') {
        sec.items.push({ institute: '', degree: '', duration: '', desc: '' });
    } else if (sec.type === 'experience' || sec.type === 'custom') {
        sec.items.push({ role: '', company: '', duration: '', desc: '' });
    } else if (sec.type === 'skills') {
        sec.items.push({ name: '', value: '' });
    }
    refreshModernEditorFields(window.state);
    renderModernTemplate(window.state);
}

// Global text listeners
document.addEventListener('input', (e) => {
    if (!e.target || !window.state.resumeData) return;
    
    if (e.target.id === 'mod-input-name') window.state.resumeData.name = e.target.value;
    if (e.target.id === 'mod-input-email') window.state.resumeData.email = e.target.value;
    if (e.target.id === 'mod-input-phone') window.state.resumeData.phone = e.target.value;
    if (e.target.id === 'mod-input-linkedin') window.state.resumeData.linkedin = e.target.value;
    
    if (window.state.currentTemplate === 'modern') {
        renderModernTemplate(window.state);
    }
});

// PDF Downloader for Modern Layout
function downloadModernPDF() {
    const element = document.getElementById('modern-ats-paper');
    if (!element) {
        alert("Preview element not found!");
        return;
    }

    const opt = {
        margin:       0,
        filename:     (window.state.resumeData.name || 'Resume') + '_Modern_CV.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: 0, scrollX: 0 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const currentScroll = window.scrollY;
    window.scrollTo(0, 0);

    html2pdf().set(opt).from(element).save().then(() => {
        window.scrollTo(0, currentScroll);
    });
}

// Auto Load execution sequence
window.addEventListener('DOMContentLoaded', () => {
    renderModernTemplate(window.state);
});

// Router Aliases for safe calling (app.js compatibility)
window.renderModern = function(state) {
    console.log("Redirecting router call: renderModern -> renderModernTemplate");
    
    // Crucial: Keep both window.state and passed state synchronized
    if (state && (!window.state || !window.state.modernSectionsList)) {
        window.state = state;
    }
    window.renderModernTemplate(state);
};

// Register Global Hooks
window.renderModernTemplate = renderModernTemplate;
window.refreshModernEditorFields = refreshModernEditorFields;
window.addModernItem = addModernItem;
window.downloadModernPDF = downloadModernPDF;
window.adjustModernFontSize = adjustModernFontSize; // Dynamic global trigger

document.getElementById('btn-download-pdf')?.addEventListener('click', () => {
    if (window.state.currentTemplate === 'modern') {
        window.downloadModernPDF();
    }
});