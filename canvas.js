const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

cvs.width = cvs.offsetWidth
cvs.height = cvs.offsetHeight
const pi = Math.PI
const w = cvs.width
const h = cvs.height
const springStart = [w/1.9, h/12]
const springLineWidth = w/50
const springWidth = w/8

function playAnimation(m, x) {
    ctx.clearRect(0, 0, w, h)
    const persent = (40 - Math.abs(20 - x)) / 40
    const circleRds = (Math.cbrt(m)*11)*2
    drawSpringBase()
    drawSpring((h-springWidth*2.5)*persent, circleRds)
}

function drawSpringBase() {
    ctx.beginPath();
    ctx.fillStyle = 'gray'
    ctx.strokeStyle = 'gray'
    ctx.lineWidth = springLineWidth;
    ctx.fillRect((w/3), 0, (w/2.5), (h/40))
    ctx.moveTo(springStart[0], 0)
    ctx.lineTo(springStart[0], springStart[1])
}

function drawSpring(to, r) {
    ctx.lineCap = 'butt'
    ctx.lineWidth = springLineWidth/2;
    ctx.strokeStyle = 'gray'
    const springLength = (to + springStart[1]) - springStart[1]
    const springStep = springLength/8
    const leftSide = springStart[0] - (springWidth/2)
    const rightSide = springStart[0] + (springWidth/2)

    ctx.moveTo(springStart[0], springStart[1])
    let step = springStart[1]
    
    for (let i = 0; i <= 9; i++) {
        if (!i) {
            step += springStep/2
            ctx.lineTo(leftSide, step)
        } 
        else if (i < 9) {
            step += springStep
            ctx.lineTo(i % 2 === 0 ? leftSide : rightSide, step)
        } 
        else {
            step += springStep/2
            ctx.lineTo(springStart[0], step)
        }
    } 
    ctx.stroke()
    drawCircle(springStart[0], step, r)
}

function drawCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y+2*r, r, 0, pi*2, false);
    ctx.moveTo(x, y+r)
    ctx.lineTo(x, y)
    ctx.stroke();
}
