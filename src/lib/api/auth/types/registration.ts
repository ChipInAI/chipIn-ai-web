type RegistrationBody = {
  email: string;
  firstName: string;
  password: string;
  confirmPassword: string;
};

type RegistrationResponse = {
  message: string;
  jwt_token: string;
};

export type { RegistrationBody, RegistrationResponse };
