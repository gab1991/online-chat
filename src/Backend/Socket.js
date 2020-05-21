import io from 'socket.io-client';
const socket = io('http://localhost:8000');

socket.on('connect', () => {
  console.log('client side connected');
  sockets.subscribeToConversations([]);
});

socket.on('passMsgToConversation', (data) => {
  console.log(data);
});

const sockets = {
  subscribeToConversations: (arrConversations = []) => {
    socket.emit('subscribeToConversations', arrConversations);
  },
  enterChat: (user_id, chatID) => {
    socket.emit('enterChat', {
      user_id,
      chatID,
    });
  },
  sendMessage: (user_id, chatID, message) => {
    socket.emit('sendMessage', {
      user_id,
      chatID,
      message,
    });
  },
};

export default sockets;
export { socket };
