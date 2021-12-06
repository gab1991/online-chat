import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Backend from '../../../Backend/Backend';
import { validate } from '../../../Validation/Validation';
import Button from '../../UI/Buttons/Button/Button';
import Input from '../../UI/Inputs/Input/Input';
import ConfirmCheckIcon from '../../UI/SvgIcons/ConfirmCheck';
import EnvelopeIcon from '../../UI/SvgIcons/Envelope';
// import { logIn } from '../../../Store/Actions/actions';
import FadingLinesSpinner from '../../UI/SvgSpinners/FadingLines';
import BackDrop from './Backdrop/Backdrop';
import { HumanSvg, KeySvg } from 'shared/ui';

import styles from './SignUp.module.scss';

export function SignUp(props) {
	console.log('in signup');

	// const dispatch = useDispatch();
	const [inputs, setInputs] = useState({
		email: {
			icon: <EnvelopeIcon />,
			invalidMessage: 'Invalid email',
			label: 'Email',
			placeholder: 'Enter email',
			type: 'email',
			valid: false,
			value: '',
		},
		passConfirm: {
			icon: <ConfirmCheckIcon />,
			invalidMessage: 'Passwords must match',
			label: 'Confirm Password',
			placeholder: 'Confirm password',
			type: 'password',
			valid: false,
			value: '',
		},
		password: {
			icon: <KeySvg />,
			invalidMessage: 'Must contain 4 to 15 chars and at least one number',
			label: 'Password',
			placeholder: 'Enter  password',
			type: 'password',
			valid: false,
			value: '',
		},
		username: {
			icon: <HumanSvg />,
			invalidMessage: 'Only numbers and letters allowed',
			label: 'Username',
			placeholder: 'Enter Your Username',
			type: 'text',
			valid: false,
			value: '',
		},
	});
	const [sending, setSending] = useState(false);

	const checkValidity = (name, value) => {
		if (value.length === 0) return false;
		if (name === 'passConfirm') {
			if (inputs.password.value !== value) {
				return false;
			} else {
				return true;
			}
		}
		return validate(name, value);
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		let isEntireFormValid = true;
		for (const name in inputs) {
			if (inputs[name].value.length === 0) {
				setInputs((prevState) => {
					const updState = { ...prevState };
					updState[name].errMessage = 'Please fill this field';
					return updState;
				});
			}
			if (!inputs[name].valid) isEntireFormValid = false;
		}
		if (isEntireFormValid) {
			const sendObj = {
				email: inputs.email.value,
				password: inputs.password.value,
				username: inputs.username.value,
			};
			setSending(true);
			const res = await Backend.postSignUp({ ...sendObj }, (err) => {
				setSending(false);

				if (!err.response?.data?.field) {
					// alert('something went wrong! Try again later');
				} else {
					const errMessage = err.response.data.err_message;
					const errInput = err.response.data.field;

					if (errInput && errMessage) {
						setInputs((prevState) => {
							const updState = { ...prevState };
							updState[errInput].errMessage = errMessage;
							updState[errInput].valid = false;
							return updState;
						});
					}
				}
			});

			setSending(false);

			if (res?.data?.username || !res.headers['auth-token']) return;

			const username = res.data.username;
			const authToken = res.headers['auth-token'];

			// dispatch(logIn(username, authToken));

			localStorage.setItem('token', authToken);
			localStorage.setItem('username', username);
		}
	};

	const inputChangeHandler = (e) => {
		const inputName = e.target.getAttribute('data-name');
		const currentValue = e.target.value;
		const isValid = checkValidity(inputName, currentValue);

		setInputs((prevState) => {
			const updState = { ...prevState };
			updState[inputName].value = currentValue;
			updState[inputName].errMessage = null;
			updState[inputName].errMessage = null;
			isValid ? (updState[inputName].valid = true) : (updState[inputName].valid = false);
			return updState;
		});
	};

	return (
		<div className={`${styles.SignUp}`}>
			<BackDrop />
			<div className={styles.HeaderSection}>
				<h1>SignUp</h1>
				<h3>TO CONTINUE</h3>
			</div>
			<form className={styles.SignUpForm} onSubmit={submitHandler}>
				{Object.keys(inputs).map((name) => {
					const input = inputs[name];
					return (
						<div className={styles.InputContainer} key={name}>
							<div className={styles.IconContainer}>{input.icon}</div>
							<Input
								name={name}
								type={input.type}
								placeholder={input.placeholder}
								value={input.value}
								className={styles.Input}
								onChange={inputChangeHandler}
								inValid={input.errMessage || (!input.valid && input.value.length > 0)}
								inValidMessage={input.errMessage || input.invalidMessage}
							/>
						</div>
					);
				})}
				<div className={styles.ButtonContainer}>
					{sending ? (
						<div className={styles.SpinnerContainer}>
							<FadingLinesSpinner style={{ left: '0', position: 'absolute', top: '0' }} />
						</div>
					) : (
						<Button txtContent={'create account'} className={styles.Button} />
					)}
				</div>
			</form>
			<button className={styles.AccountCreation} onClick={() => props.changeActiveScreen.apply()}>
				Already have an account?
			</button>
		</div>
	);
}
