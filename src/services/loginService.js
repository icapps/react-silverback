import { Network } from '../utils';

export const login = async (email, password) => {
  const result = await Network.post('/auth/login', { username: email, password, deviceId: `${window.navigator.userAgent}-${email}` });
  return result;
};
