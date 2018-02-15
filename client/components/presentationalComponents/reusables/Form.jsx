import React from 'react';
import { Link } from 'react-router-dom'; 

import Input from '../reusables/Input';
import Button from '../reusables/Button';
import Label from '../reusables/Label';
import checkUrl from '../../../helpers/checkUrl';

/** 
 * @description Form
 * 
 * @param {string} inputValue
 * @param {function} inputChangeHander
 * @param {function} handleSignUp
 * 
 * @returns {JSX} DOM representation
*/
const Form = ({
  handleLogin,
  inputValue,
  inputChangeHander,
  handleSignUp

}) => {
   const formSubmitHandler = handleLogin ? handleLogin : handleSignUp;
  const currentURL = window.location.pathname;
    // Check url to know which text to display
    const formTextToDisplay = checkUrl(currentURL) 
    ?  
    'Log in to start chatting' 
    : 
    'Register to enjoy this sample application';


     // Check url to know which link to display
     const linkToDisplay = checkUrl(currentURL) 
     ?  
     'register' 
     : 
     'login'
 
 
     // Check url to know which button text to display
     const textToDisplay = checkUrl(currentURL) 
     ?  
     'Register' 
     : 
     'Login'

     const linksToDisplay = <div>
          <Link to='/'
          style={{
            color: 'white', margin: '10px' }}>
            Home
          </Link>

          <Link to={linkToDisplay} style={{
            color: 'white', margin: '10px'
            }}>
            {textToDisplay}
          </Link>
      </div>


  return(
    <div className="col-sm-12 col-lg-3">
      <form onSubmit={formSubmitHandler}>
        <div className="">
          <h5>{formTextToDisplay}</h5>
          <hr size={4} style={{background: 'red'}}/>
          { checkUrl(currentURL)
          ?
            <div>
              <Label
                labelText={'Username'}
              />
              <Input
                inputValue={inputValue.username}
                inputClass={'form-control'}
                inputId={'username'}
                inputMinLength={3}
                inputType={'text'}
                inputName={'username'}
                inputChangeHander={inputChangeHander}
              />
            <br/>
              <Label
                labelText={'Password'}
              />
              <Input
                inputValue={inputValue.password}
                inputClass={'form-control'}
                inputId={'password'}
                inputMinLength={3}
                inputType={'password'}
                inputName={'password'}
                inputChangeHander={inputChangeHander}
              />

              <Button
                buttonText={'Login'}
                buttonClass={'login-button'}
              />
              <hr size={4} style={{background: 'red'}}/>

              {/* Link back home or otherwise */}
                {linksToDisplay}
            </div>
          :
            <div>
              <Label
                labelText={'Username'}
              />
              <Input
                inputValue={inputValue.username}
                inputClass={'form-control'}
                inputId={'username'}
                inputMinLength={3}
                inputType={'text'}
                inputName={'username'}
                inputChangeHander={inputChangeHander}
              />
               <br/>
              <Label
                labelText={'Password'}
              />
              <Input
                inputValue={inputValue.password}
                inputClass={'form-control'}
                inputId={'password'}
                inputMinLength={3}
                inputType={'password'}
                inputName={'password'}
                inputChangeHander={inputChangeHander}
              />
                <br/>
              <Label
                labelText={'Confirm Password'}
              />
              <Input
                inputValue={inputValue.confirmPassword}
                inputClass={'form-control'}
                inputId={'confirmPssword'}
                inputMinLength={3}
                inputType={'password'}
                inputName={'confirmPassword'}
                inputChangeHander={inputChangeHander}
              />

              <Button
                buttonText={'Create Account'}
                buttonClass={'login-button'}
              />
              {/* Link back home or otherwise */}
              <hr size={4} style={{background: 'red'}}/>
               {linksToDisplay}
             </div>
            }
          </div>
      </form>
    </div>
  );
};

export default Form;