import { parseCookies } from 'nookies';

import { client } from '../instance';

import {
  ForgotPasswordBody,
  ForgotPasswordResponse,
} from './types/forgot-password';
import { LoginBody, LoginResponse } from './types/login';
import { RegistrationBody, RegistrationResponse } from './types/registration';
import {
  ResetPasswordBody,
  ResetPasswordResponse,
} from './types/reset-password';

const AuthAPI = {
  registration: async (
    registrationData: RegistrationBody,
  ): Promise<RegistrationResponse> => {
    const response = await client.post('/register', {
      email: registrationData.email,
      firstName: registrationData.firstName,
      password: registrationData.password,
      confirm_password: registrationData.confirmPassword,
    });
    return response.data;
  },

  login: async (loginData: LoginBody): Promise<LoginResponse> => {
    const response = await client.post('/login', {
      email: loginData.email,
      password: loginData.password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await client.get('/logout', {
      headers: { 'x-access-token': parseCookies().jwtToken },
    });
    return response.data;
  },

  forgotPassword: async (
    forgotPasswordData: ForgotPasswordBody,
  ): Promise<ForgotPasswordResponse> => {
    const response = await client.post('/forgot_password', {
      email: forgotPasswordData.email,
    });
    return response.data;
  },

  resetPassword: async (
    token: string,
    resetPasswordData: ResetPasswordBody,
  ): Promise<ResetPasswordResponse> => {
    const response = await client.post(`/reset_password/${token}`, {
      password: resetPasswordData.password,
      confirm_password: resetPasswordData.confirm_password,
    });
    return response.data;
  },
};

export { AuthAPI };
