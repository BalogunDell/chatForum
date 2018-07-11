import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from '../presentationalComponents/reusables/Form';
import { getMethod, postMethod } from '../../assets/js/fetcher';
import { setStorage } from '../../utils/helpers';
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
      confirmPassword: '',
      redirect: false
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }


/**
 * @description handles changes in event
 * 
 * @param {object} event 
 * @memberof Authentication
 * 
 * @returns {object} updated state
 */
  handleChange(event) {
   this.setState({
     [event.target.name]: event.target.value
   });
  }


/**
 * @description handles user login action
 * 
 * @param {object} event 
 * @memberof Authentication
 * 
 * @returns {object} api response and updated state
 */
handleLogin(event) {
  event.preventDefault();
  const loginData = {
    username: this.state.username,
    password: this.state.password
  };
  // save to database
  postMethod(loginData, '/login')
    .then((response) => {
      alertify.success(`Welcome ${this.state.username}`);
      const token = response.data.token;
      if(setStorage('token', token)) {
        this.setState({ 
          redirect: true,
          username: '',
          password: ''
        });
      }
    })
    .catch((error) => {
      alertify.error(error.response.data.message);
      this.setState({
        username: '',
        password: ''
      });
    });
  }


  /**
   * @description handles user registration action
   * 
   * @param {object} event 
   * @memberof Authentication
   * 
   * @returns {object} api response and updated state
   */
  handleSignUp(event) {
    event.preventDefault();
    const signupData = {
      username: this.state.username,
      password: this.state.password
    }
    postMethod(signupData, '/register')
    .then((response) => {
      alertify.success(`Welcome ${this.state.username}`);
      const token = response.data.token;
      if(setStorage('token', token)) {
        this.setState({ 
          redirect: true,
          username: '',
          password: ''
        });
      }
    })
    .catch((error) => {
      alertify.error(error.response.data.message);
      this.setState({
        username: '',
        password: ''
      });
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
      <Redirect to="/chat"/>
    : 
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