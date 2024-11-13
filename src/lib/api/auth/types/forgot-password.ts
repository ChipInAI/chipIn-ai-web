type ForgotPasswordBody = {
  email: string;
};

type ForgotPasswordResponse = {
  message: 'Password reset link sent';
  user_data: {
    email: string;
    firstName: string;
  };
};

export type { ForgotPasswordBody, ForgotPasswordResponse };
