import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorToast, infoToast, successToast } from "../../utils/customToast";

const registerUser = createAsyncThunk("registerUser", async (userData) => {
  try {
    const response = await axios.post("signup", userData);
    infoToast(`Welcome ${response.data?.firstName}!`);
    return response.data;
  } catch (error) {
    errorToast(error.response.data);
    throw error;
  }
});

export default registerUser;
