import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginUser = createAsyncThunk("loginUser", async (userData) => {
  try {
    const response = await axios.post("/api/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const logoutUser = createAsyncThunk("logoutUser", async () => {
  try {
    const response = await axios.get("/api/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export { loginUser, logoutUser };
