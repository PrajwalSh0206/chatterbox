export interface userDto {
  socketId: string;
  username: string;
}

export interface ServerToClientEvents {
  noArg: () => void;
  sendUser: (userDetails: Array<userDto>) => void;
}

export interface ClientToServerEvents {
  sendUser: (userDetails: Array<userDto>) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  username: string;
}
