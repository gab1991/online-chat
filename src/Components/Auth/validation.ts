/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as Yup from 'yup';

const passValidationRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const LoginValidationSchema = Yup.object().shape({
	password: Yup.string()
		.matches(passValidationRegex, 'Password must contain 8 chars with at least 1 letter and 1 number')
		.required(`Shouldn't be empty`),
	usernameEmail: Yup.string().min(4, 'Your username or email should be longer').required(`Shouldn't be empty`),
});

export const SignUpValidationSchema = Yup.object().shape({
	email: Yup.string().email('Should be a normal email').required(`Shouldn't be empty`),
	passconfirm: Yup.string().test('passwords-match', 'Passwords must match', function (value) {
		return this.parent.password === value;
	}),
	password: Yup.string()
		.matches(passValidationRegex, 'Password must contain 8 chars with at least 1 letter and 1 number')
		.required(`Shouldn't be empty`),
	username: Yup.string().min(4, 'Your username should be longer').required(`Shouldn't be empty`),
});
