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
    checked,
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
        checked={checked}
        className={`${styles.Checkbox}
    ${inValid && styles.Invalid}
    `}
        onChange={onChange}
        data-name={name}
        autoComplete={autoComplete}
      />
      {txt && (
        <label htmlFor="check" className={styles.Txt}>
          {txt}
        </label>
      )}
    </div>
  );
}
