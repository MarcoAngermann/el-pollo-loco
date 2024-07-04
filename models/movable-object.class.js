class MovableObject extends DrawableObject {
    otherDirection = false;
    throwing = false;
    speedY = 0;
    acceleration = 0.8;
    speed = 5;
    energy = 100;
    energyBottle = 0;
    energyCoin = 0;
    energyEndboss = 100;
    lastHit = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      };

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 90;
        }
        
    }

    isColliding(moveobject) {
        return (this.x + this.width) >= moveobject.x && this.x <= (moveobject.x + moveobject.width) &&
               (this.y + this.height) >= moveobject.y &&
               (this.y) <= (moveobject.y + moveobject.height); // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    addEnergyBottle() {
        this.energyBottle += 20;
        if (this.energyBottle > 100) {
          this.energyBottle = 100;
        }
      }

      decreaseEnergyBottle() {
        this.energyBottle -= 20;
        if (this.energyBottle < 0) {
          this.energyBottle = 0;
        }
      }

      addEnergyCoin() {
        this.energyCoin += 20;
        if (this.energyCoin > 100) {
          this.energyCoin = 100;
        }
      }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        let img = this.imageCache[path];
        this.img = img;
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 15;
        this.jump_audio = new Audio('audio/jump1.mp3');
        this.jump_audio.play();
        this.jump_audio.volume = 0.1;
    }
}