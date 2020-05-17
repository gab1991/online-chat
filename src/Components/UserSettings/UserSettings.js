import React, { useState } from 'react';
import { connect } from 'react-redux';
import Avatar from '../UI/Avatar/Avatar';
import PropTypes from 'prop-types';
import styles from './UserSettings.module.scss';
import AvatarUploadForm from '../UI/Forms/AvatarUploadForm/AvatarUploadForm';

function UserSettings(props) {
  const { avatarPath, user } = props.profile;
  const [searchInput, setSearchInput] = useState();

  const searchOnBackend = (e) => {
    const value = e.target.value;
    
  } 

  console.log(searchInput);
  return (
    <div>
      <Avatar text={'bam'} size={150} imgSrc={avatarPath} />
      <AvatarUploadForm />
      <input
        type="text"
        onChange={(e) => {
          searchOnBackend(e)
          setSearchInput(e.target.value)}}></input>
      <button>Find Contact</button>
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
