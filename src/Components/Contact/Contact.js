import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../UI/Avatar/Avatar';
import styles from './Contact.module.scss';

export default function Contact(props) {
  const {
    username,
    id,
    displayed_name: displayedName,
    avatar_path: avatarPath,
    onClick,
  } = props;

  return (
    <div className={styles.Contact} onClick={onClick}>
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
  onLCick: PropTypes.func,
};
