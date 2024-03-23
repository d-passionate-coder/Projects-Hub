import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import CustomTable from "../Table/CustomTable";

import {
  changeProjectStatus,
  changeProposalStatus,
} from "../../api/changeStatus";
import { setControls } from "../../redux/features/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon } from "./EyeIcon";
import { useNavigate } from "react-router-dom";

const plagiarismReportFields = [
  {
    name: "No.",
    uid: "serialNumber",
  },
  {
    name: "Title",
    uid: "title",
  },
  {
    name: "Plagiarism Score",
    uid: "similarity",
  },
];

export default function CustomModal({
  isOpen,
  onOpenChange,
  project,
  isProposal,
}) {
  const scrollBehavior = "inside";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    problemStatement,
    title,
    plagiarism,
    id,
    proposalStatus,
    projectStatus,
  } = project;

  useEffect(() => {
    if (isProposal) {
      dispatch(setControls(proposalStatus === "Pending"));
    } else dispatch(setControls(projectStatus === "Pending"));
  }, [projectStatus, proposalStatus]);

  const handleReject = () => {
    if (isProposal) {
      changeProposalStatus(id, "Rejected").catch((err) => console.log(err));
    } else {
      changeProjectStatus(id, "Rejected").catch((err) => console.log(err));
    }
  };

  const handleApprove = () => {
    if (isProposal) {
      changeProposalStatus(id, "Approved").catch((err) => console.log(err));
    } else {
      changeProjectStatus(id, "Approved").catch((err) => console.log(err));
    }
  };

  const { controls } = useSelector((state) => state.dashboard);

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior={scrollBehavior}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p className="font-semibold">Problem Statement</p>
              <p className="text-sm">{problemStatement}</p>

              <p className="pt-5 font-semibold">Plagiarism Report</p>
              <CustomTable
                fields={plagiarismReportFields}
                projects={plagiarism.report}
                rowClickable={false}
              />
              <div className="py-7">
                <Button
                  onPress={() => {
                    if (isProposal) navigate(`/proposal/${id}`);
                    else navigate(`/project/${id}`);
                  }}
                  size="md"
                  color="secondary"
                  startContent={<EyeIcon />}
                >{`View ${isProposal ? "Proposal" : "Project"}`}</Button>
              </div>
            </ModalBody>
            {controls && (
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    handleReject();
                    onClose();
                  }}
                >
                  Reject
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleApprove();
                    onClose();
                  }}
                >
                  Approve
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
