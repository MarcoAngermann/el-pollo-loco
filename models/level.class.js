class Level {
    enemies;
    endboss;
    clouds;
    coins;
    bottles;
    backgroundObjects;
    level_end_x = 2250;

    /**
 * Initializes a new instance of the Level class.
 */
    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}