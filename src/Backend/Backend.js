import axios_base from 'axios';
import { getToken } from '../Store/store';

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
  getProfile: (token) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/profiles`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  findProfiles: (searchStr) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/profiles/findProfiles/${searchStr}`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
};

export default Backend;
