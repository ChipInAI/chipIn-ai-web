import { parseCookies } from 'nookies';

import { client } from '../instance';

import {
  CreateSessionBody,
  CreateSessionResponse,
} from './types/create-session';
import { GetOldSessionsResponse } from './types/get-old-sessions';
import { GetSessionResponse } from './types/get-session';
import { ScanImageResponse } from './types/scan-image';
import { UploadImageResponse } from './types/upload-image';

const SessionAPI = {
  scanImage: async (): Promise<ScanImageResponse> => {
    const response = await client.get('/scan_image', {
      headers: { 'x-access-token': parseCookies().jwtToken },
    });
    return response.data;
  },

  uploadImage: async (image: File): Promise<UploadImageResponse> => {
    const formData = new FormData();
    formData.append('image', image);
    const response = await client.post('/upload_image', formData, {
      headers: { 'x-access-token': parseCookies().jwtToken },
    });
    return response.data;
  },

  getOldSessions: async (): Promise<GetOldSessionsResponse> => {
    const response = await client.get('/get_old_sessions', {
      headers: { 'x-access-token': parseCookies().jwtToken },
    });
    return response.data;
  },

  createSession: async (
    sessionData: CreateSessionBody,
  ): Promise<CreateSessionResponse> => {
    const response = await client.post('/create_session', sessionData, {
      headers: { 'x-access-token': parseCookies().jwtToken },
    });
    return response.data;
  },

  getSession: async (sessionId: string): Promise<GetSessionResponse> => {
    const response = await client.get(`/get_session/${sessionId}`, {
      headers: { 'x-access-token': parseCookies().jwtToken },
    });
    return response.data;
  },

  createLink: async (sessionId: string) => {
    const response = await client.get(`/create_link/${sessionId}`, {
      headers: { 'x-access-token': parseCookies().jwtToken },
    });
    return response.data;
  },

  joinLink: async (sessionId: string, userId: string) => {
    const response = await client.get(`/join_link/${sessionId}`, {
      params: { user_id: userId },
    });
    return response.data;
  },
};

export { SessionAPI };
