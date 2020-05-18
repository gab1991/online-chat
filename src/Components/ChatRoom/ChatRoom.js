import React from 'react';
import BackArrowIcon from '../UI/SvgIcons/BackArrow';
import styles from './ChatRoom.module.scss';

export default function ChatRoom(props) {
  return (
    <div className={styles.Chatroom}>
      <div className={styles.Header}>
        <div className={styles.HeaderContent}>
          <BackArrowIcon className={styles.BackArrowSvg} />
        </div>
      </div>
    </div>
  );
}
