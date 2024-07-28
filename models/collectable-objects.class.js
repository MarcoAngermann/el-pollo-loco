class Coin extends MovableObject {
  height = 120;
  width = 120;
  IMAGES_COINS = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
  ];

  offset = {
    left: 35,
    top: 35,
    right: 35,
    bottom: 35,
  };

  /**
* Constructs a new instance of the class.
*/
  constructor() {
    super().loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.animate();
    this.randomizePosition();
  }

  /**
* Randomizes the position of the object by setting the x coordinate to a random value between 500 and 2200,
*/
  randomizePosition() {
    this.x = 500 + Math.random() * 1600;
    this.y = 60 + Math.random() * 100;
  }

  /**
* Animates the object by continuously playing the animation frames from the IMAGES_COINS array.
*/
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 300);
  }
}

class Bottle extends MovableObject {
  height = 90;
  width = 90;
  y = 355;
  static lastBottleX = 320;
  offset = { top: 10, bottom: 10, left: 30, right: 10 };

  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ]

  /**
* Constructs a new instance of the class.
*/
  constructor() {
    let randomize = Math.round(Math.random());
    super().loadImage(this.IMAGES_BOTTLE[randomize]);
    this.loadImages(this.IMAGES_BOTTLE);
    this.animate();
    this.setInitialPosition();
  }

  /**
* Sets the initial position of the object.
*/
  setInitialPosition() {
    this.x = this.width + 150 + Math.random() * 2000;
  }

  /**
* Animates the object by continuously playing the animation frames from the IMAGES_BOTTLE array.
*/
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 500);
  }
}

