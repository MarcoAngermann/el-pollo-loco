class Cloud extends MovableObject {
  y = 0;
  height = 250;
  static lastCloudX = 50; // Startposition der ersten Wolke auf der x-Achse

  /**
* Constructs a new Cloud object and initializes its properties.
*/
  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');
    this.width = 500;
    this.setInitialPosition();
    this.moveClouds();
  }

  /**
* Sets the initial position of the cloud object.
*/
  setInitialPosition() {
    this.x = Cloud.lastCloudX + 250;
    Cloud.lastCloudX += this.width + 50 + Math.random() * 50;
  }

  /**
* Moves the clouds by updating their x position every frame at a rate of 60 frames per second.
*/
  moveClouds() {
    setInterval(() => {
      this.x -= 0.2;
    }, 1000 / 60);
  }
}



