class Character extends MovableObject {
    x = 10;
    y = 50;
    height = 350;
    width = 150;
    speed = 5;
    idleDuration = 1000;
    longIdleDuration = 5000;
    walking_sound = new Audio("audio/running.mp3");
    sleep_sound = new Audio("audio/snoring.mp3");
    world;
    offset = {
        left: 30,
        top: 140,
        right: 30,
        bottom: 15,
    };
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    frameInterval = 100;
    lastFrameChangeTime = 0;
    currentImageIndex = 0;

    /**
     * Constructs a new instance of the class.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.resetIdleTimer();
        this.animate();
        this.walking_sound.volume = 0.1;
        this.walking_sound.loop = true;
        this.sleep_sound.volume = 0.3;
    }

    /**
     * Animates the character's movement and actions.
     * This function is called repeatedly to update the character's animation and movement.
     */
    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if ((this.world.keyboard.RIGHT || this.world.keyboard.D) && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (!masterSound) {
                    this.walking_sound.play();
                }
                this.resetIdleTimer();
            } else if ((this.world.keyboard.LEFT || this.world.keyboard.A) && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                if (!masterSound) {
                    this.walking_sound.play();
                }
                this.resetIdleTimer();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                super.jump();
                this.resetIdleTimer();
            }
            this.world.camera_x = -this.x + 100;
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.gameOverTime();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.world.keyboard.A || this.world.keyboard.D) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.resetIdleTimer();
                } else if (this.world.keyboard.E) {
                    this.resetIdleTimer();
                }
                else {
                    this.checkIdleState();
                }
            }
        }, 1000 / 60);
    }

    /**
    * Executes the gameOver function after a delay of 700 milliseconds.
     */
    gameOverTime() {
        setTimeout(() => {
            gameOver();
        }, 700);
    }

    /**
     * Checks the idle state of the object based on the time since the last activity.
     */
    checkIdleState() {
        const now = Date.now();
        const timeSinceLastActivity = now - this.lastActiveTime;
        if (timeSinceLastActivity >= this.longIdleDuration) {
            if (!masterSound) {
                this.sleep_sound.play();
            }
            this.playAnimation(this.IMAGES_SLEEPING);
        } else if (timeSinceLastActivity >= this.idleDuration) {
            this.playAnimation(this.IMAGES_IDLE);
        } else {
            this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        }
    }

    /**
     * Plays an animation by updating the current image based on the provided images array.
     */
    playAnimation(images) {
        const now = Date.now();
        if (now - this.lastFrameChangeTime >= this.frameInterval) {
            this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
            this.img = this.imageCache[images[this.currentImageIndex]];
            this.lastFrameChangeTime = now;
        }
    }

    /**
     * Resets the idle timer by updating the last active time to the current time.
     */
    resetIdleTimer() {
        this.lastActiveTime = Date.now();
    }

}
