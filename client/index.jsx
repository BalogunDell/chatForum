import React from 'react';
import { render } from 'react-dom';
import './assets/js/chat';

const NewEntry = () => {
  return(
    <div>
      <p>Welcome to my house</p>
    </div>
  );
};

render(<NewEntry/>, document.getElementById('entry'));