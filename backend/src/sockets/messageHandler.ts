import { Socket } from "socket.io";

export default (io: any, socket: Socket) => {
  socket.on("private message", (data) => {
    const { content, to, timeStamp }=data
    console.log("private message",socket,data);

    socket.to(to).emit("private message", {
      content,
      from: socket.id,
      timeStamp: new Date(timeStamp),
    });
  });
};
