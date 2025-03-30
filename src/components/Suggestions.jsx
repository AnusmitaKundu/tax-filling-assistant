import React from 'react';
import './styles/chat.css';
import './styles/index.css';
import './styles/variables.css';

function Suggestions({ suggestions, onSuggestionClick }) {
  return (
    <div className="suggestions-container">
      {suggestions.map((suggestion, index) => (
        <button 
          key={index} 
          className="suggestion-button"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}

export default Suggestions;