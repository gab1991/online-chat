import React from 'react';
import PropTypes from 'prop-types';
import KeyBoardIcon from '../../SvgIcons/Keyboard';
import styles from './Input.module.scss';

export default function Input(props) {
  const {
    type,
    label,
    value,
    placeholder,
    className,
    disabled,
    name,
    onChange,
    inValid,
    inValidMessage,
    autoComplete = 'on',
  } = props;

  return (
    <div className={styles.InputContainer}>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={`${styles.Input} 
        ${inValid && styles.Invalid}
        ${className}`}
        onChange={onChange}
        data-name={name}
        autoComplete={autoComplete}
      />
      {inValid && <div className={styles.InValidMessage}>{inValidMessage}</div>}
      {/* <div className={styles.SvgWrapper}> */}
      {/* {<KeyBoardIcon className={styles.svgicon} />} */}
      {/* </div> */}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  inValid: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  inValidMessage: PropTypes.string,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
};
