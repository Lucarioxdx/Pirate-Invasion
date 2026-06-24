class Tower {
    constructor (x, y, w, h) {
        let options = {
            isStatic: true
        }
        this.towerImage = loadImage ("./Assets/tower.png");
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle (x, y, this.w, this.h, options);
        World.add (world, this.body);
    }

    display (){
        let pos = this.body.position;
        let angle = this.body.angle;
        push ();
        translate (pos.x, pos.y);
        rotate (angle);
        imageMode (CENTER);
        image (this.towerImage, 0, 0, this.w, this.h);
        pop ();
    }
}