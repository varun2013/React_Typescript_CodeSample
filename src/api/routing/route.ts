const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const URL = (uri: string) => BASE_URL + uri;

export const LOGIN = URL('/login')
export const REGISTER = URL('/register')
export const FORGOT_PASSWORD = URL('/forgot_password')
export const RESET_PASSWORD = URL('/reset_password');
