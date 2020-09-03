import { calculateUnreadMsgs } from '../Actions/chatActions';

const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FILL_CHATS': {
      const updChats = { ...state, ...action.payload };

      for (let chatId in updChats) {
        updChats[chatId].unreadCounter = calculateUnreadMsgs(
          updChats[chatId].last_seen_msg_id,
          updChats[chatId].messages
        );
      }
      return { ...state, ...action.payload };
    }

    case 'ADD_MESSAGE': {
      const { user_id, message } = action.payload;
      const { conversation_id } = message;
      const updChats = { ...state };

      updChats[conversation_id].messages.push(message);

      if (message.sender_id !== user_id) {
        // update unread Counter
        updChats[conversation_id].unreadCounter = calculateUnreadMsgs(
          updChats[conversation_id].last_seen_msg_id,
          updChats[conversation_id].messages
        );
      } else {
        updChats[conversation_id].unreadCounter = 0;
      }
      return updChats;
    }

    case 'UPDATE_LAST_SEEN_MSG': {
      const { conversation_id, last_seen_msg_id } = { ...action.payload };
      const updChats = {
        ...state,
      };
      updChats[conversation_id].last_seen_msg_id = last_seen_msg_id;

      updChats[conversation_id].unreadCounter = calculateUnreadMsgs(
        updChats[conversation_id].last_seen_msg_id,
        updChats[conversation_id].messages
      );

      return updChats;
    }

    default:
      return state;
  }
};

export default chatReducer;
