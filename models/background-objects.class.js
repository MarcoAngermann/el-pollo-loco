class BackgroundObject extends MovableObject {
    height = 300;
    width = 720;
    y = 180;
    x = 0;
    constructor(imagePath) {
        super().loadImage(imagePath);
        
}
}