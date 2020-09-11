import io from 'socket.io-client';
import { server_adress } from '../Configs/sever.config';
import { getProfileInfo } from '../Components/Auth/Login/Login';
import { logInIfValid } from '../Store/Actions/actions';
import { addMessage, updateLastSeenMsg } from '../Store/Actions/chatActions';
import { store, dispatch } from '../Store/store';

//Inner setup
const socket = io(server_adress, {
  reconnectionDelay: 500,
  reconnectionDelayMax: 1000,
});

socket.on('reconnect', () => console.log('reconnect'));
socket.on('connecting', () => console.log('connecting'));
socket.on('reconnect_attempt', () => {
  console.log('recconect attempt');
});
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
    dispatch(logInIfValid(username, token));
    getProfileInfo(token);
  }
});

socket.on('passMsgToConversation', (data) => {
  store.dispatch(addMessage(data));
});

socket.on('updateLastSeenMsg', (data) => {
  store.dispatch(updateLastSeenMsg(data));
});

// OuterMethods
const sockets = {
  getProfileId: () => {
    return store.getState().profile.id;
  },

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

  markMsgAsRead: (chatID) => {
    const userId = sockets.getProfileId();
    socket.emit('markMsgAsRead', {
      userId,
      chatID,
    });
  },
};

export default sockets;
export { socket };
