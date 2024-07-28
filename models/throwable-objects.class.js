class ThrowableObject extends MovableObject {
  offset = {
    left: 20,
    top: 20,
    right: 20,
    bottom: 20,
  };
  bottle_splash_audio = new Audio('./audio/bottle.mp3');

  IMAGES_ROTATE = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  IMAGES_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  /**
 * Constructs a new instance of the ThrowableObject class.
 */
  constructor(x, y, direction) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_ROTATE);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 75;
    this.otherDirection = direction;
    this.isSplashing = false;
    this.throw();
    this.animate();
    this.bottle_splash_audio.volume = 0.2;
  }

  /**
 * Applies gravity to the object and sets its speedY to 10. If otherDirection is true,
 */
  throw() {
    this.applyGravity();
    this.speedY = 10;
    if (this.otherDirection) {
      this.x -= 100;
      this.throwInterval = setInterval(() => {
        this.x -= 10;
      }, 25);
    } else {
      this.throwInterval = setInterval(() => {
        this.x += 10;
      }, 25);
    }
  }

  /**
 * Animates the object by continuously updating its image source and playing splash animation if it is not already splashing and is above the ground.
 */
  animate() {
    this.animateInterval = setInterval(() => {
      if (!this.isSplashing) {
        this.playAnimation(this.IMAGES_ROTATE);
        if (!this.isAboveGround()) {
          this.isSplashing = true;
          this.playSplashAnimation();
          if (!masterSound) {
            this.bottle_splash_audio.play();
          }
        }
      }
    }, 50);
  }

  /**
 * Plays the splash animation and deletes the object from the game after the animation is complete.
 */
  playSplashAnimation() {
    clearInterval(this.throwInterval);
    this.playAnimation(this.IMAGES_SPLASH);
    setTimeout(() => {
      this.deleteFromGame();
    }, this.IMAGES_SPLASH.length * 50);
  }

  /**
 * Deletes the object from the game by clearing the animation interval, setting the width and height to 0,
 */
  deleteFromGame() {
    clearInterval(this.animateInterval);
    this.width = 0;
    this.height = 0;
    this.x = -1000;
    this.y = -1000;
  }
}






