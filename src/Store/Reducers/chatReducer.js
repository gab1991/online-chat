const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FILL_CHATS':
      return { ...state, ...action.payload };
    case 'ADD_MESSAGE':
      const msg = { ...action.payload };
      const updChats = {
        ...state,
      };
      updChats[msg.conversation_id].messages.push(msg);
      return updChats;
    default:
      return state;
  }
};

export default chatReducer;
