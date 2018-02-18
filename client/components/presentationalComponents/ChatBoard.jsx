import React from 'react';
import { getStorage, socketConnection } from '../../utils/helpers';

const ChatBoard = ({
  userData,
  response,
  test
}) => {

  const profileInfo = userData === undefined ? '': userData;
  console.log(test);
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
          test == undefined || !test 
          ?
          <h6>No users online</h6>
          :
          test.map((user) => {
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

      <div className="messages">
        <p>Laolu: dfajdfnjdfndanfadfdfajdfnjdfndanfadfdfajdfnjdfndanfadfdfajdfnjdfndanfadfdfajdfnjdfndanfadfdfajdfnjdfndanfadfdfajdfnjdfndanfadfdfajdfnjdfndanfadfdfajdfnjdfndanfadfdfajdfnjdfndanfadf</p>
        <p>Femi: dfajdfnjdfndanfadf</p>
      </div>

    {/* Input message holder */}
      <div className="row messaging-center">

        <div className="col-sm-12">
          <textarea
            name="newMessage" 
            id="newMessage" >
          </textarea>
        </div>

      </div>

    </div>
  </div>
  );
};

export default ChatBoard;
