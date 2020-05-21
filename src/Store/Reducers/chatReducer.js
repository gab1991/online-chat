const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FILL_CHATS':
      return { ...state, ...action.payload };
    case 'ADD_MESSAGE':
      const msg = { ...action.payload };
      const updChats = {
        ...state,
      };
      // updChats[msg.chatID].messages = [].push({
      //   user_id: msg.user_id,
      //   txt: msg.txt,
      // });
      return state;
    default:
      return state;
  }
};

export default chatReducer;
