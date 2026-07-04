// ============================================================
// AVATAR CLICK - Photo Upload (Fixed)
// ============================================================

// Directly attach event without waiting for DOMContentLoaded
(function() {
    function initAvatarUpload() {
        var avatarWrap = document.getElementById('avatarWrap');
        if (!avatarWrap) {
            // Agar avatarWrap nahi mila toh wait karein
            setTimeout(initAvatarUpload, 100);
            return;
        }
        
        avatarWrap.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Create file input
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.style.display = 'none';
            
            input.onchange = function(e) {
                var file = e.target.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function(ev) {
                        var img = document.createElement('img');
                        img.src = ev.target.result;
                        img.alt = 'Profile Photo';
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = '50%';
                        
                        var avatarWrap = document.getElementById('avatarWrap');
                        avatarWrap.innerHTML = '';
                        avatarWrap.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
                // Clean up
                document.body.removeChild(input);
            };
            
            input.oncancel = function() {
                document.body.removeChild(input);
            };
            
            // Append to body and trigger click
            document.body.appendChild(input);
            input.click();
        });
        
        console.log('Avatar upload initialized successfully!');
    }
    
    // Start initialization
    if (document.getElementById('avatarWrap')) {
        initAvatarUpload();
    } else {
        // Wait for DOM to load
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', initAvatarUpload);
        } else {
            // Fallback for older browsers
            window.onload = initAvatarUpload;
        }
    }
})();

// ============================================================
// EXPOSE FOR TEMPLATE SYSTEM
// ============================================================
function renderCorporateCleanTemplate(state) {
    // Template already rendered in HTML
    // This function is for compatibility with the template system
    
    // If state has photo, update avatar
    if (state && state.resumeData && state.resumeData.photo) {
        var avatarWrap = document.getElementById('avatarWrap');
        if (avatarWrap) {
            var img = document.createElement('img');
            img.src = state.resumeData.photo;
            img.alt = 'Profile Photo';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            avatarWrap.innerHTML = '';
            avatarWrap.appendChild(img);
        }
    }
}

window.renderCorporateCleanTemplate = renderCorporateCleanTemplate;