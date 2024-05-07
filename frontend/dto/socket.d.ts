export interface socketUserDto {
  userId: string;
  username: string;
  online: boolean;
  socketId?: string;
  messages: Array<MessageDto>;
}

export interface MessageDto {
  content: string;
  fromSelf: boolean;
  timeStamp: string;
}

export interface messagePayloadDto extends MessageDto {
  socketId: string;
}

export interface UserDto {
  socketId?: string;
  username: string;
  userId: string;
  online: boolean;
}

export interface ReceiverDto extends UserDto {
  messages: Array<MessageDto>;
}

export interface RecieverState {
  receivers: Array<ReceiverDto>;
  selectedReceiver: ReceiverDto;
}

export interface updateRecieverDto {
  username: string;
  socketId: string;
}
