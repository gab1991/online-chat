import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../UI/Avatar/Avatar';
import styles from './Contact.module.scss';

export default function Contact(props) {
  const {
    username,
    displayed_name: displayedName,
    avatar_path: avatarPath,
  } = props;

  return (
    <div className={styles.Contact}>
      <Avatar
        text={displayedName || username}
        size={75}
        imgSrc={avatarPath}
        className={styles.Avatar}
      />
      <div className={styles.NameSection}>
        <p className={styles.Username}>{`@${username}`}</p>
        <p className={styles.DisplayedName}>{displayedName || username}</p>
      </div>
    </div>
  );
}

Contact.propTypes = {
  username: PropTypes.string,
  displayedName: PropTypes.string,
  avatarPath: PropTypes.string,
};
