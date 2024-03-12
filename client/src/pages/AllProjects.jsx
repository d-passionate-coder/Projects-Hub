import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";

const AllProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("project/all")
      .then((res) => {
        if (res.data) {
          setLoading(false);
          setProjects(res.data);
        } else {
          throw new Error("No Projects found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex justify-center flex-wrap gap-8 gap-y-12 my-8">
      {projects.length > 0 &&
        projects.map((project) => <ProjectCard project={project} />)}
    </div>
  );
};

export default AllProjects;
