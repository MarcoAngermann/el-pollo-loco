class BackgroundObject extends MovableObject {
    height = 300;
    width = 720;

    constructor(imagePath, y ,x) {
        super().loadImage(imagePath);
        this.y = y;
        this.x = x;
}
}