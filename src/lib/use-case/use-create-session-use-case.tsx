import useCreateSessionMutation from '../service/mutation/use-create-session.mutation';

const useCreateSessionUseCase = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (sessionId: string) => void;
  onError?: (error: unknown) => void;
}) => {
  const mutation = useCreateSessionMutation();

  const createSession = async (file: File) => {
    try {
      const data = await mutation.mutateAsync(file);

      onSuccess?.(data.session_id);

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
