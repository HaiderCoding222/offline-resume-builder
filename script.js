const addPageBtn = document.getElementById("addPageBtn");
const pagesContainer = document.getElementById("pagesContainer");

addPageBtn.addEventListener("click", () => {

    const page1 = document.createElement("div");
    page1.className = "a4-preview page";

    const page2 = document.createElement("div");
    page2.className = "a4-preview page";

    pagesContainer.appendChild(page1);
    

});
document.querySelectorAll('button, .add-btn, .theme-toggle').forEach(btn => {
  btn.addEventListener('touchend', function(e) {
    e.preventDefault();
    this.click();
  }, { passive: false });
});

// Improved touch handling for draggable elements
function makeDraggableTouch(element) {
  let touchStartX, touchStartY, startLeft, startTop;
  
  element.addEventListener("touchstart", function(e) {
    if (element.contentEditable === "true") return;
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    startLeft = parseInt(element.style.left) || element.offsetLeft || 0;
    startTop = parseInt(element.style.top) || element.offsetTop || 0;
  }, { passive: true });

  element.addEventListener("touchmove", function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    element.style.left = startLeft + (touch.clientX - touchStartX) + "px";
    element.style.top = startTop + (touch.clientY - touchStartY) + "px";
  }, { passive: false });

  element.addEventListener("touchend", function() {
    saveState();
  }, { passive: true });
}