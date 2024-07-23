class ThrowableObject extends MovableObject {
  offset = {
    left: 20,
    top: 20,
    right: 20,
    bottom: 20,
  };

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
  }

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

  animate() {
    this.animateInterval = setInterval(() => {
      if (!this.isSplashing) {
        this.playAnimation(this.IMAGES_ROTATE);
        if (!this.isAboveGround()) {
          this.isSplashing = true;
          this.playSplashAnimation();
        }
      }
    }, 50);
  }

  playSplashAnimation() {
    clearInterval(this.throwInterval); 
    this.playAnimation(this.IMAGES_SPLASH);
    setTimeout(() => {
      this.deleteFromGame();
    }, this.IMAGES_SPLASH.length * 50); 
  }

  deleteFromGame() {
    clearInterval(this.animateInterval);
    this.width = 0;
    this.height = 0;
    this.x = -1000;
    this.y = -1000;
  }
}





    
