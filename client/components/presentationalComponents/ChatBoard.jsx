import React from 'react';
import { getStorage, socketConnection } from '../../utils/helpers';

const ChatBoard = ({
  userData,
  response,
  message,
  noMessages
  // handleKeyPress
}) => {

  const profileInfo = userData === undefined ? '': userData;
  return(
    <div className="row">
    {/* First column holds chat screen navigation */}
    <div className="col-sm-12 col-lg-4 chat-screen-navigation">

      <div className="general-header">
        <h4>
          Online users
        </h4>
      </div>

      <div className="users-online" id="users-online">
        <ul>{
          response == undefined || !response 
          ?
          <h6>No users online</h6>
          :
          response.map((user) => {
            return <li key={user.sessionId}>
              {user.username}
            </li> 
          })
          }
        </ul>
       </div>
    </div>

    {/* First column holds chat board */}
    <div className="col-sm-12 col-lg-8 chat-board">
      <div>
        <h4>Chat History</h4>
      </div>
      <div className="messages" id="messages">
      {
          noMessages ?
          <h5>No message history</h5>
        :
        null
        }
        <p id="isTyping"></p>
        </div>

    {/* Input message holder */}
      <div className="row messaging-center">

        <div className="col-sm-12" style={{padding: 0, margin:0}}>
          <textarea
            name="newMessage" 
            id="newMessage"
            value={message}
            placeholder="Press enter to send your message...">
          </textarea>
        </div>

      </div>

    </div>
  </div>
  );
};

export default ChatBoard;
