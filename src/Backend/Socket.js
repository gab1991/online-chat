import io from 'socket.io-client';
import Backend from './Backend';
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
    Backend.getProfile(getToken()).then((res) => {
      const profile = {
        avatar_path: res.data.avatar_path,
        id: res.data.id,
        username: res.data.username,
        displayed_name: res.data.displayed_name,
      };
      const conversations = {
        ...res.data.conversations,
      };
      dispatch(updateProfile(profile));
      dispatch(fillChats(conversations));
    });
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
  // enterChat: (user_id, chatID) => {
  //   socket.emit('enterChat', {
  //     user_id,
  //     chatID,
  //   });
  // },
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
