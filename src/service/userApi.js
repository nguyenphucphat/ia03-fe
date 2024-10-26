import axios from "axios";

const userApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/user",
});

export const getMe = async () => {
  try {
    const response = await userApi.get("/get-me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const login = async (loginBody) => {
  try {
    const response = await userApi.post("/login", loginBody);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const register = async (registerBody) => {
  try {
    const response = await userApi.post("/register", registerBody);
    return response;
  } catch (err) {
    return err.response;
  }
};
