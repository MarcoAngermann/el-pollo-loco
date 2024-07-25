class Endboss extends MovableObject {
  speedIfAngry = 5;
  speed = 2.5;
  isDead = false;
  inDamage = false;
  isAlert = false;
  moveLeftAngry = false;
  aggressive = false;
  endbossImmune = false;
  energyEndboss = 100;
  
    y = -25
    height = 500
    width = 300
    offset = {
        top: 80,
        bottom: 30,
        left: 15,
        right: 15
      }
      world;

      IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
      ];
    
      IMAGES_IDLE = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
      ];
    
      IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
      ];
    
      IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
      ];
    
      IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
      ];
    
      IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    
      ];

constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ALERT);
    this.moveLeftAngry = false;
    this.otherDirection = false;
    this.x = 2300;
    this.animate();
    
}
hitBottleEndboss() {
  this.inDamage = true;
  setTimeout(() => {
    this.inDamage = false;
  }, 400);
}

decreaseEnergyEndboss() {
  if (!this.endbossImmune) {
    this.endbossImmune = true;
    this.energyEndboss -= 21;
    this.speed += 0.3;
    if (this.energyEndboss < 0) {
      this.energyEndboss = 0;
      this.isDeadEndboss();
    } else {
      this.lastHit = new Date().getTime();
    }
    setTimeout(() => {
      this.endbossImmune = false;
    }, 200);
  }
  this.checkAngryEndboss();
}

checkAngryEndboss() {
  if (this.energyEndboss <= 20) {
    this.isAlert = true;
    this.moveLeftAngry = false;
    // // setTimeout(() => {
    // //   if (!masterSound) {
    // //     this.alert_sound.play();
    // //   }
    // }, 10);
    setTimeout(() => {
      this.isAlert = false;
      this.moveLeftAngry = true;

    }, 1500);
  }
}

moveLeftIfEndbossIsAngry() {
  console.log('Moving left angrily with speed:', this.speedIfAngry);
  this.x -= this.speedIfAngry;
}

moveRightIfEndbossIsAngry() {
  console.log('Moving right angrily with speed:', this.speedIfAngry);
  this.x += this.speedIfAngry;
}



isDeadEndboss() {
  if (this.energyEndboss <= 0) {
    this.isDead = true;
  }
}

animate() {
  this.setMovementInterval();
  this.setupEndbossInterval();
}

setMovementInterval() {
  setInterval(() => {
    if (this.world && this.world.endbossInRange) {
      if (this.isAlert) {
        this.speed = 0;
        return;
      }
      if (this.moveLeftAngry) {
        if (this.otherDirection) {
          this.moveRightIfEndbossIsAngry();
        } else {
          this.moveLeftIfEndbossIsAngry();
        }
      } else {
        if (this.otherDirection) {
          this.moveRight();
        } else {
          this.moveLeft();
        }
      }
    }
  }, 1000 / 60);
}

setupEndbossInterval() {
  setInterval(() => {
    this.updateCharacter();
  }, 9000 / 60);
}

updateCharacter() {
  if (this.isDead) {
    this.checkIfCharacterIsDead();
  } else if (this.aggressive) {
    this.playAnimation(this.IMAGES_ATTACK);
  } else if (this.isAlert) {
    this.playAnimation(this.IMAGES_ALERT);
  } else if (this.inDamage) {
    this.playAnimation(this.IMAGES_HURT);
  } else {
    this.playAnimation(this.IMAGES_WALKING);
  }
}

checkIfCharacterIsDead() {
  if (this.isDead) {
    this.playAnimation(this.IMAGES_DEAD);
    
  }
  setTimeout(() => {
    winGame();
  }, 700);
}

}
