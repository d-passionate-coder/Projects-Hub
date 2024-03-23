import axios from "axios";
import { store } from "../redux/store.js";
import getProjectsByGuide from "../redux/actions/getProjectsByGuide.js";

export const changeProposalStatus = async (id, status) => {
  try {
    await axios.post("proposal/changeStatus", {
      id,
      status,
    });
    store.dispatch(getProjectsByGuide());
    return;
  } catch (error) {
    return error;
  }
};

export const changeProjectStatus = async (id, status) => {
  try {
    await axios.post("project/changeStatus", {
      id,
      status,
    });
    store.dispatch(getProjectsByGuide());
    return;
  } catch (error) {
    return error;
  }
};
