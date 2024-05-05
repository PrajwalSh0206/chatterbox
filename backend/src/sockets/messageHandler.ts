import { Socket } from "socket.io";

export default (io: any, socket: Socket) => {
  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });
};
