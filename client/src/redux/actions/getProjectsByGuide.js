import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoginStatus } from "../features/authSlice";

const getProjectsByGuide = createAsyncThunk(
  "getProjectsByGuide",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get("project/guide");
      return response.data;
    } catch (error) {
      if (error.response && error.response.data == "AuthFailure") {
        dispatch(setLoginStatus({ status: false, user: null }));
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export default getProjectsByGuide;
