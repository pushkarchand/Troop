const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const fetchOptions = (postData: any) => {
  const accessToken = '';
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(postData),
  };
};

export const post = (url: string, payload: any) => {
  const apiUrl = `${baseUrl}${url}`;
  fetch(apiUrl, fetchOptions(payload))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(async (data) => {
      await data.json();
    })
    .catch((error) => {
      throw error;
    });
};
