// reducers/counterReducer.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MessageDto {
  content: string;
  fromSelf: boolean;
}

interface messagePayloadDto extends MessageDto {
  socketId: string;
}

interface UserDto {
  socketId?: string;
  username: string;
  userId: string;
  online: boolean;
}

interface ReceiverDto extends UserDto {
  messages: Array<MessageDto>;
}

interface RecieverState {
  receivers: Array<ReceiverDto>;
  selectedReceiver: ReceiverDto;
}

interface updateRecieverDto {
  username: string;
  socketId: string;
}

const initialState: RecieverState = {
  receivers: [],
  selectedReceiver: {
    messages: [],
    online: false,
    socketId: "",
    username: "",
    userId: "",
  },
};

const recieverSlice = createSlice({
  name: "recieverDetails",
  initialState,
  reducers: {
    storeRecieverDetails: (state, actions: PayloadAction<UserDto>) => {
      state.receivers.push({
        userId: actions.payload.userId,
        username: actions.payload.username,
        socketId: actions.payload.socketId,
        online: actions.payload.online,
        messages: [],
      });
    },
    updateRecieverDetails: (state, actions: PayloadAction<updateRecieverDto>) => {
      const index = state.receivers.findIndex((value) => (value.username = actions.payload.username));
      debugger;
      if (index != -1) {
        state.receivers[index].socketId = actions.payload.socketId;
        state.receivers[index].online = true;
      }
      if (state.selectedReceiver.username == actions.payload.username) {
        state.selectedReceiver.socketId = actions.payload.socketId;
        state.selectedReceiver.online = true;
      }
    },
    storeSelectedRecieverDetails: (state, actions: PayloadAction<UserDto>) => {
      state.selectedReceiver = {
        userId: actions.payload.userId,
        username: actions.payload.username,
        socketId: actions.payload.socketId,
        online: actions.payload.online,
        messages: [],
      };
    },
    saveMessages: (state, actions: PayloadAction<messagePayloadDto>) => {
      const index = state.receivers.findIndex((value) => (value.socketId = actions.payload.socketId));

      if (index != -1) {
        state.receivers[index].messages.push({
          content: actions.payload.content,
          fromSelf: actions.payload.fromSelf,
        });
      }
      if (state.selectedReceiver.socketId == actions.payload.socketId) {
        state.selectedReceiver.messages.push({
          content: actions.payload.content,
          fromSelf: actions.payload.fromSelf,
        });
      }
    },
  },
});

export const { storeRecieverDetails, saveMessages, storeSelectedRecieverDetails, updateRecieverDetails } = recieverSlice.actions;
export default recieverSlice.reducer;
