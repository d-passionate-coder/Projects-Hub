import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const computePlagiarism = createAsyncThunk("computePlagiarism", async (id) => {
  try {
    const res = await axios.post("proposal/compute-plagiarism/", {
      id,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export default computePlagiarism;
