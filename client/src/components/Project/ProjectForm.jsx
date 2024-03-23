import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getProjects from "../../redux/actions/getProjects";
import { useNavigate } from "react-router-dom";
import { uploadProject } from "../../api/Upload";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProjects());
  }, []);
  const { projects } = useSelector((state) => state.projects);

  const [formData, setformData] = useState({
    pdf: null,
    project: "",
    category: "",
    fileName: "",
  });

  const { project, fileName, category } = formData;

  const handleFileChange = (e) => {
    let str = e.target.files[0]?.name || "";
    str = str.substring(0, Math.min(str.length, 12));
    str = str && str + "..";

    setformData((prev) => {
      return {
        ...prev,
        pdf: e.target.files[0] || null,
        fileName: str,
      };
    });
  };

  const handleChange = (e) => {
    setformData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadProject(formData)
      .then((res) => {
        navigate(`/project/upload/approval/2/${res}`);
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <div className="bg-white rounded-lg shadow my-2 p-8 py-3 font-poppins">
      <form
        className="p-8 px-10 font-poppins w-auto text-base flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="project" className="font-medium">
          Select project
        </label>

        <div className="flex gap-3 w-full items-center border border-[#E1E3E6] border-2 rounded-lg h-8 px-3">
          <select
            required
            className="w-full focus:outline-none text-sm"
            name="project"
            id="project"
            onChange={handleChange}
            value={project}
          >
            <option value="" className="text-xs">
              Select project
            </option>
            {projects &&
              projects.length > 0 &&
              projects.map(
                (project) =>
                  project.proposalStatus === "Approved" && (
                    <option
                      key={project.id}
                      value={project.id}
                      className="text-xs"
                    >
                      {project.title}
                    </option>
                  )
              )}
          </select>
        </div>
        <label htmlFor="category" className="font-medium">
          Choose category
        </label>
        <div className="flex gap-3 w-full items-center border border-[#E1E3E6] text-xs border-2 rounded-lg h-8 px-3">
          <select
            required
            className="w-full focus:outline-none text-sm"
            name="category"
            id="category"
            onChange={handleChange}
            value={category}
          >
            <option value="" selected>
              Choose category
            </option>
            <option value="software">Software</option>
            <option value="hardware">Hardware</option>
          </select>
        </div>

        <div className="flex justify-between pt-2 items-center w-full">
          <label className="font-medium">Upload project</label>
          <div>
            <label
              htmlFor="pdf"
              className="border p-1 px-2 cursor-pointer flex gap-2"
            >
              <img src="/assets/svg/upload.svg" alt="" />
              Upload
            </label>
            <div className="text-xs text-[#FF0000] opacity-80">{fileName}</div>
            <input
              required
              type="file"
              id="pdf"
              accept=".pdf"
              name="pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <button className="bg-orange text-white w-full flex justify-center items-center rounded-lg drop-shadow cursor-pointer p-1 mt-4 text-base">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
