function renderGallery(){
    let images = getImgs();
    
    let gallery = document.getElementById("gallery")
    gallery.innerHTML = `
        <input list="keywords" id="searchInp" placeholder="Filter images by keyword">
        <datalist id="keywords">
            <option value="funny">
            <option value="cat">
            <option value="baby">
            <option value="bad">
        </datalist>
        <button id="randomMemeBtn">Create Random Meme</button>
        <button id="clearFilterBtn">Clear Filter</button>
    `;

    let randomMemeBtn = document.getElementById("randomMemeBtn");
    randomMemeBtn.onclick = function() {
        createRandomMeme();
    };

    document.getElementById("searchInp").addEventListener("input", filterImages);
    document.getElementById("clearFilterBtn").onclick = function() {
        document.getElementById("searchInp").value = '';
        renderGallery()
    };

    let gridGallery = document.createElement("div");
    gridGallery.id = "gridGallery"
    gallery.appendChild(gridGallery);

    images.forEach(img=>{
        let item = document.createElement("div")
        item.className = "gallery-item"
        item.innerHTML = `<img src="${img.url}"/>`
        item.onclick = ()=>{ changePage("meme") ;onImgSelect(img.id); }
        gridGallery.appendChild(item)
    })
}


function filterImages() {
    const filter = document.getElementById("searchInp").value.toLowerCase();
    const filteredImgs = gImgs.filter(img => img.keywords.includes(filter));
    renderFilteredGallery(filteredImgs);
}


function renderFilteredGallery(images) {
    let gridGallery = document.getElementById("gridGallery");
    gridGallery.innerHTML = ''

    images.forEach(img => {
        let item = document.createElement("div");
        item.className = "gallery-item";
        item.innerHTML = `<img src="${img.url}"/>`;
        item.onclick = () => { changePage("meme"); onImgSelect(img.id); };
        gridGallery.appendChild(item);
    });
}

document.getElementById("searchInp").addEventListener("input", filterImages)
document.getElementById("clearFilterBtn").onclick = function() {
    document.getElementById("searchInp").value = ''
    renderGallery() // 
};




function createRandomMeme() {
    
    const randomIndex = Math.floor(Math.random() * gImgs.length);
    const randomImg = gImgs[randomIndex];
    
    gMeme.selectedImgId = randomImg.id;
    gMeme.lines = [{ txt: 'Your text here', size: 20, color: "black", x: 50, y: 100 }];
    gMeme.selectedLineIdx = 0;
    
    changePage("meme");
}



function onImgSelect(id){
    setImg(id)
}