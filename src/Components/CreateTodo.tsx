import { Button, Flex, Input } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface CreateTodoProps {
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

const CreateTodo: FC<CreateTodoProps> = ({ todos, setTodos }) => {
  const [currentTodoId, setCurrentTodoId] = useState<number>();
  const [content, setContent] = useState<string>("");

  const onClickCreateTodo = () => {
    if (!content || !currentTodoId) return;

    const temp = [...todos, { id: currentTodoId + 1, content, isDone: false }];

    setTodos(temp);
    setCurrentTodoId(currentTodoId + 1);
    setContent("");

    localStorage.setItem("savedTodos", JSON.stringify(temp));
  };

  useEffect(() => {
    if (todos.length === 0) return;

    setCurrentTodoId(todos[todos.length - 1]?.id);
  }, [todos]);

  return (
    <Flex
      px={8}
      bgColor="teal.200"
      h={32}
      justifyContent="center"
      alignItems="center"
    >
      <Input
        maxW={250}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button ml={2} colorScheme="teal" onClick={onClickCreateTodo}>
        만들기
      </Button>
    </Flex>
  );
};

export default CreateTodo;
