class Sprite{
    constructor({position,velocity,image,frames = {max:1},sprites}){
        this.position = position
        this.image = image
        this.frames = {...frames,val:0,elapsed:0}
        this.image.onload = ()=>{
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        } 
        this.moving = false
        this.sprites = sprites
        this.running = false
    }
    draw(){
        ctx.drawImage(this.image,
            this.frames.val*this.width,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
             this.image.width/this.frames.max,
             this.image.height)
        if (this.moving){
            if (this.frames.max>1){
                this.frames.elapsed++
            }
            if ((this.frames.elapsed % 10 == 0 && !this.running) || (this.frames.elapsed % 5 == 0 && this.running)) {
                if (this.frames.val<this.frames.max-1)this.frames.val++
                else this.frames.val = 0
            }   
        }
    }
}

class Boundary{
    constructor({position}){
        this.position = position
        this.width = block_z
        this.height = block_z
    }
    draw(){
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}