class MovableObject {
    x = 120;
    y = 80;
    img;
    height = 150;
    width = 120;
    imageCache = {};
    currentImage = 0;
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 180;
    }


    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src...>
        this.img.src = path;
    }


    /**
     * loads all images from the given array in the variable imageCache, which is a JSON
     * 
     * @param {Array} arr ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image(); // Variable mit neuem Bild wird angelegt
            img.src = path; // Bild (Pfad) wird ins img Objekt reingeladen
            this.imageCache[path] = img; // this ist wichtig, weil wir auf Variable von Objekt zugreifen, nicht auf einer von innerhalb der Funktion
            // im imageCache werden Bilder reingeladen: Schlüssel ist der Datei-Pfad
        });
    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed; // was soll ausgeführt werden
        }, 1000 / 60); // 2. Parameter Millisekunden, also alle wieviel Zeit wiederholt wird
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6 --> 0, Rest 6;    let i = 1 % 6 --> 0, Rest 1;     let i = 5 % 6 --> 0, Rest 5;     let i = 6 % 6 --> 1, Rest 0;     let i = 7 % 6 --> 1, Rest 1;
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2,  --> immer der Rest aus der Division
        let path = images[i]; // Pfad ist aus dem array die [x] Position
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}