import React, { useRef, useEffect } from 'react';
import ChatMessage from './chatMessage';
import './styles/chat.css';
import './styles/index.css';
import './styles/variables.css';
function MessageList({ messages, isLoading }) {
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      {isLoading && (
        <div className="message assistant">
          <div className="message-content loading">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;