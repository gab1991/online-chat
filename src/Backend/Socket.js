import io from 'socket.io-client';
const socket = io('http://localhost:8000');

function test(cb) {
  // socket.on('timer', (timestamp) => cb(null, timestamp));
  socket.emit('subscribeToTimer', {
    username: 'gab1',
  });
}
export { test };
