type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  jwt_token: string;
  user_data: {
    id: string;
    username: string;
    email: string;
  };
};

export type { LoginBody, LoginResponse };
