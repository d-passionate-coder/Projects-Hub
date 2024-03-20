import axios from "axios";
import { store } from "../redux/store.js";
import getProjects from "../redux/actions/getProjects.js";

export const deleteProposal = (id) => {
  axios.delete(`proposal/${id}`).then(() => {
    store.dispatch(getProjects());
  });
};

export const deleteProject = (id) => {
  axios.delete(`project/${id}`).then(() => {
    store.dispatch(getProjects());
  });
};
