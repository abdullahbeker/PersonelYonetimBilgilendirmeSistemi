import axios from "axios";

export const addTokenToHeader = (token, instance) => {
  instance.defaults.headers.common["Authorization"] = token;
};

export default axios.create({
  baseURL: "https://prolukswebapi.azurewebsites.net",
});
