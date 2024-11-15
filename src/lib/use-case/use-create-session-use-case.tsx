import useCreateSessionMutation from '../service/mutation/use-create-session.mutation';

const useCreateSessionUseCase = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const mutation = useCreateSessionMutation();

  const createSession = async (file: File) => {
    try {
      const data = await mutation.mutateAsync(file);

      onSuccess?.();

      return data;
    } catch (error) {
      onError?.(error);
    }
  };

  return {
    createSession,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};

export default useCreateSessionUseCase;
