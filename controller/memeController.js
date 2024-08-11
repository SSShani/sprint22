
function renderMeme(isForDownload=false){
    const memeContainer = document.getElementById("memeContainer") 
    memeContainer.innerHTML = `<canvas id="canvas" width="296" height="350"></canvas> `
    let gMeme = getMeme();
    let focusLine = getFocusLine();
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = `images/${gMeme.selectedImgId}.jpg`;
    
    let offsetX, offsetY;
    let isDragging    = false;
    let isResizing    = false;
    let handleSize    = 10;
    let currentHandle = null;

    function drawHandle(x, y) {
        if(isForDownload)
            return
        ctx.fillStyle="red"
        ctx.fillRect(x, y, handleSize, handleSize);
    }

    function drawline() {
        focusLine = getFocusLine();
        ctx.clearRect(image,0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0,0,canvas.width, canvas.height);
        if(!focusLine)return
        gMeme.lines.forEach((line,i)=>{
            const lineText = getLines(ctx, line.txt, line.width);
            const lineHeight = 16;
            const textHeight = lineText.length * lineHeight;
            const textY = line.y + (line.height - textHeight) / 2 + lineHeight; 
            ctx.font        = `${line.size}px Arial`;
            ctx.textAlign  = line.direction;
            if(line.border){
                ctx.strokeRect(line.x, line.y, line.width, line.height);
            }
            ctx.fillStyle = line.backgroundColor
            ctx.fillRect(line.x, line.y, line.width, line.height);

            lineText.forEach((_line, index) => {
                const textWidth = ctx.measureText(_line).width;
                const textX     = line.x +(line.width/2)
                ctx.fillStyle= line.color
                ctx.fillText(_line, textX, textY + index * lineHeight);
            });


            drawHandle(focusLine.x, focusLine.y);
            drawHandle(focusLine.x + focusLine.width - handleSize, focusLine.y);
            drawHandle(focusLine.x, focusLine.y + focusLine.height - handleSize);
            drawHandle(focusLine.x + focusLine.width - handleSize, focusLine.y + focusLine.height - handleSize);
        })
    }
    
    function isOverHandle(x, y) {
        if (x >= focusLine.x && x <= focusLine.x + handleSize && y >= focusLine.y && y <= focusLine.y + handleSize) return 'top-left';
        if (x >= focusLine.x + focusLine.width - handleSize && x <= focusLine.x + focusLine.width && y >= focusLine.y && y <= focusLine.y + handleSize) return 'top-right';
        if (x >= focusLine.x && x <= focusLine.x + handleSize && y >= focusLine.y + focusLine.height - handleSize && y <= focusLine.y + focusLine.height) return 'bottom-left';
        if (x >= focusLine.x + focusLine.width - handleSize && x <= focusLine.x + focusLine.width && y >= focusLine.y + focusLine.height - handleSize && y <= focusLine.y + focusLine.height) return 'bottom-right';
        return null;
    }


    function clickDown(e){
        if(isLineEmpty()) return

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        currentHandle = isOverHandle(mouseX, mouseY);
        
        gMeme.lines.forEach((line,i)=>{
            if(mouseX > line.x && mouseX < line.x + line.width && mouseY > line.y && mouseY < line.y + line.height){
                gMeme.selectedLineIdx = i
            }
        })
        drawline() 

        if (currentHandle) {isResizing = true;} 
        else if (mouseX > focusLine.x && mouseX < focusLine.x + focusLine.width &&
            mouseY > focusLine.y && mouseY < focusLine.y + focusLine.height) {
            isDragging = true;
            offsetX = mouseX - focusLine.x;
            offsetY = mouseY - focusLine.y;
        }
    }
    function clickMove(e){
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        if (isDragging) {
            const rect = canvas.getBoundingClientRect();
            focusLine.x = e.clientX - rect.left - offsetX;
            focusLine.y = e.clientY - rect.top - offsetY;
            drawline();
        }
        if (isResizing) {
            switch (currentHandle) {
                case 'top-left':
                    focusLine.width += focusLine.x - mouseX;
                    focusLine.height += focusLine.y - mouseY;
                    focusLine.x = mouseX;
                    focusLine.y = mouseY;
                    break;
                case 'top-right':
                    focusLine.width = mouseX - focusLine.x;
                    focusLine.height += focusLine.y - mouseY;
                    focusLine.y = mouseY;
                    break;
                case 'bottom-left':
                    focusLine.width += focusLine.x - mouseX;
                    focusLine.x = mouseX;
                    focusLine.height = mouseY - focusLine.y;
                    break;
                case 'bottom-right':
                    focusLine.width = mouseX - focusLine.x;
                    focusLine.height = mouseY - focusLine.y;
                    break;
            }
            drawline();
        }
    }
    function clickOut(e){
        isDragging = false;
        isResizing = false;
        currentHandle = null;
    }


    canvas.addEventListener('mousedown',clickDown);
    canvas.addEventListener('mousemove',clickMove);
    canvas.addEventListener('mouseup',clickOut);

    canvas.addEventListener('touchstart',clickDown);
    canvas.addEventListener('touchmove',clickMove);
    canvas.addEventListener('touchend',clickOut);

    image.onload=()=>  drawline()
}


function getLines(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}



document.getElementById('imgUpload').addEventListener('change', function(e) {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
        let img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            gMeme.selectedImgId = null; 
        };
    };

    reader.readAsDataURL(file);
});
