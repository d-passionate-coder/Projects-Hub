import React, { useState } from "react";
import { EyeIcon } from "../utils/EyeIcon";
import { DeleteIcon } from "../utils/DeleteIcon";
import { Tooltip, useDisclosure, useSlider } from "@nextui-org/react";
import CustomModal from "../utils/CustomModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../redux/features/proposalSlice";
import DeleteModal from "../utils/DeleteModal";

const CustomTable = ({
  projects,
  fields,
  isProposal = true,
  isDashboard = false,
  rowClickable = true,
}) => {
  const [projectToOpen, setProjectToOpen] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeDeleteModal,
  } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderHeading = (field) => {
    const heading = field.name;
    const headingKey = field.uid;
    switch (headingKey) {
      case "serialNumber":
        return (
          <td className="p-3 pl-7 w-28 border-b border-[#DBDBDB]">{heading}</td>
        );
      case "title":
        return <td className="w-80 border-b border-[#DBDBDB]">{heading}</td>;
      default:
        return <td className="w-56 border-b border-[#DBDBDB]">{heading}</td>;
    }
  };

  const renderCell = (project, columnKey, index) => {
    const { id } = project;
    const cellValue = columnKey === "serialNumber" ? index : project[columnKey];
    if (columnKey === "proposalStatus" || columnKey === "projectStatus")
      columnKey = "status";

    if (columnKey)
      switch (columnKey) {
        case "serialNumber":
          return (
            <td className="p-3 pl-7 py-6 border-b border-[#DBDBDB]">
              {cellValue}
            </td>
          );
        case "title":
          return (
            <td className="pr-12 border-b border-[#DBDBDB] leading-relaxed">
              <p className={`${!isProposal && "cursor-pointer"}`}>
                {cellValue}
              </p>
            </td>
          );
        case "guide":
          return (
            <td className="border-b border-[#DBDBDB]">
              {cellValue.firstName + " " + cellValue.lastName}
            </td>
          );
        case "status":
          return (
            <td className="border-b border-[#DBDBDB]">
              <span
                className={`p-1.5 px-3.5 rounded-full text-black font-normal ${
                  cellValue === "Approved"
                    ? "bg-[#D4F8D3]"
                    : cellValue === "Rejected"
                    ? "bg-[#FFCBCB]"
                    : "bg-[#F8F4D3]"
                }`}
              >
                {cellValue}
              </span>
            </td>
          );
        case "createdAt":
          return (
            <td className="border-b border-[#DBDBDB]">
              {new Date(cellValue).toLocaleString("default", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </td>
          );
        case "actions":
          return (
            <td className="border-b border-[#DBDBDB]">
              <div className="relative flex items-center gap-5">
                <Tooltip disableAnimation={true} content="Details">
                  <span
                    onClick={() => {
                      if (isProposal) {
                        dispatch(setStep(1));
                        navigate(`/proposal/upload/plagiarism-checker/2/${id}`);
                      } else {
                        dispatch(setStep(1));
                        navigate(`/project/upload/approval/2/${id}`);
                      }
                    }}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  >
                    <EyeIcon />
                  </span>
                </Tooltip>
                <Tooltip
                  disableAnimation={true}
                  color="danger"
                  content="Delete"
                >
                  <span
                    onClick={() => {
                      setDeleteId(id);
                      onOpenDeleteModal();
                    }}
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            </td>
          );
        case "similarity":
          return (
            <td
              className={`border-b border-[#DBDBDB] ${
                cellValue > 75 && "text-[#dc2626]"
              }`}
            >
              {cellValue.toPrecision(3) + "%"}
            </td>
          );

        default:
          return <td className="border-b border-[#DBDBDB]">{cellValue}</td>;
      }
  };

  return (
    <>
      {isDashboard && (
        <CustomModal
          isOpen={isOpen}
          project={projectToOpen}
          onOpenChange={onOpenChange}
          isProposal={isProposal}
        />
      )}
      {!isDashboard && (
        <DeleteModal
          isOpen={isOpenDeleteModal}
          onOpenChange={onOpenChangeDeleteModal}
          isProposal={isProposal}
          deleteId={deleteId}
        />
      )}
      <table className="text-left text-sm border-t border-x border-[#DBDBDB] border-separate border-spacing-0 w-full rounded-md overflow-hidden">
        <thead>
          <tr className="bg-[#F0F0F0]">
            {fields.map((field) => renderHeading(field))}
          </tr>
        </thead>
        {!projects || projects.length <= 0 ? (
          <tr className="text-center">
            <td
              colSpan={fields.length}
              className="p-3 border-b border-[#DBDBDB]"
            >
              No rows to display
            </td>
          </tr>
        ) : (
          projects.reduce((filtered, project) => {
            (isProposal || project.projectSubmitted) &&
              filtered.push(
                <tr
                  onClick={
                    !rowClickable
                      ? null
                      : isDashboard
                      ? () => {
                          setProjectToOpen(project);
                          onOpen();
                        }
                      : () => {
                          if (isProposal) {
                            dispatch(setStep(1));
                            navigate(
                              `/proposal/upload/plagiarism-checker/2/${project.id}`
                            );
                          } else {
                            dispatch(setStep(1));
                            navigate(
                              `/project/upload/approval/2/${project.id}`
                            );
                          }
                        }
                  }
                  className={`text-[#74828F] font-medium ${
                    rowClickable && "hover:bg-[#FBFBFB] cursor-pointer"
                  }`}
                >
                  {fields.map((field) => {
                    const renderedCell = renderCell(
                      project,
                      field.uid,
                      filtered.length + 1
                    );
                    return renderedCell;
                  })}
                </tr>
              );
            return filtered;
          }, [])
        )}
      </table>
    </>
  );
};

export default CustomTable;
