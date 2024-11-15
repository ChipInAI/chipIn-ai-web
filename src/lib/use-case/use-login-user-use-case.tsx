import Cookies from 'js-cookie';

import useLoginUserMutation from '@/lib/service/mutation/use-login-user-mutation';
import { queryClient } from '@/providers/react-query';

import { LoginBody } from '../api/auth/types/login';

const useLoginUserUseCase = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const mutation = useLoginUserMutation();

  const loginUser = async (loginData: LoginBody) => {
    try {
      const data = await mutation.mutateAsync(loginData);

      Cookies.set('access_token', data.jwt_token);

      onSuccess?.();

      await queryClient.invalidateQueries({ queryKey: ['user, user-data'] });

      await queryClient.invalidateQueries({ queryKey: ['user, home-page'] });
    } catch (error) {
      onError?.(error);
    }
  };

  return { loginUser, isLoading: mutation.isPending, error: mutation.error };
};

export default useLoginUserUseCase;
