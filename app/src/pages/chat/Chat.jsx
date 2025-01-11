import { useEffect, useState } from "react";
import Message from "./components/message/Message";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/side-bar/Sidebar";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const Chat = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("0");

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/");
      } else {
        setUserName(user.username);
      }
    }
  }, [loading]);

  return (
    <div className="w-screen h-screen p-2 bg-gray-100 flex flex-col space-y-2">
      <Navbar username={userName.charAt(0)}></Navbar>
      <div className="w-full h-full flex space-x-2">
        <Sidebar></Sidebar>
        <Message></Message>
      </div>
    </div>
  );
};

export default Chat;
