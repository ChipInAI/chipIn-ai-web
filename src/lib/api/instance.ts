import axios from 'axios';

const clientInstance = axios.create({
  baseURL: 'https://chipinai-backend-docker.onrender.com',
});

const getClient = () => clientInstance;

export const client = getClient();
