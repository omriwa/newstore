const express = require("express");
const server = express();
const PORT = 3000;

server.get('/', (req, res) => {
    res.send('get');
});

server.post('/', (req, res) => {
    res.send('post');
});


server.listen(PORT, (e) => {
    if (e) {
        console.log("server could not listen ", e);
    }
    else {
        console.log(`server is listenning on port-${PORT}`);
    }
});