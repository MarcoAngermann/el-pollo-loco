class BackgroundObject extends MovableObject {
    height = 480;
    width = 720;

    constructor(imagePath, y ,x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
}
}