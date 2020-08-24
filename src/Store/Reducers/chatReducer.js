const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FILL_CHATS': {
      return { ...state, ...action.payload };
    }

    case 'ADD_MESSAGE': {
      const { conversation_id } = { ...action.payload };
      const updChats = {
        ...state,
      };
      updChats[conversation_id].messages.push(action.payload);
      return updChats;
    }

    case 'UPDATE_LAST_SEEN_MSG': {
      const { conversation_id, last_seen_msg_id } = { ...action.payload };
      const updChats = {
        ...state,
      };
      updChats[conversation_id].last_seen_msg_id = last_seen_msg_id;
      return updChats;
    }

    default:
      return state;
  }
};

export default chatReducer;
