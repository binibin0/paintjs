const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d")
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")
const save = document.getElementById("jsSave")

const INITIAL_COLOR = "#2c2c2c";
const INITIAL_WIDTH = 1400;
const INITIAL_HEIGHT = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, INITIAL_WIDTH, INITIAL_HEIGHT);

canvas.width = INITIAL_WIDTH;
canvas.height = INITIAL_HEIGHT;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

ctx.lineWidth = 5;

let painting = false;
let filling = false;


function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX
    const y = event.offsetY
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y)
    } else {
        ctx.lineTo(x, y)
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const stroke = event.target.value;
    ctx.lineWidth = stroke;
}

function handleModeChange(event) {
    if (!filling) {
        filling = true;
        mode.innerText = "Paint"
    } else {
        mode.innerText = "Fill"
        filling = false;
    }
}

function handleFillCanvas() {
    if (filling) {
        ctx.fillRect(0, 0, INITIAL_WIDTH, INITIAL_HEIGHT);
    }
}

function handleSaveBtn(event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "image🎨";
    link.click();
}



if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("mousedown", handleFillCanvas)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (mode) {
    mode.addEventListener("click", handleModeChange)
}

if (save) {
    save.addEventListener("click", handleSaveBtn)
}