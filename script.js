const addPageBtn = document.getElementById("addPageBtn");
const pagesContainer = document.getElementById("pagesContainer");

addPageBtn.addEventListener("click", () => {

    const page1 = document.createElement("div");
    page1.className = "a4-preview page";

    const page2 = document.createElement("div");
    page2.className = "a4-preview page";

    pagesContainer.appendChild(page1);
    

});