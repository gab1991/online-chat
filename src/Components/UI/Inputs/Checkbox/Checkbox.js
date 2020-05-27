import React from 'react';
import styles from './Checkbox.module.scss';

export default function Checkbox(props) {
  const {
    txt,
    inputRef,
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
    <div className={`${styles.CheckBoxContainer} ${className}`}>
      {label && <label>{label}</label>}
      <input
        id="check"
        ref={inputRef}
        type={`checkbox`}
        value={value}
        placeholder={placeholder}
        className={`${styles.Checkbox} 
    ${inValid && styles.Invalid}
    `}
        onChange={onChange}
        data-name={name}
        autoComplete={autoComplete}
      />
      {txt && (
        <label for="check" className={styles.Txt}>
          {txt}
        </label>
      )}
      {inValid && <div className={styles.InValidMessage}>{inValidMessage}</div>}
    </div>
  );
}
