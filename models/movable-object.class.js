class MovableObject {
    x = 120;
    y = 330;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.8;

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0)
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 60);
    }

    isAboveGround() {
      return this.y < 90;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        let img = this.imageCache[path];
        this.img = img;
        this.currentImage++;
    }
    
    moveRight() {
        console.log("moveRight");
        
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}