import axios_base from 'axios';
import { getToken } from '../Store/store';
import { server_adress } from '../Configs/sever.config';

const axios = axios_base.create({
  baseURL: server_adress,
  timeout: 4000,
});

const axiosExecute = async (options = {}, errCb) => {
  try {
    const res = await axios(options);

    return res;
  } catch (err) {
    console.log('ERROR', err);

    if (typeof errCb === 'function') errCb(err);
    return { ...err };
  }
};

const Backend = {
  postSignUp: ({ username, password, email }, errCb) => {
    return axiosExecute(
      {
        url: `/api/users/sign_up`,
        method: 'POST',
        data: {
          username,
          password,
          email,
        },
      },
      errCb
    );
  },

  postLogin: ({ username_email, password }, errCb) => {
    return axiosExecute(
      {
        url: `/api/users/login`,
        method: 'POST',
        data: {
          username_email,
          password: password,
        },
      },
      errCb
    );
  },
  checkTokenValidity: (username, token, errCb) => {
    return axiosExecute(
      {
        url: `/api/users/checkTokenValidity`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          username,
        },
      },
      errCb
    );
  },

  uploadAvatar: (formData, errCb) => {
    return axiosExecute(
      {
        url: `/api/img_upload/avatar`,
        headers: {
          'content-type': 'multipart/form-data',
          authorization: `Bearer ${getToken()}`,
        },
        method: 'POST',
        data: formData,
      },
      errCb
    );
  },
  getProfile: (errCb) => {
    return axiosExecute(
      {
        url: `/api/profiles`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      },
      errCb
    );
  },
  findProfiles: (searchStr, errCb) => {
    return axiosExecute(
      {
        url: `/api/profiles/findProfiles?search=${searchStr}`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      },
      errCb
    );
  },
  conversationEnter: (user_id, contactName, errCb) => {
    return axiosExecute(
      {
        url: `/api/conversation/conversationEnter/${user_id}/${contactName}`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      },
      errCb
    );
  },

  uploadNewConv: (user_id, chatID, errCb) => {
    return axiosExecute(
      {
        url: `/api/conversation/uploadNewConv/${user_id}/${chatID}`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      },
      errCb
    );
  },

  updateDispName: (dispName, errCb) => {
    return axiosExecute(
      {
        url: `/api/profiles/updateDispName`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        data: {
          token: getToken(),
          dispName: dispName,
        },
      },
      errCb
    );
  },
};

export default Backend;
