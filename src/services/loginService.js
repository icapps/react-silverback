import { Network } from '../utils';

export const login = async (email, password) => {
  const result = await Network.post('/auth/login', { username: email, password, deviceId: getDeviceId(email) });
  return result;
};

const getDeviceId = email => {
  if (localStorage.getItem('DEVICE_ID')) {
    return localStorage.getItem('DEVICE_ID');
  }
  localStorage.setItem('DEVICE_ID', `${Math.random()}${new Date().getTime()}${window.navigator.userAgent}${email}`.split(' ').join());
  return localStorage.getItem('DEVICE_ID');
};
