import React from 'react';
import PropTypes from 'prop-types';
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
  const { text, size = 50, imgSrc, className } = props;
  const name = text.slice(0, 2);

  return (
    <div
      className={`${styles.Avatar} ${className}`}
      style={{
        backgroundColor: `${imgSrc ? `url(${imgSrc})` : randColor()}`,
        backgroundSize: `cover`,
        backgroundPosition: `center center`,
        width: size,
        height: size,
      }}>
      {imgSrc && <img src={imgSrc} alt={text}></img>}
      {!imgSrc && <span className={styles.Username}>{name}</span>}
    </div>
  );
}

Avatar.Protypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number,
  imgSrc: PropTypes.string,
  className: PropTypes.string,
};
