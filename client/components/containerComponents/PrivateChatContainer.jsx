import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import Button from '../presentationalComponents/reusables/Button';
import Form from '../presentationalComponents/reusables/Form';
import PrivateChatBoard from '../presentationalComponents/PrivateChatBoard';
import {
  getStorage,
  setStorage,
  privateChatUIupdater,
  UIupdater
} from '../../utils/helpers';
import { getMethod } from '../../assets/js/fetcher';


/** 
 * @description ChatComponent
 * 
 * @returns {JSX} DOM representation
*/
class PrivateChatContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      socket: io.connect(`localhost:9000/?token=${getStorage('token')}`),
      userData: {},
      selectedChatPartner: this.props.selectedChatPartner,
      newPrivateMessage:'',
      currentUser: '',
      noMessages: false,
      chatPartner: '',
      chatPartnerUserId: 0,
      showPrivateChat: false,
      inviteNeWuserOption: false,
      history: [],
      currentUserSessionId: '',
      sender: ''
    }

    this.hidePrivateChatPanel = this.hidePrivateChatPanel.bind(this);
    this.inviteNewUser = this.inviteNewUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

/**
 * @description componentWillMount
 * 
 * @memberof PrivateChatContainer
 * 
 * @returns {object} updated
 */
componentWillMount() {
  if(!getStorage('token')) {
    this.setState({
      redirect: true,
    });
  }
}

handleInput(event) {
  const name = event.target.name
  this.setState({
    [name]: event.target.value
  });
}

/**
 * @description componentDidMount
 * 
 * @memberof PrivateChatContainer
 * 
 * @returns {object} updated
 */
componentDidMount() {
  const messageDisplay = document.getElementById('privateChatMessagesBoard');
   // Get sent private message and update the UI
   this.state.socket.on('saved private message', (privateMessage) => {
     $('.private-chatboard').css({
      display: 'flex'
    });;
    const { message, timeSent } = privateMessage;
    if( this.props.currentUserId === privateMessage.senderId) {
        this.setState({
          sender: this.props.currentUser
        });
    } else {

      this.setState({
        sender: this.state.selectedChatPartner[0].username
      });
    }
    const messageObject = {
      message,
      timeSent,
      sender: this.state.sender
    }
    privateChatUIupdater( messageObject, 'privateChatMessagesBoard' );

       // Push message display up
      const currentScrollHeight = messageDisplay.scrollHeight;
      messageDisplay.scrollTop = currentScrollHeight;
  });

   
  
    
  // Show isTyping message
  this.state.socket.on('user typing', (user) => {
    document.getElementById('isTyping').innerHTML = `Someone is typing?`;
  });

  // Private chat between two people
  $('#privateMessage').keypress((ev) => {
    if(ev.which === 13) {
      const id = getStorage('id');
      const selectedChatPartner = this.props.response.filter((users) => {
        return users.id === parseInt(id, 10);
      });
      const messageObject = {
        users: `user${this.props.currentUserId}:user${selectedChatPartner[0].id}`,
        senderId: this.props.currentUserId,
        receiverId: selectedChatPartner[0].id,
        receiverSessionId: selectedChatPartner[0].sessionId,
        currentUserSessionId: this.state.currentUserSessionId,
        message: this.state.newPrivateMessage
      }
      
    // Emit new private messge
      this.state.socket.emit('new private message', (messageObject));
      event.target.value = '';
    }
  });
}

componentWillReceiveProps(nextProps) {
  if (nextProps.selectedChatPartner.length !== 0) {
     this.setState({
      selectedChatPartner: nextProps.selectedChatPartner 
    });
  }
  if (nextProps.currentUserSessionId) {
    this.setState({
      currentUserSessionId: nextProps.currentUserSessionId 
   });
 }

  if(nextProps.privateChatHistory.length !== 0) {
    this.setState({
      noMessages: false,
      history: nextProps.privateChatHistory
    });
  }
}

/**
 * @description gets a user for private chat and shows the private chat panel
 * 
 * @param {object} event
 * 
 * @returns {object} Updated state
 */
hidePrivateChatPanel(event) {
  this.setState({
    inviteNeWuserOption: false
  });
  $('.private-chatboard').css({
    display: 'none'
  })
}

/**
 * @description invites a user to a chat
 * 
 * @param {object} event
 * 
 * @returns {object} Updated state
 */
inviteNewUser(event) {
  this.setState({
    inviteNeWuserOption: true
  });
}



/**
 * @description renders the element
 * 
 * @memberof PrivateChatContainer
 * 
 * @returns {JSX} DOM representation
 */
render() {
  return( 
      <div>
        <div className="chat-container">
            <PrivateChatBoard
              chatPartnerDetails={this.state.selectedChatPartner}
              inviteNewUser={this.inviteNewUser}
              hidePrivateChatPanel={this.hidePrivateChatPanel}
              onlineUsers = {this.props.response}
              inviteNeWuserOption={this.state.inviteNeWuserOption}
              newPrivateMessage={this.state.newPrivateMessage}
              handleInput={this.handleInput}
              noMessages={this.state.noMessages}
              history={this.state.history}
            />
        </div>
      </div>
    );
  }
}

export default PrivateChatContainer;