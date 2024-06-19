class Chicken extends MovableObject {

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.x = 200 + Math.random() * 500;
}
}