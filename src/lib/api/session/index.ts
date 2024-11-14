import Cookies from 'js-cookie'; // Importing Cookies from js-cookie

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
    const accessToken = Cookies.get('access_token'); // Using Cookies to get the access token
    const response = await client.get('/scan_image', {
      headers: { 'x-access-token': accessToken },
    });
    return response.data;
  },

  uploadImage: async (image: File): Promise<UploadImageResponse> => {
    const formData = new FormData();
    formData.append('image', image);
    const accessToken = Cookies.get('access_token'); // Using Cookies to get the access token
    const response = await client.post('/upload_image', formData, {
      headers: { 'x-access-token': accessToken },
    });
    return response.data;
  },

  getOldSessions: async (): Promise<GetOldSessionsResponse> => {
    const accessToken = Cookies.get('access_token'); // Using Cookies to get the access token
    const response = await client.get('/get_old_sessions', {
      headers: { 'x-access-token': accessToken },
    });
    return response.data;
  },

  createSession: async (
    sessionData: CreateSessionBody,
  ): Promise<CreateSessionResponse> => {
    const accessToken = Cookies.get('access_token'); // Using Cookies to get the access token
    const response = await client.post('/create_session', sessionData, {
      headers: { 'x-access-token': accessToken },
    });
    return response.data;
  },

  getSession: async (sessionId: string): Promise<GetSessionResponse> => {
    const accessToken = Cookies.get('access_token'); // Using Cookies to get the access token
    const response = await client.get(`/get_session/${sessionId}`, {
      headers: { 'x-access-token': accessToken },
    });
    return response.data;
  },

  createLink: async (sessionId: string) => {
    const accessToken = Cookies.get('access_token'); // Using Cookies to get the access token
    const response = await client.get(`/create_link/${sessionId}`, {
      headers: { 'x-access-token': accessToken },
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
