const initial = {
  avatar_path: localStorage.getItem('avatar_path'),
};

const profileReducer = (state = initial, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      const updObj = action.payload;
      if (updObj.avatarPath && updObj.avatarPath !== state.avatarPath) {
        localStorage.setItem('avatar_path', updObj.avatarPath);
      }
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default profileReducer;
