import React, { useEffect, useState } from "react";
import "./Chat.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Authenticator } from "../../services/Authenticator";
import { Socket, io } from "socket.io-client";
import { RootState } from "../../store/store";
import { storeUserDetails } from "../../store/reducers/userReducer";
import { saveMessages, storeRecieverDetails, updateRecieverDetails } from "../../store/reducers/recieverReducer";

interface UserDto {
  userId: string;
  username: string;
  online?: boolean;
  socketId?: string;
}

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPicker, setShowPicker] = useState(false);
  const [newSocket, setNewSocket] = useState<Socket>();
  const [message, setMessage] = useState<string>("");

  const recieverDetails = useSelector((state: RootState) => state.receiever.receivers);
  const selectedRecieverDetail = useSelector((state: RootState) => state.receiever.selectedReceiver);

  function dispatchEvent(dispatchName: any, data: any) {
    dispatch(dispatchName(data));
  }

  const handleMessage = (emoji: string) => {
    setMessage(message + emoji);
  };

  //const socketConnection
  const handleSocketConnection = (name: string) => {
    const socket = io("http://localhost:5000", { autoConnect: false });
    socket.auth = { username: name };
    socket.connect();

    socket.on("connect", () => {
      setNewSocket(socket);
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on("sendUser", (users: Array<socketUserDto>) => {
      console.log("users", users);
      for (const user of users) {
        const receieverPayload = {
          userId: user.userId,
          username: user.username,
          online: user.online,
          socketId: user.socketId,
        };
        dispatchEvent(storeRecieverDetails, receieverPayload);
      }
    });
    socket.on("private message", ({ content, from, timeStamp }) => {
      console.log("from", from, content, timeStamp);

      const messagePayload = {
        content,
        fromSelf: false,
        socketId: from,
        timeStamp,
      };
      dispatchEvent(saveMessages, messagePayload);
      console.log("from se", selectedRecieverDetail, recieverDetails, messagePayload);
    });
    socket.on("user connected", (user) => {
      const updateReceieverPayload = {
        socketId: user.socketId,
        username: user.username,
      };
      dispatch(updateRecieverDetails(updateReceieverPayload));
      console.log(recieverDetails, user, "new connection");
    });
  };

  interface socketUserDto {
    userId: string;
    username: string;
    online: boolean;
    socketId?: string;
  }

  const authToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const authObj = new Authenticator();
        const response = await authObj.authToken(token);
        const {
          data: { username },
        } = response;
        dispatch(storeUserDetails(username));
        handleSocketConnection(username);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    authToken();
  }, []);

  useEffect(() => {
    console.log(selectedRecieverDetail, "MessageCheck");
  }, [selectedRecieverDetail]);

  const onMessage = () => {
    console.log(selectedRecieverDetail.socketId, message, selectedRecieverDetail.messages);
    if (selectedRecieverDetail?.socketId && message) {
      const timeStamp = new Date().toISOString();
      newSocket?.emit("private message", {
        content: message,
        to: selectedRecieverDetail.socketId,
        timeStamp,
      });
      const messagePayload = {
        content: message,
        fromSelf: true,
        socketId: selectedRecieverDetail.socketId,
        timeStamp,
      };
      dispatch(saveMessages(messagePayload));
      setShowPicker(false);
      setMessage("");
    }
  };

  return (
    <div id="chat">
      <main>
        <SideBar></SideBar>
        {selectedRecieverDetail.username && (
          <section>
            <nav>
              <img src={`https://api.dicebear.com/8.x/shapes/svg?seed=${selectedRecieverDetail.username}`} alt={selectedRecieverDetail.username} />
              <p>{selectedRecieverDetail.username}</p>
            </nav>
            <div id="chat-block">
              {selectedRecieverDetail.messages.map((message) => (
                <div className={`${message.fromSelf ? "right" : "left"} message`} key={message.content}>
                  <p className="content">{message.content}</p>
                  <p className="time">{new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric" }).format(new Date(message.timeStamp))}</p>
                </div>
              ))}
              {showPicker && (
                <div id="picker">
                  <Picker data={data} onEmojiSelect={(e: any) => handleMessage(e.native)} />
                </div>
              )}
            </div>
            <footer>
              <input
                type="text"
                value={message}
                placeholder="Type something"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button onClick={() => setShowPicker(!showPicker)}>
                {showPicker ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                    />
                  </svg>
                )}
              </button>
              <button onClick={onMessage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </footer>
          </section>
        )}
      </main>
    </div>
  );
};

export default Chat;
