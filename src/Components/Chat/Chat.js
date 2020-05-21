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
  };
  console.log(props);
  return (
    <div className={styles.Chat} onClick={onClick}>
      <Avatar {...privateAvatarProps} size={75} className={styles.Avatar} />
      <div className={styles.MessagePreview}>
        <p className={styles.ContactName}>
          {privateContact.displayed_name || privateContact.username}
        </p>
        <p>i want to eat this shit</p>
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
