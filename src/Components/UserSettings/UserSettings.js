import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '../UI/Avatar/Avatar';
import Input from '../UI/Inputs/Input/Input';
import Button from '../UI/Buttons/Button/Button';
import styles from './UserSettings.module.scss';
import AvatarUploadForm from '../UI/Forms/AvatarUploadForm/AvatarUploadForm';

function UserSettings(props) {
  const { avatar_path, username, displayed_name } = props.profile;
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showDispNameChanger, setShowDispNameChanger] = useState(true);

  const toggleUploadFormVisibility = () => {
    setShowUploadForm((prev) => !prev);
  };

  const toggleDispNameChanger = () => {
    setShowDispNameChanger((prev) => !prev);
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
        <div className={styles.TextArea}>
          <p>{`Your name : `}</p>
          {/* {showDispNameChanger && <Input className={styles.DispNameInput} />} */}
          {showDispNameChanger && (
            <input type="text" className={styles.DispNameInput} />
          )}
          {!showDispNameChanger && <span>{displayed_name}</span>}
        </div>

        <Button
          txtContent={'Change displayed name'}
          onClick={toggleDispNameChanger}
        />
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
