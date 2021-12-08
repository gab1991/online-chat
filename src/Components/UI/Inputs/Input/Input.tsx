import PropTypes from 'prop-types';

import styles from './Input.module.scss';

export function Input(props: any) {
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
				disabled={disabled}
			/>
			{inValid && <div className={styles.InValidMessage}>{inValidMessage}</div>}
		</div>
	);
}
