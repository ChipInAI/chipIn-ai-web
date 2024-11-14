import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UserAPI } from '@/lib/api/user';

const useGetUserSessionQuery = ({
  enabled,
  onSuccess,
  onError,
}: {
  enabled: boolean;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}) => {
  return useQuery({
    queryKey: ['user, home-page'],
    queryFn: async () => {
      try {
        const data = await UserAPI.getHomePageData();

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

export default useGetUserSessionQuery;
