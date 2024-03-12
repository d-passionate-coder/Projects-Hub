import { createSlice } from "@reduxjs/toolkit";
import getProjects from "../actions/getProjects";

const initialState = {
  projects: null,
  error: null,
  loading: false,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.projects = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.projects = null;
      });
  },
});

export default projectSlice.reducer;
