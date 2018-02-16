import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../presentationalComponents/reusables/Button';
import Form from '../presentationalComponents/reusables/Form';
import socket from '../../assets/js/chat';
/** 
 * @description ChatComponent
 * 
 * @returns {JSX} DOM representation
*/
class ChatComponent extends React.Component {
  constructor(props){
    super(props);

  }
render() {
  return(
    <div className= 'home-container'>
      <div className="chat-container">

        {/* Chat screen first row */}
        <div className="row">
          {/* First column holds chat screen navigation */}
          <div className="col-sm-12 col-lg-4 chat-screen-navigation">

            <div className="general-header">
              <h4>
                Users online
              </h4>
            </div>

            <div className="users-online">
              <ul>
                <li>Seun koko</li>
                <li>Frank</li>
                <li>Mike32</li>
                <li>Brad Pit</li>
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
      </div>
    </div>
    );
  }
}

export default ChatComponent;