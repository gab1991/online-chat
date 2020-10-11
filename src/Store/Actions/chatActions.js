import { playTrack } from '../Actions/actions';
import Socket from '../../Backend/Socket';
import Backend from '../../Backend/Backend';

const FILL_CHATS = (chats) => {
  return {
    type: 'FILL_CHATS',
    payload: {
      ...chats,
    },
  };
};

const ADD_MESSAGE = (message, user_id) => {
  return {
    type: 'ADD_MESSAGE',
    payload: {
      message,
      user_id,
    },
  };
};

const CREATE_DUMMY_MSG = (dummyMsgBody) => {
  return {
    type: 'CREATE_DUMMY_MSG',
    payload: dummyMsgBody,
  };
};

const SWAP_DUMMY_MSG_TO_DELIVERED = ({ newMsg, dummyID }) => {
  return {
    type: 'SWAP_DUMMY_MSG_TO_DELIVERED',
    payload: { newMsg, dummyID },
  };
};

const addMessage = (message) => {
  return (dispatch, getState) => {
    const user_id = getState().profile.id;

    dispatch(playTrack('incomeMsg'));

    return dispatch(ADD_MESSAGE(message, user_id));
  };
};

const sendMsg = (chatID, messageTxt) => {
  return (dispatch, getState) => {
    const user_id = getState().profile.id;
    const dummyMsgBody = {
      conversation_id: chatID,
      created_at: new Date().toString(),
      id: Date.now(),
      message: messageTxt,
      sender_id: user_id,
      user_id: user_id,
      isDummy: true,
    };

    Socket.sendMessage(user_id, chatID, messageTxt, dummyMsgBody.id);

    return dispatch(CREATE_DUMMY_MSG(dummyMsgBody));
  };
};

const updateLastSeenMsg = (obj) => {
  return {
    type: 'UPDATE_LAST_SEEN_MSG',
    payload: {
      ...obj,
    },
  };
};

const calculateUnreadMsgs = (lastSeenMsgId, messages) => {
  const lastMsgId = messages[messages.length - 1]?.id || 0;

  if (lastMsgId <= lastSeenMsgId) return 0;

  let unreadCounter = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].id > lastSeenMsgId) {
      unreadCounter++;
    }
  }
  return unreadCounter;
};

const uploadNewConv = (chatData) => {
  return async (dispatch, getState) => {
    const user_id = getState().profile.id;
    const { chatID, sender_id } = chatData;

    const { data } = await Backend.uploadNewConv(user_id, chatID);
    if (!data) return;

    dispatch(FILL_CHATS(data));
    //Play sound if sender is not me

    if (sender_id !== user_id) {
      dispatch(playTrack('incomeMsg'));
    }
  };
};

export {
  FILL_CHATS as fillChats,
  addMessage,
  updateLastSeenMsg,
  calculateUnreadMsgs,
  uploadNewConv,
  sendMsg,
  SWAP_DUMMY_MSG_TO_DELIVERED as swapDummyMsgToDelivered,
};
