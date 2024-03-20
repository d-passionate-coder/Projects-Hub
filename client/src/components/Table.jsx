import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep } from "../redux/features/proposalSlice";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProject, deleteProposal } from "../api/handleDelete";
import ConfirmDialog from "./ConfirmDialog";

const fields = ["No.", "Title", "Project guide", "Status", "Date"];

const Table = ({ isProposal = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { projects } = useSelector((state) => state.projects);

  const handleYes = (isProposal) => {
    if (isProposal) {
      deleteProposal(deleteId);
    } else {
      deleteProject(deleteId);
    }
  };

  return (
    <div>
      <ConfirmDialog
        isProposal={isProposal}
        open={open}
        handleYes={() => {
          handleYes();
          setOpen(false);
        }}
        handleClose={() => setOpen(false)}
      />
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
            <td className="border-b border-[#DBDBDB]"></td>
          </tr>
          {projects.length > 0 &&
            projects.reduce(
              (
                filtered,
                {
                  title,
                  createdAt,
                  guide,
                  projectSubmitted,
                  id,
                  proposalStatus,
                  projectStatus,
                },
                index
              ) => {
                const status = isProposal ? proposalStatus : projectStatus;
                (isProposal || projectSubmitted) &&
                  filtered.push(
                    <tr className="text-[#74828F] font-medium">
                      <ConfirmDialog
                        isProposal={isProposal}
                        open={open}
                        handleYes={() => {
                          handleYes(isProposal, id);
                          setOpen(false);
                        }}
                        handleClose={() => setOpen(false)}
                      />
                      <td className="p-3 pl-7 py-6 border-b border-[#DBDBDB]">
                        {index + 1}
                      </td>
                      <td className="pr-12 border-b border-[#DBDBDB] leading-relaxed">
                        <p
                          onClick={
                            !isProposal
                              ? () => navigate(`/project/${id}`)
                              : null
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
                        <span
                          className={`p-1.5 px-3.5 rounded-full text-black font-normal ${
                            status === "Approved"
                              ? "bg-[#D4F8D3]"
                              : status === "Rejected"
                              ? "bg-[#FFCBCB]"
                              : "bg-[#F8F4D3]"
                          }`}
                        >
                          {status}
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
                      <td className="border-b border-[#DBDBDB]">
                        <IconButton
                          onClick={() => {
                            setDeleteId(id);
                            setOpen(true);
                          }}
                          aria-label="delete"
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </td>
                    </tr>
                  );
                return filtered;
              },
              []
            )}
        </table>
      }
    </div>
  );
};

export default Table;
