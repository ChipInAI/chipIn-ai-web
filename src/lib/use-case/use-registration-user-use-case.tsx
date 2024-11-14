import useRegisterUserMutation from '@/lib/service/mutation/use-register-user-mutation';

import { RegistrationBody } from '../api/auth/types/registration';

const useRegistrationUserUseCase = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const mutation = useRegisterUserMutation();

  const registerUser = async (registrationData: RegistrationBody) => {
    try {
      await mutation.mutateAsync(registrationData);

      onSuccess?.();
    } catch (error) {
      onError?.(error);
    }
  };

  return { registerUser, isLoading: mutation.isPending, error: mutation.error };
};

export default useRegistrationUserUseCase;
