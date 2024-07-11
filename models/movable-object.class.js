class MovableObject extends DrawableObject {
    speedIfAngry = 0.2;
    otherDirection = false;
    throwing = false;
    speedY = 0;
    acceleration = 0.8;
    speed = 5;
    energy = 100;
    energyBottle = 0;
    energyCoin = 0;
    energyEndboss = 100;
    immune = false;
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

    isColliding(mo) {
        return (
          this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
          this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
          this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
          this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
      }

    hit(damage = 5) {
      if (!this.immune) {
          this.immune = true;
          this.playSoundHurt = new Audio('audio/hurt.mp3');
          this.playSoundHurt.play();
          this.playSoundHurt.volume = 0.4;
          this.energy -= damage; // Verwendet den übergebenen Schadenswert oder den Standardwert 5
          if (this.energy < 0) {
              this.energy = 0;
          } else {
              this.lastHit = new Date().getTime();
          }
          setTimeout(() => {
              this.immune = false;
          }, 1500);
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
        this.img.src = img.src; 
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