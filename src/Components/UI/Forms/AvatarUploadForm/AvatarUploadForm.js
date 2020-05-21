import React, { useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { updateProfile } from '../../../../Store/Actions/actions';
import Backend from '../../../../Backend/Backend';

function FileUploadForm(props) {
  const { loggedUser } = props;
  const [file, setFile] = useState();
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);
  const dispatch = useDispatch();
  const avatarRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    //get the cropped img
    const canvasScaled = avatarRef.current.getImageScaledToCanvas();
    canvasScaled.toBlob((blob) => {
      const file = new File([blob], 'avatar.jpeg');

      //sending formdata to server
      const formData = new FormData();
      formData.append('token', loggedUser.token);
      formData.append('username', loggedUser.username);
      formData.append('avatar', file);

      Backend.uploadAvatar(formData).then((res) => {
        const avatarPath = res.data.avatar_path;
        setShowAvatarEditor(false);
        if (avatarPath) {
          dispatch(updateProfile({ avatar_path: avatarPath }));
        }
      });
    }, 'image/jpeg');
  };

  const onChangeHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const avatarEditorToggler = () => {
    setShowAvatarEditor((prev) => !prev);
  };

  return (
    <div>
      <button onClick={avatarEditorToggler}>Change Avatar</button>
      {showAvatarEditor && (
        <div>
          <AvatarEditor
            ref={avatarRef}
            image={file}
            width={150}
            crossOrigin={'anonymous'}
            height={150}
            border={0}
            borderRadius={75}
            color={[255, 255, 255, 0.5]}
            scale={1.2}
            rotate={0}
          />
          <form onSubmit={submitHandler}>
            <h1>File Upload</h1>
            <input type="file" name="avatar" onChange={onChangeHandler} />
            <button type="submit">Upload</button>
          </form>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loggedUser: state.logged,
  };
}

export default connect(mapStateToProps)(FileUploadForm);
