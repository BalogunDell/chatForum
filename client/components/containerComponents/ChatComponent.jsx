import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '../presentationalComponents/reusables/Button';
import Form from '../presentationalComponents/reusables/Form';
import ChatBoard from '../presentationalComponents/ChatBoard';
import { getStorage } from '../../utils/helpers';
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
      redirect: false
    }
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
      currentUser: '',
      currentSessionId: ''
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
  const token = getStorage();
  const socket = io.connect(`localhost:4000/?token=${token}`);
  socket.on('connect', () => {
    socket.on('all users online', (client) => {
      console.log(client);
      this.setState({
        response: client.users
      })
  });


  socket.emit('message', ('abbey'));

  socket.on('new joined', (client) => {
    alertify.success(`${client.username} just joined`);
  });

  socket.on('authentication error', (message) => {
    localStorage.clear();
    this.setState({
      redirect: true
    });
    socket.disconnect();
    alertify.error('You are not authenticated');
  })
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
            test={this.state.response}
          />
        </div>
      </div>
    );
  }
}

export default ChatComponent;