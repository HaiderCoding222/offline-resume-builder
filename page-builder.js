document.addEventListener("DOMContentLoaded", function() {
    // ===== STATE MANAGEMENT =====
    let history = [];
    let redoStack = [];
    let selectedText = null;
    let selectedBox = null;
    let textMode = false;
    const page = document.querySelector(".a4-preview");
    const createBtn = document.getElementById("createSection");

    // ===== CORE FUNCTIONS =====
    function saveState() {
        history.push(page.innerHTML);
        redoStack = [];
    }

    function rgbToHex(rgb) {
        if (!rgb || rgb.startsWith("#")) return rgb;
        const nums = rgb.match(/\d+/g);
        if (!nums) return "#ffffff";
        return "#" + nums.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, "0")).join("");
    }

    function selectBox(box) {
        if (!box) return;
        selectedBox = box;
        selectedText = null;
        
        document.querySelectorAll('.design-box').forEach(b => b.style.outline = "none");
        box.style.outline = "2px solid #4a90d9";
        
        const widthInput = document.getElementById("boxWidth");
        const heightInput = document.getElementById("boxHeight");
        const colorInput = document.getElementById("boxColor");
        const fontSize = document.getElementById("fontSize");
        const textColor = document.getElementById("textColor");
        const fontWeight = document.getElementById("fontWeight");
        const fontStyle = document.getElementById("fontStyle");
        const textDecInput = document.getElementById("textDecoration");
        const textAlignInput = document.getElementById("textAlign");
        
        if (widthInput) widthInput.value = parseInt(box.style.width) || 150;
        if (heightInput) heightInput.value = parseInt(box.style.height) || 150;
        if (colorInput) colorInput.value = rgbToHex(getComputedStyle(box).backgroundColor);
        if (fontSize) fontSize.value = parseInt(box.style.fontSize) || 18;
        if (textColor) textColor.value = rgbToHex(getComputedStyle(box).color);
        if (fontWeight) fontWeight.value = box.style.fontWeight || "400";
        if (fontStyle) fontStyle.value = box.style.fontStyle || "normal";
        if (textDecInput) textDecInput.value = box.style.textDecoration || "none";
        if (textAlignInput) textAlignInput.value = box.style.textAlign || "left";
    }

    function selectText(element) {
        if (!element) return;
        selectedText = element;
        selectedBox = null;
        
        const fontSize = document.getElementById("fontSize");
        const textColor = document.getElementById("textColor");
        const fontWeight = document.getElementById("fontWeight");
        const fontStyle = document.getElementById("fontStyle");
        const fontFamily = document.getElementById("fontFamily");
        const textTransform = document.getElementById("textTransform");
        const letterSpacing = document.getElementById("letterSpacing");
        const lineHeight = document.getElementById("lineHeight");
        const textDecoration = document.getElementById("textDecoration");
        const textAlign = document.getElementById("textAlign");
        
        const computedStyle = getComputedStyle(element);
        if (fontSize) fontSize.value = parseInt(element.style.fontSize) || parseInt(computedStyle.fontSize) || 14;
        if (textColor) textColor.value = rgbToHex(computedStyle.color);
        if (fontWeight) fontWeight.value = element.style.fontWeight || computedStyle.fontWeight || "400";
        if (fontStyle) fontStyle.value = element.style.fontStyle || computedStyle.fontStyle || "normal";
        if (fontFamily) fontFamily.value = element.style.fontFamily || computedStyle.fontFamily || "Arial";
        if (textTransform) textTransform.value = element.style.textTransform || "none";
        if (letterSpacing) letterSpacing.value = element.style.letterSpacing || "0px";
        if (lineHeight) lineHeight.value = element.style.lineHeight || "1";
        if (textDecoration) textDecoration.value = element.style.textDecoration || "none";
        if (textAlign) textAlign.value = element.style.textAlign || "left";
    }

    function makeDraggable(element) {
        let startX, startY, startLeft, startTop;

        element.addEventListener("mousedown", function(e) {
            if (element.contentEditable === "true") return;
            if (e.target.closest('input, select, button')) return;

            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(element.style.left) || element.offsetLeft || 0;
            startTop = parseInt(element.style.top) || element.offsetTop || 0;

            function move(ev) {
                ev.preventDefault();
                element.style.left = startLeft + (ev.clientX - startX) + "px";
                element.style.top = startTop + (ev.clientY - startY) + "px";
            }

            function stop() {
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", stop);
                saveState();
            }

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", stop);
        });

        element.addEventListener("click", function(e) {
            e.stopPropagation();
            if (element.classList.contains("design-box")) {
                selectBox(element);
            } else if (element.classList.contains("free-text")) {
                selectText(element);
            }
        });
    }

    function makeTextDraggable(element) {
        let startX, startY, startLeft, startTop;

        element.addEventListener("mousedown", function(e) {
            if (element.contentEditable === "true") return;
            if (e.target.closest('input, select, button')) return;

            e.stopPropagation();
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(element.style.left) || 0;
            startTop = parseInt(element.style.top) || 0;

            function move(ev) {
                element.style.left = startLeft + (ev.clientX - startX) + "px";
                element.style.top = startTop + (ev.clientY - startY) + "px";
            }

            function stop() {
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", stop);
                saveState();
            }

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", stop);
        });

        element.addEventListener("dblclick", function(e) {
            e.stopPropagation();
            element.contentEditable = true;
            if (element.innerHTML === "") {
                element.innerHTML = "";
            }
            element.focus();
            selectText(element);
        });

        element.addEventListener("blur", function() {
            element.contentEditable = false;
        });

        element.addEventListener("click", function(e) {
            e.stopPropagation();
            selectText(element);
        });
    }

    function updateTextProperties() {
        if (!selectedText) return;
        
        const fontSize = document.getElementById("fontSize");
        const textColor = document.getElementById("textColor");
        const fontWeight = document.getElementById("fontWeight");
        const fontStyle = document.getElementById("fontStyle");
        const fontFamily = document.getElementById("fontFamily");
        const textTransform = document.getElementById("textTransform");
        const letterSpacing = document.getElementById("letterSpacing");
        const lineHeight = document.getElementById("lineHeight");
        const textDecoration = document.getElementById("textDecoration");
        const textAlign = document.getElementById("textAlign");
        
        if (fontSize) selectedText.style.fontSize = fontSize.value + "px";
        if (textColor) selectedText.style.color = textColor.value;
        if (fontWeight) selectedText.style.fontWeight = fontWeight.value;
        if (fontStyle) selectedText.style.fontStyle = fontStyle.value;
        if (fontFamily) selectedText.style.fontFamily = fontFamily.value;
        if (textTransform) selectedText.style.textTransform = textTransform.value;
        if (letterSpacing) selectedText.style.letterSpacing = letterSpacing.value;
        if (lineHeight) selectedText.style.lineHeight = lineHeight.value;
        if (textDecoration) selectedText.style.textDecoration = textDecoration.value;
        if (textAlign) selectedText.style.textAlign = textAlign.value;
    }

    function updateBoxProperties() {
        if (!selectedBox) return;
        
        const width = document.getElementById("boxWidth");
        const height = document.getElementById("boxHeight");
        const color = document.getElementById("boxColor");
        
        if (width) selectedBox.style.width = width.value + "px";
        if (height) selectedBox.style.height = height.value + "px";
        if (color) selectedBox.style.background = color.value;
    }

    // ===== EVENT LISTENERS =====

    // Create Section Button
    if (createBtn) {
        createBtn.addEventListener("click", function() {
            const box = document.createElement("div");
            box.className = "design-box";
            box.contentEditable = false;
            box.style.position = "absolute";
            box.style.width = "150px";
            box.style.height = "150px";
            box.style.background = "#3498db";
            box.style.left = "20px";
            box.style.top = "20px";
            box.style.padding = "10px";
            box.style.boxSizing = "border-box";
            box.style.border = "none";
            box.style.overflow = "visible";
            box.style.fontSize = "18px";
            box.style.fontWeight = "400";
            box.style.fontStyle = "normal";
            box.style.textDecoration = "none";
            box.style.textAlign = "left";
            box.style.color = "#ffffff";
            box.style.cursor = "move";

            page.appendChild(box);
            saveState();
            selectBox(box);
            makeDraggable(box);
        });
    }

    // Box Properties
    document.getElementById("boxWidth").addEventListener("input", function() {
        if (selectedBox) {
            selectedBox.style.width = this.value + "px";
            saveState();
        }
    });

    document.getElementById("boxHeight").addEventListener("input", function() {
        if (selectedBox) {
            selectedBox.style.height = this.value + "px";
            saveState();
        }
    });

    document.getElementById("boxColor").addEventListener("input", function() {
        if (selectedBox) {
            selectedBox.style.background = this.value;
            saveState();
        }
    });

    // Movement Controls
    document.getElementById("moveUp").addEventListener("click", function() {
        if (selectedBox) {
            selectedBox.style.top = (parseInt(selectedBox.style.top) || 0) - 10 + "px";
            saveState();
        }
    });

    document.getElementById("moveDown").addEventListener("click", function() {
        if (selectedBox) {
            selectedBox.style.top = (parseInt(selectedBox.style.top) || 0) + 10 + "px";
            saveState();
        }
    });

    document.getElementById("moveLeft").addEventListener("click", function() {
        if (selectedBox) {
            selectedBox.style.left = (parseInt(selectedBox.style.left) || 0) - 10 + "px";
            saveState();
        }
    });

    document.getElementById("moveRight").addEventListener("click", function() {
        if (selectedBox) {
            selectedBox.style.left = (parseInt(selectedBox.style.left) || 0) + 10 + "px";
            saveState();
        }
    });

    // Text Formatting
    document.getElementById("fontSize").addEventListener("input", function() {
        if (selectedText) {
            selectedText.style.fontSize = this.value + "px";
            saveState();
        }
    });

    document.getElementById("textColor").addEventListener("input", function() {
        if (selectedText) {
            selectedText.style.color = this.value;
            saveState();
        }
    });

    document.getElementById("fontWeight").addEventListener("change", function() {
        if (selectedText) {
            selectedText.style.fontWeight = this.value;
            saveState();
        }
    });

    document.getElementById("fontStyle").addEventListener("change", function() {
        if (selectedText) {
            selectedText.style.fontStyle = this.value;
            saveState();
        }
    });

    document.getElementById("fontFamily").addEventListener("change", function() {
        if (selectedText) {
            selectedText.style.fontFamily = this.value;
            saveState();
        }
    });

    document.getElementById("textTransform").addEventListener("change", function() {
        if (selectedText) {
            selectedText.style.textTransform = this.value;
            saveState();
        }
    });

    document.getElementById("letterSpacing").addEventListener("change", function() {
        if (selectedText) {
            selectedText.style.letterSpacing = this.value;
            saveState();
        }
    });

    document.getElementById("lineHeight").addEventListener("change", function() {
        if (selectedText) {
            selectedText.style.lineHeight = this.value;
            saveState();
        }
    });

    document.getElementById("textDecoration").addEventListener("change", function() {
        if (selectedText) {
            selectedText.style.textDecoration = this.value;
            saveState();
        }
    });

    document.getElementById("textAlign").addEventListener("change", function() {
        if (selectedText) {
            selectedText.style.textAlign = this.value;
            saveState();
        }
    });

    // Draw Line Button
    document.getElementById("drawLineBtn").addEventListener("click", function() {
    const line = document.createElement("div");
    line.className = "design-box design-line";
    line.contentEditable = false;
    line.style.position = "absolute";
    line.style.width = "200px";
    line.style.height = "1px";
    line.style.minHeight = "1px";
    line.style.backgroundColor = "#000000";
    line.style.transform = "scaleY(0.1)";
    line.style.transformOrigin = "top";
    line.style.lineHeight = "0";
    line.style.fontSize = "0px";
    line.style.left = "40px";
    line.style.top = "40px";
    line.style.border = "none";
    line.style.cursor = "move";
    line.style.boxSizing = "border-box";
    line.style.overflow = "hidden";

    page.appendChild(line);
    saveState();
    selectBox(line);
    makeDraggable(line);
});

    // Add Text Button
    document.getElementById("addTextBtn").addEventListener("click", function() {
        textMode = true;
        page.style.cursor = "text";
    });

    // Page Click for Text Placement
    page.addEventListener("click", function(e) {
        if (!textMode) return;
        if (e.target.closest('.design-box') || e.target.closest('.free-text')) return;

        const text = document.createElement("div");
        text.className = "free-text";
        text.contentEditable = true;
        text.innerHTML = "";
        text.style.position = "absolute";
        text.style.left = e.offsetX + "px";
        text.style.top = e.offsetY + "px";
        text.style.cursor = "move";
        text.style.outline = "none";
        text.style.minWidth = "50px";
        text.style.fontSize = "14px";
        text.style.color = "#000000";
        text.style.fontWeight = "400";
        text.style.fontStyle = "normal";
        text.style.fontFamily = "Arial";
        text.style.textDecoration = "none";
        text.style.textAlign = "left";

        page.appendChild(text);
        saveState();
        makeTextDraggable(text);
        selectText(text);
        text.focus();
        textMode = false;
        page.style.cursor = "default";
    });

    // Selection Handler
    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("design-box")) {
            selectBox(e.target);
        } else if (e.target.classList.contains("free-text")) {
            selectText(e.target);
        }
    });

    // Undo/Redo
    document.getElementById("undoBtn").addEventListener("click", function() {
        if (history.length > 1) {
            const currentState = history.pop();
            redoStack.push(currentState);
            page.innerHTML = history[history.length - 1];
            selectedBox = null;
            selectedText = null;
        }
    });

    document.getElementById("redoBtn").addEventListener("click", function() {
        if (redoStack.length > 0) {
            const state = redoStack.pop();
            page.innerHTML = state;
            history.push(state);
            selectedBox = null;
            selectedText = null;
        }
    });

    // Theme Toggle
    document.getElementById("themeToggleBtn").addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        const icon = this.querySelector("i");
        if (document.body.classList.contains("dark-mode")) {
            icon.className = "fas fa-sun";
        } else {
            icon.className = "fas fa-moon";
        }
    });

    // Reset Button
    document.getElementById("resetBtnNav").addEventListener("click", function() {
        if (confirm("Are you sure you want to reset everything?")) {
            page.innerHTML = "";
            history = [];
            redoStack = [];
            selectedBox = null;
            selectedText = null;
            saveState();
        }
    });

    // Keyboard Shortcuts
    document.addEventListener("keydown", function(e) {
        if (e.ctrlKey && e.key === "z") {
            e.preventDefault();
            document.getElementById("undoBtn").click();
        }
        if (e.ctrlKey && e.key === "y") {
            e.preventDefault();
            document.getElementById("redoBtn").click();
        }
        if (e.key === "Delete" || e.key === "Backspace") {
            if (selectedBox && !e.target.closest('input, select, textarea')) {
                if (confirm("Delete selected element?")) {
                    selectedBox.remove();
                    selectedBox = null;
                    saveState();
                }
            }
        }
    });

    // Initialize
    saveState();
});