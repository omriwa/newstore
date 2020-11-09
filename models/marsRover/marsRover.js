const { DIRECTION } = require("../coordinates");
const MARS_ROVER_STATE = {
    STOP: "STOPPED",
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
            const singleCommand = command.charAt(i);
            this.setDirection(singleCommand);
            const newCoordinates = this.moveMarsRover(singleCommand, this.coordinates);
            if (newCoordinates) {
                this.setRoverState(newCoordinates);
                this.setNewXYCoordinates(newCoordinates);
            }
        }
    }

    isNewCoordinatesObsticale(newCoordinates) {
        const obsticales = this.coordinates.getObsticales();
        const { x, y } = newCoordinates;

        for (let i = 0; i < obsticales.length; i++) {
            if (x === obsticales[i][0] && y === obsticales[i][1]) {
                return true;
            }
        }

        return false;
    }

    setRoverState(newCoordinates) {
        this.state = this.isNewCoordinatesObsticale(newCoordinates) ? MARS_ROVER_STATE.STOP : MARS_ROVER_STATE.NORMAL;
    }

    setNewXYCoordinates(newCoordinates) {
        if (this.state === MARS_ROVER_STATE.NORMAL) {
            const { x, y } = newCoordinates;
            this.coordinates.setCoordinates(x, y);
        }
    }

    setDirection(commandChar) {
        const { direction } = this.coordinates;

        switch (commandChar) {
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

    moveMarsRover(commandChar, coordinates) {
        const { direction, x, y } = coordinates;

        switch (commandChar) {
            case "F":
                if (direction === DIRECTION.NORTH) {
                    return { x, y: y + 1 };
                }
                else if (direction === DIRECTION.SOUTH) {
                    return { x, y: y - 1 };
                }
                else if (direction === DIRECTION.EAST) {
                    return { x: x + 1, y };
                }
                else {
                    return { x: x - 1, y };
                }

            case "B":
                if (direction === DIRECTION.NORTH) {
                    return { x, y: y - 1 };
                }
                else if (direction === DIRECTION.SOUTH) {
                    return { x, y: y + 1 };
                }
                else if (direction === DIRECTION.EAST) {
                    return { x: x - 1, y };
                }
                else {
                    return { x: x + 1, y };
                }

            default:
                return;
        }
    }

    checkIfRoverCanMove(nextCoordinates) {
        const obsticales = this.coordinates.getObsticales();
        const { x, y } = nextCoordinates;

        for (let i = 0; i < obsticales.length; i++) {
            if (x === obsticales[i][0] && y === obsticales[i][1]) {
                return false;
            }
        }

        return true;
    }

    getCommandToOvercomeObsticale(source, destination, direction, command) {
        const { x: xSource, y: ySource } = source;
        const { x: xDestination, y: yDestination } = destination;

        if (xSource === xDestination && ySource === yDestination) {
            return command;
        }
        else {
            const newDirection = this.getDirection(source, destination, direction);
            const newSource = this.moveMarsRover('F', { ...source, direction });
            command += this.decryptDirectionToCommand(direction,newDirection) + 'F';

            return this.getCommandToOvercomeObsticale(newSource, destination, newDirection, command);
        }
    }

    getDirection(source, destination, direction) {
        const { x: xSource, y: ySource } = source;
        const { x: xDestination, y: yDestination } = destination;

        if (xSource < xDestination && direction !== DIRECTION.EAST) {
            return DIRECTION.EAST;
        }
        else if (xSource > xDestination && direction !== DIRECTION.WEST) {
            return DIRECTION.WEST;
        }
        else if (ySource < yDestination && direction !== DIRECTION.NORTH) {
            return DIRECTION.NORTH;
        }
        else if (ySource > yDestination && direction !== DIRECTION.SOUTH) {
            return DIRECTION.SOUTH;
        }
        else {
            return direction;
        }
    }

    decryptDirectionToCommand(prevDirection, nextDirection) {
        if (
            prevDirection === DIRECTION.NORTH && nextDirection === DIRECTION.SOUTH || prevDirection === DIRECTION.SOUTH && nextDirection === DIRECTION.NORTH
            ||
            prevDirection === DIRECTION.WEST && nextDirection === DIRECTION.EAST || prevDirection === DIRECTION.EAST && nextDirection === DIRECTION.WEST
        ) {
            return "LL";
        }
        else if (
            prevDirection === DIRECTION.EAST && nextDirection === DIRECTION.NORTH || prevDirection === DIRECTION.WEST && nextDirection === DIRECTION.SOUTH
            ||
            prevDirection === DIRECTION.NORTH && nextDirection === DIRECTION.WEST || prevDirection === DIRECTION.SOUTH && nextDirection === DIRECTION.EAST
        ) {
            return "L";
        }
        else if (
            prevDirection === DIRECTION.WEST && nextDirection === DIRECTION.NORTH || prevDirection === DIRECTION.EAST && nextDirection === DIRECTION.SOUTH
            ||
            prevDirection === DIRECTION.NORTH && nextDirection === DIRECTION.EAST || prevDirection === DIRECTION.SOUTH && nextDirection === DIRECTION.WEST
        ) {
            return "R";
        }
        else {
            return "";
        }
    }
}

module.exports = {
    MarsRover,
    MARS_ROVER_STATE
}