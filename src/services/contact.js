import axios from "axios";
const sendContact = async (data) => {
  return await axios.post("http://localhost:8000/api/v1/send", data);
};

export { sendContact };
