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
    constructor(canvas, keyboard) {
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.E) {
            // Überprüfen, ob Flaschen im `collectBottles`-Array vorhanden sind
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
            } else {
                console.log('No bottles to throw');
            }
        }
    }
    
    // checkCollisions() {
    //     this.level.enemies.forEach((enemy, endboss) => {
    //         if (this.character.isColliding(enemy, endboss)) {
    //             this.character.hit();
    //             this.statusBar.setPercentage(this.character.energy);
    //             console.log('Character hit', this.character.energy);
    //         }
    //     })
    // }

    checkCollisions() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.character.isColliding(enemy)) {
                if(this.character.speedY < 0 && this.character.isAboveGround()) {
                    this.character.speedY = 15;
                    this.character.x += 2;
                    // Chicken töten
                    enemy.isDead = true;
                    enemy.isDeadsmallChicken = true;
                    // Sound abpspielen
                    setTimeout(() => {
                        this.level.enemies.splice(enemyIndex, 1);   
                    }, 200);
                } else { // Fall B: Character ist auf dem Boden
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    console.log('Character hit', this.character.energy);
                }
            }
        })
    }

    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.playSoundCoin = new Audio('audio/coin.mp3');
                this.playSoundCoin.play();
                this.character.energyCoin += 10;
                this.statusBarCoin.setPercentageCoin(this.character.energyCoin);
                console.log('Coin collected', this.character.energyCoin);

            }
        })
    }

    checkCollisionsBottles() {
        // Überprüfen, ob das Array `collectBottles` existiert, andernfalls initialisieren
        if (!this.collectBottles) {
            this.collectBottles = [];
        }
    
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                // Nur Flaschen einsammeln, wenn weniger als 5 Flaschen im `collectBottles` Array sind
                if (this.collectBottles.length < 5) {
                    this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                    this.character.energyBottle += 20;
                    this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
                    this.collectBottles.push(bottle);  // Flasche in das Array `collectBottles` pushen
                    console.log('Bottle collected');
                    console.log('Collected bottles:', this.collectBottles);  // Das Array in der Konsole anzeigen
                } else {
                    console.log('Maximum number of bottles collected');
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
}



