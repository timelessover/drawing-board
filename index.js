var yyy = document.getElementById('canvas')
var ctx = yyy.getContext('2d');
autoSetCanvasSize(yyy)
linstenToMouse(yyy)
var eraserEnabled = false
/********/ 
function linstenToMouse(canvas){
    var using = false
    var lastPoint = { x: undefined, y: undefined }
    //按下去鼠标
    canvas.onmousedown = function (a) {

        var x = a.clientX
        var y = a.clientY
        using = true
        if (eraserEnabled) {
            ctx.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = { "x": x, "y": y }
        }

    }
    //动鼠标
    canvas.onmousemove = function (a) {
        var x = a.clientX
        var y = a.clientY
        if(!using){return}
        if (eraserEnabled) {
            
                ctx.clearRect(x - 5, y - 5, 10, 10)
        } else {
           
                var newPoint = { 'x': x, 'y': y }
                drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
        }
    }
    //松开鼠标
    canvas.onmouseup = function (aaa) {
        using = false
    }
    function drawCircle(x, y, radius) {
        ctx.beginPath()
        ctx.fillStyle = 'black'
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
    }
    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath()
        ctx.strokeStyle = 'black'
        ctx.moveTo(x1, y1)
        ctx.lineWidth = 3
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.closePath()
    }
}

/*****/
var eraserEnabled = false

eraser.onclick = function(){
    eraserEnabled = !eraserEnabled
    if(!eraserEnabled){
        eraser.textContent = "橡皮擦"
    } else{
        eraser.textContent = "画笔"
    }
}


function autoSetCanvasSize(canvas) {
    setCanvasSize()
    window.onresize = function () {
        setCanvasSize()
    }
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}