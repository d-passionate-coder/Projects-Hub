import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Button from "./Button";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Content = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get("project/limit/6")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="p-8 px-[6.6rem] bg-background">
      <div className="flex items-center gap-2">
        <img src="/assets/svg/Projects.svg" alt="project_logo" />
        <p className="font-graphieBold text-3xl">Projects</p>
      </div>
      <div className="flex flex-wrap gap-8 gap-y-12 mt-8">
        {projects.map((project) => {
          return <ProjectCard project={project} />;
        })}
      </div>
      <div className="flex justify-end pt-3">
        <p
          onClick={() => navigate("/project/all")}
          className="cursor-pointer underline text-[#3b82f6]"
        >
          View All
        </p>
      </div>
      <div className="mt-24 rounded-lg relative">
        <img src="/assets/svg/BannerBg.svg" alt="" />
        <div className="flex justify-between px-20 items-center absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] text-nowrap w-full">
          <div>
            <p className="font-remBold text-4xl">
              Start by submitting a Project Proposal
            </p>
            <p className="font-poppins mt-2">
              Innovators don't follow, they create the path
            </p>
          </div>
          <div>
            <NavLink to="/proposal/submit/1">
              <Button text={"Take me there!"} width={"custom"} />
            </NavLink>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Content;
