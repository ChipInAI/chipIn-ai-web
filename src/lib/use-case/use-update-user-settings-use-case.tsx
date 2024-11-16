import { UpdateUserSettingsBody } from '../api/user/types/update-user-settings';
import useUpdateUserMutation from '../service/mutation/use-update-user-mutation';

const useUpdateUserSettingsUseCase = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const mutation = useUpdateUserMutation();

  const updateUserSettings = async (
    updateUserSettingsData: UpdateUserSettingsBody,
  ) => {
    try {
      const data = await mutation.mutateAsync(updateUserSettingsData);

      onSuccess?.();

      return data;
    } catch (error) {
      onError?.(error);
    }
  };

  return {
    updateUserSettings,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};

export default useUpdateUserSettingsUseCase;
