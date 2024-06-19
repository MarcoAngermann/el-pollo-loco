class Chicken extends MovableObject {
height = 80;
width = 80;
y = 360;
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.x = 200 + Math.random() * 500;
}
}