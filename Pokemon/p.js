const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

ctx.fillStyle = "white"
ctx.fillRect(0,0,canvas.width,canvas.height)
const map = new Image()
map.src = "./img/my map.png"
const foreground_img = new Image()
foreground_img.src ="./img/foreground.png"
const p_down = new Image()
p_down.src ="./img/playerDown.png"
const p_up = new Image()
p_up.src ="./img/playerUp.png"
const p_left = new Image()
p_left.src ="./img/playerLeft.png"
const p_right = new Image()
p_right.src ="./img/playerRight.png"

let up = false
let down = false
let left = false
let right = false
let last_pressed = ""
let running = false
const block_z = 48
const offset_x = -1025
const offset_y = -400



const player = new Sprite({
    position :{
        x:canvas.width/2-192/4/2,
        y:canvas.height/2-68/2+50
    },
    image : p_down,
    frames : {
        max: 4
    },
    sprites:{
        up:p_up,
        down:p_down,
        left:p_left,
        right:p_right
    }
})

const boundaries = []
col_map.forEach((row,i) => {
    row.forEach((s,j) =>{
        if (s == 1025){
            boundaries.push(new Boundary({
                position : {
                    x: j*block_z + offset_x,
                    y: i*block_z + offset_y
                }
            }))
        }  
    })
});


const background = new Sprite({
    position : {
        x:offset_x,
        y:offset_y
    },
    image : map
})
const foreground = new Sprite({
    position : {
        x:offset_x,
        y:offset_y
    },
    image : foreground_img
})

window.addEventListener("keydown" , (e)=>{
    switch (e.key) {
        case "Shift":    
            running = true
            break;
        case "ArrowLeft":    
            left = true
            last_pressed = "left"
            break;
        case "ArrowRight":
            right = true
            last_pressed = "right"
            break;
        case "ArrowUp":
            up = true
            last_pressed = "up"
            break;
        case "ArrowDown":
            down = true
            last_pressed = "down"
            break;
    }
})
window.addEventListener("keyup" , (e)=>{
    switch (e.key) {
        case "Shift":    
            running = false
            break;
        case "ArrowLeft":
            left = false
            break;
        case "ArrowRight":
            right = false
            break;
        case "ArrowUp":
            up = false
            break;
        case "ArrowDown":
            down = false
            break;
    }
})



const movables = [background,...boundaries,foreground]

function rectangularCollision(rectangle1,rectangle2){
    return (rectangle1.position.x+rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x+rectangle2.width &&
        rectangle1.position.y+rectangle1.height >= rectangle2.position.y &&
        rectangle1.position.y <= rectangle2.position.y+rectangle2.height
        )
}
function move(){
    let v = 3
    let moving = true
    if (running){
        v+=3
        player.running = true
    }else{
        player.running = false
    }
    player.moving = false
    if (left && last_pressed == "left"){
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i<boundaries.length; i++){
            if (rectangularCollision(player,{...boundaries[i],position:{x:boundaries[i].position.x+3,y:boundaries[i].position.y}})){
                moving = false
                break
            }
        }
        if (moving)movables.forEach(k=>{k.position.x+=v})
    }
    if (right && last_pressed == "right" ){
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i<boundaries.length; i++){
            if (rectangularCollision(player,{...boundaries[i],position:{x:boundaries[i].position.x-3,y:boundaries[i].position.y}})){
                moving = false
                break
            }
        }
        if (moving)movables.forEach(k=>{k.position.x-=v})
    }
    if (up && last_pressed == "up"){
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i<boundaries.length; i++){
            if (rectangularCollision(player,{...boundaries[i],position:{x:boundaries[i].position.x,y:boundaries[i].position.y+3}})){
                moving = false
                break
            }
        }
        if (moving)movables.forEach(k=>{k.position.y+=v})
    }
    if (down && last_pressed == "down"){
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i<boundaries.length; i++){
            if (rectangularCollision(player,{...boundaries[i],position:{x:boundaries[i].position.x,y:boundaries[i].position.y-3}})){
                moving = false
                break
            }
        }
        if (moving)movables.forEach(k=>{k.position.y-=v})
    }
}
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    player.draw()
    move()
    foreground.draw()
}

animate()
