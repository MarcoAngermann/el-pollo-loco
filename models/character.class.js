class Character extends MovableObject {
    x = 10;
    y  = 90;
    height = 350;
    width = 150;
    speed = 5;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;
    
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.walking_sound = new Audio('audio/walking.mp3');
        this.walking_sound.volume = 1.0;
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if((this.world.keyboard.RIGHT || this.world.keyboard.D) && this.x < this.world.level.level_end_x){
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }
        },1000 / 60);
        setInterval(() => {
            if((this.world.keyboard.LEFT || this.world.keyboard.A) && this.x > 0){
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        },1000 / 60);
        
        setInterval(() => {
            if(this.world.keyboard.LEFT || this.world.keyboard.RIGHT){
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        },50);     
    }
    jump() {

    }
}