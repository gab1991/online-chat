const initial = {
  avatarPath: localStorage.getItem('avatarPath'),
};

const profileReducer = (state = initial, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      const updObj = action.payload;
      if (updObj.avatarPath !== state.avatarPath) {
        localStorage.setItem('avatarPath', updObj.avatarPath);
      }
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default profileReducer;
