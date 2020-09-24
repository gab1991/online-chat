import axios_base from 'axios';
import { getToken } from '../Store/store';
import { server_adress } from '../Configs/sever.config';

const axios = axios_base.create({
  baseURL: server_adress,
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
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  checkTokenValidity: (username, token) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/users/checkTokenValidity`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          username,
        },
      })
        .then((res) => {
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
        url: `/api/profiles/findProfiles?search=${searchStr}`,
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
  conversationEnter: (user_id, contactName) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/conversation/conversationEnter/${user_id}/${contactName}`,
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
  uploadNewConv: (user_id, chatID) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/conversation/uploadNewConv/${user_id}/${chatID}`,
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
  updateDispName: (dispName) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `/api/profiles/updateDispName`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        data: {
          token: getToken(),
          dispName: dispName,
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
