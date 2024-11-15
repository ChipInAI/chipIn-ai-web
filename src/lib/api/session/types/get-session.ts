type GetSessionResponse = {
  session_data: {
    admin_id: string;
    created_at: string;
    isClosed: boolean;
    participants: string[];
    positions: {
      buyer: string;
      item_name: string;
      price: number;
    }[];
    receipt: string[][];
    session_name: string;
    total: number;
    total_for_person: number;
  };
};

export type { GetSessionResponse };
