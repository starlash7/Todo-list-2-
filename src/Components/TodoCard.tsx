import { Button, Flex, Input, Text, useDisclosure } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FiEdit3, FiTrash2, FiX } from "react-icons/fi";
import DeleteModal from "./DeleteModal";

interface TodoCardProps {
  todo: ITodo;
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

const TodoCard: FC<TodoCardProps> = ({ todo, todos, setTodos }) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>(todo.content);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickIsDone = () => {
    const temp = todos.map((v) => {
      if (v.id === todo.id) {
        return { id: todo.id, content: todo.content, isDone: !todo.isDone };
      } else {
        return v;
      }
    });

    setTodos(temp);

    localStorage.setItem("savedTodos", JSON.stringify(temp));
  };

  const onClickUpdate = () => {
    if (!content || content === todo.content) return;

    const temp = todos.map((v) => {
      if (v.id === todo.id) {
        return { id: todo.id, content, isDone: todo.isDone };
      } else {
        return v;
      }
    });

    setTodos(temp);
    setIsUpdateOpen(false);

    localStorage.setItem("savedTodos", JSON.stringify(temp));
  };

  const onClickDelete = () => {
    const temp = todos.filter((v) => {
      if (v.id !== todo.id) {
        return v;
      }
    });

    setTodos(temp);

    localStorage.setItem("savedTodos", JSON.stringify(temp));
  };

  return (
    <>
      <Flex bgColor="white" px={4} py={2} rounded="lg" gap={1}>
        {isUpdateOpen ? (
          <Flex>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button colorScheme="green" ml={1} onClick={onClickUpdate}>
              <FiEdit3 />
            </Button>
          </Flex>
        ) : (
          <Text
            fontSize={20}
            w={48}
            isTruncated={true}
            textDecorationLine={`${todo.isDone ? "line-through" : ""}`}
            onClick={onClickIsDone}
          >
            {todo.content}
          </Text>
        )}
        <Button
          colorScheme="blue"
          onClick={() => setIsUpdateOpen(!isUpdateOpen)}
        >
          {isUpdateOpen ? <FiX /> : <FiEdit3 />}
        </Button>
        <Button colorScheme="red" onClick={onOpen}>
          <FiTrash2 />
        </Button>
      </Flex>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onClickDelete={onClickDelete}
      />
    </>
  );
};

export default TodoCard;
