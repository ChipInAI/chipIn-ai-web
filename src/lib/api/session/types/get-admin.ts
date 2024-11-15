type GetAdminBody = {
  session_id: string;
};

type GetAdminResponse = {
  message: string;
  admin: {
    id: string;
    email: string;
    firstName: string;
  };
};

export type { GetAdminBody, GetAdminResponse };
