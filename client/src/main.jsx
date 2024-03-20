import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MyProjects from "./pages/MyProjects.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import ProposalUpload from "./pages/ProposalUpload.jsx";
import ProposalForm from "./components/ProposalForm.jsx";
import { Navigate } from "react-router-dom";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PlagiarismChecker from "./components/PlagiarismChecker.jsx";
import Approval from "./components/Approval.jsx";
import ProtectedRoutes from "./pages/ProtectedRoutes.jsx";
import Project from "./pages/Project.jsx";
import ProjectUpload from "./pages/ProjectUpload.jsx";
import ProjectForm from "./components/ProjectForm.jsx";
import AllProjects from "./pages/AllProjects.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

if (process.env.NODE_ENV === "production") disableReactDevTools();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="" element={<ProtectedRoutes />}>
        <Route path="project">
          <Route path=":id" element={<Project />} />
          <Route path="all" element={<AllProjects />} />
          <Route path="upload" element={<ProjectUpload />}>
            <Route path="submit/:step" element={<ProjectForm />} />
            <Route path="approval/:step/:id" element={<Approval />} />
            <Route path="" element={<Navigate to="submit/1" replace />} />
          </Route>
        </Route>
        <Route path="myProjects" element={<MyProjects />} />
        <Route path="proposal" element={<ProposalUpload />}>
          <Route path="" element={<Navigate to="submit/1" replace />} />
          <Route path="submit/:step" element={<ProposalForm />} />
          <Route
            path="plagiarism-checker/:step/:id"
            element={<PlagiarismChecker />}
          />
          <Route path="approval/:step/:id" element={<Approval />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
