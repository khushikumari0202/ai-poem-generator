import { Axios } from "../axiosConfig";

export const test = async () => {
  let res = { status: 0, data: "", error: "" };

  try {
    const result = await Axios.get("/path_of_api");

    res.status = 200;
    res.data = result.data.data;
  } catch (error: any) {
    res.status = error.response.status;
    res.error = error.response.data.error;
  }

  return res;
};
