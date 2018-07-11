import React from 'react';

const UIupdater = (savedMessages) => {
  return( 
      savedMessages.messages.map((message, index) => {
        return(
          <div className="generatedMessagesHolder" key={index}>
            <h6 className="generatedMessages">{message.sender}
              <small>{message.timeSent.split(',')[1]}</small>
            </h6>
            <br/>
            <p className="generatedMessages">{message.message}</p>
            <i className="float-element">{message.timeSent.split(',')[0]}</i>
          </div>
        );
      })
  );
};

export default UIupdater;
