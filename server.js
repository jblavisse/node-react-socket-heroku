const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;
const app = express();

app.use(express.static(path.join(__dirname, 'client','build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.set("origins", "*:*");
io.on('connection', (socket) => {
    console.log('a user connected');

    //Here we listen on a new namespace called "change color"
    socket.on("change color", (color) => {
        console.log(color);
        
        //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
        socket.broadcast.emit("color changed", color);
        socket.emit("color changed", color);
    });

        
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
  });

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})