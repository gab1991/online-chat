import io from 'socket.io-client';
import { server_adress } from '../Configs/sever.config';
import {
  logInIfValid,
  finishInitialLogIn,
  logOut,
} from '../Store/Actions/actions';
import {
  addMessage,
  updateLastSeenMsg,
  uploadNewConv,
  swapDummyMsgToDelivered,
} from '../Store/Actions/chatActions';
import { store, dispatch } from '../Store/store';

//Inner setup
const socket = io(server_adress, {
  reconnectionDelay: 500,
  reconnectionDelayMax: 1000,
});

// socket.on('reconnect', () => console.log('reconnect'));
// socket.on('connecting', () => console.log('connecting'));
// socket.on('reconnect_attempt', () => {
//   console.log('recconect attempt');
// });
// socket.on('reconnecting', () => console.log('reconnecting'));
// socket.on('connect_failed', () => console.log('connect_failed'));
// socket.on('reconnect_failed', () => console.log('reconnect_failed'));
// socket.on('close', () => console.log('close'));
// socket.on('disconnect', () => console.log('disconnect'));

socket.on('connect', () => {
  // console.log('client side connected');

  const token = localStorage.token;
  const username = localStorage.username;

  if (token && username) {
    dispatch(logInIfValid(username, token));
  } else {
    localStorage.clear();
    dispatch(finishInitialLogIn());
  }
});

socket.on('connect_error', () => {
  dispatch(finishInitialLogIn());
  dispatch(logOut());
});

socket.on('needToUpdChatObj', (data) => {
  dispatch(uploadNewConv(data));
});

socket.on('newMsgArrived', (data) => {
  store.dispatch(addMessage(data));
});

socket.on('updateLastSeenMsg', (data) => {
  store.dispatch(updateLastSeenMsg(data));
});

socket.on('myMsgCreated', (data) => {
  store.dispatch(swapDummyMsgToDelivered(data));
});

// OuterMethods
const sockets = {
  getProfileId: () => {
    return store.getState().profile.id;
  },

  setIsOnline: (username) => {
    socket.emit('setIsOnline', username);
  },

  subscribeToConversations: (conversations = {}) => {
    socket.emit('subscribeToConversations', conversations);
  },

  sendMessage: (user_id, chatID, message, dummyID) => {
    socket.emit('sendMessage', {
      user_id,
      chatID,
      message,
      dummyID,
    });
  },

  markMsgAsRead: (chatID) => {
    const userId = sockets.getProfileId();
    if (!userId) return;
    socket.emit('markMsgAsRead', {
      userId,
      chatID,
    });
  },
};

export default sockets;
export { socket };
