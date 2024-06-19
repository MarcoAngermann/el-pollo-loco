class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()   
];

clouds = [
    new Cloud()
];

backgroundObjects = [
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png')
];

ctx;
canvas;
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
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
        this.ctx.drawImage(moveobject.img, moveobject.x, moveobject.y, moveobject.width, moveobject.height);
    }
}

