import axios_base from 'axios';
const axios = axios_base.create({
  baseURL: 'http://localhost:8000',
  timeout: 4000,
});

const Backend = {
  postSignUp: ({ username, password, email }) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/users/sign_up`,
        method: 'POST',
        data: {
          username,
          password,
          email,
        },
      })
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  postLogin: ({ username_email, password }) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/users/login`,
        method: 'POST',
        data: {
          username_email,
          password: password,
        },
      })
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
};

// return new Promise((resolve, reject) => {
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(obj),
//   })
//     .then(handleErrors)
//     .then((data) => resolve(data))
//     .catch((err) => reject(err));
// });

export default Backend;
