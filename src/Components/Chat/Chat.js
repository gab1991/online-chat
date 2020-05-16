import React from 'react';
import Avatar from '../UI/Avatar/Avatar';
import styles from './Chat.module.scss';

export default function Chat(props) {
  return (
    <div className={styles.Chat}>
      <Avatar text={'Bam'} size={75} className={styles.Avatar} />
      <div className={styles.MessagePreview}>
        <p>asdasdasdaasdasdasdasdasdsdads</p>
      </div>
      <div className={styles.TimeSection}>11:58</div>
    </div>
  );
}
