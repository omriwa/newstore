const { Coordinates, DIRECTION } = require("./models/coordinates");
const { MarsRover } = require("./models/marsRover");

describe("Mars-Rover class", () => {
    let marsRover;
    let initialCoordinates = new Coordinates(0, 0, DIRECTION.NORTH)

    beforeEach(() => {
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
        marsRover.execute("F");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: -1, direction: DIRECTION.SOUTH });
        marsRover.execute("B");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 0, direction: DIRECTION.SOUTH });
        marsRover.execute("B");
        expect(marsRover.getCoordinates()).toEqual({ x: 0, y: 1, direction: DIRECTION.SOUTH });
    });
});