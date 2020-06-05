import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../UI/Avatar/Avatar';
import styles from './Chat.module.scss';

export default function Chat(props) {
  const { type, participants, onClick } = props;
  const privateContact = {
    ...participants[0],
  };

  const privateAvatarProps = {
    text: privateContact.displayed_name || privateContact.username,
    imgSrc: privateContact.avatar_path,
    size: 65,
  };

  return (
    <div className={styles.Chat} onClick={onClick}>
      <Avatar {...privateAvatarProps} className={styles.Avatar} />
      <div className={styles.MessagePreview}>
        <p className={styles.ContactName}>
          {privateContact.displayed_name || privateContact.username}
        </p>
        <p>last message should be here</p>
      </div>
      <div className={styles.TimeSection}>11:58</div>
    </div>
  );
}

Chat.propTypes = {
  type: PropTypes.string,
  participants: PropTypes.array,
  onClick: PropTypes.func,
};
