import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import getProjects from "../redux/actions/getProjects.js";
import Table from "../components/Table.jsx";
import Button from "../components/Button.jsx";
import { NavLink } from "react-router-dom";

const MyProjects = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return loading || (!projects && !error) ? (
    <div>Loading...</div>
  ) : !isLoggedIn ? (
    <div>Please Login to continue.</div>
  ) : error ? (
    <div>An error occured :/</div>
  ) : (
    <div className="px-24 py-10 font-poppins">
      <div className="flex justify-between items-center pt-4 pb-7">
        <p className="font-graphieBold text-4xl">Project proposals</p>
        <NavLink to={"/proposal/submit/1"}>
          <Button text={"New"} />
        </NavLink>
      </div>
      {loading || !projects ? <p>Loading....</p> : <Table />}
      <div className="flex justify-between items-center pt-16 pb-7">
        <p className="font-graphieBold text-4xl">Final submissions</p>
        <NavLink to="/project/upload/submit/1">
          <Button text={"New"} />
        </NavLink>
      </div>
      {loading || !projects ? <p>Loading....</p> : <Table isProposal={false} />}
    </div>
  );
};

export default MyProjects;
