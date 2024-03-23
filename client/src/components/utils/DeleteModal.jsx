import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { deleteProject, deleteProposal } from "../../api/handleDelete";

export default function DeleteModal({
  isProposal,
  isOpen,
  deleteId: id,
  onOpenChange,
}) {
  const handleDelete = () => {
    if (isProposal) deleteProposal(id);
    else deleteProject(id);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Are you sure you want to delete this ${
                  isProposal ? "proposal" : "project"
                } ?`}
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleDelete();
                    onClose();
                  }}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
