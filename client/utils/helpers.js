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
 * @param {string} key
 * @param {string} token
 *
 * @returns {boolean} true or false
*/
export const setStorage = (key, token) => {
  localStorage.setItem(key, token);
  return true;
};

/**
 * @description Gets the current url
 *
 * @param {string} key
 *
 * @returns {boolean} true or false
*/
export const getStorage = (key) => {
  const token = localStorage.getItem(key);
  return token;
};

/**
 * @description Gets the current url
 *
 * @param {object} savedMessage
 * @param {object} parentElement
 *
 * @returns {boolean} true or false
*/
export const UIupdater = (savedMessage, parentElement) => {
  const {
    timeSent,
    sender,
    message
  } = savedMessage;
  const [chatDate, chatTime] = timeSent.split(',');
  const messageDisplay = document.getElementById(parentElement);

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


/**
 * @description Gets the current url
 *
 * @param {object} savedMessage
 * @param {object} parentElement
 *
 * @returns {boolean} true or false
*/
export const privateChatUIupdater = (savedMessage, parentElement) => {
  const {
    timeSent,
    sender,
    message
  } = savedMessage;
  const [chatDate, chatTime] = timeSent.split(',');
  const messageDisplay = document.getElementById(parentElement);

  // Create div
  const messagesHolder = document.createElement('div');
  messagesHolder.className = 'privateGeneratedMessagesHolder';

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
