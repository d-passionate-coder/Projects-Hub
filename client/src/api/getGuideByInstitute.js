import axios from "axios";

const getGuideByInstitute = async () => {
  try {
    const res = await axios.get("guideByInstitute");
    return res.data;
  } catch (error) {
    return error;
  }
};

export default getGuideByInstitute;
