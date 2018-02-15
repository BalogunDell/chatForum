import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../presentationalComponents/reusables/Button';

/** 
 * @description Home
 * 
 * @returns {jJSX} DOM representation
*/
const Home = () => {
  return(
    <div className= 'home-container'>
        <div className="centered-intro">
          <h1>
            SAMPLE CHAT APPLICATION
          </h1>
          <p>
            This is a sample chat application built for the builder's learning purposes alone. Do not criticize
          </p>

          <div className ="button-holder">
            <Link to="/login">
              <Button
                buttonText={'Login'}
                buttonClass={'access-button'}
               />
              </Link>

            <Link to="/register">
              <Button
                buttonText={'Register'}
                buttonClass={'access-button'}
              />
            </Link>
          </div>

        </div>
    </div>
  );
};

export default Home;