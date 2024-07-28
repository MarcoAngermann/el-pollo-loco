class DrawableObject {
    x = 120;
    y = 330;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    /**
 * Loads an image from the specified path.
 */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
 * Draws the image on the specified context.
 */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading Image', e);
            console.log('Could not load image ', this.img.src);
        }
    }

    /**
 * Loads multiple images from the given array of paths and stores them in the imageCache object.
 */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
 * Draws a blue frame around the object on the given context if the object is an instance of Character, Chicken, Endboss, smallChicken, Coin, or Bottle.
 */
    drawFrame(ctx) {
        if (this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Endboss ||
            this instanceof smallChicken ||
            this instanceof Coin ||
            this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "blue";
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.right - this.offset.left,
                this.height - this.offset.bottom - this.offset.top
            );
            ctx.stroke();
        }
    }
}

