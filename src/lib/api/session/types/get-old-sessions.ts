type GetOldSessionsResponse = {
  sessions_list: Array<{
    session_name: string;
    positions: string;
    total_for_person: number;
    total: number;
  }>;
};

export type { GetOldSessionsResponse };
