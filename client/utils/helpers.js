/**
 * @description Gets the current url
 *
 * @param {string} currentURL
 *
 * @returns {boolean} true or false
*/
export const checkUrl = (currentURL) => {
  if (currentURL === '/login') return true;
  return false;
};


/**
 * @description Gets the current url
 *
 * @param {string} token
 *
 * @returns {boolean} true or false
*/
export const setStorage = (token) => {
  localStorage.setItem('token', token);
  return true;
};

/**
 * @description Gets the current url
 *
 * @returns {boolean} true or false
*/
export const getStorage = () => {
  const token = localStorage.getItem('token');
  return token;
};


export const UIupdater = (savedMessage) => {
  const {
    timeSent,
    sender,
    message
  } = savedMessage;

  const [chatDate, chatTime] = timeSent.split(',');
  const messageDisplay = document.getElementById('messages');

  // Create div
  const messagesHolder = document.createElement('div');
  messagesHolder.className = 'generatedMessagesHolder';

  // Set time
  const timeHolder = document.createElement('small');
  timeHolder.innerHTML = chatTime;

  // Set date

  const dateHolder = document.createElement('i');
  dateHolder.className = 'float-element';
  dateHolder.innerHTML = chatDate;

  // Set message sender
  const messageSender = document.createElement('h6');
  messageSender.className = 'generatedMessages';
  messageSender.innerHTML = `${sender}  `;
  messageSender.appendChild(timeHolder);

  // Create break line
  const breakLine = document.createComment('br');

  // Set message
  const newMessage = document.createElement('p');
  newMessage.className = 'generatedMessages';
  newMessage.innerHTML = message;

  // Compose UI
  messagesHolder.appendChild(messageSender);
  messagesHolder.appendChild(breakLine);
  messagesHolder.appendChild(newMessage);
  messagesHolder.appendChild(dateHolder);

  // Append to div
  return messageDisplay.appendChild(messagesHolder);
};
