import history from './history';
import { Tokens, User } from '../storage';
import { LOGIN } from './routeContants';
import { successNotification } from '../common/notification-alert';

export const onLogout = () => {
  Tokens.removeLocalData();
  successNotification('Logout successfully!!')
  history.push(LOGIN);
  return true;
};

export const getToken = () => Tokens.getToken();
export const getUserDetails = () => User.getUserDetails();


export const isLoggedIn = () => {
  if (getUserDetails()) {
    return true;
  } else {
    Tokens.removeLocalData();
    return false
  }
};