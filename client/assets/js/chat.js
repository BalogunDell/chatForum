const socket = io.connect('localhost:4000');

const messageBoard = document.getElementById('messageBoard');
const userMessage = document.getElementById('message');
const userName = document.getElementById('handle');
const sendBtn = document.getElementById('sendBtn');

sendBtn.onclick = () => {
  // Emit event
  socket.emit('chat', {
    message: {
      handle: userName.value,
      message: userMessage.value
    }
  });
};
// Listen for event
socket.on('feedback', (message) => {
messageBoard.innerHTML += `<p>${message.message.handle}:${message.message.message}</p>`;
  });
