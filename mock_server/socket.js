const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    origins: ["http://localhost:5173"],
});

io.on("connection", (socket) => {
    console.log("connected");
    socket.on("disconnect", (reason) => {
        console.log("disconnected: ", reason);
    });

    socket.on("join", (data) => {
        const roomId = JSON.parse(data).roomId;
        socket.join(roomId.toString());
        const rooms = Object.keys(socket.rooms);
    });

    socket.on("leave", (data) => {
        const roomId = JSON.parse(data).roomId;
        socket.leave(roomId.toString());
        const rooms = Object.keys(socket.rooms);
    });

    socket.on("message", (data) => {
        const messageInfo = JSON.parse(data);
        const roomId = messageInfo.roomId;
        const message = messageInfo.message;
        const name = messageInfo.name;
        socket.broadcast.to(roomId.toString()).emit("message", JSON.stringify({ name: name, message: message }));
        socket.emit("message", JSON.stringify({ name: name, message: message }));
    });
});

httpServer.listen(3001, () => {
    console.log("socket server is running");
});