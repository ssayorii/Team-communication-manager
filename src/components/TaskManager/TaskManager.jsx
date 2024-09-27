import React, { useState } from "react";
import {
  Box,
  Heading,
  Container,
  useColorModeValue,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import TaskInputForm from "./TaskInputForm";
import TaskList from "./TaskList";
import { v4 as uuidv4 } from "uuid";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Priority");

  const bgColor = useColorModeValue("gray.50", "gray.700");

  const handleAddTask = (newTaskData) => {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        ...newTaskData,
        completed: false,
      },
    ]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completionPercentage =
    (tasks.filter((task) => task.completed).length / tasks.length) * 100 || 0;

  return (
    <Container maxW="container.md" p={5}>
      <Box bg={bgColor} p={5} borderRadius="lg" boxShadow="md">
        <Heading mb={6}>Task Manager</Heading>

        <Box mb={6}>
          <Text mb={2}>
            Task Completion: {completionPercentage.toFixed(0)}%
          </Text>
          <Progress
            value={completionPercentage}
            colorScheme="green"
            height="24px"
            borderRadius="full"
            hasStripe
            isAnimated
          />
        </Box>

        <TaskInputForm onAddTask={handleAddTask} />

        <TaskList
          tasks={tasks}
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onToggleComplete={handleToggleComplete}
        />
      </Box>
    </Container>
  );
};

export default TaskManager;
