class World {
    character = new Character();
    level = level1;
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
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions(moveobject) {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    console.log('HIT', enemy);
                }
            })
        }, 200);
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }
    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(moveobject) {
        if (moveobject.otherDirection) {
            this.flipImage(moveobject);

        }
        moveobject.draw(this.ctx);
        moveobject.drawFrame(this.ctx);

        if (moveobject.otherDirection) {
            this.flipImageBack(moveobject);
        }
    }

    flipImage(moveobject) {
        this.ctx.save();
        this.ctx.translate(moveobject.width, 0);
        this.ctx.scale(-1, 1);
        moveobject.x = moveobject.x * -1;
    }
    
    flipImageBack(moveobject) {
        moveobject.x = moveobject.x * -1;
        this.ctx.restore();
    }
}



