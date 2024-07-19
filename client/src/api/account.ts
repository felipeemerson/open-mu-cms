import api from './api';
import { useMutation, useQuery } from '@tanstack/react-query';

import type {
  LoginForm,
  SignUpForm,
  Account,
  LoginResponse,
  ChangePasswordForm,
} from './types';

const createAccount = async (registerData: SignUpForm): Promise<Account> => {
  const response = await api.post('/register', registerData);
  return response.data;
};

const logIn = async (loginData: LoginForm): Promise<LoginResponse> => {
  const response = await api.post('/login', loginData);
  return response.data;
};

const getAccount = async (): Promise<Account> => {
  const response = await api.get('/accounts/me');
  return response.data;
};

const changePassword = async (changePasswordData: ChangePasswordForm) => {
  await api.put('/accounts/change-password', changePasswordData);
};

export const useLogIn = () => {
  return useMutation({
    mutationFn: (loginData: LoginForm) => logIn(loginData),
  });
};

export const useGetAccount = () => {
  return useQuery<Account, Error>({
    queryKey: ['accounts', 'me'],
    queryFn: () => getAccount(),
  });
};

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (registerData: SignUpForm) => createAccount(registerData),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (changePasswordData: ChangePasswordForm) =>
      changePassword(changePasswordData),
  });
};
