import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { updateProfile } from '../../Store/Actions/actions';
import validate from '../../Validation/Validation';
import Avatar from '../UI/Avatar/Avatar';
import CircularSpinner from '../UI/SvgSpinners/Circular';
import Input from '../UI/Inputs/Input/Input';
import Button from '../UI/Buttons/Button/Button';
import Backend from '../../Backend/Backend';
import styles from './UserSettings.module.scss';
import AvatarUploadForm from '../UI/Forms/AvatarUploadForm/AvatarUploadForm';

function UserSettings(props) {
  const { avatar_path, username, displayed_name } = props.profile;
  const dispatch = useDispatch();

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showDispNameChanger, setShowDispNameChanger] = useState(false);
  const [disNameInputValue, setDispNameInputValue] = useState('');
  const [isSendingDispName, setIsSendingDispName] = useState(false);
  const [wrongInput, setWrongInput] = useState({
    status: false,
    message: '',
  });

  const toggleUploadFormVisibility = () => {
    setShowUploadForm((prev) => !prev);
  };

  const toggleDispNameChanger = () => {
    setShowDispNameChanger((prev) => !prev);
  };

  const confirmDispName = (dispName) => {
    if (!dispName.length) {
      return setWrongInput({
        status: true,
        message: 'you didn`t write anything',
      });
    }

    const isValid = validate('displayed_name', dispName);
    if (!isValid) {
      return setWrongInput({
        status: true,
        message: 'trailing whitespaces not allowed',
      });
    }
    setIsSendingDispName(true);
    Backend.updateDispName(dispName)
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateProfile({ displayed_name: dispName }));
          toggleDispNameChanger();
        } else {
          setWrongInput({ status: true, message: 'something went wrong' });
        }
        setIsSendingDispName(false);
      })
      .catch((err) => {
        console.log(err);
        setWrongInput({ status: true, message: 'something went wrong' });
        setIsSendingDispName(false);
      });
  };

  const disNameInputHandler = (e) => {
    setDispNameInputValue(e.target.value);
    setWrongInput({ status: false, message: '' });
  };

  return (
    <div className={styles.UserSettings}>
      <div className={styles.UserNameSection}>
        <p>{`account name : @${username}`}</p>
      </div>
      <div className={styles.AvatarSection}>
        {!showUploadForm && (
          <Avatar text={'bam'} size={150} imgSrc={avatar_path} />
        )}
        {showUploadForm && (
          <AvatarUploadForm
            hideForm={() => {
              setShowUploadForm(false);
            }}
          />
        )}
        <Button
          className={styles.AvatarChangeBtn}
          onClick={toggleUploadFormVisibility}
          txtContent={showUploadForm ? 'Hide' : 'Change Avatar'}
        />
      </div>
      <div className={styles.ChangeDispNameSection}>
        {showDispNameChanger && (
          <>
            {isSendingDispName && (
              <div className={styles.DispNameSpinnerWrapper}>
                <CircularSpinner />
              </div>
            )}
            {!isSendingDispName && (
              <Input
                type="text"
                placeholder="Type your new name"
                className={styles.DispNameInput}
                onChange={disNameInputHandler}
                inValid={wrongInput.status}
                inValidMessage={wrongInput.message}
              />
            )}

            <div className={styles.BtnSection}>
              <Button
                txtContent={'Confirm'}
                onClick={() => confirmDispName(disNameInputValue)}
              />
              <Button txtContent={'Cancel'} onClick={toggleDispNameChanger} />
            </div>
          </>
        )}
        {!showDispNameChanger && (
          <>
            <span>{displayed_name}</span>
            <Button
              txtContent={'Change displayed name'}
              onClick={toggleDispNameChanger}
            />
          </>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    user: state.logged,
  };
}

export default connect(mapStateToProps)(UserSettings);

UserSettings.Protypes = {
  avatarPath: PropTypes.string,
  user: PropTypes.object,
};
