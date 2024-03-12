import React from "react";
import { useNavigate } from "react-router-dom";

function getCollegeShortForm(collegeName) {
  const words = collegeName.split(/\s+/);

  // Extract the first letter of each word
  const initials = words.map((word) =>
    word == "of" ? "" : word[0].toUpperCase()
  );

  // Combine the initials into a short form
  return initials.join("");
}

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const { title, statement, category, id, createdBy } = project;

  let str = statement.substring(0, Math.min(statement.length, 150));
  str += "...";

  return (
    <div className="rounded-lg relative overflow-hidden w-[23rem] border border-black border-opacity-20">
      <img src="/assets/images/ProjectThumbnail.jpg" alt="" />
      <div className="pb-16 font-poppins border-t-black border-t border-opacity-10 p-2">
        <div className="flex justify-start text-sm font-medium items-center gap-3 p-2">
          <div className="text-center p-1 px-2 text-white bg-black">
            {category.toUpperCase()}
          </div>
          <p>{getCollegeShortForm(createdBy.institute)}</p>
        </div>
        <p className="font-poppins font-bold text-2xl p-2">{title}</p>
        <p className="p-2 text-foreground2">{str}</p>
        <div
          onClick={() => navigate(`/project/${id}`)}
          className="flex p-2 absolute left-1 bottom-1"
        >
          <div className="border-2 flex gap-2 justify-center rounded-sm p-2 hover:bg-black hover:text-white cursor-pointer">
            <p>Read more</p>
            <img src="assets/svg/arrow.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
