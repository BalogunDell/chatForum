import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../presentationalComponents/reusables/Button';
import Form from '../presentationalComponents/reusables/Form';
import socket from '../../assets/js/chat';
/** 
 * @description ChatComponent
 * 
 * @returns {jJSX} DOM representation
*/
class ChatComponent extends React.Component {
  constructor(props){
    super(props);

  }
render() {
  return(
      <div className= 'home-container'>
          <div className="centered-intro">
            <h1>
              Welcome to the chat screen
            </h1>
          </div>
      </div>
    );
  }
}

export default ChatComponent;