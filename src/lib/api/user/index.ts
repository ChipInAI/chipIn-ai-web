import Cookies from 'js-cookie';

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
    const accessToken = Cookies.get('access_token');
    const response = await client.put('/settings', updateUserSettingsData, {
      headers: { 'x-access-token': accessToken },
    });
    return response.data;
  },

  getHomePageData: async (): Promise<HomePageData> => {
    const accessToken = Cookies.get('access_token');
    const response = await client.get('/', {
      headers: { 'x-access-token': accessToken },
    });
    return response.data;
  },

  getUserData: async (): Promise<UserDataResponse> => {
    const accessToken = Cookies.get('access_token');
    const response = await client.get('/profile', {
      headers: { 'x-access-token': accessToken },
    });
    return response.data;
  },
};

export { UserAPI };
