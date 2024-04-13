import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorToast, infoToast, successToast } from "../../utils/customToast";

const loginUser = createAsyncThunk("loginUser", async (userData) => {
  try {
    const response = await axios.post("login", userData);
    const user = JSON.stringify(response.data);
    localStorage.setItem("user", user);
    infoToast(`Welcome ${response.data?.firstName}!`);
    return response.data;
  } catch (error) {
    errorToast(error.response.data);
    throw error;
  }
});

const logoutUser = createAsyncThunk("logoutUser", async () => {
  try {
    const response = await axios.get("logout");
    localStorage.removeItem("user");
    infoToast("Logged out successfully");
    return response.data;
  } catch (error) {
    errorToast("Please try again after sometime");
    throw error;
  }
});

export { loginUser, logoutUser };
