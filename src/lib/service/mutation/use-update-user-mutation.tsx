'use client';

import { useMutation } from '@tanstack/react-query';

import { UserAPI } from '@/lib/api/user';
import { UpdateUserSettingsBody } from '@/lib/api/user/types/update-user-settings';

const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: (updateUserSettingsData: UpdateUserSettingsBody) =>
      UserAPI.updateUserSettings(updateUserSettingsData),
  });
};

export default useUpdateUserMutation;
