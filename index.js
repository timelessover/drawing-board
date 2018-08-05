var yyy = document.getElementById('canvas')

windowHeightAandWidth()
window.onresize = function(){
    windowHeightAandWidth()
}

var ctx = yyy.getContext('2d');
var using = false
var lastPoint = {x:undefined,y:undefined}
//按下去鼠标
yyy.onmousedown = function(a){

    var x = a.clientX
    var y = a.clientY
    if (eraserEnabled ) {
        using = true
        ctx.clearRect(x-5,y-5,10,10)
    }else{
        using = true
        lastPoint = { "x": x, "y": y }
    }
  
}
//动鼠标
yyy.onmousemove = function(a){
    var x = a.clientX
    var y = a.clientY
        if (eraserEnabled){
        if(using){
            ctx.clearRect(x-5, y-5, 10, 10)
        }
    }else{
        if(using){
            var newPoint = { 'x': x, 'y': y }
            drawCircle(x, y, 1)
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }

    }
    }
//松开鼠标
yyy.onmouseup = function(aaa){
    using = false
}
function drawCircle(x, y, radius) {
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
}
function drawLine(x1,y1,x2,y2){
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.moveTo(x1,y1)
    ctx.lineWidth = 3
    ctx.lineTo(x2,y2)
    ctx.stroke()
    ctx.closePath()
}
function windowHeightAandWidth() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    yyy.width = pageWidth
    yyy.height = pageHeight
}
/*****/
var eraserEnabled = false

eraser.onclick = function(){
    eraserEnabled = !eraserEnabled
}