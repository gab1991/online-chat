import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

export default function Input(props) {
  const {
    type,
    inputRef,
    label,
    value,
    placeholder,
    className,
    disabled,
    name,
    onChange,
    onKeyPress,
    inValid,
    inValidMessage,
    autoComplete = 'on',
    keyPressCallBack,
  } = props;

  const keyPressExecut = (e) => {
    const [key, cb] = keyPressCallBack;
    if (e.key === key) {
      cb();
    }
  };

  return (
    <div className={styles.InputContainer}>
      {label && <label>{label}</label>}
      <input
        ref={inputRef}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`${styles.Input} 
        ${inValid && styles.Invalid}
        ${className}`}
        onChange={onChange}
        onKeyPress={keyPressCallBack ? (e) => keyPressExecut(e) : onKeyPress}
        data-name={name}
        autoComplete={autoComplete}
      />
      {inValid && <div className={styles.InValidMessage}>{inValidMessage}</div>}
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
  keyPressCallBack: PropTypes.array,
};
