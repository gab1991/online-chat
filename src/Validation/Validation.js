const regexList = {
  username: /^[a-zA-Z0-9]+$/,
  password: /^(?=.*\d).{4,15}$/,
  displayed_name: /^(?! ).*(?<! )$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  username_email: /^[a-zA-Z0-9]+$/,
};

function validate(name, value) {
  return regexList[name].test(value);
}

export default validate;
