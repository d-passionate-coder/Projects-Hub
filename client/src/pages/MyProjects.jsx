import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import getProjects from "../redux/actions/getProjects.js";
import { NavLink, useNavigate } from "react-router-dom";
import CustomTable from "../components/Table/CustomTable.jsx";
import { Button } from "@nextui-org/react";

const proposalFields = [
  {
    name: "No.",
    uid: "serialNumber",
  },
  {
    name: "Title",
    uid: "title",
  },
  {
    name: "Guide",
    uid: "guide",
  },
  {
    name: "Status",
    uid: "proposalStatus",
  },
  {
    name: "Date",
    uid: "createdAt",
  },
  {
    name: "",
    uid: "actions",
  },
];

const projectFields = [
  {
    name: "No.",
    uid: "serialNumber",
  },
  {
    name: "Title",
    uid: "title",
  },
  {
    name: "Guide",
    uid: "guide",
  },
  {
    name: "Status",
    uid: "projectStatus",
  },
  {
    name: "Date",
    uid: "createdAt",
  },
  {
    name: "",
    uid: "actions",
  },
];

const MyProjects = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  if (!user?.isStudent) navigate("/");
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>An error occured :/</div>
  ) : (
    <div className="px-24 py-10 font-poppins">
      <div className="flex justify-between items-center pt-4 pb-7">
        <p className="font-graphieBold text-4xl">Project proposals</p>
        <NavLink to={"/proposal/upload/submit/1"}>
          <Button className="text-white bg-orange rounded-md drop-shadow font-rem text-md">
            New
          </Button>
        </NavLink>
      </div>
      {loading || !projects ? (
        <p>Loading....</p>
      ) : (
        <CustomTable
          fields={proposalFields}
          projects={projects}
          rowClickable={false}
        />
      )}
      <div className="flex justify-between items-center pt-16 pb-7">
        <p className="font-graphieBold text-4xl">Final submissions</p>
        <NavLink to="/project/upload/submit/1">
          <Button className="text-white bg-orange rounded-md drop-shadow font-rem text-md">
            New
          </Button>
        </NavLink>
      </div>
      {loading || !projects ? (
        <p>Loading....</p>
      ) : (
        <CustomTable
          isProposal={false}
          projects={projects}
          fields={projectFields}
          rowClickable={false}
        />
      )}
    </div>
  );
};

export default MyProjects;
