import { useState } from 'react';
import { useFormik } from 'formik';

import { SignUpValidationSchema } from 'pages/auth/model/validation';
import { useAuthRedirect } from 'processes/authentification/model/hooks';
import { api } from 'shared/api';
import { profileStore } from 'shared/model/store';
import {
	ConfirmCheckSvg,
	EnvelopeSvg,
	FadingLinesSpinner,
	GradientButton,
	HumanSvg,
	KeySvg,
	TransparentInput,
} from 'shared/ui';

import { Backdrop } from './ui';

import styles from './SignUpPage.module.scss';

interface ISignUpProps {
	changeActiveScreen: () => void;
}

export function SignUp(props: ISignUpProps): JSX.Element {
	const { changeActiveScreen } = props;
	const [isFetching, setIsFetching] = useState(false);
	const [hasBeenValidated, setHasBeenValidated] = useState(false);

	useAuthRedirect();

	const formik = useFormik({
		initialValues: {
			email: '',
			passconfirm: '',
			password: '',
			username: '',
		},
		onSubmit: async ({ email, password, username }, helpers) => {
			setIsFetching(true);
			const { data: profile, error } = await api.authApiService.signup({
				email,
				name: username,
				password,
			});
			setIsFetching(false);

			const usernameFieldRegex = /name/i;
			const emailRegex = /email/i;

			if (error && error.match(usernameFieldRegex)) {
				helpers.setErrors({ username: error });
			}

			if (error && error.match(emailRegex)) {
				helpers.setErrors({ email: error });
			}

			profile && profileStore.fillProfile(profile);
		},
		validate: () => setHasBeenValidated(true),
		validateOnChange: false,
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

	const onFormChange = (): void => {
		hasBeenValidated && formik.setErrors({});
	};

	return (
		<div className={styles.signUpPage}>
			<Backdrop />
			<h1 className={styles.header}>SignUp</h1>
			<h2 className={styles.subHeader}>TO CONTINUE</h2>
			<form className={styles.form} onSubmit={formik.handleSubmit} onChange={onFormChange}>
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
