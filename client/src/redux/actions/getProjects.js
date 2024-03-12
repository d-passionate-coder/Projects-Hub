import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoginStatus } from "../features/authSlice";

const getProjects = createAsyncThunk(
  "getProjects",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get("/api/project/user");
      return response.data;
    } catch (error) {
      if (error.response && error.response.data == "AuthFailure") {
        dispatch(setLoginStatus({ status: false, user: null }));
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export default getProjects;
