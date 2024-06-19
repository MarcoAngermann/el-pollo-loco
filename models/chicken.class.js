class Chicken extends MovableObject {
height = 80;
width = 80;
y = 355;
IMAGES_WALKING_CHICKEN = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING_CHICKEN);
        this.x = 200 + Math.random() * 500;
        this.animate();
    }
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING_CHICKEN.length;
            let path = this.IMAGES_WALKING_CHICKEN[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        },200);
     
    }
}