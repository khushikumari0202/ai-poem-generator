import axios from "axios";

export const Axios = axios.create({
  baseURL: "", // backend url
  headers: {
    api_key: "", // api key to access api
  },
});
