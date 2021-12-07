import { useState } from 'react';
import { useFormik } from 'formik';

import { SignUpValidationSchema } from '../validation';
import Backdrop from './Backdrop/Backdrop';
import { authApiService } from 'api/authApi.service';
import { EnvelopeSvg, FadingLinesSpinner, GradientButton, HumanSvg, KeySvg, TransparentInput } from 'shared/ui';
import { ConfirmCheckSvg } from 'shared/ui/svg/ConfirmCheck';
import { userStore } from 'store/userStroe';

import styles from './SignUp.module.scss';

interface ISignUpProps {
	changeActiveScreen: () => void;
}

export function SignUp(props: ISignUpProps) {
	const { changeActiveScreen } = props;
	const [isFetching, setIsFetching] = useState(true);
	const [validateOnChange, setValidationOnChange] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: '',
			passconfirm: '',
			password: '',
			username: '',
		},
		onSubmit: async ({ email, password, username }, helpers) => {
			setIsFetching(true);
			const { data: user, error } = await authApiService.signup({ email, name: username, password });
			setIsFetching(false);

			const usernameFieldRegex = /name/i;
			const emailRegex = /email/i;

			if (error && error.match(usernameFieldRegex)) {
				helpers.setErrors({ username: error });
			}

			if (error && error.match(emailRegex)) {
				helpers.setErrors({ email: error });
			}

			user && userStore.fillUser(user);
		},
		validate: () => setValidationOnChange(true),
		validateOnBlur: true,
		validateOnChange: validateOnChange,
		validationSchema: SignUpValidationSchema,
	});

	const inputs = [
		{
			Icon: HumanSvg,
			name: 'username',
			placeholder: 'Enter Username',
			type: 'text',
			value: formik.values.username,
		},
		{
			Icon: EnvelopeSvg,
			name: 'email',
			placeholder: 'Enter Email',
			type: 'text',
			value: formik.values.email,
		},
		{
			Icon: KeySvg,
			name: 'password',
			placeholder: 'Enter Password',
			type: 'password',
			value: formik.values.password,
		},
		{
			Icon: ConfirmCheckSvg,
			name: 'passconfirm',
			placeholder: 'Confirm Password',
			type: 'password',
			value: formik.values.passconfirm,
		},
	];

	return (
		<div className={styles.signUpPage}>
			<Backdrop />
			<h1 className={styles.header}>SignUp</h1>
			<h3 className={styles.subHeader}>TO CONTINUE</h3>
			<form className={styles.form} onSubmit={formik.handleSubmit}>
				{inputs.map((input) => (
					<label className={styles.label} key={input.name}>
						<input.Icon className={styles.formIcon} />
						<TransparentInput
							className={styles.input}
							name={input.name}
							value={input.value}
							type={input.type}
							placeholder={input.placeholder}
							onChange={formik.handleChange}
						/>
						{formik.errors[input.name] && <p className={styles.validationError}>{formik.errors[input.name]}</p>}
					</label>
				))}
				{isFetching ? (
					<FadingLinesSpinner className={styles.spinner} />
				) : (
					<GradientButton className={styles.signUpBtn} type="submit">
						CREATE ACCOUNT
					</GradientButton>
				)}
			</form>
			<button className={styles.toLoginBtn} onClick={changeActiveScreen}>
				Already have an account?
			</button>
		</div>
	);
}
