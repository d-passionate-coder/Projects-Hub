import { createSlice } from "@reduxjs/toolkit";
import computePlagiarism from "../actions/computePlagiarism";

const initialState = {
  loading: false,
  error: null,
  plagReport: null,
  step: 0,
};

const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setPlagReport: (state, action) => {
      state.plagReport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(computePlagiarism.pending, (state) => {
        state.loading = true;
      })
      .addCase(computePlagiarism.fulfilled, (state, action) => {
        state.loading = false;
        state.plagReport = action.payload;
        state.error = null;
      })
      .addCase(computePlagiarism.rejected, (state, action) => {
        state.loading = false;
        state.plagReport = null;
        state.error = action.error;
      });
  },
});

export const { setPlagReport, setStep } = proposalSlice.actions;
export default proposalSlice.reducer;
