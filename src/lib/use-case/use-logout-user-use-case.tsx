import Cookies from 'js-cookie';

import { queryClient } from '@/providers/react-query';

const useLogoutUserUseCase = ({ onSuccess }: { onSuccess?: () => void }) => {
  const logout = () => {
    Cookies.remove('access_token');

    queryClient.invalidateQueries({ queryKey: ['user, user-data'] });

    onSuccess?.();
  };

  return logout;
};

export default useLogoutUserUseCase;
