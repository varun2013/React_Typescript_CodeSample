import { LOGIN, REGISTER, FORGOT_PASSWORD, RESET_PASSWORD } from '../routing/route';
import { request } from '../request/axios.request'

export async function register(registerData: object) {
    return request({ url: REGISTER, method: 'post', data: registerData, withCredentials: false })
}

export async function login(loginData: object) {
    return request({ url: LOGIN, method: 'post', data: loginData, withCredentials: false })
}

export async function forgotPassword(data: object) {
    return request({ url: FORGOT_PASSWORD, method: 'post', data, withCredentials: false })
}

export async function resetPassword(data: { token: string, confirm_password: string, password: string }) {
    return request({ url: RESET_PASSWORD + "/" + data.token, method: 'post', data, withCredentials: false })
}



