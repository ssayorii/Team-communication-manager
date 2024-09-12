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
import { AddIcon, DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";

const Tasks = () => {
  // Task state management
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");

  // Edit state management
  const [editTaskId, setEditTaskId] = useState(null); // Task ID being edited
  const [editTaskTitle, setEditTaskTitle] = useState(""); // Edited task title
  const [editTaskPriority, setEditTaskPriority] = useState("Medium"); // Edited task priority

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: uuidv4(), title: newTask, priority }]);
      setNewTask("");
      setPriority("Medium");
    }
  };

  // Function to handle deleting a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to start editing a task
  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditTaskId(id);
    setEditTaskTitle(taskToEdit.title);
    setEditTaskPriority(taskToEdit.priority);
  };

  // Function to save the edited task
  const handleSaveTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId
          ? { ...task, title: editTaskTitle, priority: editTaskPriority }
          : task
      )
    );
    setEditTaskId(null);
    setEditTaskTitle("");
    setEditTaskPriority("Medium");
  };

  // Function to get badge color based on priority
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

  const sortTasksByPriority = (tasks) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 }; // High is top priority
    return tasks.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  // Color mode handling for light/dark mode
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const taskBgColor = useColorModeValue("white", "gray.600");

  return (
    <Container maxW="container.md" p={5}>
      <Box bg={bgColor} p={5} borderRadius="lg" boxShadow="md">
        <Heading mb={6}>Tasks</Heading>

        {/* Form for adding a new task */}
        <VStack spacing={4} align="stretch" mb={6}>
          <Input
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            disabled={editTaskId !== null} // Disable while editing a task
          />
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={editTaskId !== null} // Disable while editing a task
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={handleAddTask}
            disabled={editTaskId !== null} // Disable Add button while editing
          >
            Add Task
          </Button>
        </VStack>

        {/* List of tasks */}
        <VStack spacing={3} align="stretch">
          {sortTasksByPriority(tasks).map((task) => (
            <HStack
              key={task.id}
              justify="space-between"
              p={3}
              bg={taskBgColor}
              borderRadius="md"
              boxShadow="sm"
            >
              {editTaskId === task.id ? (
                <>
                  {/* Task is in edit mode */}
                  <VStack spacing={2} align="stretch">
                    {/* Input field for editing task title */}
                    <Input
                      value={editTaskTitle}
                      onChange={(e) => setEditTaskTitle(e.target.value)}
                    />
                    {/* Select box for editing task priority */}
                    <Select
                      value={editTaskPriority}
                      onChange={(e) => setEditTaskPriority(e.target.value)}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </Select>
                  </VStack>
                  {/* Save button for saving the edited task */}
                  <IconButton
                    icon={<CheckIcon />}
                    colorScheme="green"
                    onClick={handleSaveTask}
                    aria-label="Save task"
                  />
                </>
              ) : (
                <>
                  {/* Task is not in edit mode, display title and priority */}
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
                  {/* Edit and Delete buttons */}
                  <HStack>
                    <IconButton
                      icon={<EditIcon />}
                      colorScheme="blue"
                      onClick={() => handleEditTask(task.id)}
                      aria-label="Edit task"
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDeleteTask(task.id)}
                      aria-label="Delete task"
                    />
                  </HStack>
                </>
              )}
            </HStack>
          ))}
        </VStack>
      </Box>
    </Container>
  );
};

export default Tasks;
