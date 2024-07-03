
class Chicken extends MovableObject {
height = 80;
width = 80;
y = 355;
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
        this.x = 250 + Math.random() * 800;
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
            this.playAnimation(this.IMAGES_WALKING);
            // this.chicken_audio.play();
        },200);
        
    }
}