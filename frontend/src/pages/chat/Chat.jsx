import { useEffect, useState } from "react";
import Message from "./components/message/Message";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/side-bar/Sidebar";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import useWebSocket from "../../hooks/useWebSocket";
import CONSTANTS from "../../constants";

const Chat = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("0");
  const [userId, setUserId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/");
      } else {
        console.log(user);
        setUserId(user.userId);
        setUsername(user.username);
      }
    }
  }, [loading]);

  const { users, sendMessage } = useWebSocket(CONSTANTS.SOCKET_URL, username, userId, setChat);

  return (
    <div className="w-screen h-screen p-2 bg-gray-100 flex flex-col space-y-2">
      <Navbar username={username.charAt(0)}></Navbar>
      <div className="w-full h-full flex space-x-2">
        <Sidebar userId={userId} users={users} setSelectedUser={setSelectedUserId}></Sidebar>
        {selectedUserId && <Message userId={userId} chat={chat} setChat={setChat} id={selectedUserId} sendMessage={sendMessage} users={users}></Message>}
      </div>
    </div>
  );
};

export default Chat;
