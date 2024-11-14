type RegistrationBody = {
  email: string;
  firstName: string;
  password: string;
  confirmPassword: string;
};

type RegistrationResponse = {
  message: string;
  jwtToken: string;
};

export type { RegistrationBody, RegistrationResponse };
