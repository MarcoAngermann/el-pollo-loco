class StatusBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 5;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}

class StatusBarBottle extends DrawableObject {

    IMAGES = [
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ]
    percentageBottle = 0;
  
  
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 40;
      this.y = 60;
      this.width = 200;
      this.height = 60;
      this.setPercentageBottle(0);
    }
  
  
 
    setPercentageBottle(percentageBottle) {
      this.percentageBottle = percentageBottle;
      let path = this.IMAGES[this.setImagesPercentageBottle()];
      this.img = this.imageCache[path];
    }
  
    setImagesPercentageBottle() {
      if (this.percentageBottle == 0) {
        return 0;
      } else if (this.percentageBottle <= 20) {
        return 1;
      } else if (this.percentageBottle <= 40) {
        return 2;
      } else if (this.percentageBottle <= 60) {
        return 3;
      } else if (this.percentageBottle <= 80) {
        return 4;
      } else {
        return 5;
      }
    }
  }

  class StatusBarCoin extends DrawableObject {

    IMAGES = [
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ]
    percentageCoin = 0;
  
  
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 40;
      this.y = 115;
      this.width = 200;
      this.height = 60;
      this.setPercentageCoin(0);
    }
  
  
    /**
     * Set the percentage coin and update the image accordingly.
     *
     * @param {type} percentageCoin - the percentage coin to set
     * @return {type} the updated image based on the percentage coin
     */
    setPercentageCoin(percentageCoin) {
      this.percentageCoin = percentageCoin;
      let path = this.IMAGES[this.setImagesPercentageCoin()];
      this.img = this.imageCache[path];
    }
  
  
    /**
     * A description of the entire function.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    setImagesPercentageCoin() {
      if (this.percentageCoin == 100) {
        return 5;
      } else if (this.percentageCoin == 0) {
        return 0;
      } else if (this.percentageCoin <= 20) {
        return 1;
      } else if (this.percentageCoin <= 40) {
        return 2;
      } else if (this.percentageCoin <= 60) {
        return 3;
      } else if (this.percentageCoin <= 80) {
        return 4;
      } else {
        return 1;
      }
    }
  }