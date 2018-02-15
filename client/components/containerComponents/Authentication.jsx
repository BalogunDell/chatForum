import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../presentationalComponents/reusables/Button';
import Form from '../presentationalComponents/reusables/Form';
import socket from '../../assets/js/chat';
/** 
 * @description Authentication
 * 
 * @returns {jJSX} DOM representation
*/
class Authentication extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(event) {
   this.setState({
     [event.target.name]: event.target.value
   });
  }

  handleLogin(event) {
    event.preventDefault();
    const loginData = {
      username: this.state.username,
      password: this.state.password
    }
    socket.emit('Login', loginData);
  }

  handleSignUp(event) {
    event.preventDefault();
  }
render() {
  return(
      <div className= 'home-container'>
          <div className="centered-intro">
            <h1>
              SAMPLE CHAT APPLICATION
            </h1>

            <div className="">
              <Form
                handleLogin={this.handleLogin}
                inputValue={this.state}
                inputChangeHander={this.handleChange}
                handleSignUp={this.handleSignUp}
              />
            </div>
          </div>
      </div>
    );
  }
}

export default Authentication;