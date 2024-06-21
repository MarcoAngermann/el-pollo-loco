class BackgroundObject extends MovableObject {
    height = 480;
    width = 720;

    constructor(imagePath, y ,x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
        // this.background_music = new Audio('audio/background2.mp3');
        // this.background_music.volume = 0.03;
        // this.background_music.play();
}
}

