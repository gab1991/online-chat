import React from 'react';
import Chat from '../Chat/Chat';
import HamburgerIcon from '../UI/SvgIcons/Hamburger';
import LookUpIcon from '../UI/SvgIcons/LookUp';
import styles from '../Messages/Messages.module.scss';

export default function Messages(props) {
  return (
    <div className={styles.Messages}>
      <div className={styles.Header}>
        <div className={styles.HeaderContent}>
          <HamburgerIcon className={styles.HamburgerSvg} />
          <h3>Messages</h3>
          <LookUpIcon className={styles.LookUpSvg} />
        </div>
      </div>
      <div className={styles.ChatsContainer}>
        <Chat />
        <Chat />
        <Chat />
      </div>
    </div>
  );
}
