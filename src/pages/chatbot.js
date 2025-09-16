import React, { useState } from 'react';
import './chatbot.css';

const Chatbot = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="chatbot-page">
      <div className="container">
        <h2 className="page-title">Agri Assistant</h2>
        
        <div className="card">
          <div className="chat-container">
            <div className="message bot-message">
              Hello! How can I help you with farming today?
            </div>
          </div>
          
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question here..."
            />
          </div>
          <button type="button" className="btn">Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;