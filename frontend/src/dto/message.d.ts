export interface MessageContentDto {
  content: string;
  fromSelf: boolean;
  timeStamp: string;
}

export interface MessageDto {
  messages: Array<MessageContentDto>;
}

export interface messagePayloadDto extends MessageContentDto {
  socketId: string;
}