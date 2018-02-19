import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import Button from '../presentationalComponents/reusables/Button';
import Form from '../presentationalComponents/reusables/Form';
import ChatBoard from '../presentationalComponents/ChatBoard';
import {
  getStorage,
  UIupdater } from '../../utils/helpers';
import { getMethod } from '../../assets/js/fetcher';


/** 
 * @description ChatComponent
 * 
 * @returns {JSX} DOM representation
*/
class ChatComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      socket: io.connect(`localhost:4000/?token=${getStorage()}`)
    }

    // this.handleNewMessage = this.handleNewMessage.bind(this);
  }

/**
 * @description componentWillMount
 * 
 * @memberof Authentication
 * 
 * @returns {object} updated
 */
componentWillMount() {
  if(!getStorage()) {
    this.setState({
      redirect: true,
      userData: {},
      connectedUsers: [],
      response: {},
      message: [],
      currentUser: '',
      currentUserId: 0,
      noMessages: false
    });
  }
}

/**
 * @description componentDidMount
 * 
 * @memberof Authentication
 * 
 * @returns {object} updated
 */
componentDidMount() {

  getMethod('/user', getStorage())
    .then((response) => {
      const {
        username,
        id
      } = response.data.user;

      this.setState({
        currentUser: username,
        currentUserId: id
      });
    })
    .catch((error) => {
      alertify.error('Session expired');
      this.setState({
        redirect: true
      })
    });

    // Connect client
  this.state.socket.on('connect', () => {
    this.state.socket.on('all users online', (client) => {
      this.setState({
        response: client.users
      })
  });

  // Fetch all forum messages
  this.state.socket.on('forum messages', (messages) => {
    if(messages.length == 0 || !messages) {
       return this.setState({
        noMessages: true
      });
    }
    messages.map((message) => {
      const messageObject = {
        message: message.message,
        sender: message.user.username,
        timeSent: message.timeSent
      };
        UIupdater(messageObject);
      const currentScrollHeight = messageDisplay.scrollHeight;
      messageDisplay.scrollTop = currentScrollHeight;
   
    });
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
});


  // Send message
 
  $('#newMessage').keypress((ev) => {

    this.state.socket.emit('typing', this.state.currentUser);

    if(ev.which === 13) {
      const messageObject = {
        message: event.target.value,
        sender: this.state.currentUser,
        senderId: this.state.currentUserId
      }
        // Emit message to server
      this.state.socket.emit('new message', (messageObject));
      event.target.value = '';
    }
  });

  // Show isTyping message
  this.state.socket.on('user typing', (user) => {
    document.getElementById('isTyping').innerHTML = `Someone is typing?`;
  });
  const messageDisplay = document.getElementById('messages');
  this.state.socket.on('new saved message', (savedMessage) => {
    document.getElementById('isTyping').innerHTML = '';
      UIupdater(savedMessage);

      // Push message display up
      const currentScrollHeight = messageDisplay.scrollHeight;
      messageDisplay.scrollTop = currentScrollHeight;
   
  });
}

/**
 * @description renders the element
 * 
 * @memberof Authentication
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
          <ChatBoard
            userData={this.state.userData}
            response={this.state.response}
            message={this.state.message}
            noMessages={this.state.noMessages}
          />
        </div>
      </div>
    );
  }
}

export default ChatComponent;