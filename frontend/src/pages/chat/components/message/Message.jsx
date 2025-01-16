import { useEffect, useState } from "react";
import chatService from "../../../../services/chatService";
import analyzeService from "../../../../services/analysisService";
import Feedback from "./feedback/Feedback";

const Message = ({ users, id, userId, sendMessage, chat = [], setChat }) => {
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState();
  const [sentiment, setSentiment] = useState("neutral");
  const [sentimentResponse, setSentimentResponse] = useState([]);

  useEffect(() => {
    const checkChatId = async () => {
      // Retrieve last 10 messages
      const chats = await chatService.createChatId({ receieverId: users[id].userId });
      setChatId(chats.chatId);

      const messages = await chatService.fetchTopMessage(chats.chatId);
      setChat([...messages?.chat]);
    };
    if (id !== null) {
      checkChatId();
    }
  }, [id]);

  useEffect(() => {
    const analysisCall = async () => {
      if (chat.length && chat[chat.length - 1]["senderId"] != userId) {
        const analysisData = await analyzeService.analyze({ text: chat[chat.length - 1]["content"] });
        const { response, sentiment } = analysisData;
        setSentiment(sentiment);
        setSentimentResponse(response);
      } else {
        setSentiment("neutral");
      }
    };
    analysisCall();
  }, [chat?.length]);

  const handleMessage = (e, data, type) => {
    if (data) {
      sendMessage(data, { ...users[id], chatId });
    } else if ((e.key == "Enter" || type == "submit") && message.trim() !== "") {
      sendMessage(message, { ...users[id], chatId });
      setMessage("");
    } else {
      setMessage(e.target.value);
    }
  };

  const getTime = (date) => {
    const formatedTime = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC", // Ensures it's in UTC
      hour12: true, // Use 24-hour format
    }).format(new Date(date));
    return formatedTime;
  };

  return (
    <div className="h-full bg-white w-9/12 rounded-md border-2 border-gray-300 flex flex-col space-y-2">
      <div className="w-full border-b-2 p-2 flex space-x-2 items-center text-sm">
        <div className="flex flex-col items-center">
          <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${users?.[id]?.["username"]}`} className="w-8 h-8 rounded-md" alt="avatar" />
        </div>

        <p>{users?.[id]?.username}</p>
      </div>

      {/* Message Handler */}
      <div className="flex-grow flex flex-col overflow-y-scroll items-end text-sm space-y-2 p-2">
        {chat.map((value) => (
          <div
            className={`p-2 flex flex-col border-2 rounded-md shadow-sm ${
              value.senderId == userId ? "bg-indigo-500 text-white border-indigo-500" : "self-start"
            }`}
          >
            <p>{value.content}</p>
            <small className="self-end">{getTime(value.sentAt)}</small>
          </div>
        ))}
      </div>

      <Feedback sentiment={sentiment} sentimentResponse={sentimentResponse} handleMessage={handleMessage}></Feedback>

      {/* Input Handler */}
      <div className="p-2 border-t-2 border-gray-300 flex space-x-2 bg-gray-100 rounded-b-md">
        <input
          value={message}
          onChange={(e) => handleMessage(e)}
          onKeyDown={handleMessage} // Detects "Enter" key
          type="text"
          placeholder="Type your message here"
          className="text-sm text-gray-500 outline-none w-full bg-gray-100 rounded-b-md"
        ></input>
        <button
          onClick={() => handleMessage("", "", "submit")}
          disabled={message == ""}
          className="rounded-full active:scale-95 bg-gray-800 disabled:bg-gray-500 text-white p-2 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Message;
