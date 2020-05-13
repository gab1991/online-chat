import React from 'react';
import styles from './Avatar.module.scss';

function randColor() {
  const colorScheme = '0123456789ABCDEF';
  let randColor = '#';
  for (let i = 0; i < 6; i++) {
    randColor += colorScheme[Math.floor(Math.random() * 16)];
  }
  return randColor;
}

export default function Avatar(props) {
  const { text, size = 50 } = props;
  const name = text.slice(0, 2);

  return (
    <div
      className={`${styles.Avatar}`}
      style={{ backgroundColor: `${randColor()}`, width: size, height: size }}>
      <span className={styles.Username}>{name}</span>
    </div>
  );
}
