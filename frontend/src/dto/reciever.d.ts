import { MessageContentDto } from "./message";

export interface ReceiverContentDto {
  socketId?: string;
  username: string;
  userId: string;
  online: boolean;
}

export interface ReceiverDto extends ReceiverContentDto {
  messages: Array<MessageContentDto>;
}

export interface ChatDto {
  receivers: Array<ReceiverDto>;
  selectedReceiver: ReceiverDto;
}

export interface updateRecieverDto {
    username: string;
    socketId: string;
  }
  