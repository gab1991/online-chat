import { useState } from 'react';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';

import { LoginValidationSchema } from 'pages/auth/model/validation';
import { useAuthRedirect } from 'processes/authentification/model/hooks';
import { api } from 'shared/api/rest';
import { profileStore } from 'shared/model/store';
import { Checkbox, FadingLinesSpinner, GradientButton, HumanSvg, KeySvg, TransparentInput } from 'shared/ui';

import { Backdrop } from './ui';

import styles from './LoginPage.module.scss';

interface ILoginProps {
	changeActiveScreen: () => void;
}

export const Login = observer((props: ILoginProps) => {
	const { changeActiveScreen } = props;

	const [isFetching, setIsFetching] = useState(false);
	const [hasBeenValidated, setHasBeenValidated] = useState(false);

	useAuthRedirect();

	const formik = useFormik({
		initialValues: {
			password: '',
			usernameEmail: '',
		},
		onSubmit: async ({ password, usernameEmail }, helpers) => {
			setIsFetching(true);
			const { data: profile, error } = await api.authApiService.login({ nameOrEmail: usernameEmail, password });
			setIsFetching(false);

			error && helpers.setErrors({ password: error });
			profile && profileStore.fillProfile(profile);
		},
		validate: () => setHasBeenValidated(true),
		validateOnChange: false,
		validationSchema: LoginValidationSchema,
	});

	const inputs = [
		{
			Icon: HumanSvg,
			name: 'usernameEmail',
			placeholder: 'Enter username or email',
			type: 'text',
			value: formik.values.usernameEmail,
		},
		{
			Icon: KeySvg,
			name: 'password',
			placeholder: 'Enter password',
			type: 'password',
			value: formik.values.password,
		},
	];

	const onFormChange = (): void => {
		hasBeenValidated && formik.setErrors({});
	};

	return (
		<div className={styles.loginPage}>
			<Backdrop />
			<h1 className={styles.header}>Log In</h1>
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
				<label className={styles.checkboxLabel}>
					<Checkbox />
					Remember me
				</label>
				{isFetching ? (
					<FadingLinesSpinner className={styles.spinner} />
				) : (
					<GradientButton light className={styles.loginBtn} type="submit">
						LOG IN
					</GradientButton>
				)}
			</form>
			<button className={styles.toSignupBtn} onClick={changeActiveScreen}>
				Do not have an account?
			</button>
		</div>
	);
});
