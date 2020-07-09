import React, { useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { updateProfile } from '../../../../Store/Actions/actions';
import Backend from '../../../../Backend/Backend';
import Button from '../../../UI/Buttons/Button/Button';
import ExclamationSvg from '../../../UI/SvgIcons/Exclamation';
import styles from './AvatarUploadForm.module.scss';
import btnStyles from '../../../UI/Buttons/Button/Button.module.scss';

function FileUploadForm(props) {
  const { loggedUser, hideForm } = props;
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const avatarRef = useRef();
  const avatarCanvasSide = 150;

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
        // setShowAvatarEditor(false);
        hideForm();
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

  console.log(file);
  return (
    <div className={styles.AvatarUploadForm}>
      {!file && (
        <div className={styles.SvgExclamationContainer}>
          <ExclamationSvg
            style={{ width: avatarCanvasSide, height: avatarCanvasSide }}
          />
          <h3>No file chosen yet</h3>
        </div>
      )}
      {file && (
        <>
          <AvatarEditor
            ref={avatarRef}
            image={file}
            width={avatarCanvasSide}
            crossOrigin={'anonymous'}
            height={avatarCanvasSide}
            border={0}
            borderRadius={avatarCanvasSide / 2}
            color={[0, 0, 0, 0.5]}
            scale={1.2}
            rotate={0}
          />
          <h3>May drag to move</h3>
        </>
      )}

      <form onSubmit={submitHandler} className={styles.FileInputForm}>
        <input id="file" type="file" name="avatar" onChange={onChangeHandler} />
        <label htmlFor="file" className={btnStyles.Button}>
          Pick a file
        </label>
        <Button
          type="submit"
          txtContent={'Upload'}
          disabled={file ? false : true}
        />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loggedUser: state.logged,
  };
}

export default connect(mapStateToProps)(FileUploadForm);
