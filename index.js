const readline = require("readline");
const { Coordinates } = require("./models/coordinates");
const { MarsRover } = require('./models/marsRover/marsRover');
let marsRover;

const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const executeMarsRoverCommand = () => cli.question("Execute command: ", command => {
    if (command === "exit") {
        console.log("Close mars rover connection");
        process.exit(0);
    }
    else {
        console.log(marsRover)
        marsRover.execute(command);
        executeMarsRoverCommand();
    }
})

cli.question("Initial X coordinate: ", initialXCoordinate => {
    cli.question("Initial Y coordinate: ", initialYCoordinate => {
        cli.question("initial Direction: ", async initialDirection => {
            marsRover = new MarsRover(new Coordinates(parseInt(initialXCoordinate), parseInt(initialYCoordinate), initialDirection));
            executeMarsRoverCommand();
        });
    });
});

cli.on("exit", () => {
    console.log("close marsRover connection");
    process.exit(0)
});
