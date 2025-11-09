// src/components/ChatBox.jsx
// Simple, self-contained chat widget with local state.
// Exports a *default* component so `import ChatBox from "../components/ChatBox"` works.

import { useState } from "react";

export default function ChatBox() {
  // Local input state (demo only; no backend yet)
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, who: "System", body: "Welcome to the concert group chat!" },
  ]);

  const send = () => {
    const v = text.trim();
    if (!v) return;
    setMessages((m) => [...m, { id: Date.now(), who: "You", body: v }]);
    setText("");
  };

  return (
    <div className="panel">
      <h3 style={{ marginTop: 0 }}>Group Chat</h3>

      {/* Messages list */}
      <div className="messages" style={{ height: 220, overflow: "auto" }}>
        {messages.map((m) => (
          <p key={m.id} style={{ margin: "6px 0" }}>
            <strong>{m.who}:</strong> {m.body}
          </p>
        ))}
      </div>

      {/* Input row */}
      <div className="chat-input">
        <input
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
