import React from 'react';

function Message({ text, sender }) {
  const isUser = sender === 'You';

  return (
    <div className={`message-box ${isUser ? 'user-message' : 'chatbot-message'}`}>
      <span className={`message-text ${isUser ? 'user-text' : 'chatbot-text'}`}>
        {text}
        {console.log(text)}
      </span>
    </div>
  );
}

export default Message;