import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import ChatBoard from '../presentationalComponents/ChatBoard';
import {
  getStorage,
  UIupdater,
  scrollDivToBottom,
  messageObject } from '../../utils/helpers';
import { getMethod } from '../../assets/js/fetcher';


/** 
 * @description ChatComponent
 * 
 * @returns {JSX} DOM representation
*/
class ChatContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      socket: io.connect(`http://localhost:9000/?token=${getStorage('token')}`),
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
      sender:'',
      chatPartnerUsername: '',
      messageSenderId: '',
      chatMessages: []
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handlePeerToPeerChat = this.handlePeerToPeerChat.bind(this);
    this.fetchAllForumMessages = this.fetchAllForumMessages.bind(this);
    this.handleForumButton = this.handleForumButton.bind(this);
    this.getAllOnlineUsers = this.getAllOnlineUsers.bind(this);
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

handleLogout() {
  localStorage.clear();
  this.setState({
    redirect: true
  });
}

handleForumButton() {
  this.state.chatPartnerUsername = '';
  this.fetchAllForumMessages(this.state.socket);
}
/**
 *Fetches the history of forum chat
 *
 * @param {object} socket
 * 
 * @memberof ChatContainer
 */
fetchAllForumMessages(socket) {
  socket.emit('forum messages needed');
  socket.on('forum messages', (messages) => {
    if(messages.length == 0 || !messages) {
       return this.setState({
        noMessages: true
      });
    }
    // Update response for universal use
    messages.map((message) => {
      message.sender = message.user.username
    });

    this.setState({
      chatMessages: messages
    });

    // Scroll the messages div to the bottom
      scrollDivToBottom('messages');
  });
}

getAllOnlineUsers(socket) {
   // Get all users online
  socket.on('all users online', (client) => {
    this.setState({
      response: client.users
    });
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
      });
    });

    // Fetch the list of all users online
    this.getAllOnlineUsers(this.state.socket);

  // Fetch all forum messages
  this.fetchAllForumMessages(this.state.socket);

  // Send username to verify who the user is
  this.state.socket.on('new joined', (client) => {
    if (this.state.currentUser != client.username) {
      return alertify.success(`${client.username} just joined`);
    }
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


   // Update UI when new private message is saved
  this.state.socket.on('saved private message', (privateMessage) => {
    $('h5#noHistory').remove();
    const { message, timeSent } = privateMessage;
    if (this.state.currentUserId === privateMessage.senderId) {
        this.setState({
          sender: this.state.currentUser
        });
    } else {
      this.setState({
        sender: this.state.chatPartnerUsername
      });
    }

    const messagesObject = {
      message,
      timeSent,
      sender: this.state.sender
    }
    const tempChatMessages = this.state.chatMessages;
    tempChatMessages.push(messagesObject);
    this.setState({
      chatMessages: tempChatMessages
    })
    // If a chatpartner has been selected, update the UI with the messages
    // If not, emit new to the person who has a new message but has not selected
    //a chat partner
    if (this.state.chatPartnerUsername) {
      $('#newMessage').val('');
      scrollDivToBottom('messages');
    } else {
      this.state.socket.on('new message alert', (messageSenderId) => {
        this.setState({
          messageSenderId
        });
      });
    }
  });

  // Update UI when new message is saved
  this.state.socket.on('new saved message', (savedMessage) => {
    $('#newMessage').val('');
    const tempChatMessages = this.state.chatMessages;
    tempChatMessages.push(savedMessage);
    this.setState({
      chatMessages: tempChatMessages
    });
      scrollDivToBottom('messages');
    });


     // Send message for forum chat
  $('#newMessage').val('');
  $('#newMessage').keypress((ev) => {

    // Disable spacebar so that users dont send empty blank messages
    if (ev.which === 32 && !ev.target.value) {
      $('#newMessage').val('').focus();
      return false;
    }

    // Send message if the enter button is clicked 
    if(ev.which === 13 && !this.state.chatPartnerUsername) {

    // Check if message value is empty
    if (ev.target.value === '') {
      return false;
    }

    const messageObject = {
      message: ev.target.value.trim(),
      sender: this.state.currentUser,
      senderId: this.state.currentUserId
    }

  // Emit message to server
    this.state.socket.emit('new message', (messageObject));

    } else {

      if(ev.which === 13) {

         // Check if message value is empty
          if (ev.target.value === '') {
            return false;
          }

        const selectedChatPartner = this.state.response.filter((users) => {
          return users.username === this.state.chatPartnerUsername;
        });
        const messageObject = {
          users: `user${this.state.currentUserId}:user${selectedChatPartner[0].id}`,
          senderId: this.state.currentUserId,
          receiverId: selectedChatPartner[0].id,
          receiverSessionId: selectedChatPartner[0].sessionId,
          currentUserSessionId: this.state.currentUserSessionId,
          message: ev.target.value.trim()
        }
        
      // Emit new private messge
        this.state.socket.emit('new private message', (messageObject));
      }
    }

  });
}

/**
 * @description Handles single user chat
 * 
 * @param {object} event
 * 
 * @returns {object} Updated state
 */
handlePeerToPeerChat(event) {
  this.setState({
    messageSenderId: 0
  })
  $('#newMessage').val('');
   //  Clear present state if another user is clicked
   const chatPartnerUserId = event.target.value;
   const payload = {
     currentUser: this.state.currentUserId,
     chatPartnerUserId 
   };
 
   
   // Check if the user clicked on his/her name and send this message
   if (event.target.dataset.username === this.state.currentUser) {
     return alertify.error('You cannot send a message to yourself');
    } else {
      this.setState({
        chatPartnerUsername: event.target.dataset.username
      });
    }
    if (event.target.dataset.username === this.state.chatPartnerUsername) {
      return false;
    }
  
    // Clear the screen and update with the history
    this.state.socket.emit('fetch chat history', (payload));
    // Fetch private chat history
    this.state.socket.on('chat history', (history) => {
    
    let formattedHistory = [];
    history.map((singleMessage) => {
      if( this.state.currentUserId === singleMessage.senderId) {
        this.setState({
          sender: this.state.currentUser
        });
    } else {
      this.setState({
        sender: this.state.chatPartnerUsername
      });
    }
    singleMessage.sender = this.state.sender;
    // Compose message object
    const messagesObject = messageObject(
      singleMessage.sender,
      singleMessage.timeSent,
      singleMessage.message);

      formattedHistory.push(messagesObject);
  });

      this.setState({
        chatMessages: formattedHistory
      });
  
    scrollDivToBottom('messages');

  });
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
      <div className= 'overall-chat-wrapper'>
        <div className="chat-container">
              <ChatBoard
              userData={this.state.userData}
              response={this.state.response}
              message={this.state.message}
              noMessages={this.state.noMessages}
              handlePeerToPeerChat={this.handlePeerToPeerChat}
              handleInput={this.handleInput}
              chatPartnerUsername = {this.state.chatPartnerUsername}
              handleLogout = {this.handleLogout}
              messageSenderId={this.state.messageSenderId}
              chatMessages={this.state.chatMessages}
              handleForumButton={this.handleForumButton}
            />
        </div>
      </div>
    );
  }
}

export default ChatContainer;