
var gImgs = [
    {id: 1, url: 'images/1.jpg', keywords: ['funny', 'cat']},
    {id: 2, url: 'images/2.jpg', keywords: ['funny', 'cat']},
    {id: 3, url: 'images/3.jpg', keywords: ['funny', 'cat']},
    {id: 4, url: 'images/4.jpg', keywords: ['funny', 'cat']},
    {id: 5, url: 'images/5.jpg', keywords: ['funny', 'cat']},
    {id: 6, url: 'images/6.jpg', keywords: ['funny', 'cat']},
    {id: 7, url: 'images/7.jpg', keywords: ['funny', 'cat']},
    {id: 8, url: 'images/8.jpg', keywords: ['funny', 'cat']},
    {id: 9, url: 'images/9.jpg', keywords: ['funny', 'cat']},
    {id: 10, url: 'images/10.jpg', keywords: ['funny', 'cat']},
    {id: 11, url: 'images/11.jpg', keywords: ['funny', 'cat']},
    {id: 12, url: 'images/12.jpg', keywords: ['funny', 'cat']},
    {id: 13, url: 'images/13.jpg', keywords: ['funny', 'cat']},
    {id: 14, url: 'images/14.jpg', keywords: ['funny', 'cat']},
    {id: 15, url: 'images/15.jpg', keywords: ['funny', 'cat']},
    {id: 16, url: 'images/16.jpg', keywords: ['funny', 'cat']},
    {id: 17, url: 'images/17.jpg', keywords: ['funny', 'cat']},
    {id: 18, url: 'images/18.jpg', keywords: ['funny', 'cat']},
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes ',
            size: 20,
            color:"black",
            x:50,
            y:100,
            width:200,
            height:40,
            borderRadius:0,
            border:0,
            backgroundColor:"rgba(255, 255, 255, 0)",
            direction :"right",
        },
    ]
}
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

setInterval(()=>{console.log(gMeme)},2000)


function getMeme() {return gMeme;}
function getImgs(filters=[]) {
    if(filters.length == 0)
        return gImgs;

    let ret = []
    for(let i=0;i<gImgs.length;i++){
        for(let j=0;j<gImgs[i].length;j++){
            for(let k=0;k<filters.length;k++){
                if(gImgs[i][j] == filters[k]){
                    ret.push(gImgs[i])
                }
            }
        }
    }
    return ret;
}
function isLineEmpty(){return gMeme.lines.length == 0}
function getFocusLine(){return gMeme.lines[gMeme.selectedLineIdx]}
function addLine(txt,size,color){
    gMeme.lines.push({txt,size,color,borderRadius:0,direction :"right",border:0,x:0,y:0,width:200,height:40,backgroundColor:"rgba(255, 255, 255, 0)"})
    gMeme.selectedLineIdx++
    renderMeme()
}

function removeLine(){
    if(gMeme.lines.length>0){
        gMeme.lines = gMeme.lines.filter((val,i)=>{
            if(i != gMeme.selectedLineIdx)  return val;
        })
        gMeme.selectedLineIdx = 0
        renderMeme()
    }
    else console.log("אין שורות למחיקה")
}

function setImg(imgId) {
    gMeme.selectedImgId =imgId;
    renderMeme()
}
function setLineTxt(txt){
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    renderMeme()
}
function setDirection(direction){
    gMeme.lines[gMeme.selectedLineIdx].direction = direction
    renderMeme()
}
function selectedLineIdxUp(){
    if(gMeme.lines[gMeme.selectedLineIdx+1]){
        gMeme.selectedLineIdx++
        renderMeme()
    }
}
function selectedLineIdxDown(){
    if(gMeme.selectedLineIdx>0 && gMeme.lines[gMeme.selectedLineIdx-1]){
        gMeme.selectedLineIdx--
        renderMeme()
    }
    else console.log("לא ניתן לרדת מתחת ל0")   
}
function switchLines(){
    if(gMeme.lines.length == 2){
        gMeme.lines = gMeme.lines.reverse() 
        renderMeme()
    }
    else console.log("אין כרגע 2 שורות")
}
function setColorText(color){
    if(gMeme.lines[gMeme.selectedLineIdx]){
        gMeme.lines[gMeme.selectedLineIdx].color = color
        renderMeme()
    }
    else console.log("יש ליצור שורה קודם")
}
function setStrokColor(color){
    if(gMeme.lines[gMeme.selectedLineIdx]){
        gMeme.lines[gMeme.selectedLineIdx].backgroundColor = color
        renderMeme()
    }
    else console.log("יש ליצור שורה קודם")
}
function increaseFont(){
    if(gMeme.lines[gMeme.selectedLineIdx]){
        gMeme.lines[gMeme.selectedLineIdx].size++
        renderMeme()
    }
    else console.log("יש ליצור שורה קודם")

}
function decreaseFont(){
    if(gMeme.lines[gMeme.selectedLineIdx]){
        gMeme.lines[gMeme.selectedLineIdx].size--
        renderMeme()
    }
    else console.log("יש ליצור שורה קודם")

}


