import React from 'react';
import { connect } from 'react-redux';
import Avatar from '../UI/Avatar/Avatar';
import styles from './UserSettings.module.scss';
import AvatarUploadForm from '../UI/Forms/AvatarUploadForm/AvatarUploadForm';

function UserSettings(props) {
  const { avatarPath } = props.profile;

  console.log(avatarPath);
  return (
    <div>
      <Avatar text={'bam'} size={150} imgSrc={avatarPath} />
      <AvatarUploadForm />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(UserSettings);
