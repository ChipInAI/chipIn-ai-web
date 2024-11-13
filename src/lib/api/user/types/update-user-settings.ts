type UpdateUserSettingsBody = {
  email: string;
  firstName: string;
  password: string;
  confirm_password: string;
};

type UpdateUserSettingsResponse = {
  message: string;
};

export type { UpdateUserSettingsBody, UpdateUserSettingsResponse };
