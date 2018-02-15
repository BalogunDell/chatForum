import React from 'react';

/** 
 * @description Input
 * 
 * @param {string} labelClass
 * @param {string} labelText
 * 
 * @returns {jJSX} DOM representation
*/
const Label = ({
  labelText,
  labelClass
}) => {
  return(
    <React.Fragment>
      <label
        className={ labelClass || ''}>
        {labelText}
      </label>
    </React.Fragment>
  );
};

export default Label;