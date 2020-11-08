const DIRECTION = {
    NORTH: "NORTH",
    SOUTH: "SOUTH",
    EAST: "EAST",
    WEST: "WEST"
}


class Coordinates {
    constructor(x, y, direction,obsticales) {
        this.x = x;
        this.y = y;
        this.direction = direction;

        if (obsticales) {
            this.obsticales = obsticales;
        }
    }

    setCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    setObsticales(obsticales) {
        this.obsticales = obsticales;
    }

    getObsticales() {
        return this.obsticales ? this.obsticales : [];
    }
}

module.exports = {
    DIRECTION,
    Coordinates
}