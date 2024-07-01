class ThrowableObject extends MovableObject { 

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 75;
        this.width = 75;
        this.throw(100, 150);
    }

    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        },25);
    }
}