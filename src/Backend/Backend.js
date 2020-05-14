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
  uploadAvatar: (formData) => {
    const token = formData.get('token');

    return new Promise((resolve, reject) => {
      axios({
        url: `/api/img_upload/avatar`,
        headers: {
          'content-type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
        method: 'POST',
        data: formData,
      })
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
};

export default Backend;
