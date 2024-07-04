class ThrowableObject extends MovableObject { 

    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.x = x;
        this.y = y;
        this.height = 75;
        this.width = 75;
        this.throw(100, 150);
        this.otherDirection = false;
        this.throwing = false; 
        this.otherDirection = direction;
        this.animate();
    }
    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
      ];

    throw() {
        this.speedY = 10;
        this.applyGravity();
        this.throwing = true;
        if (this.otherDirection == true) {
          setInterval(() => {
            this.x -= 10;
          }, 25);
        } else {
          setInterval(() => {
            this.x += 10;
          }, 25);
        }
      }

      animate() {
        setInterval(() => {
          if (this.throwing) {
            this.playAnimation(this.IMAGES_ROTATE);
          }
        }, 1000 / 60);
      }
    }
