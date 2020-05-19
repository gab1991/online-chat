import io from 'socket.io-client';
const socket = io('http://localhost:8000');

const sockets = {
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
