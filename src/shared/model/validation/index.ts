/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as Yup from 'yup';

const passValidationRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const validationRules = {
	displayedName: Yup.string()
		.min(4, 'Your username should be longer')
		.max(16, 'Your username should be smaller')
		.required(`Shouldn't be empty`),
	password: Yup.string()
		.matches(passValidationRegex, 'Password must contain 8 chars with at least 1 letter and 1 number')
		.required(`Shouldn't be empty`),
	username: Yup.string().min(4, 'Your username should be longer').required(`Shouldn't be empty`),
	usernameEmail: Yup.string().min(4, 'Your username or email should be longer').required(`Shouldn't be empty`),
} as const;
