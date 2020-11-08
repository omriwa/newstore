const { Coordinates, DIRECTION } = require("../coordinates");
const { MarsRover,MARS_ROVER_STATE } = require("./marsRover");

describe("Mars-Rover class", () => {
    let marsRover;
    let initialCoordinates;

    beforeEach(() => {
        initialCoordinates = new Coordinates(0, 0, DIRECTION.NORTH);
        marsRover = new MarsRover(initialCoordinates);
    })

    test("Get Coordinates", () => {
        expect(marsRover).toBeDefined();
        expect(marsRover.getCoordinates()).toEqual(initialCoordinates)
    });

    test("Execute command, move north forward and backward", () => {
        expect(marsRover).toBeDefined();
        marsRover.execute("F");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 1, direction: DIRECTION.NORTH });
        marsRover.execute("B");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 0, direction: DIRECTION.NORTH });
        marsRover.execute("B");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: -1, direction: DIRECTION.NORTH });
    });

    test("Execute command, move south forward and backward", () => {
        expect(marsRover).toBeDefined();
        initialCoordinates.setDirection(DIRECTION.SOUTH)
        marsRover.execute("F");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: -1, direction: DIRECTION.SOUTH });
        marsRover.execute("B");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 0, direction: DIRECTION.SOUTH });
        marsRover.execute("B");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 1, direction: DIRECTION.SOUTH });
    });

    test("Execute command, move east forward and backward", () => {
        expect(marsRover).toBeDefined();
        initialCoordinates.setDirection(DIRECTION.EAST)
        marsRover.execute("F");
        expect(marsRover.getCoordinates()).toEqual({ x: 1, y: 0, direction: DIRECTION.EAST });
        marsRover.execute("B");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 0, direction: DIRECTION.EAST });
        marsRover.execute("B");
        expect(marsRover.getCoordinates()).toEqual({ x: -1, y: 0, direction: DIRECTION.EAST });
    });

    test("Execute command, move west forward and backward", () => {
        expect(marsRover).toBeDefined();
        initialCoordinates.setDirection(DIRECTION.WEST)
        marsRover.execute("F");
        expect(marsRover.getCoordinates()).toEqual({ x: -1, y: 0, direction: DIRECTION.WEST });
        marsRover.execute("B");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 0, direction: DIRECTION.WEST });
        marsRover.execute("B");
        expect(marsRover.getCoordinates()).toEqual({ x: 1, y: 0, direction: DIRECTION.WEST });
    });

    test("Execute command, clockwise change direction", () => {
        expect(marsRover).toBeDefined();
        marsRover.execute("R");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 0, direction: DIRECTION.EAST });
        marsRover.execute("R");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 0, direction: DIRECTION.SOUTH });
        marsRover.execute("R");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 0, direction: DIRECTION.WEST });
        marsRover.execute("R");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 0, direction: DIRECTION.NORTH });
    });

    test("Execute command, counter clockwise change direction", () => {
        expect(marsRover).toBeDefined();
        marsRover.execute("L");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 0, direction: DIRECTION.WEST });
        marsRover.execute("L");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 0, direction: DIRECTION.SOUTH });
        marsRover.execute("L");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 0, direction: DIRECTION.EAST });
        marsRover.execute("L");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 0, direction: DIRECTION.NORTH });
    });

    test("Execute command, with none valid char", () => {
        expect(marsRover).toBeDefined();
        marsRover.execute("LFFSSBRFFFXXB");
        expect(marsRover.getCoordinates()).toEqual({ x: -1, y: 2, direction: DIRECTION.NORTH });
    });

    test("Execute command, with a obsticales given", () => {
        expect(marsRover).toBeDefined();
        const obsticales = [[0, 1]];
        initialCoordinates.setObsticales(obsticales);
        marsRover.execute("F");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 1, direction: DIRECTION.NORTH,obsticales });
        expect(marsRover.getState()).toEqual(MARS_ROVER_STATE.STOP);
    })
});