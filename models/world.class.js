class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
];

clouds = [
    new Cloud()
];

backgroundObjects = [
    new BackgroundObject('img/5_background/layers/air.png', 0 , 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 180 , 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 180 , 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 180 , 0),
    
];


ctx;
canvas;
keyboard;
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
        
        
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

        requestAnimationFrame(()=>this.draw())
        
    }
    addObjectsToMap(objects){
        objects.forEach((object) => {
            this.addToMap(object);
        })
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

