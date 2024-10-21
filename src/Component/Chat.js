import React, { useState, useEffect, useCallback } from "react";
import SignalRService from "./SignalRService";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState("");
  let max = 10;
  let userId = Math.floor(Math.random() * max);
  console.log(userId);

  useEffect(() => {
    const connect = async () => {
      await SignalRService.start();
      console.log("Connected to SignalR");
    };
    connect();

    return () => {
      SignalRService.connection.stop();
    };
  }, []);

  useEffect(() => {
    SignalRService.onReceiveMessage(userId, (user, message) => {
      setMessages((prev) => [...prev, { user, message }]);
      console.log(user, message);
    });
  }, []);

  const sendMessage = useCallback(async () => {
    if (newMessage.trim() && user.trim()) {
      try {
        await axios.post("https://localhost:7298/api/message", {
          user: user,
          content: newMessage,
          userId: userId,
        });
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  }, [newMessage, user]);

  // const sendMessage = async () => {
  //     try {
  //         await axios.post('https://localhost:7298/api/message', {
  //             user: user,
  //             content: newMessage
  //         });
  //         setNewMessage('');
  //     } catch (error) {
  //         console.error('Error sending message:', error);
  //     }
  // };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Enter your name"
      />
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
