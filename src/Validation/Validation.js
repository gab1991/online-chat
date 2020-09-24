const regexList = {
  username: /^[a-zA-Z0-9]+$/,
  password: /^(?=.*\d).{4,15}$/,
  displayed_name: /^[ \t]+|[ \t]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  username_email: /^[a-zA-Z0-9]+$/,
};

function validate(name, value) {
  //added for browsers do not support negative lookbehind;
  if (name === 'displayed_name') {
    return !regexList[name].test(value);
  } else {
    return regexList[name].test(value);
  }
}

export default validate;
