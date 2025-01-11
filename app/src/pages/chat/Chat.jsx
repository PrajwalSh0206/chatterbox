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

  const { users } = useWebSocket(CONSTANTS.SOCKET_URL, username, userId);

  return (
    <div className="w-screen h-screen p-2 bg-gray-100 flex flex-col space-y-2">
      <Navbar username={username.charAt(0)}></Navbar>
      <div className="w-full h-full flex space-x-2">
        <Sidebar users={users}></Sidebar>
        <Message></Message>
      </div>
    </div>
  );
};

export default Chat;
