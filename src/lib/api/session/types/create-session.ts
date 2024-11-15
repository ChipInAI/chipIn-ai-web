type CreateSessionBody = {
  restaurant_name: string;
  restaurant_details: string[];
  receipt: string[];
};

type CreateSessionResponse = {
  message: string;
  session_id: string;
  session: {
    session_name: string;
    session_positions: string[];
    total: number;
    admin_id: string;
    created_at: string;
    receipt: string[];
    status: string;
    participants: string[];
  };
  restaurant_details: string[];
};

export type { CreateSessionBody, CreateSessionResponse };
