import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginUser = createAsyncThunk("loginUser", async (userData) => {
  try {
    const response = await axios.post("login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const logoutUser = createAsyncThunk("logoutUser", async () => {
  try {
    const response = await axios.get("logout");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export { loginUser, logoutUser };
