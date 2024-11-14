import { setCookie } from 'nookies';

import useLoginUserMutation from '@/lib/service/mutation/use-login-user-mutation';

import { LoginBody } from '../api/auth/types/login';

const useLoginUserUseCase = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void,
) => {
  const mutation = useLoginUserMutation();

  const loginUser = async (loginData: LoginBody) => {
    try {
      const data = await mutation.mutateAsync(loginData);

      onSuccess?.();

      setCookie(null, 'jwtToken', data.jwt_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    } catch (error) {
      onError?.(error);
    }
  };

  return { loginUser, isLoading: mutation.isPending, error: mutation.error };
};

export default useLoginUserUseCase;
