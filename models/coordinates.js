const DIRECTION = {
    NORTH: "NORTH",
    SOUTH: "SOUTH",
    EAST: "EAST",
    WEST: "WEST"
}

class Coordinates {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    setCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }

    setDirection(direction) {
        this.direction = direction;
    }
}

module.exports = {
    DIRECTION,
    Coordinates
}