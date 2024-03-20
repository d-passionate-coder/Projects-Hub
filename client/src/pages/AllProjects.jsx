import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { fetchAllProjects } from "../api/fetchProjects";

const AllProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchAllProjects()
      .then((res) => {
        setProjects(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="p-8 min-h-screen px-[6.6rem] bg-background">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-8 gap-y-12 my-8">
          {projects?.length > 0 &&
            projects.map((project) => <ProjectCard project={project} />)}
        </div>
      )}
    </main>
  );
};

export default AllProjects;
