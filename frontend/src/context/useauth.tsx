import { jwtDecode } from "jwt-decode";

export const decodeToken = (userToken: string) => {
  const token = jwtDecode<{
    email: string;
    _id: string;
    type: string;
    iat: number;
    exp: number;
    name: string;
  }>(userToken);
  return token;
};

export const useAuth = () => {
  const userToken = localStorage.getItem("alluvium_auth_token");
  if (userToken) {
    const token = decodeToken(userToken);
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    if (token.exp < currentTime) {
      // Token has expired
      return null;
    } else {
      // Token is still valid
      return { type: token.type, name: token.name };
    }
  }

  // No token found in local storage
  return null;
};
