class smallChicken extends MovableObject {
    height = 45;
    width = 45;
    y = 380;
    isDeadsmallChicken = false;
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
        this.x = 230 + Math.random() * 900;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
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
        }, 200);
      }
    }