import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC } from "react";
import { FiTrash2 } from "react-icons/fi";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClickDelete: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onClickDelete,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>Todo 삭제</ModalHeader>
        <ModalCloseButton />
        <ModalBody>정말로 삭제하겠습니까?</ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="red" onClick={onClickDelete}>
            <FiTrash2 />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
