import { Socket } from "socket.io";
import { fetchAllUserDetails } from "../service/users";
import { Logger } from "../utils/Logger";
import { Op } from "sequelize";
import { userDto } from "../dto/socket";

export const handleConnection = async (io: any, socket: Socket) => {
  const logger = new Logger(`Socket: ${socket.id}`).createLogger();

  logger.info(`A user connected ${socket.id} ${socket.data.username}`);

  const socketUserList: Array<userDto> = [];

  const socketIOClient = io.of("/").sockets;

  for (let [id, socket] of socketIOClient) {
    socketUserList.push({
      socketId: id,
      username: socket.data.username,
    });
  }
  logger.info("online user", JSON.stringify(socketUserList));

  let userDetails =
    (await fetchAllUserDetails(
      {
        username: { [Op.notLike]: socket.data.username },
      },
      logger,
      ["userId", "username"]
    )) || [];

  let onlineUserDetails: Array<any> = [];
  for (const value of userDetails) {
    let result: any = { userId: value.userId, username: value.username };
    const userSocketIndex = socketUserList.findIndex((user) => user.username == result.username);
    if (userSocketIndex != -1) {
      result.online = true;
      result.socketId = socketUserList[userSocketIndex].socketId;
    } else {
      result.online = false;
    }
    onlineUserDetails.push(result);
  }

  logger.info(`users Info ${JSON.stringify(onlineUserDetails)}`);

  socket.emit("sendUser", onlineUserDetails);

  socket.broadcast.emit("user connected", {
    socketId: socket.id,
    username: socket.data.username,
  });
};

export const handleDisconnection = async (io: any, socket: Socket) => {
  const logger = new Logger(`Socket: ${socket.id}`).createLogger();
  socket.on("disconnect", (reason) => {
    logger.info("Disconnected", socket.id, socket.data.username);
  });
};
