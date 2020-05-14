import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { updateProfile } from '../../../../Store/Actions/actions';
import Backend from '../../../../Backend/Backend';

function FileUploadForm(props) {
  const { loggedUser } = props;
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('token', loggedUser.token);
    formData.append('username', loggedUser.username);
    formData.append('avatar', file);

    Backend.uploadAvatar(formData).then((res) => {
      const avatarPath = res.data.avatar_path;
      if (avatarPath) {
        dispatch(updateProfile({ avatarPath: avatarPath }));
      }
    });
  };

  const onChangeHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <form onSubmit={submitHandler}>
      <h1>File Upload</h1>
      <input type="file" name="avatar" onChange={onChangeHandler} />
      <button type="submit">Upload</button>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    loggedUser: state.logged,
  };
}

export default connect(mapStateToProps)(FileUploadForm);
