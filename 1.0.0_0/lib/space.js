let w, h;
const ctx = canvas.getContext("2d");
const { sin, cos, PI, hypot, min, max } = Math;

function generate() {
    const pts = many(333, () => {
        return {
            x: rnd(innerWidth),
            y: rnd(innerHeight),
            len: 0,
            r: 0
        };
    });
    
    const pts2 = many(9, (i) => {
        return {
            x: cos((i / 9) * PI * 2),
            y: sin((i / 9) * PI * 2)
        };
    });
    
    let seed = rnd(100)
    let tx = rnd(innerWidth); 
    let ty = rnd(innerHeight);
    let x = rnd(innerWidth)
    let y = rnd(innerHeight)
    let kx = rnd(0.5, 0.5)
    let ky = rnd(0.5, 0.5)
    let walkRadius = pt(rnd(50,50), rnd(50,50))
   let r = innerWidth / rnd(100, 150);
    

  
    return {
        follow(x,y) {
            tx = x;
            ty = y;
        },
        
        tick(t) {
        
    const selfMoveX = cos(t*kx+seed)*walkRadius.x        
    const selfMoveY = sin(t*ky+seed)*walkRadius.y      
    let fx = tx + selfMoveX;         
    let fy = ty + selfMoveY; 
            
    x += min(innerWidth/100, (fx - x)/10)
    y += min(innerWidth/100, (fy - y)/10)
            
    let i = 0
    pts.forEach((pt) => {
        const dx = pt.x - x,
            dy = pt.y - y;
        const len = hypot(dx, dy);
        let r = min(2, innerWidth / len / 5);
        pt.t = 0;
        const increasing = len < innerWidth / 10 
            && (i++) < 8;
        let dir = increasing ? 0.1 : -0.1;
        if (increasing) {
            r *= 1.5;
        }
        pt.r = r;
        pt.len = max(0, min(pt.len + dir, 1));
        drawCircle(pt.x, pt.y, pt.r);
    });

            
                   
        } 
    }
}

const greatPoints = many(2, generate)
window.addEventListener("pointermove", (e) => {
    greatPoints.forEach(point => {
        point.follow(e.clientX, e.clientY)
    })
});

requestAnimationFrame(function animate(t) {
    if (w !== innerWidth) w = canvas.width = innerWidth;
    if (h !== innerHeight) h = canvas.height = innerHeight;
    ctx.fillStyle = "#000";
    drawCircle(0, 0, w * 10);
    ctx.fillStyle = ctx.strokeStyle = "white";
    t/=1000
    greatPoints.forEach(point => point.tick(t))
    requestAnimationFrame(animate);
});

function rnd(x = 1, dx = 0) {
    return Math.random() * x + dx;
}

function drawCircle(x, y, r, color) {
    // ctx.fillStyle = "color";you may play with it
    ctx.beginPath();
    ctx.ellipse(x, y, r, r, 0, 0, PI * 2);
    ctx.fill();
}


function many(n, f) {
    return [...Array(n)].map((_, i) => f(i));
}

function pt(x,y){
    return {x,y}
}

document.documentElement.classList = 'dark';