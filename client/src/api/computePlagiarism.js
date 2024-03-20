export default computePlagiarism = async (id) => {
  try {
    const res = await axios.post("proposal/compute-plagiarism", {
      id,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
