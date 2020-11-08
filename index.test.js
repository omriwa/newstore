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
});