type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  jwtToken: string;
};

export type { LoginBody, LoginResponse };
