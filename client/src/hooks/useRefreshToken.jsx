import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", { withCredentials: true });
    setAuth((prev) => {
      return {
        ...prev,
        user: response.data.matricula,
        userID: response.data.matricula,
        roles: response.data.role,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
