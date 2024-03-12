import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const registerUser = createAsyncThunk("registerUser", async (userData) => {
  try {
    const response = await axios.post("signup", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export default registerUser;
