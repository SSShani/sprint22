function renderEditor(){
    let editor = document.getElementById("editor")
    let gMeme = getMeme();

    editor.innerHTML = `
        <input type="text" id="setTextInp" value="${gMeme.lines[gMeme.selectedLineIdx].txt}">
        
        <div class="flex-inline-start">
            <button id="upBtn"> ↑ </button>
            <button id="downBtn"> ↓ </button>
            <button id="switchBtn"> ↑↓ </button>
            <button id="addLinesBtn"> + </button>
            <button id="delete"> X </button>
        </div>

        <div id="editor-para-container" class="flex-inline-space-between">
            <button id="incBtn"> A↑ </button>
            <button id="decBtn"> A↓ </button>
            <button id="alignLeftBtn"> ltr </button>
            <button id="alignCenterBtn"> cen </button>
            <button id="alignRigthBtn"> rtl </button>
            
            <select id="IMPACT"></select>
            <input id="strokColorBtn" type="color"/> 
            <input id="setColorInp" type="color"/> 

            <button id="clearBtn"> clear </button>

        </div>
        
        <div id="stickers"></div>
        
        <div id="editor-para-container" class="flex-inline-space-between">
            <button id="downloadBtn"> Download </button>
            <button id="shareBtn"> share </button>
        </div>

    `

    let inpText = document.getElementById("setTextInp")
    let inpColor = document.getElementById("setColorInp")
    let strokColor = document.getElementById("strokColorBtn")

    let alignLeft = document.getElementById("alignLeftBtn")
    let alignCenter = document.getElementById("alignCenterBtn")
    let alignRigth = document.getElementById("alignRigthBtn")
    let downloadBtn = document.getElementById("downloadBtn")
    let upBtn       = document.getElementById("upBtn")
    let downBtn     = document.getElementById("downBtn")
    let switchBtn   = document.getElementById("switchBtn")
    let addLinesBtn = document.getElementById("addLinesBtn")
    let removeBtn   = document.getElementById("delete")
    let incBtn      = document.getElementById("incBtn")
    let decBtn      = document.getElementById("decBtn")
    let clear       = document.getElementById("clearBtn")

    const setInpText = ()=> {
        inpText.value =gMeme.lines[gMeme.selectedLineIdx].txt;
    }

    inpText.oninput     = function(){setLineTxt(inpText.value) ; setInpText(); }
    inpColor.onchange   = function(){setColorText(inpColor.value);}
    strokColor.onchange = function(){setStrokColor(strokColor.value);}

    clear.onclick       = function(){setStrokColor("rgba(255, 255, 255, 0)");}
    upBtn.onclick       = function(){selectedLineIdxDown(); setInpText();}
    downBtn.onclick     = function(){selectedLineIdxUp(); setInpText();}
    removeBtn.onclick   = function(){removeLine(); setInpText();}
    switchBtn.onclick   = function(){switchLines(); setInpText();}
    addLinesBtn.onclick = function(){addLine("Empty",20,"red"); setInpText();}
    incBtn.onclick      = function(){increaseFont();}
    decBtn.onclick      = function(){decreaseFont();}

    alignLeft.onclick     = function(){setDirection("left");}
    alignCenter.onclick   = function(){setDirection("center");}
    alignRigth.onclick    = function(){setDirection("right");}



    downloadBtn.onclick = function(){
        renderMeme(true)

        setTimeout(()=>{
            let canvas = document.getElementById("canvas")
            let dataURL = canvas.toDataURL("image/png");
            var downloadLink = document.createElement('a');
            
            downloadLink.innerHTML = "לחץ כאן כדי להוריד"
            downloadLink.href = dataURL;
            downloadLink.download = 'myCanvasImage.png';
            editor.appendChild(downloadLink)
        },300)
    }
}


