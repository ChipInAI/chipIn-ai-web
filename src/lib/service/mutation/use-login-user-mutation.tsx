import { useMutation } from '@tanstack/react-query';

import { AuthAPI } from '@/lib/api/auth';
import { LoginBody } from '@/lib/api/auth/types/login';

const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: (loginData: LoginBody) => AuthAPI.login(loginData),
  });
};

export default useLoginUserMutation;
