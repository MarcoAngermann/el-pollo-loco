class smallChicken extends MovableObject {
    height = 50;
    width = 50;
    y = 380;
    isDead = false;
    offset = {
        left: 4,
        top: 4,
        right: 4,
        bottom: 4,
      };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
      ];
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 730 + Math.random() * 900;
        // this.x = 610;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.randomizePosition();
    }

    randomizePosition() {
      this.x = 700 + Math.random() * 1500;
     }
    animate() {
        setInterval(() => {
          this.moveLeft();
        }, 1000 / 60);
    
        setInterval(() => {
          if (this.isDead === false) {
            this.playAnimation(this.IMAGES_WALKING);
          }
          if (this.isDead === true) {
            this.playAnimation(this.IMAGES_DEAD);
          }
        }, 100);
      }
    }