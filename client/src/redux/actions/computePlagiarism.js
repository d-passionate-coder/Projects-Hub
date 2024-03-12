import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const computePlagiarism = createAsyncThunk("computePlagiarism", async (id) => {
  try {
    const res = await axios.post("/api/proposal/compute-plagiarism/", {
      id,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
});

export default computePlagiarism;
