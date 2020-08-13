import io from 'socket.io-client';
import Backend from './Backend';
import { getProfileInfo } from '../Components/Auth/Login/Login';
import {
  addMessage,
  updateProfile,
  fillChats,
  logIn,
} from '../Store/Actions/actions';
import { store, getToken, dispatch } from '../Store/store';

const socket = io(`http://localhost:8000`, {
  reconnectionDelay: 500,
  reconnectionDelayMax: 1000,
});

socket.on('reconnect', () => console.log('reconnect'));
socket.on('connecting', () => console.log('connecting'));
socket.on('reconnecting', () => console.log('reconnecting'));
socket.on('connect_failed', () => console.log('connect_failed'));
socket.on('reconnect_failed', () => console.log('reconnect_failed'));
socket.on('close', () => console.log('close'));
socket.on('disconnect', () => console.log('disconnect'));

socket.on('connect', () => {
  console.log('client side connected');

  const token = localStorage.token;
  const username = localStorage.username;

  if (token && username) {
    dispatch(logIn(username, token));

    getProfileInfo(getToken(), dispatch);
  }
});

socket.on('disconnect', () => {
  console.log('client side connected');
});

socket.on('reconnect', () => {
  console.log(socket.connected);
});

socket.on('reconnect_attempt', () => {
  console.log('recconect attempt');
});

socket.on('passMsgToConversation', (data) => {
  console.log(data);
  store.dispatch(addMessage(data));
});

const sockets = {
  subscribeToConversations: (arrConversations = {}) => {
    socket.emit('subscribeToConversations', arrConversations);
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
