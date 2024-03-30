import axios from "axios";

export const fetchProjectsBycount = async (count) => {
  try {
    const res = await axios.get(`project/limit/${count}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchAllProjects = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return error;
  }
};
