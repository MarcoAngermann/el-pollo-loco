class World {
    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    constructor(canvas, keyboard) {
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
        
    }
    addObjectsToMap(objects){
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(moveobject) {
        if(moveobject.otherDirection){
            this.ctx.save();
            this.ctx.translate(moveobject.width,0);
            this.ctx.scale(-1,1);
            moveobject.x = moveobject.x * -1;

        }
        this.ctx.drawImage(moveobject.img, moveobject.x, moveobject.y, moveobject.width, moveobject.height);
        if(moveobject.otherDirection){
            moveobject.x = moveobject.x * -1;
            this.ctx.restore();
        }
    }
}

