import React, { useState, useEffect, useCallback } from "react";
import SignalRService from "./SignalRService";
import axios from "axios";
import "../Tepcss/MessagePage.css"; // Đảm bảo có style hoặc bạn có thể viết style trực tiếp nếu muốn
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faImage,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
const MessagePage = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const username = localStorage.getItem("userName");
  const [sendUser, setSentUser] = useState("");

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
  const changeA = () => {
    setSentUser("a");
  };
  const changeB = () => {
    setSentUser("b");
  };
  const check = () => {
    console.log(sendUser);
  };
  useEffect(() => {
    SignalRService.onReceiveMessage(username, (user, message, userId) => {
      setMessages((prev) => [...prev, { user, message, userId }]);
      console.log(user, message);
    });
  }, []);
  const userName = localStorage.getItem("userName");

  const sendMessage = useCallback(async () => {
    const user = localStorage.getItem("userName");
    const message = newMessage;
    console.log(user);
    setMessages((c) => [...c, { user, message }]);
    if (newMessage.trim()) {
      try {
        // await axios.post('https://localhost:7298/api/message', {
        await axios.post("http://comics-truyentranh.somee.com/api/Message", {
          user: user,
          content: newMessage,
          userId: sendUser,
        });
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  }, [newMessage, sendUser]);

  return (
    <div className="mi-container">
      <div className="mi-sidebar">
        <h1 className="mi-sidebar-title" onClick={check}>
          Tin nhắn
        </h1>
        <p onClick={changeA}>chọn a</p>
        <p onClick={changeB}>chọn b</p>
        <p className="mi-sidebar-text">Bạn có 0 tin nhắn chưa đọc.</p>
        <div className="mi-search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="mi-search-input"
          />
          <button className="mi-search-button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="mi-message-list">
          <div className="mi-message-item">
            <img
              src="https://storage.googleapis.com/a1aa/image/yO25Zx21eDzWISPKjKtM5Eeb5j4Rn0UcCfVV1ZfIQvMZw3aOB.jpg"
              alt="Profile picture of the sender"
              className="mi-profile-pic"
            />
            <div className="mi-message-info">
              <h2 className="mi-message-sender">Mr.QUOC</h2>
              <p className="mi-message-preview">
                Chào mừng bạn đến Khóa học của Phi&P! Trong quá trình t...
              </p>
            </div>
            {/* <div className="mi-message-time">20 phút trước</div> */}
          </div>
        </div>
      </div>

      <div className="mi-content">
        <div className="mi-message-header">
          <img
            src="https://storage.googleapis.com/a1aa/image/yO25Zx21eDzWISPKjKtM5Eeb5j4Rn0UcCfVV1ZfIQvMZw3aOB.jpg"
            alt="Profile picture of the sender"
            className="mi-profile-pic"
          />
          <h2 className="mi-message-sender">Mr.Quoc</h2>
          {/* <div className="mi-message-time">20 phút trước</div> */}
        </div>
        {messages.map((msg) => (
          <div
            className={`mi-message-body ${
              msg.user === userName ? "doimau" : ""
            }`}
          >
            <p style={{ color: "black" }}>{msg.message}</p>
          </div>
        ))}
        <div className="mi-message-footer">
          <div className="mi-message-actions">
            <button className="mi-action-button">
              <FontAwesomeIcon icon={faBold} />
            </button>
            <button className="mi-action-button">
              <FontAwesomeIcon icon={faItalic} />
            </button>
            <button className="mi-action-button">
              <FontAwesomeIcon icon={faImage} />
            </button>
          </div>

          <div className="mi-message-input">
            <input
              type="text"
              placeholder="Xem lại phần Hỏi đáp về khóa học trước khi gửi tin nhắn mới cho giảng viên"
              className="mi-input"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="mi-send-button" onClick={sendMessage}>
              Gửi
            </button>
          </div>
          {/* <div className="mi-message-links">
              <a href="#" className="mi-link">Xem phần Hỏi đáp về khóa học</a>
              <a href="#" className="mi-link">Truy cập vào Trung tâm trợ giúp Udemy</a>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
