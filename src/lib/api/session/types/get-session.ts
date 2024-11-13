type GetSessionResponse = {
  session_data: {
    session_name: string;
    isClosed: boolean;
    positions: string[];
    total_for_person: number;
    total: number;
    participants: string[];
    created_at: string;
    receipt: string[];
  };
};

export type { GetSessionResponse };
