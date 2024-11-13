import useRegisterUserMutation from '@/lib/service/mutation/use-register-user-mutation';

import { RegistrationBody } from '../api/auth/types/registration';
import { setApplicationCookie } from '../utils';

const useRegistrationUserUseCase = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void,
) => {
  const mutation = useRegisterUserMutation();

  const registerUser = async (registrationData: RegistrationBody) => {
    try {
      const data = await mutation.mutateAsync(registrationData);

      onSuccess?.();

      setApplicationCookie('jwtToken', data.jwtToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    } catch (error) {
      onError?.(error);
    }
  };

  return { registerUser, isLoading: mutation.isPending, error: mutation.error };
};

export default useRegistrationUserUseCase;
