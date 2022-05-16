class Character extends MovableObject {

    height = 300;
    width = 120;
    y = 40;
    speed = 10;
    availableThrowObjects = 0;
    availableCoins = 0;
    lastThrow = 0;
    world;

    walking_sound = new Audio('../audio/running.mp3');
    jumping_sound = new Audio('../audio/character_jumping.mp3');
    wrong_sound = new Audio('../audio/wrong.mp3');

    IMAGES_WALKING = [
        '../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png',
    ];

    IMAGES_JUMPING = [
        '../img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-31.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-32.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-39.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-40.png'
    ];

    IMAGES_DEAD = [
        '../img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png'
    ]

    IMAGES_HURT = [
        '../img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png'
    ]


    constructor() {
        super().loadImage('../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);

        this.animate();

        this.applyGravity();
    }

    animate() {
        // move animation
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            } else if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            } else if (this.world.keyboard.UP && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumping_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        // walk, hurt, jump, dead animation
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }

    timePassedAfterThrow() {
        return this.timerOfAction(this.lastThrow) > 0.5; // returns true if timePassed > 0.5 seconds
    }

}
