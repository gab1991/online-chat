import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '../UI/Avatar/Avatar';
import Button from '../UI/Buttons/Button/Button';
import styles from './UserSettings.module.scss';
import AvatarUploadForm from '../UI/Forms/AvatarUploadForm/AvatarUploadForm';

function UserSettings(props) {
  const { avatar_path, user } = props.profile;
  const [showUploadForm, setShowUploadForm] = useState(true);

  const toggleUploadFormVisibility = () => {
    setShowUploadForm((prev) => !prev);
  };

  console.log(showUploadForm);

  return (
    <div className={styles.UserSettings}>
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
