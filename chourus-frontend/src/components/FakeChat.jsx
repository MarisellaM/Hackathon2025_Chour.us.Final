import React, { useState, useEffect } from "react";
import "./FakeChat.css";

export default function FakeChat() {
  const [messages, setMessages] = useState([
    {
      sender: "other",
      name: "AliceInChainz",
      text: "Hey there!",
      avatar: "https://i.pravatar.cc/32?img=3",
    },
    {
      sender: "other",
      name: "Kira878",
      text: "What hotel are y'all staying at?",
      avatar: "https://i.pravatar.cc/32?img=5",
    },
  ]);

  const [input, setInput] = useState("");

  useEffect(() => {
    // Fake bot reply
    if (messages.length > 0 && messages[messages.length - 1].sender === "user") {
      const timeout = setTimeout(() => {
        const fakeReplies = [
          {
            text: "I'll look into that one!",
            name: "Swifty2007",
            avatar: "https://i.pravatar.cc/32?img=4",
          },
          {
            text: "Where is that?",
            name: "Swifty2007",
            avatar: "https://i.pravatar.cc/32?img=6",
          },
          {
            text: "Oh that one",
            name: "Swifty2007",
            avatar: "https://i.pravatar.cc/32?img=6",
          },

           { 
            name: "AliceInChainz",
            text: "Thats cool",
            avatar: "https://i.pravatar.cc/32?img=3",}

        ];
        const reply = fakeReplies[Math.floor(Math.random() * fakeReplies.length)];
        setMessages((prev) => [
          ...prev,
          { sender: "other", text: reply.text, avatar: reply.avatar, name: reply.name},
        ]);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        Chat <span className="online-dot"></span>
      </div>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message-row ${
              msg.sender === "user" ? "user-row" : "other-row"
            }`}
          >
            {msg.sender === "other" && msg.avatar && (
              <img src={msg.avatar} alt="avatar" className="avatar" />
            )}
            <div className="message-content">
              {msg.sender === "other" && msg.name && (
                <div className="message-name">{msg.name}</div>
              )}
              <div
                className={`message ${
                  msg.sender === "user" ? "user-message" : "other-message"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

