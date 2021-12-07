import { useState } from 'react';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';

import { LoginValidationSchema } from '../validation';
import Backdrop from './Backdrop/Backdrop';
import { authApiService } from 'api/authApi.service';
import { Checkbox, FadingLinesSpinner, GradientButton, HumanSvg, KeySvg, TransparentInput } from 'shared/ui';
import { userStore } from 'store/userStroe';

import styles from './Login.module.scss';

interface ILoginProps {
	changeActiveScreen: () => void;
}

export const Login = observer((props: ILoginProps) => {
	const { changeActiveScreen } = props;
	const [isFetching, setIsFetching] = useState(false);
	const [validateOnChange, setValidationOnChange] = useState(false);

	const formik = useFormik({
		initialValues: {
			password: '',
			usernameEmail: '',
		},
		onSubmit: async ({ password, usernameEmail }, helpers) => {
			setIsFetching(true);
			const { data: user, error } = await authApiService.login({ nameOrEmail: usernameEmail, password });
			setIsFetching(false);

			error && helpers.setErrors({ password: error });
			user && userStore.fillUser(user);
		},
		validate: () => setValidationOnChange(true),
		validateOnBlur: true,
		validateOnChange: validateOnChange,
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

	return (
		<div className={styles.loginPage}>
			<Backdrop />
			<h1 className={styles.header}>Log In</h1>
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
