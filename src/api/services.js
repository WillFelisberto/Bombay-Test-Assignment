import Axios from 'axios';

export const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST,
});
