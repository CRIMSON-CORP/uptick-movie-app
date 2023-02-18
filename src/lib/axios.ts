// eslint-disable-next-line import/no-self-import
import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
