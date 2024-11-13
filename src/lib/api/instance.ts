import axios from 'axios';

const clientInstance = axios.create({ baseURL: process.env.BASE_URL });

const getClient = () => clientInstance;

export const client = getClient();
