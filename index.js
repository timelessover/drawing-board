var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');
autoSetCanvasSize(canvas)
listenTOUser(canvas)
function drawCircle(x, y, radius) {
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
}
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    if (ctx.lineWidth === 1){
        ctx.lineWidth=lineWidth = 5
    }else{
        ctx.lineWidth = lineWidth
    }
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
}
black.onclick = function () {
    ctx.strokeStyle = 'black'
    black.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    red.classList.remove('active')
}
red.onclick = function(){
    ctx.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
green.onclick = function(){
    ctx.strokeStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function () {
    ctx.strokeStyle = 'blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
    black.classList.remove('active')
}
thin.onclick = function(){
    lineWidth = 5
}
thick.onclick = function(){
    lineWidth = 8
}
clear.onclick = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
download.onclick = function(){
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画'
    a.click()
}
var eraserEnabled = false
/********/ 
function listenTOUser(canvas){
    var using = false
    var lastPoint = { x: undefined, y: undefined }
    //特性检测
    if(document.body.ontouchstart !== undefined){
        canvas.ontouchstart = function(a){
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { "x": x, "y": y }
            }
        }
        canvas.ontouchmove = function(a){
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (!using) { return }
            if (eraserEnabled) {

                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {

                var newPoint = { 'x': x, 'y': y }
                drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function(){
            using = false
        }
    }else{
        //按下去鼠标
        canvas.onmousedown = function (a) {

            var x = a.clientX
            var y = a.clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 20, 20)
                canvas.style.cursor = 'url("imgs/eraser.ico"), auto'
            } else {
                lastPoint = { "x": x, "y": y }
                canvas.style.cursor = 'url("imgs/pen.ico"), auto'
            }

        }
        //动鼠标
        canvas.onmousemove = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (!using) { return }
            if (eraserEnabled) {

                ctx.clearRect(x - 5, y - 5, 20, 20)
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
            canvas.style.cursor = 'auto'
        }
    }
    }
    

/*****/
var eraserEnabled = false

pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
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