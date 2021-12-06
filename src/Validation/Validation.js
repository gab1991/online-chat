const regexList = {
	displayed_name: /^[ \t]+|[ \t]+$/,
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	password: /^(?=.*\d).{4,15}$/,
	username: /^[a-zA-Z0-9]+$/,
	username_email: /^[a-zA-Z0-9]+$/,
};

export function validate(name, value) {
	//added for browsers do not support negative lookbehind;
	if (name === 'displayed_name') {
		return !regexList[name].test(value);
	} else {
		return regexList[name].test(value);
	}
}
