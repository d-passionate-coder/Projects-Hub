import React, { useEffect, useState } from "react";
import ProjectCard from "../components/Project/ProjectCard";
import { fetchAllProjects } from "../api/fetchProjects";
import { useLocation, useSearchParams } from "react-router-dom";

const AllProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  let title = searchParams.get("title");
  let category = searchParams.get("category");

  useEffect(() => {
    let url = "project/all";
    if (title) {
      url += `?title=${title}`;
    }
    if (category) {
      url += `?category=${category}`;
    }

    fetchAllProjects(url)
      .then((res) => {
        setProjects(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [title, category]);

  return (
    <main className="p-8 min-h-screen px-[6.6rem] bg-background">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-8 gap-y-12 my-8">
          {projects?.length > 0 ? (
            projects.map((project) => <ProjectCard project={project} />)
          ) : (
            <p>No projects</p>
          )}
        </div>
      )}
    </main>
  );
};

export default AllProjects;
