import { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";

const useWebSocket = (url, username, userId) => {
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

      // Cleanup on unmount
      return () => {
        console.log("Socket Disconnected");
        socket.close();
      };
    }
  }, [url, userId]);

  return { users };
};

export default useWebSocket;
