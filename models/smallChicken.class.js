class smallChicken extends MovableObject {
    height = 40;
    width = 40;
    y = 395;
        constructor() {
            super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
            this.x = 200 + Math.random() * 500;
    }
    }