import React from 'react';
import './styles/chat.css';
import './styles/index.css';
import './styles/variables.css';

function InputBar({ input, onChange, onSend, isLoading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={input}
        onChange={onChange}
        onKeyUp={handleKeyPress}
        placeholder="Type your tax question here..."
        disabled={isLoading}
      />
      <button 
        onClick={() => onSend()} 
        disabled={isLoading || !input.trim()}
      >
        Send
      </button>
    </div>
  );
}

export default InputBar;