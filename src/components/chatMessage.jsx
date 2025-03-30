import React from 'react';
import './styles/chat.css';

function ChatMessage({ message }) {
  return (
    <div className={`message ${message.role}`}>
      <div className="message-content">{message.content}</div>
    </div>
  );
}

export default ChatMessage;