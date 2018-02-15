import React from 'react';

/** 
 * @description Input
 * 
 * @param {string} inputValue
 * @param {string} inputClass
 * @param {number} inputId
 * @param {number} minLength
 * @param {string} inputType
 * @param {string} inputName
 * @param {function} inputChangeHander
 * 
 * @returns {jJSX} DOM representation
*/
const Input = ({
 inputValue,
 inputClass,
 inputId,
 inputMinLength,
 inputType,
 inputChangeHander,
 inputName
}) => {
  return(
    <React.Fragment>
      <input
        className={ inputClass || ''}
        value={inputValue}
        type={inputType}
        id={inputId}
        name={inputName}
        minLength={inputMinLength}
        onChange={inputChangeHander || null }>
      </input>
    </React.Fragment>
  );
};

export default Input;