import { playTrack } from '../Actions/actions';

const FILL_CHATS = (chats) => {
  return {
    type: 'FILL_CHATS',
    payload: {
      ...chats,
    },
  };
};

const fillChats = (obj) => {
  return (dispatch, getState) => {
    // const userId = getState().profile.id;
    const updChats = { ...getState().chats, ...obj };

    // if (message.sender_id !== userId) {
    for (let chatId in updChats) {
      updChats[chatId].unreadCounter = calculateUnreadMsgs(
        updChats[chatId].last_seen_msg_id,
        updChats[chatId].messages
      );
    }
    return dispatch(FILL_CHATS(updChats));
  };
};

const addMessage = (message) => {
  return (dispatch, getState) => {
    const userId = getState().profile.id;
    const { conversation_id } = message;
    const updChats = { ...getState().chats };

    updChats[conversation_id].messages.push(message);

    if (message.sender_id !== userId) {
      // Play sound if sender is not me
      dispatch(playTrack('incomeMsg'));
      // update unread Counter
      updChats[conversation_id].unreadCounter = calculateUnreadMsgs(
        updChats[conversation_id].last_seen_msg_id,
        updChats[conversation_id].messages
      );
    } else {
      updChats[conversation_id].unreadCounter = 0;
    }
    // Send updated chats
    return dispatch(fillChats(updChats));
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

const updateLastSeenMsg = (obj) => {
  return {
    type: 'UPDATE_LAST_SEEN_MSG',
    payload: {
      ...obj,
    },
  };
};

export { fillChats, addMessage, updateLastSeenMsg, calculateUnreadMsgs };
