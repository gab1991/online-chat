import React from 'react';
import PropTypes from 'prop-types';
import formatTime from '../../Utils/timeFormatter';
import Avatar from '../UI/Avatar/Avatar';
import styles from './Chat.module.scss';

export default function Chat(props) {
  const { type, participants, onClick, matchedMsgs } = props;
  const privateContact = {
    ...participants[0],
  };
  const msgs = props.messages;
  const msgPreview = matchedMsgs ? matchedMsgs[0] : msgs[msgs.length - 1];
  const [hours, minutes] = msgPreview
    ? formatTime(msgPreview.created_at)
    : [null, null];

  // console.log(matchedMsgs);
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
        <p>{msgPreview && msgPreview.message}</p>
      </div>
      <div className={styles.TimeSection}>
        {hours}:{minutes}
        {matchedMsgs && (
          <div className={styles.FoundMsgsNum}>
            <p>{matchedMsgs.length}</p>
          </div>
        )}
      </div>
    </div>
  );
}

Chat.propTypes = {
  type: PropTypes.string,
  participants: PropTypes.array,
  onClick: PropTypes.func,
};
