const regexList = {
  username: /^[a-zA-Z0-9]+$/,
  password: /^(?=.*\d).{4,15}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

function validate(name, value) {
  return regexList[name].test(value);
}

export default validate;
