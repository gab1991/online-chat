import { playTrack } from '../Actions/actions';

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

const addMessage = (message) => {
  return (dispatch, getState) => {
    const user_id = getState().profile.id;

    // Play sound if sender is not me
    if (message.sender_id !== user_id) {
      dispatch(playTrack('incomeMsg'));
    }

    return dispatch(ADD_MESSAGE(message, user_id));
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
  const lastMsgId = messages[messages.length - 1].id;

  if (lastMsgId <= lastSeenMsgId) return 0;

  let unreadCounter = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].id > lastSeenMsgId) {
      unreadCounter++;
    }
  }
  return unreadCounter;
};

export {
  FILL_CHATS as fillChats,
  addMessage,
  updateLastSeenMsg,
  calculateUnreadMsgs,
};
