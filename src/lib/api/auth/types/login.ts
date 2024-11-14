type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  jwt_token: string;
};

export type { LoginBody, LoginResponse };
