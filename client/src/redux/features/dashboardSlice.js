import { createSlice } from "@reduxjs/toolkit";
import getProjectsByGuide from "../actions/getProjectsByGuide";

const initialState = {
  projects: null,
  error: null,
  loading: false,
  controls: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setControls: (state, action) => {
      state.controls = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectsByGuide.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.projects = null;
      })
      .addCase(getProjectsByGuide.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProjectsByGuide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.projects = null;
      });
  },
});

export const { setControls } = dashboardSlice.actions;
export default dashboardSlice.reducer;
