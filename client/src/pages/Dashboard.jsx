import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../components/Table/CustomTable";
import getProjectsByGuide from "../redux/actions/getProjectsByGuide";
import { useNavigate } from "react-router-dom";

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
    name: "Student Name",
    uid: "studentName",
  },
  {
    name: "StudentID",
    uid: "studentId",
  },
  {
    name: "Date",
    uid: "createdAt",
  },
  {
    name: "Status",
    uid: "proposalStatus",
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
    name: "Student Name",
    uid: "studentName",
  },
  {
    name: "StudentID",
    uid: "studentId",
  },
  {
    name: "Date",
    uid: "createdAt",
  },
  {
    name: "Status",
    uid: "projectStatus",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  if (user?.isStudent) navigate("/");
  const { loading, error, projects } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectsByGuide());
  }, []);

  return loading || !projects ? (
    <div>Loading...</div>
  ) : error ? (
    <div>An error occured. Please retry after sometime</div>
  ) : (
    <div className="px-24 py-10 font-poppins">
      <p className="font-graphieBold text-4xl pt-4 pb-7">Project proposals</p>
      <CustomTable
        isDashboard={true}
        fields={proposalFields}
        projects={projects}
      />
      <p className="font-graphieBold text-4xl pt-16 pb-7">Final submissions</p>
      <CustomTable
        isDashboard={true}
        isProposal={false}
        projects={projects}
        fields={projectFields}
      />
    </div>
  );
};

export default Dashboard;
