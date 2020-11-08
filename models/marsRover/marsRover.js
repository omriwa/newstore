const { DIRECTION } = require("../coordinates");
const MARS_ROVER_STATE = {
    STOP: "STOP",
    NORMAL: "NORMAL"
}

class MarsRover {
    constructor(coordinates) {
        this.coordinates = coordinates;
        this.state = MARS_ROVER_STATE.NORMAL;
    }

    getState() {
        return this.state;
    }

    getCoordinates() {
        return this.coordinates;
    }

    execute(command) {
        for (let i = 0; i < command.length; i++) {
            this.moveMarsRover(command.charAt(i));
            this.updateRoverState();
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

            case "R":
                if (direction === DIRECTION.NORTH) {
                    this.coordinates.setDirection(DIRECTION.EAST);
                }
                else if (direction === DIRECTION.EAST) {
                    this.coordinates.setDirection(DIRECTION.SOUTH);
                }
                else if (direction === DIRECTION.SOUTH) {
                    this.coordinates.setDirection(DIRECTION.WEST);
                }
                else {
                    this.coordinates.setDirection(DIRECTION.NORTH);
                }
                break;

            case "L":
                if (direction === DIRECTION.NORTH) {
                    this.coordinates.setDirection(DIRECTION.WEST);
                }
                else if (direction === DIRECTION.WEST) {
                    this.coordinates.setDirection(DIRECTION.SOUTH);
                }
                else if (direction === DIRECTION.SOUTH) {
                    this.coordinates.setDirection(DIRECTION.EAST);
                }
                else {
                    this.coordinates.setDirection(DIRECTION.NORTH);
                }
                break;

            default:
                break;
        }
    }

    updateRoverState() {
        const obsticales = this.coordinates.getObsticales();
        const { x, y } = this.coordinates;

        for (let i = 0; i < obsticales.length; i++){
            if (x === obsticales[i][0] && y === obsticales[i][1]) {
                this.state = MARS_ROVER_STATE.STOP;

                return;
            }
        }
    }
}

module.exports = {
    MarsRover,
    MARS_ROVER_STATE
}