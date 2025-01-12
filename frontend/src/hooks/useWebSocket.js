import { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";

const useWebSocket = (url, username, userId, setChat) => {
  const socketRef = useRef(null); // WebSocket reference
  const [users, setUsers] = useState({});

  useEffect(() => {
    if (userId) {
      // Create WebSocket connection
      const socket = io(url);
      socketRef.current = socket;

      // Emit the user's online status when they connect
      socket.emit("userOnline", { username, userId });

      // Listen for updated user list
      socket.on("updateUserList", (updatedUsers) => {
        console.log("UpdatedUsers", updatedUsers);
        setUsers(updatedUsers);
      });

      // Listen for handling messages
      socket.on("handleMessage", (messages) => {
        console.log("message Recieved", messages);
        const { senderId, content, sentAt: timestamp } = messages;
        setChat((prev) => [...prev, { sentAt: timestamp, senderId, content: content }]);
      });

      // Cleanup on unmount
      return () => {
        console.log("Socket Disconnected");
        socket.close();
      };
    }
  }, [url, userId]);

  // Function to send a message
  const sendMessage = useCallback(
    (messageContent, recipient) => {
      console.log(recipient, messageContent);
      if (socketRef.current) {
        const { userId: recipientId, socketId, chatId } = recipient;

        const message = {
          senderId: userId,
          recipientId,
          recipientSocketId: socketId,
          content: messageContent,
          chatId,
          timestamp: new Date().toISOString(),
        };

        setChat((prev) => [...prev, { sentAt: message.timestamp, senderId: userId, content: messageContent }]);

        // Emit the message to the server
        socketRef.current.emit("sendMessage", message);
      }
    },
    [userId]
  );

  return { users, sendMessage };
};

export default useWebSocket;
