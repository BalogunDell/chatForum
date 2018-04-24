import React from 'react';

const PrivateChatBoard = ({
  chatPartnerDetails,
  hidePrivateChatPanel,
  inviteNewUser,
  onlineUsers,
  inviteNeWuserOption,
  newPrivateMessage,
  handleInput,
  history,
  noMessages
}) => {
  const chatPartnerUsername = chatPartnerDetails.length == 0 
  ?  ''
  : 
  chatPartnerDetails[0].username;

  const usersToInvite = chatPartnerDetails.length !== 0
  ? 
    onlineUsers.filter((user) => {
      return user.username !== chatPartnerDetails[0].username
    }) 
  : 
    [];
  
  return(
    <div className="private-chatboard">
      <div className="row chatPartner">

        <div className="col-sm-8">
          <h6>{chatPartnerUsername}</h6>
        </div>

        <div className="chatIcons">
          <div className="col-sm-2">
            <i
              id="inviteUser"
              className="fa fa-plus"
              style={{size: '36px'}}
              onClick={inviteNewUser}
            ></i>
          </div>

          <div className="col-sm-2">
            <i
              className="fa fa-remove"
              style={{size: '36px'}}
              onClick={hidePrivateChatPanel}
            ></i>
          </div>
        </div>
      </div>

      { inviteNeWuserOption
      ? 
      <div className="row inviteUsers">
        { usersToInvite.length == 0 
                ?
                <h6>No other user to invite</h6>
              :
                <select
                  name="users"
                  id="users"
                  className="form-control">
                    { usersToInvite.map((user) => {
                      return <option 
                        value={user.username}
                        key={user.sessionId}>
                        {user.username}
                      </option>
                    })}
                </select>
              }
          </div>
      :
      null
      }

      <div
        className="privateChatMessagesBoard" 
        id="privateChatMessagesBoard">
        
      </div>

      <div>

        <div className="col-sm-12" style={{padding: 0, margin:0}}>
          <textarea
            name="newPrivateMessage"
            id="privateMessage"
            value={newPrivateMessage}
            onChange={handleInput}
            placeholder="press enter to send...">
          </textarea>
      </div>
      </div>
  </div>
  );
};

export default PrivateChatBoard;
