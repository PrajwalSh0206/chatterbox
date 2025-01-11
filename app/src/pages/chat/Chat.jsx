import Message from "./components/message/Message";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/side-bar/Sidebar";

const Chat = () => {
  return (
    <div className="w-screen h-screen p-2 bg-gray-100 flex flex-col space-y-2">
      <Navbar></Navbar>
      <div className="w-full h-full flex space-x-2">
        <Sidebar></Sidebar>
        <Message></Message>
      </div>
    </div>
  );
};

export default Chat;
