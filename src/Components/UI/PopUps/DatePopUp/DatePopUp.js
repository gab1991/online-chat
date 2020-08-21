import React from 'react';
import styles from './DatePopUp.module.scss';

export default function DatePopUp(props) {
  const { className, txtContent } = props;
  return <div className={`${styles.DatePopUp} ${className}`}>{txtContent}</div>;
}
