import React from 'react';

function Header({ country, progress }) {
  return (
    <header className="tax-assistant-header">
      <h1>Tax Filing Assistant</h1>
      {country && <p>Country: {country}</p>}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <span className="progress-text">{progress}% Complete</span>
      </div>
    </header>
  );
}

export default Header;