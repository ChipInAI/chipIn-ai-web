import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { SessionAPI } from '@/lib/api/session';

const useGetSessionAdminQuery = ({
  sessionId,
  enabled,
  onSuccess,
  onError,
}: {
  sessionId: string;
  enabled: boolean;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}) => {
  return useQuery({
    queryKey: ['user', 'user-get-session-admin', sessionId],
    queryFn: async () => {
      try {
        const data = await SessionAPI.getAdmin(sessionId);
        onSuccess?.();
        return data;
      } catch (error) {
        if (error instanceof AxiosError) {
          onError?.(error);
        }
        return null;
      }
    },
    enabled,
  });
};

export default useGetSessionAdminQuery;
