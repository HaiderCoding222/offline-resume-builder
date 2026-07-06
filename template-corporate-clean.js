// ============================================================
// CORPORATE CLEAN TEMPLATE - Self Contained Behavior + Drag/Copy/Delete
// ============================================================

(function() {
    'use strict';

    function initCorporateClean() {
        
        // Wait until template is fully loaded in DOM
        const checkTemplateLoaded = setInterval(() => {
            const page = document.querySelector('.page');
            if (!page) return;

            clearInterval(checkTemplateLoaded);
            
            console.log('Corporate Clean Template Initialized with Drag/Copy/Delete');

            // ================== 1. HIDE EDITOR PANEL ==================
            const editorPanel = document.querySelector('.editor-panel');
            const previewPanel = document.querySelector('.preview-panel');
            const splitScreen = document.querySelector('.split-screen');

            if (editorPanel) {
                editorPanel.style.display = 'none';
            }
            if (previewPanel) {
                previewPanel.style.flex = '1';
            }
            if (splitScreen) {
                splitScreen.style.flexDirection = 'column';
            }

            // ================== 2. SYNC GLOBAL STATE ==================
            syncStateToTemplate();

            // ================== 3. PHOTO UPLOAD ==================
            setupPhotoUpload();

            // ================== 4. PDF Optimization ==================
            optimizeForPDF();

            // ================== 5. DRAG, COPY, DELETE ==================
            initDraggableItems();
            makeBulletPointsCopyable();

        }, 100);
    }

    // Sync data from global state
    function syncStateToTemplate() {
        if (typeof state === 'undefined') return;

        const nameEl = document.querySelector('.name');
        const roleEl = document.querySelector('.role');
        const profileEl = document.querySelector('.profile-text');

        if (nameEl && state.resumeData.name) nameEl.textContent = state.resumeData.name;
        if (roleEl && state.resumeData.title) roleEl.textContent = state.resumeData.title;
        if (profileEl && state.resumeData.summary) profileEl.textContent = state.resumeData.summary;

        // Photo Sync
        if (state.resumeData.photo) {
            const avatarWrap = document.getElementById('avatarWrap');
            if (avatarWrap) {
                let img = avatarWrap.querySelector('img');
                if (!img) {
                    img = document.createElement('img');
                    avatarWrap.innerHTML = '';
                    avatarWrap.appendChild(img);
                }
                img.src = state.resumeData.photo;
                img.style.cssText = 'width:100%; height:100%; object-fit:cover; border-radius:50%;';
            }
        }
    }

    // Photo Upload Handler
    function setupPhotoUpload() {
        const avatarWrap = document.getElementById('avatarWrap');
        if (!avatarWrap) return;

        avatarWrap.style.cursor = 'pointer';
        avatarWrap.title = 'Click to change photo';

        avatarWrap.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.style.display = 'none';

            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(ev) {
                        const img = document.createElement('img');
                        img.src = ev.target.result;
                        img.style.cssText = 'width:100%; height:100%; object-fit:cover; border-radius:50%;';
                        
                        const wrap = document.getElementById('avatarWrap');
                        wrap.innerHTML = '';
                        wrap.appendChild(img);

                        if (typeof state !== 'undefined') {
                            state.resumeData.photo = ev.target.result;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            };

            document.body.appendChild(input);
            input.click();
            document.body.removeChild(input);
        });
    }

    // PDF Print Optimization
    function optimizeForPDF() {
        const page = document.querySelector('.page');
        if (page) {
            page.style.boxShadow = 'none';
            page.style.borderRadius = '0';
        }
    }

    // ==================== DRAG, COPY & DELETE FUNCTIONALITY ====================

    function initDraggableItems() {
        const draggableSelectors = '.job, .edu-item, .tag-list li';

        document.querySelectorAll(draggableSelectors).forEach(item => {
            makeItemDraggable(item);
            addActionButtons(item);
        });
    }

    function makeItemDraggable(item) {
        item.setAttribute('draggable', 'true');
        item.style.position = 'relative';
        item.style.cursor = 'grab';

        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', '');
            item.classList.add('dragging');
            setTimeout(() => item.style.opacity = '0.4', 0);
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
            item.style.opacity = '1';
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            if (dragging && dragging !== item) {
                const rect = item.getBoundingClientRect();
                const midpoint = rect.top + rect.height / 2;
                
                if (e.clientY < midpoint) {
                    item.parentNode.insertBefore(dragging, item);
                } else {
                    item.parentNode.insertBefore(dragging, item.nextSibling);
                }
            }
        });
    }

    function addActionButtons(item) {
        let toolbar = item.querySelector('.item-toolbar');
        if (!toolbar) {
            toolbar = document.createElement('div');
            toolbar.className = 'item-toolbar';
            toolbar.style.cssText = `
                position: absolute; 
                top: 8px; 
                right: 8px; 
                display: flex; 
                gap: 6px; 
                opacity: 0; 
                transition: opacity 0.2s;
                z-index: 20;
                background: rgba(255,255,255,0.95);
                padding: 4px;
                border-radius: 6px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            `;
            item.appendChild(toolbar);
        }

        // Copy Button
        const copyBtn = createActionButton('📋', 'Copy Item', () => {
            const clone = item.cloneNode(true);
            
            // Remove old toolbar from clone
            clone.querySelectorAll('.item-toolbar').forEach(t => t.remove());
            
            item.parentNode.insertBefore(clone, item.nextSibling);
            
            // Re-initialize the cloned item
            makeItemDraggable(clone);
            addActionButtons(clone);
        });

        // Delete Button
        const deleteBtn = createActionButton('🗑️', 'Delete Item', () => {
            if (confirm('Are you sure you want to delete this item?')) {
                item.remove();
            }
        });

        toolbar.appendChild(copyBtn);
        toolbar.appendChild(deleteBtn);

        // Show/Hide toolbar on hover
        item.addEventListener('mouseenter', () => toolbar.style.opacity = '1');
        item.addEventListener('mouseleave', () => toolbar.style.opacity = '0');
    }

    function createActionButton(icon, title, onClick) {
        const btn = document.createElement('button');
        btn.innerHTML = icon;
        btn.title = title;
        btn.style.cssText = `
            width: 32px; 
            height: 32px; 
            border: none; 
            border-radius: 4px; 
            background: #1b3a63; 
            color: white; 
            font-size: 16px; 
            cursor: pointer;
            display: flex; 
            align-items: center; 
            justify-content: center;
        `;
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            onClick();
        });
        return btn;
    }

    // Fix bullet points copy issue (Language, Expertise, Job bullets)
    function makeBulletPointsCopyable() {
        document.querySelectorAll('.tag-list li, .job ul li').forEach(li => {
            li.style.userSelect = 'text';
            li.style.webkitUserSelect = 'text';
            li.style.cursor = 'text';
        });
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCorporateClean);
    } else {
        initCorporateClean();
    }

})();

// Expose render function for compatibility
function renderCorporateCleanTemplate(state) {
    setTimeout(() => {
        const nameEl = document.querySelector('.name');
        if (nameEl && state?.resumeData?.name) nameEl.textContent = state.resumeData.name;
    }, 300);
}

window.renderCorporateCleanTemplate = renderCorporateCleanTemplate;