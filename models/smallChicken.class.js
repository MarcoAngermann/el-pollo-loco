class smallChicken extends MovableObject {
    height = 40;
    width = 40;
    y = 395;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 230 + Math.random() * 900;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        },200);
        
    }
    }