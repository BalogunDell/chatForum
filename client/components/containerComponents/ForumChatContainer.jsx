import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import Button from '../presentationalComponents/reusables/Button';
import Form from '../presentationalComponents/reusables/Form';
import ForumChatBoard from '../presentationalComponents/ForumChatBoard';
import PrivateChatContainer from '../containerComponents/PrivateChatContainer';
import {
  getStorage,
  setStorage,
  UIupdater,
  privateChatUIupdater,
  scrollDivToBottom,
  messageObject } from '../../utils/helpers';
import { getMethod } from '../../assets/js/fetcher';


/** 
 * @description ChatComponent
 * 
 * @returns {JSX} DOM representation
*/
class ForumChatContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      socket: io.connect(`localhost:9000/?token=${getStorage('token')}`),
      userData: {},
      response: [],
      selectedChatPartner: [],
      newPrivateMessage:'',
      message: '',
      currentUser: '',
      currentUserId: 0,
      noMessages: false,
      chatPartner: '',
      chatPartnerUserId: 0,
      showPrivateChat: false,
      inviteNeWuserOption: false,
      privateChatHistory: [],
      sender:''
    }

    this.handleInput = this.handleInput.bind(this);
    this.getSingleUser = this.getSingleUser.bind(this);
  }

/**
 * @description componentWillMount
 * 
 * @memberof ForumChatContainer
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
 * @memberof ForumChatContainer
 * 
 * @returns {object} updated
 */
componentDidMount() {
   const messageDisplay = document.getElementById('messages');
  getMethod('/user', getStorage('token'))
    .then((response) => {
      const {
        username,
        id
      } = response.data.user;

      this.setState({
        currentUser: username,
        currentUserId: id,
        userData: { id, username }
      });
    })
    .catch((error) => {
      alertify.error('Session expired');
      this.setState({
        redirect: true
      })
    });

  // Get all users online
  this.state.socket.on('all users online', (client) => {
    this.setState({
      response: client.users
    });
  });


  // Fetch all forum messages
  this.state.socket.on('forum messages', (messages) => {
    if(messages.length == 0 || !messages) {
       return this.setState({
        noMessages: true
      });
    }
    console.log(messages);
    messages.map((message) => {

      // Compose message object
      const messagesObject = messageObject(
        message.user.username,
        message.timeSent,
        message.message);
      
      // Update UI with messages 
      UIupdater(messagesObject, 'messages');
    })

    // Scroll the messages div to the bottom
    scrollDivToBottom('messages');
  });


  // Fetch private chat history
  this.state.socket.on('chat history', (history) => {
    this.setState({
      privateChatHistory: history
    });
  history.map((singleMessage) => {
    if( this.state.currentUserId === singleMessage.senderId) {
      this.setState({
        sender: this.state.currentUser
      });
  } else {
    this.setState({
      sender: this.state.selectedChatPartner[0].username
    });
  }

  // Compose message object
  const messagesObject = messageObject(
    this.state.sender,
    singleMessage.timeSent,
    singleMessage.message);

  // Update the UI with the message
  privateChatUIupdater( messagesObject, 'privateChatMessagesBoard' );
  
  });

   // Scroll the messages div to the bottom
   scrollDivToBottom('privateChatMessagesBoard');

});

  // Send username to verify who the user is
  this.state.socket.on('new joined', (client) => {
    alertify.success(`${client.username} just joined`);
  });


  // If no token, log user out
  this.state.socket.on('authentication error', (message) => {
    localStorage.clear();
    this.setState({
      redirect: true
    });
  
    
  // On refresh or disconnection
  this.state.socket.disconnect();
    alertify.error('You are not authenticated');
  })


  // Send message for forum chat
  $('#newMessage').keypress((ev) => {
    this.state.socket.emit('typing', this.state.currentUser);
    if(ev.which === 13) {
      if (event.target.value === ' ') {
        $('#newMessage').val('').blur();
       return alertify.error('You cannot send a blank message');
      }
      const messageObject = {
        message: this.state.message,
        sender: this.state.currentUser,
        senderId: this.state.currentUserId
      }

  // Emit message to server
    this.state.socket.emit('new message', (messageObject));
      $('#newMessage').val('').blur();
    }
  });


  // Show isTyping message
  this.state.socket.on('user typing', (user) => {
    document.getElementById('isTyping').innerHTML = `Someone is typing?`;
  });

  // Update UI when new message is saved
  this.state.socket.on('new saved message', (savedMessage) => {
    document.getElementById('isTyping').innerHTML = '';
    $('#messages h5#noHistory').remove();
      UIupdater(savedMessage, 'messages');

  // Scroll the messages div to the bottom
  scrollDivToBottom('messages');

  });
}

/**
 * @description gets a user for private chat and shows the private chat panel
 * 
 * @param {object} event
 * 
 * @returns {object} Updated state
 */
getSingleUser(event) {

  // Clear all chat to load another
  $('.privateGeneratedMessagesHolder').remove();

  //  Clear present state if another user is clicked
  const chatPartnerUserId = event.target.value;
  const payload = {
    currentUser: this.state.currentUserId,
    chatPartnerUserId 
  };

  // Check if the user clicked on his/her name and send this message
  if (chatPartnerUserId === this.state.currentUserId) {
    return alertify.error('You cannot send a message to yourself');
  }

  // Send user IDs to fetch chat history
  this.state.socket.emit('fetch chat history', (payload));
  $('.private-chatboard').css({
    display: 'flex'
  });
  
  const selectedChatPartner = this.state.response.filter((user) => {
    return user.id === chatPartnerUserId
  });
  const currentUserSessionId = this.state.response.filter((user) => {
    return user.id === this.state.currentUserId
  });

  this.setState({
    selectedChatPartner,
    currentUserSessionId: currentUserSessionId[0].sessionId
  });
  setStorage('id', chatPartnerUserId);
}



/**
 * @description renders the element
 * 
 * @memberof ForumChatContainer
 * 
 * @returns {JSX} DOM representation
 */
render() {
  return(
    this.state.redirect 
    ?
      <Redirect to ="/login"/>
    : 
      <div className= 'home-container'>
        <div className="chat-container">
          <ForumChatBoard
            userData={this.state.userData}
            response={this.state.response}
            message={this.state.message}
            noMessages={this.state.noMessages}
            getSingleUser={this.getSingleUser}
            handleInput={this.handleInput}
          />
            <PrivateChatContainer
              selectedChatPartner={this.state.selectedChatPartner}
              response={this.state.response}
              currentUserId={this.state.currentUserId}
              privateChatHistory={this.state.privateChatHistory}
              currentUserSessionId={this.state.currentUserSessionId}
              currentUser={this.state.currentUser}
            />
        </div>
      </div>
    );
  }
}

export default ForumChatContainer;