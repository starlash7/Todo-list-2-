import { Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import CreateTodo from "./Components/CreateTodo";
import TodoList from "./Components/TodoList";

const sampleData: ITodo[] = [
  {
    id: 1,
    content: "🏃‍♀️ 달리기",
    isDone: true,
  },
  {
    id: 2,
    content: "🎈 풍선구매",
    isDone: true,
  },
  {
    id: 3,
    content: "🧹 청소하기",
    isDone: false,
  },
];

const App: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("savedTodos");

    if (!savedTodos) {
      localStorage.setItem("savedTodos", JSON.stringify(sampleData));
      setTodos(sampleData);
    } else {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => console.log(todos), [todos]);

  return (
    <Flex flexDir="column" minH="100vh">
      <CreateTodo todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </Flex>
  );
};

export default App;
