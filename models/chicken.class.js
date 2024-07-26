
class Chicken extends MovableObject {
height = 80;
width = 80;
y = 353;
isDead = false;
chicken_audio = new Audio('audio/chicken2.mp3');
offset = {
    left: 5,
    top: 5,
    right: 5,
    bottom: 5,
  };
IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
];
IMAGES_DEAD = [ 
  'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.randomizePosition();
        this.chicken_audio.volume = 0.01;
    }

    randomizePosition() {
      this.x = 650 + Math.random() * 1300;
     }
    
    animate() {
        setInterval(() => {
          this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
          if (this.isDead === false) {
            this.playAnimation(this.IMAGES_WALKING);
            if (!masterSound) {
              this.chicken_audio.play();
            }
          }
          if (this.isDead === true) {
            this.playAnimation(this.IMAGES_DEAD);
          }
        }, 100);
      }
    }
