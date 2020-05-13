import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

export default function Button(props) {
  const { txtContent, onClick: clickHander, disabled } = props;

  return (
    <button onClick={clickHander} className={`${styles.Button}`}>
      {txtContent}
    </button>
  );
}

Button.propTypes = {
  txtContent: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
