class Car {
    color;
    model;
    speed;

    constructor(color, model, speed) {
        this.color = color;
        this.model = model;
        this.speed = speed;
    }
    
    startEngine() {
        console.log("engine stopped")
    }

    stopEngine() {
        console.log("engine started")
    }

    getColor() {
        return this.color;
    }

    getModel() {
        return this.model;
    }

    getSpeed() {
        return this.speed;
    }
}