import React, { useState, useEffect } from "react";
import "./FakeChat.css";

export default function FakeChat() {
  const [messages, setMessages] = useState([
    {
      sender: "other",
      name: "AliceInChainz",
      text: "Hey there!",
      avatar: "https://scontent.fftw1-1.fna.fbcdn.net/v/t39.30808-6/484094169_122145762890389573_6425834917011496722_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=111&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=n-RI9-fyLeQQ7kNvwGYWAG_&_nc_oc=AdnIXknO9OAraaXHoEoC6BzUZvnEd8CubvpK-8trxg5zwGRyNk-koMYJLAo3CEa6w0w&_nc_zt=23&_nc_ht=scontent.fftw1-1.fna&_nc_gid=VMJfenOhhzui5meEPmBqtA&oh=00_AfjwYxKJuuoiBUhffvR7mUe32ldcXjStBzZgfdPFoKVHqA&oe=6916A992",
    },
    {
      sender: "other",
      name: "Kira878",
      text: "What hotel are y'all staying at?",
      avatar: "https://wallpapers-clan.com/wp-content/uploads/2022/11/cute-frog-pfp-16.jpg",
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
            avatar: "https://assets.teenvogue.com/photos/641b2a23912ddccbabf80f80/16:9/w_1920,c_limit/GettyImages-1474459622.jpg",
          },
          {
            text: "Where is that?",
            name: "Swifty2007",
            avatar: "https://assets.teenvogue.com/photos/641b2a23912ddccbabf80f80/16:9/w_1920,c_limit/GettyImages-1474459622.jpg",
          },
          {
            text: "Oh that one",
            name: "Swifty2007",
            avatar: "https://assets.teenvogue.com/photos/641b2a23912ddccbabf80f80/16:9/w_1920,c_limit/GettyImages-1474459622.jpg",
          },

           { 
            name: "AliceInChainz",
            text: "Thats cool",
            avatar: "https://scontent.fftw1-1.fna.fbcdn.net/v/t39.30808-6/484094169_122145762890389573_6425834917011496722_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=111&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=n-RI9-fyLeQQ7kNvwGYWAG_&_nc_oc=AdnIXknO9OAraaXHoEoC6BzUZvnEd8CubvpK-8trxg5zwGRyNk-koMYJLAo3CEa6w0w&_nc_zt=23&_nc_ht=scontent.fftw1-1.fna&_nc_gid=VMJfenOhhzui5meEPmBqtA&oh=00_AfjwYxKJuuoiBUhffvR7mUe32ldcXjStBzZgfdPFoKVHqA&oe=6916A992",}

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

