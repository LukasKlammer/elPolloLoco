class StatusBar extends DrawableObject {

    IMAGES = [
        'img/7.Marcadores/Barra/Marcador vida/verde/0_.png', // Pfad 0
        'img/7.Marcadores/Barra/Marcador vida/verde/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/verde/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/verde/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/verde/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/verde/100_.png', // Pfad 5
    ]

    percentage = 100;
    
    constructor() {
        super(); // muss immer rein --> Methoden vom übergeordneten Objekt initialisieren
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100); // muss am Anfang mal aufgerufen werden
    }

    /**
     * sets the percentage
     * 
     * @param {integer} percentage gives in the percentage as a number
     */
    setPercentage(percentage) {
        this.percentage = percentage; // Zahl zwischen 0 und 5 ermitteln
        let i = this.resolveImageIndex();
        let path = this.IMAGES[i];
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