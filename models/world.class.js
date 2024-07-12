class World {
    character = new Character();
    level = level1;
    coins = level1.coins;
    bottles = level1.bottles;
    enemies = level1.enemies;
    clouds = level1.clouds;
    endboss = level1.endboss;
    backgroundObjects = level1.backgroundObjects;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    throwableObject = [];
    collectCoins = [];
    collectBottles = [];
    bottleBreak = false;
    endbossInRange = false;
    refillInterval = 10000; // Intervallzeit in Millisekunden (10 Sekunden)
    maxBottles = 10; // Maximale Anzahl der Flaschen

    constructor(canvas, keyboard) {
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        this.run();
        this.canThrow = true; 
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
            this.checkEndbossCollision();
            this.checkThrowObjects();
            this.checkCollisionThrowableWithChicken();
            this.checkCollisionThrowableWithEndboss();
        }, 100);
        this.startRefillTimer(); // Refill-Timer starten
    }

    startRefillTimer() {
        setInterval(() => {
            this.refillBottles();
        }, this.refillInterval);
    }
    
    refillBottles() {
        if (this.bottles.length < this.maxBottles) {
            this.bottles.push(new Bottle());
            console.log('Bottles refilled:', this.bottles);
        }
    }
    
    checkThrowObjects() {
        if (this.keyboard.E && this.canThrow) {  // Überprüfe, ob das Werfen erlaubt ist
            if (this.collectBottles.length > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
                this.throwableObject.push(bottle);
                this.collectBottles.pop();  // Entfernt die letzte Flasche aus dem `collectBottles`-Array
                this.character.decreaseEnergyBottle();
                this.throw_audio = new Audio('audio/throwing.mp3');
                this.throw_audio.play();
                this.throw_audio.volume = 0.3;
                this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
                console.log('Bottle thrown');
                console.log('Remaining collected bottles:', this.collectBottles);  // Das Array in der Konsole anzeigen
                console.log(this.throwableObject);  // Zeigt das `throwableObject`-Array in der Konsole an
                this.canThrow = false;  // Setze den Cooldown
                setTimeout(() => {
                    this.canThrow = true;  // Erlaube das Werfen nach einer Verzögerung von 1 Sekunde
                }, 1000);  // 1000 Millisekunden = 1 Sekunde
            } else {
                console.log('No bottles to throw');
            }
        }
    }

    checkCollisionThrowableWithChicken() {
        this.throwableObject.forEach((throwableObject, throwableIndex) => {
          this.level.enemies.forEach((enemy, enemyIndex) => {
            if (throwableObject.isColliding(enemy)) {
              if (!enemy.isDead || !enemy.isDeadsmallChicken) {
                enemy.isDead = true;
                enemy.isDeadsmallChicken = true;
                setTimeout(() => {
                  this.playSoundChickendead = new Audio('audio/chickendead.mp3');
                  this.playSoundChickendead.play();
                  this.playSoundChickendead.volume = 0.2;
                  this.level.enemies.splice(enemyIndex, 1);
                }, 300);
              }
              this.throwableObject.splice(throwableIndex, 1);
            }
          });
        });
      }

      checkCollisionThrowableWithEndboss() {
        this.throwableObject.forEach((throwableObject, throwableIndex) => {
          if (throwableObject.isColliding(this.level.endboss)) {
            console.log("Endboss getroffen!");
            this.level.endboss.hitBottleEndboss();
            this.level.endboss.decreaseEnergyEndboss();
            if (this.level.endboss.energyEndboss <= 0) {
              console.log("Endboss ist tot!");
              this.level.endboss.isDeadEndboss();
            }
            this.throwableObject.splice(throwableIndex, 1);
          }
        });
      }
      
      

    checkCollisions() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.character.isColliding(enemy)) {
                if(this.character.speedY < 0 && this.character.isAboveGround()) {
                    this.character.speedY = 15;
                    this.character.x += 2; 
                    enemy.isDead = true;
                    enemy.isDeadsmallChicken = true;
                    setTimeout(() => {
                        this.level.enemies.splice(enemyIndex, 1);
                        this.playSoundChickendead = new Audio('audio/chickendead.mp3');
                        this.playSoundChickendead.play();
                        this.playSoundChickendead.volume = 0.2;
                    }, 100);
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        })
    }

    checkCollisionsCoins() {
        const totalCoins = 10;
        console.log('Initial energyCoin:', this.character.energyCoin);
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.playSoundCoin = new Audio('audio/coin.mp3');
                this.playSoundCoin.play();
                const percentagePerCoin = 100 / totalCoins;
                this.character.energyCoin += percentagePerCoin;
                this.character.energyCoin = Math.min(100, this.character.energyCoin);
                this.statusBarCoin.setPercentageCoin(this.character.energyCoin);
            }
        });
    }
    
    checkCollisionsBottles() {
        if (!this.collectBottles) {
            this.collectBottles = [];
        }
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (this.collectBottles.length < 5) {
                    this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                    this.playSoundPlopp = new Audio('audio/bottleplopp.mp3');
                    this.playSoundPlopp.play();
                    this.character.energyBottle += 20;
                    this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
                    this.collectBottles.push(bottle);
                } else {
                }
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.endboss);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        if (this.endbossInRange) {
            this.addToMap(this.statusBarEndboss);
          }
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin); 
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);       
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }
    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(moveobject) {
        if (moveobject.otherDirection) {
            this.flipImage(moveobject);

        }
        moveobject.draw(this.ctx);
        moveobject.drawFrame(this.ctx);

        if (moveobject.otherDirection) {
            this.flipImageBack(moveobject);
        }
    }

    flipImage(moveobject) {
        this.ctx.save();
        this.ctx.translate(moveobject.width, 0);
        this.ctx.scale(-1, 1);
        moveobject.x = moveobject.x * -1;
    }
    
    flipImageBack(moveobject) {
        moveobject.x = moveobject.x * -1;
        this.ctx.restore();
    }

    checkEndbossCollision() {
        this.level.endboss.forEach((endboss) => {
          if (this.character.isColliding(endboss)) {
            let endbossDamage = 20;
            this.character.hit(endbossDamage);
            console.log('Character hit', this.character.energy);
            this.statusBar.setPercentage(this.character.energy);
          }
        });
      }
}





