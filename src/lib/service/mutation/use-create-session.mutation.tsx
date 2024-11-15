import { useMutation } from '@tanstack/react-query';

import { SessionAPI } from '@/lib/api/session';

const useCreateSessionMutation = () => {
  return useMutation({
    mutationFn: (file: File) => SessionAPI.uploadImage(file),
  });
};

export default useCreateSessionMutation;
