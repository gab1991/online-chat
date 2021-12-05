/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as Yup from 'yup';

const passValidationRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const LoginValidationSchema = Yup.object().shape({
	password: Yup.string()
		.matches(passValidationRegex, 'Password must contain 8 chars with at least 1 letter and 1 number')
		.required('Fill this field'),
	usernameEmail: Yup.string().min(4, 'Your username or email should be longer').required('Fill this field'),
});
