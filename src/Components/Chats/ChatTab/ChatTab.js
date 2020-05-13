import React from 'react';
import { Row, Column, Container } from 'react-bootstrap';
import Avatar from '../../UI/Avatar/Avatar';
import styles from './ChatTab.module.scss';

export default function ChatTab(props) {
  return (
    <div className={styles.ChatTab}>
      <div className={styles.AvatarWrapper}>
        <Avatar text={'Bam'} size={75} />
      </div>
    </div>
  );
}
