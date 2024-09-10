import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  HStack,
  Text,
  Select,
  Container,
  Badge,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: tasks.length + 1, title: newTask, priority }]);
      setNewTask("");
      setPriority("Medium");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "yellow";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };

  const bgColor = useColorModeValue("gray.50", "gray.700");
  const taskBgColor = useColorModeValue("white", "gray.600");

  return (
    <Container maxW="container.md" p={5}>
      <Box bg={bgColor} p={5} borderRadius="lg" boxShadow="md">
        <Heading mb={6}>Tasks</Heading>
        <VStack spacing={4} align="stretch" mb={6}>
          <Input
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </VStack>
        <VStack spacing={3} align="stretch">
          {tasks.map((task) => (
            <HStack
              key={task.id}
              justify="space-between"
              p={3}
              bg={taskBgColor}
              borderRadius="md"
              boxShadow="sm"
            >
              <HStack>
                <Badge
                  colorScheme={getBadgeColor(task.priority)}
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  {task.priority}
                </Badge>
                <Text>{task.title}</Text>
              </HStack>
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                size="sm"
                onClick={() => handleDeleteTask(task.id)}
                aria-label="Delete task"
              />
            </HStack>
          ))}
        </VStack>
      </Box>
    </Container>
  );
};

export default Tasks;
