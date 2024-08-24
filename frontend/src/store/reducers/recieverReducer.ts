// reducers/counterReducer.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  messagePayloadDto } from "../../dto/message";
import { ChatDto, ReceiverContentDto, ReceiverDto, updateRecieverDto } from "../../dto/reciever";

const initialState: ChatDto = {
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
    storeRecieverDetails: (state, actions: PayloadAction<Array<ReceiverContentDto>>) => {
      const userDetails = actions.payload;
      for (const user of userDetails) {
        const userName = user.username;
        const index = state.receivers.findIndex((value) => value.username == userName);

        if (index == -1) {
          state.receivers.push({
            userId: user.userId,
            username: user.username,
            socketId: user.socketId,
            online: user.online,
            messages: [],
          });
        } else {
          state.receivers[index].socketId = user.socketId;
          state.receivers[index].online=user.online
        }
      }
    },
    updateRecieverDetails: (state, actions: PayloadAction<updateRecieverDto>) => {
      const index = state.receivers.findIndex((value) => (value.username == actions.payload.username));
      if (index != -1) {
        state.receivers[index].socketId = actions.payload.socketId;
        state.receivers[index].online = true;
      }
      if (state.selectedReceiver.username == actions.payload.username) {
        state.selectedReceiver.socketId = actions.payload.socketId;
        state.selectedReceiver.online = true;
      }
    },
    storeSelectedRecieverDetails: (state, actions: PayloadAction<ReceiverDto>) => {
      state.selectedReceiver = {
        userId: actions.payload.userId,
        username: actions.payload.username,
        socketId: actions.payload.socketId,
        online: actions.payload.online,
        messages: actions.payload.messages,
      };
    },
    saveMessages: (state, actions: PayloadAction<messagePayloadDto>) => {
      const index = state.receivers.findIndex((value) => (value.socketId == actions.payload.socketId));

      if (index != -1) {
        state.receivers[index].messages.push({
          content: actions.payload.content,
          fromSelf: actions.payload.fromSelf,
          timeStamp: actions.payload.timeStamp,
        });
      }
      if (state.selectedReceiver.socketId == actions.payload.socketId) {
        state.selectedReceiver.messages.push({
          content: actions.payload.content,
          fromSelf: actions.payload.fromSelf,
          timeStamp: actions.payload.timeStamp,
        });
      }
    },
  },
});

export const { storeRecieverDetails, saveMessages, storeSelectedRecieverDetails, updateRecieverDetails } = recieverSlice.actions;
export default recieverSlice.reducer;
