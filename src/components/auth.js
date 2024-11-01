import axios from "axios";

export const requestPasswordReset = async email => {
  return await axios.post(
    "http://localhost:3005/api/request-password-reset",
    { email }
  );
};

export const resetPassword = async (token, password) => {
  return await axios.post(
    `http://localhost:3005/api/reset-password/${token}`,
    { password }
  );
}