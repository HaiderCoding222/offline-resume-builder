// ============================================================
// AVATAR CLICK - Photo Upload
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    var avatarWrap = document.getElementById('avatarWrap');
    
    if (avatarWrap) {
        avatarWrap.style.cursor = 'pointer';
        
        avatarWrap.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            var fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            
            fileInput.onchange = function(event) {
                var file = event.target.files[0];
                if (!file) return;
                
                var reader = new FileReader();
                reader.onload = function(e) {
                    var img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '50%';
                    
                    avatarWrap.innerHTML = '';
                    avatarWrap.appendChild(img);
                };
                reader.readAsDataURL(file);
                
                if (fileInput.parentNode) {
                    fileInput.parentNode.removeChild(fileInput);
                }
            };
            
            document.body.appendChild(fileInput);
            fileInput.click();
        });
        
        console.log('✅ Avatar upload ready!');
    } else {
        console.warn('⚠️ avatarWrap element not found!');
    }
});

// ============================================================
// PDF DOWNLOAD - Fixed
// ============================================================
function downloadResumePDF() {
    var page = document.querySelector('.page');
    if (!page) {
        alert('Resume not found!');
        return;
    }

    var btn = document.querySelector('.btn-download-pdf');
    if (btn) {
        btn.textContent = '⏳ Generating...';
        btn.disabled = true;
    }

    // Clone the page for PDF
    var clone = page.cloneNode(true);
    clone.style.width = '850px';
    clone.style.minHeight = '1180px';
    clone.style.transform = 'none';
    clone.style.margin = '0 auto';
    clone.style.boxShadow = 'none';
    clone.style.borderRadius = '0';
    clone.style.background = '#ffffff';
    clone.style.position = 'relative';
    clone.style.left = 'auto';
    clone.style.top = 'auto';
    
    // Remove contenteditable outlines for print
    var editables = clone.querySelectorAll('[contenteditable="true"]');
    editables.forEach(function(el) {
        el.removeAttribute('contenteditable');
        el.style.outline = 'none';
        el.style.background = 'transparent';
        el.style.boxShadow = 'none';
        el.style.padding = '0';
        el.style.margin = '0';
    });
    
    // Remove hover effects
    var style = document.createElement('style');
    style.textContent = `
        * { outline: none !important; }
        [contenteditable="true"] { outline: none !important; background: transparent !important; }
        .avatar-wrap:hover::after { display: none !important; }
        .page { box-shadow: none !important; }
        .wave-top, .wave-bottom { display: block !important; }
    `;
    clone.appendChild(style);

    // Create temporary container
    var tempDiv = document.createElement('div');
    tempDiv.style.position = 'fixed';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '850px';
    tempDiv.style.background = 'white';
    tempDiv.style.padding = '0';
    tempDiv.style.margin = '0';
    tempDiv.style.zIndex = '99999';
    tempDiv.appendChild(clone);
    document.body.appendChild(tempDiv);

    // Use html2pdf
    if (typeof html2pdf !== 'undefined') {
        var opt = {
            margin: 0,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false,
                width: 850,
                height: 1180,
                scrollY: 0,
                windowHeight: 1180
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            },
            pagebreak: { mode: 'avoid-all' }
        };
        
        html2pdf().set(opt).from(tempDiv).save().then(function() {
            if (tempDiv.parentNode) {
                tempDiv.parentNode.removeChild(tempDiv);
            }
            if (btn) {
                btn.textContent = '📥 Download PDF';
                btn.disabled = false;
            }
        }).catch(function(err) {
            console.error('PDF Error:', err);
            if (tempDiv.parentNode) {
                tempDiv.parentNode.removeChild(tempDiv);
            }
            if (btn) {
                btn.textContent = '📥 Download PDF';
                btn.disabled = false;
            }
            alert('Error generating PDF. Please try again.');
        });
    } else {
        alert('html2pdf library not loaded! Please check your internet connection.');
        if (tempDiv.parentNode) {
            tempDiv.parentNode.removeChild(tempDiv);
        }
        if (btn) {
            btn.textContent = '📥 Download PDF';
            btn.disabled = false;
        }
    }
}

// ============================================================
// EXPOSE FUNCTIONS
// ============================================================
window.downloadResumePDF = downloadResumePDF;
window.renderCorporateCleanTemplate = function(state) {
    if (state && state.resumeData && state.resumeData.photo) {
        var avatarWrap = document.getElementById('avatarWrap');
        if (avatarWrap) {
            var img = document.createElement('img');
            img.src = state.resumeData.photo;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            avatarWrap.innerHTML = '';
            avatarWrap.appendChild(img);
        }
    }
};

console.log('✅ Resume template loaded!');
console.log('📥 To download PDF, click the Download PDF button');