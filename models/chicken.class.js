
class Chicken extends MovableObject {
height = 80;
width = 80;
y = 355;
isDead = false;
offset = {
    left: 4,
    top: 4,
    right: 4,
    bottom: 4,
  };
IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        
        // this.chicken_audio = new Audio('audio/chicken1.mp3');
        // this.chicken_audio.volume = 0.02;
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
