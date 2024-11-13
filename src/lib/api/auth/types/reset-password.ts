type ResetPasswordBody = {
  password: string;
  confirm_password: string;
};

type ResetPasswordResponse = {
  message: string;
};

export type { ResetPasswordBody, ResetPasswordResponse };
