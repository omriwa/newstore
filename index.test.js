const { Coordinates, DIRECTION } = require("./models/coordinates");
const { MarsRover } = require("./models/marsRover");

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
});