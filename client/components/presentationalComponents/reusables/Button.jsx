import React from 'react';

/** 
 * @description Button
 * 
 * @param {string} buttonText
 * @param {string} buttonClass
 * @param {string}
 * 
 * @returns {jJSX} DOM representation
*/
const Button = ({
  buttonText,
  buttonClass
}) => {
  return(
    <React.Fragment>
      <button
        className={ buttonClass || ''}>
        {buttonText}{}
      </button>
    </React.Fragment>
  );
};

export default Button;