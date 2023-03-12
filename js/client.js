

const socket = io('http://localhost:8000',{
    withCredentials: false,
    extraHeaders: {
      "my-custom-header": "abcd"
    }
  });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

form.addEventListener('submit',(e) => {
  e.preventDefault();
  const message=messageInput.value;
  append(`You:${message}`,'right');
  socket.emit('send',message);
  messageInput.value='';
});

const nam = prompt("Enter your name to join");

const append = (message,position) => {
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('containerDiv');
  

  const messageElement = document.createElement('div');
  messageElement.innerText=message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);

  containerDiv.appendChild(messageElement);
  messageContainer.appendChild(containerDiv);
};

socket.emit('new-user-joined',nam);

socket.on('user-joined',data => {
  append(`${data} joined the chat`,'center');
});

socket.on('receive',data => {
  append(`${data.name}:${data.message}`,'left');
});

socket.on('left',name => {
  append(`${name} left the chat`,'center');
});