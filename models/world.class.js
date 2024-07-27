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
    statusBarEndboss = new StatusBarEndboss();
    throwableObject = [];
    collectCoins = [];
    collectBottles = [];
    bottleBreak = false;
    endbossInRange = false;
    refillInterval = 10000; 
    maxBottles = 10; 
    alert_sound = new Audio('./audio/alert.mp3');
    collect_coin_sound = new Audio('./audio/coin.mp3');
    collect_bottle_sound = new Audio('./audio/bottleplopp.mp3');
    throw_audio = new Audio('audio/throwing.mp3');
    playSoundChickendead = new Audio('audio/chickendead.mp3');
                                   

/**
 * Constructs a new instance of the World class.
 */
    constructor(canvas, keyboard) {
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        this.run();
        this.canThrow = true;
        this.checkCharacterPositionEndboss();
        this.checkEndbossRange();
        this.alert_sound.volume = 0.3;
        this.collect_coin_sound.volume = 0.2;
        this.collect_bottle_sound.volume = 0.2;
        this.playSoundChickendead.volume = 0.1;
    }

    /**
     * Checks the range of the endboss relative to the character's position and updates the endbossInRange flag accordingly.
     * This function is called periodically using setInterval to check the distance between the endboss and the character.
     */
    checkEndbossRange() {
        setInterval(() => {
            const distance = this.level.endboss.x - this.character.x;
            if (distance < 500 && !this.endbossInRange) {
                this.endbossInRange = true;
            } else if (distance >= 500 && this.endbossInRange) {
                this.endbossInRange = false;
            }
        }, 1000 / 60);
    }

        /**
     * Checks the position of the character relative to the endboss and updates the endboss's direction accordingly.
     * If the endboss exists and is not dead, it checks the position of the character relative to the endboss.
     */
    checkCharacterPositionEndboss() {
        const endboss = this.level.endboss;
        if (endboss && !endboss.isDead) {
            const characterX = this.character.x;
            const endbossX = endboss.x;
            if (characterX > endbossX) {
                endboss.otherDirection = false;
                endboss.moveRight();
            } else if (characterX < endbossX) {
                endboss.otherDirection = true;
                endboss.moveLeft();
            }
        }
    }

    /**
     * Updates the `endbossInRange` property based on the distance between the character and the endboss.
     * If the distance is less than 200, sets `endbossInRange` to true. Otherwise, sets it to false.
     */
    update() {
        let distanceToEndboss = Math.abs(this.character.x - this.endboss.x);
        if (distanceToEndboss < 200) { 
            this.endbossInRange = true;
        } else {
            this.endbossInRange = false;
        }
    }
    /**
     * Sets the world property of the character and endboss objects to the current world object.
     * This function does not take any parameters.
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * Runs the game loop, checking for collisions and updates at regular intervals.
     */
    run() {
        setInterval(() => {
            this.checkCollisionsCoins();
            this.checkEndbossCollision();
            this.checkThrowObjects();
            this.checkCollisionThrowableWithChicken();
            this.checkCollisionThrowableWithEndboss();
            this.checkCharacterPositionEndboss();
        }, 100);
        setInterval(() => {
            this.checkCollisionsBottles();
            this.checkCollisions();
        },10)
        this.startRefillTimer(); 
    }

    startRefillTimer() {
        setInterval(() => {
            this.refillBottles();
        }, this.refillInterval);
    }
    
    refillBottles() {
        if (this.bottles.length < this.maxBottles) {
            this.bottles.push(new Bottle());
        }
    }
    
    checkThrowObjects() {
        if (this.keyboard.E && this.canThrow) { 
            if (this.collectBottles.length > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
                this.throwableObject.push(bottle);
                this.collectBottles.pop(); 
                this.character.decreaseEnergyBottle();
                if (!masterSound) {
                    this.throw_audio.play();
                }
                this.throw_audio.volume = 0.3;
                this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
                this.canThrow = false; 
                setTimeout(() => {
                    this.canThrow = true;  
                }, 1000);  
            } 
        }
    }

    checkCollisionThrowableWithChicken() {
        this.throwableObject.forEach((throwableObject, throwableIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (throwableObject.isColliding(enemy, enemyIndex)) {
                    if (!enemy.isDead) {
                        enemy.isDead = true;
                        if (!masterSound) {
                            this.playSoundChickendead.currentTime = 0;
                            this.playSoundChickendead.play();
                        }
                        setTimeout(() => {
                       
                        }, 300);
                    }
                    this.throwableObject.splice(throwableIndex, 1);
                    setTimeout(() => {
                        this.level.enemies.splice(enemyIndex, 1);
                        this.deleteKilledChicken();
                    }, 600);
                }
            });
        });
    }

    deleteKilledChicken() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (enemy.isDead) {
                this.level.enemies.splice(enemyIndex, 1);
            }
        });
    }

    checkCollisionThrowableWithEndboss() {
        this.throwableObject.forEach((throwableObject, throwableIndex) => {
            if (throwableObject.isColliding(this.level.endboss)) {
                this.statusBarEndboss.setPercentageEndboss(this.level.endboss.energyEndboss);
                this.level.endboss.hitBottleEndboss();
                this.level.endboss.decreaseEnergyEndboss();
                if (this.level.endboss.energyEndboss <= 0) {
                    this.level.endboss.isDeadEndboss();
                }
                this.throwableObject.splice(throwableIndex, 1);
            }
        });
    }
       
    checkCollisions() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.character.isColliding(enemy)) {
                if(this.character.speedY < 0 && this.character.isAboveGround() && !enemy.isDead) {
                    this.character.speedY = 15;
                    this.character.x += 2; 
                    enemy.isDead = true;     
                    if (!masterSound) {
                        this.playSoundChickendead.currentTime = 0;
                        this.playSoundChickendead.play();
                    } 
                    setTimeout(() => {
                        this.level.enemies.splice(enemyIndex, 1);
                    }, 100);
                } else {
                    if (!enemy.isDead) {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    }
                }
            }
        })
    }

    checkCollisionsCoins() {
        const totalCoins = 10;
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                if (!masterSound) {
                    this.collect_coin_sound.currentTime = 0;
                    this.collect_coin_sound.play();
                }
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
                    if (!masterSound) {
                        this.collect_bottle_sound.play();
                    }
                    this.character.energyBottle += 20;
                    this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
                    this.collectBottles.push(bottle);
                } 
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);    
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.level.endboss);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        if (this.endbossInRange) {
            this.addToMap(this.statusBarEndboss);
          }
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin); 
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.coins);   
        this.addToMap(this.character);    
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
        if (!moveobject) {
            return;
        }
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
        if (this.character.isColliding(this.level.endboss)) {
            let endbossDamage = 25;
            this.character.hit(endbossDamage);
            this.statusBar.setPercentage(this.character.energy);
        }
    }
   
}




