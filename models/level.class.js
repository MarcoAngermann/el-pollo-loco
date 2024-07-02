class Level {
    enemies;
    clouds;
    coins;
    backgroundObjects;
    level_end_x = 2250;

    constructor(enemies, clouds, backgroundObjects, coins) {
        this.coins = coins;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        console.log('Chicken', enemies)
    }
}