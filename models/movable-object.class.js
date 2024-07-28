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
  jump_audio = new Audio('audio/jump1.mp3');
  hurt_audio = new Audio('audio/hurt.mp3');

  /**
* Applies gravity to the object by continuously updating its position and speed.
*/
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0)
        this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 1000 / 60);
  }

  /**
 * Determines if the current object is above the ground.
 */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return this.y < 380;
    } else {
      return this.y < 90;
    }
  }

  /**
 * Checks if the current object is colliding with another object.
 */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
 * Reduces the energy of the object by the specified damage amount. If the object is not immune,
 */
  hit(damage = 10) {
    if (!this.immune) {
      this.immune = true;
      if (!masterSound) {
        this.hurt_audio.currentTime = 0;
        this.hurt_audio.play();
        this.hurt_audio.volume = 0.3;
      }
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

  /**
 * Increases the `energyBottle` property of the object by 20. If the result exceeds 100, it is capped at 100.
 */
  addEnergyBottle() {
    this.energyBottle += 20;
    if (this.energyBottle > 100) {
      this.energyBottle = 100;
    }
  }

  /**
 * Decreases the `energyBottle` property of the object by 20. If the result is less than 0, it is set to 0.
 */
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

  /**
* Checks if the object is hurt by comparing the time passed since the last hit with a threshold.
*/
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
* Checks if the object is dead by comparing its `energy` property to 0.
*/
  isDead() {
    return this.energy == 0;
  }

  /**
 * Plays the animation by updating the image source based on the current image index.
 */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    let img = this.imageCache[path];
    this.img.src = img.src;
    this.currentImage++;
  }

  /**
* Moves the object to the right by updating its x coordinate and sets the otherDirection flag to true.
*/
  moveRight() {
    this.x += this.speed;
    this.otherDirection = true;
  }

  /**
 * Moves the object to the left by updating its x coordinate and sets the otherDirection flag to false.
 */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = false;
  }

  /**
 * Sets the `speedY` property to 15 and plays the jump audio if `masterSound` is false.
 */
  jump() {
    this.speedY = 15;
    if (!masterSound) {
      this.jump_audio.currentTime = 0;
      this.jump_audio.play();
      this.jump_audio.volume = 0.1;
    }
  }
}