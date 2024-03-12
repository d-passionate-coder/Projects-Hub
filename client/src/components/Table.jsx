import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep } from "../redux/features/proposalSlice";

const fields = ["No.", "Title", "Project guide", "Status", "Date"];

const Table = ({ isProposal = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  return (
    <div>
      {
        <table className="text-left text-sm border-t border-x border-[#DBDBDB] border-separate border-spacing-0 w-full rounded-md overflow-hidden">
          <tr className="bg-[#F0F0F0]">
            <td className="p-3 pl-7 w-28 border-b border-[#DBDBDB]">
              {fields[0]}
            </td>
            <td className="w-80 border-b border-[#DBDBDB]">{fields[1]}</td>
            <td className="w-56 border-b border-[#DBDBDB]">{fields[2]}</td>
            <td className="w-56 border-b border-[#DBDBDB]">{fields[3]}</td>
            <td className="border-b border-[#DBDBDB]">{fields[4]}</td>
            <td className="border-b border-[#DBDBDB]"></td>
          </tr>
          {projects.map(
            (
              {
                title,
                createdAt,
                guide,
                projectSubmitted,
                id,
                proposalApproved,
                projectApproved,
              },
              index
            ) =>
              (isProposal || projectSubmitted) && (
                <tr className="text-[#74828F] font-medium">
                  <td className="p-3 pl-7 py-6 border-b border-[#DBDBDB]">
                    {index + 1}
                  </td>
                  <td className="pr-12 border-b border-[#DBDBDB] leading-relaxed">
                    <p
                      onClick={
                        !isProposal ? () => navigate(`/project/${id}`) : null
                      }
                      className={`${!isProposal && "cursor-pointer"}`}
                    >
                      {title}
                    </p>
                  </td>
                  <td className="border-b border-[#DBDBDB]">
                    {guide?.firstName + " " + guide?.lastName}
                  </td>
                  <td className="border-b border-[#DBDBDB]">
                    <span className="p-1.5 px-3.5 bg-[#D4F8D3] rounded-full text-black font-normal">
                      {isProposal
                        ? proposalApproved
                          ? "Accepted"
                          : "Rejected"
                        : projectApproved
                        ? "Accepted"
                        : "Rejected"}
                    </span>
                  </td>
                  <td className="border-b border-[#DBDBDB]">
                    {new Date(createdAt).toLocaleString("default", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="border-b border-[#DBDBDB]">
                    <p
                      onClick={() => {
                        if (isProposal) {
                          dispatch(setStep(1));
                          navigate(`/proposal/plagiarism-checker/2/${id}`);
                        } else {
                          dispatch(setStep(1));
                          navigate(`/project/upload/approval/2/${id}`);
                        }
                      }}
                      className="cursor-pointer underline text-[#3b82f6]"
                    >
                      View
                    </p>
                  </td>
                </tr>
              )
          )}
        </table>
      }
    </div>
  );
};

export default Table;
