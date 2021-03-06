import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

export default function Button(props) {
  const {
    txtContent,
    onClick: clickHander,
    disabled,
    className,
    light,
  } = props;

  return (
    <button
      onClick={clickHander}
      disabled={disabled}
      className={`${styles.Button} ${className} ${light ? styles.Light : ''}`}>
      {txtContent}
    </button>
  );
}

Button.propTypes = {
  txtContent: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  light: PropTypes.bool,
};
