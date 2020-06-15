import React from 'react';
import PropTypes from 'prop-types';
import formatTime from '../../Utils/timeFormatter';
import Avatar from '../UI/Avatar/Avatar';
import styles from './Chat.module.scss';

export default function Chat(props) {
  const { type, participants, onClick } = props;
  const privateContact = {
    ...participants[0],
  };
  const msgs = props.messages;
  const lastMsg = msgs[msgs.length - 1];
  const [hours, minutes] = lastMsg
    ? formatTime(lastMsg.created_at)
    : [null, null];

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
        <p>{lastMsg && lastMsg.message}</p>
      </div>
      <div className={styles.TimeSection}>
        {hours}:{minutes}
      </div>
    </div>
  );
}

Chat.propTypes = {
  type: PropTypes.string,
  participants: PropTypes.array,
  onClick: PropTypes.func,
};
