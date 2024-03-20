import axios from "axios";

export const uploadProject = async (formData) => {
  try {
    const res = await axios.post("proposal/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const uploadProposal = async (formData) => {
  try {
    const res = await axios.post("project/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
