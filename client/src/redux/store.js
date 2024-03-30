import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js";
import projectSlice from "./features/projectSlice.js";
import proposalSlice from "./features/proposalSlice.js";
import dashboardSlice from "./features/dashboardSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectSlice,
    proposal: proposalSlice,
    dashboard: dashboardSlice,
  },
  devTools: false,
});
