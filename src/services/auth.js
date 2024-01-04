import axios from "axios";
const registerUser = async (data) => {
  return await axios.post("http://localhost:8000/api/v1/register", data);
};

const loginUser = async (data) => {
  return await axios.post("http://localhost:8000/api/v1/login", data);
};

export { registerUser, loginUser };
