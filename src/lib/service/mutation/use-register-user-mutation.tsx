'use client';

import { useMutation } from '@tanstack/react-query';

import { RegistrationBody } from '@/lib/api/auth/types/registration';

import { AuthAPI } from '../../api/auth';

const useRegisterUserMutation = () => {
  return useMutation({
    mutationFn: (registrationData: RegistrationBody) =>
      AuthAPI.registration(registrationData),
  });
};

export default useRegisterUserMutation;
