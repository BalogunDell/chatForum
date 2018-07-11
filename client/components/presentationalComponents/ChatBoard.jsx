import React from 'react';
import UIupdater from './UIupdater'

const ChatBoard = ({
  response,
  message,
  noMessages,
  handlePeerToPeerChat,
  chatPartnerUsername,
  handleInput,
  handleLogout,
  messageSenderId,
  chatMessages,
  handleForumButton
}) => {
  return(

  <div className="chat-wrapper">
    <div id="online-users">
      <h5>
        Online users
      </h5>
       <ul>{
          response == undefined || !response 
          ?
          <h6>No users online</h6>
          :
          response.map((user) => {
            return <li key={user.sessionId}
            onClick={handlePeerToPeerChat}
            value={user.id}
            data-username ={user.username}
            >
              {user.username} { messageSenderId === user.id ? <sup>new</sup>: null }
            </li> 
          })
          }
          { chatPartnerUsername ? 
            <li id="forum" onClick={handleForumButton}>forum</li>
            : 
            null
          }
        </ul>
    </div>

    <div id="chat-screen">
       <div className="chat-screen-header">
          <h4>{chatPartnerUsername || ''}</h4>
          <button onClick={handleLogout}>Logout</button>
       </div>

          <div className="chat-messages" id="messages">
          {
            noMessages ?
            <h6 id="noHistory">No message history</h6>
          :
            null
          }

          {
            chatMessages ? 
            <UIupdater messages = {chatMessages}/>
            : 
            null
          }
          </div>

        <div className="row">
          <div className="col-sm-12" style={{padding: 0, margin:0}}>
            <textarea
              name="message" 
              id="newMessage"
              value={message}
              onChange={handleInput}
              placeholder="Press enter to send your message...">
            </textarea>
          </div>
      </div>
    </div>
  </div>
  );
};

export default ChatBoard;
