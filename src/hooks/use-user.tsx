'use client';

import useGetUserQuery from '@/lib/service/query/use-get-user-query';

import { useToast } from './use-toast';

const useUser = () => {
  const { toast } = useToast();

  const { isLoading, data } = useGetUserQuery({
    enabled: true,
    onError: error => {
      if (error?.response?.status === 401) {
        console.log('HII');
        toast({
          title: 'Unauthorized',
          description: 'You need to login to access this page.',
        });
      } else {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
      }

      return error;
    },
  });

  return { isLoading, data };
};

export default useUser;
