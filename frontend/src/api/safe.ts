import axios from "axios";
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const axiosOptions = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('alluvium_auth_token')}`,
  },
};

export const post = async (url: string, payload: any) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, payload, axiosOptions);

    return response.data;
  } catch (error: any) {
    throw new Error(`Axios error! ${error.message}`);
  }
};

export const getSafe = async (url: string) => {
  try {
    const response = await axios.get(`${baseUrl}${url}`, axiosOptions);

    return response.data;
  } catch (error: any) {
    throw new Error(`Axios error! ${error.message}`);
  }
};

export const loginUser = async (payload: any) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, payload);

    return response.data;
  } catch (error: any) {
    throw new Error(`Axios error! ${error.message}`);
  }
};
