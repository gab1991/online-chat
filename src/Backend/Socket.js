import io from 'socket.io-client';
const socket = io('http://localhost:8000');

const sockets = {
  enterChat: (user_id, contact_id) => {
    socket.emit('enterChat', {
      user_id,
      contact_id,
    });
  },
};

export default sockets;
