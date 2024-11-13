type RegistrationBody = {
  email: string;
  firstName: string;
  password: string;
  confirmPassword: string;
};

type RegistrationResponse = {
  message: string;
  jwtToken: string;
  userData: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
  };
};

export type { RegistrationBody, RegistrationResponse };
