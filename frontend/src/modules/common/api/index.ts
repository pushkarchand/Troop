import axios from 'axios';
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
export const upload = async (file: any) => {
  const formData = new FormData();
  formData.append('image', file);

  return await axios.post(`${baseUrl}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('alluvium_auth_token')}`,
    },
  });
};
