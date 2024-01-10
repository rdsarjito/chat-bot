import React, { useState, useEffect } from 'react';
import '../style/index.css';
import chatbotIcon from '../img/chatbot-icon.png'
import sendIcon from '../img/send-icon.png'
import Message from './Massage';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const submitForm = async () => {
    // Append user's question to the chat box
    setMessages(prevMessages => [...prevMessages, { text: userInput, sender: 'You' }]);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/jawab_pertanyaan', {
        method: 'POST',
        body: new URLSearchParams({ pertanyaan: userInput }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      const data = await response.text();
  
      // Append chatbot's response to the chat box
      setMessages(prevMessages => [...prevMessages, { text: data, sender: 'Chatbot' }]);
    } catch (error) {
      console.error('Error:', error);
    }
  
    // Clear the input field
    setUserInput('');
  };

  return (
    <div className="chat-container">
      <div id="chat-nav">
        <img src={chatbotIcon} alt="Chatbot Icon" className="chatbot-icon" />
        <strong>Chatbot</strong>
      </div>
      <div className="chat-box" id="chat-box">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} sender={message.sender} />
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        id="chat-form"
      >
        <input
          type="text"
          id="user-input"
          placeholder="Masukkan pertanyaan..."
          required={true}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit">
          <img src={sendIcon} alt="Send Icon" className="send-icon" />
        </button>
      </form>
    </div>
  );
}

export default Chatbot;