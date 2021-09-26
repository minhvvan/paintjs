const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext('2d')
const colors = document.getElementsByClassName('jsColor')
const strokeSizeRange = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')
const save = document.getElementById('jsSave')

const INITIAL_COLOR = '#2c2c2c'
const CANVAS_SIZE = 700


canvas.width = 700
canvas.height = 700

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = 2.5

let painting = false
let filling = false

function stopPainting() {
    painting = false
}

function startPainting() {
    painting = true
}

function onMouseMove(event) {
    const x = event.offsetX
    const y = event.offsetY
    if(!painting){
        ctx.beginPath()
        ctx.moveTo(x, y)
    }else{
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}

function handleCanvasClick(event) {
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}

function handleCM(event) {
    event.preventDefault()
}

if(canvas){
    canvas.addEventListener('mousemove',onMouseMove)
    canvas.addEventListener('mousedown',startPainting)
    canvas.addEventListener('click',handleCanvasClick)
    canvas.addEventListener('mouseup',stopPainting)
    canvas.addEventListener('mouseleave',stopPainting)
    canvas.addEventListener('contextmenu', handleCM)
}

//NOTE color change
function handleColorClick(event) {
    const color = event.target.style.backgroundColor
    console.log(color);
    ctx.strokeStyle = color
    ctx.fillStyle = color
}

if(colors){
    Array.from(colors).forEach(color => 
        color.addEventListener('click',handleColorClick)
    )
}


//NOTE stroke size
function handleRangeChange(event) {
    const strokeSize = event.target.value
    ctx.lineWidth = strokeSize * 2
}

if(strokeSizeRange){
    strokeSizeRange.addEventListener('input',handleRangeChange)
}


//NOTE mode
function handleModeClick(evnet) {
    if(filling){
        filling = false
        mode.innerText = 'Fill'
    }else{
        filling = true
        mode.innerText = 'paint'
    }
}

if(mode){
    mode.addEventListener('click',handleModeClick)
}


//NOTE save
function handleClickSave(event) {
    const img = canvas.toDataURL('image/jpeg')
    const link = document.createElement('a')
    link.href = img
    link.download = 'PaintJS[🎨]'
    link.click()
}

if(save){
    save.addEventListener('click',handleClickSave)
}