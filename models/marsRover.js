const { DIRECTION } = require("./coordinates");

class MarsRover {
    constructor(coordinates) {
        this.coordinates = coordinates;
    }

    getCoordinates() {
        return this.coordinates;
    }

    execute(command) {
        for (let i = 0; i < command.length; i++) {
            this.moveMarsRover(command.charAt(i));
        }
    }

    moveMarsRover(commandChar) {
        const { direction, x, y } = this.coordinates;

        switch (commandChar) {
            case "F":
                if (direction === DIRECTION.NORTH) {
                    this.coordinates.setCoordinates(x, y + 1);
                }
                else if (direction === DIRECTION.SOUTH) {
                    this.coordinates.setCoordinates(x, y - 1);
                }
                else if (direction === DIRECTION.EAST) {
                    this.coordinates.setCoordinates(x + 1, y);
                }
                else {
                    this.coordinates.setCoordinates(x - 1, y);
                }
                break;

            case "B":
                if (direction === DIRECTION.NORTH) {
                    this.coordinates.setCoordinates(x, y - 1);
                }
                else if (direction === DIRECTION.SOUTH) {
                    this.coordinates.setCoordinates(x, y + 1);
                }
                else if (direction === DIRECTION.EAST) {
                    this.coordinates.setCoordinates(x - 1, y);
                }
                else {
                    this.coordinates.setCoordinates(x + 1, y);
                }
                break;
        }
    }
}

module.exports = {
    MarsRover
}