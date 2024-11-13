import { parseCookies } from 'nookies';

import { client } from '../instance';

import { HomePageData } from './types/home-page-data';
import {
  UpdateUserSettingsBody,
  UpdateUserSettingsResponse,
} from './types/update-user-settings';
import { UserDataResponse } from './types/user-data';

const UserAPI = {
  updateUserSettings: async (
    updateUserSettingsData: UpdateUserSettingsBody,
  ): Promise<UpdateUserSettingsResponse> => {
    const response = await client.put('/settings', updateUserSettingsData, {
      headers: { 'x-access-token': parseCookies().jwtToken },
    });
    return response.data;
  },

  getHomePageData: async (): Promise<HomePageData> => {
    const response = await client.get('/', {
      headers: { 'x-access-token': parseCookies().jwtToken },
    });
    return response.data;
  },

  getUserData: async (): Promise<UserDataResponse> => {
    const response = await client.get('/profile', {
      headers: { 'x-access-token': parseCookies().jwtToken },
    });
    return response.data;
  },
};

export { UserAPI };
