import axios from 'axios';
export const upload = async (file: any) => {
  const formData = new FormData();
  formData.append('image', file);

  return await axios.post('http://localhost:5001/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('alluvium_auth_token')}`,
    },
  });
};
