class Ground {
    constructor (x, y, w, h) {
        let properties = {
            isStatic: true
        }
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle (x, y, this.w, this.h, properties);
        World.add (world, this.body);
    }
}