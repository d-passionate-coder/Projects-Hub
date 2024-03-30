import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const computePlagiarism = createAsyncThunk("computePlagiarism", async (id) => {
  try {
    const res = await axios.post("proposal/compute-plagiarism/", {
      id,
    });
    const sortedData = res.data?.sort((a, b) =>
      a.similarity < b.similarity ? 1 : -1
    );
    return sortedData;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export default computePlagiarism;
