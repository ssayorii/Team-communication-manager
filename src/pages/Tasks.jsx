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
  useToast,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Collapse,
} from "@chakra-ui/react";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";

const Tasks = () => {
  const [tasks, setTasks] = useState([]); // Array to store all tasks
  const [newTask, setNewTask] = useState(""); // New task title
  const [newDescription, setNewDescription] = useState(""); // New task description
  const [newDueDate, setNewDueDate] = useState(""); // New task due date
  const [priority, setPriority] = useState("Medium"); // New task priority
  const [editTaskId, setEditTaskId] = useState(null); // ID of task being edited
  const [editTaskTitle, setEditTaskTitle] = useState(""); // Edited task title
  const [editTaskDescription, setEditTaskDescription] = useState(""); // Edited task description
  const [editTaskDueDate, setEditTaskDueDate] = useState(""); // Edited task due date
  const [editTaskPriority, setEditTaskPriority] = useState("Medium"); // Edited task priority
  const [filter, setFilter] = useState("All"); // Current filter for tasks
  const [sortBy, setSortBy] = useState("Priority"); // Current sort method for tasks
  const { isOpen, onOpen, onClose } = useDisclosure(); // For delete confirmation modal
  const [taskToDelete, setTaskToDelete] = useState(null); // ID of task to be deleted
  const [expandedTaskId, setExpandedTaskId] = useState(null); // ID of task with expanded description

  const toast = useToast();

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      // Create new task object and add it to the tasks array
      setTasks([
        ...tasks,
        {
          id: uuidv4(),
          title: newTask,
          description: newDescription,
          dueDate: newDueDate,
          priority: priority,
          completed: false,
        },
      ]);
      // Reset input fields
      setNewTask("");
      setNewDescription("");
      setNewDueDate("");
      setPriority("Medium");
      // Show success toast
      toast({
        title: "Task added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Function to initiate task deletion
  const handleDeleteTask = (id) => {
    setTaskToDelete(id);
    onOpen(); // Open confirmation modal
  };

  // Function to confirm and perform task deletion
  const confirmDeleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== taskToDelete));
    onClose(); // Close confirmation modal
    // Show info toast
    toast({
      title: "Task deleted",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  // Function to start editing a task
  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditTaskId(id);
    setEditTaskTitle(taskToEdit.title);
    setEditTaskDescription(taskToEdit.description);
    setEditTaskDueDate(taskToEdit.dueDate);
    setEditTaskPriority(taskToEdit.priority);
  };

  // Function to save edited task
  const handleSaveTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId
          ? {
              ...task,
              title: editTaskTitle,
              description: editTaskDescription,
              dueDate: editTaskDueDate,
              priority: editTaskPriority,
            }
          : task
      )
    );

    setEditTaskId(null);
    setEditTaskTitle("");
    setEditTaskDescription("");
    setEditTaskDueDate("");
    setEditTaskPriority("Medium");

    toast({
      title: "Task updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to toggle task description expansion
  const handleToggleExpand = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
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

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return task.priority === filter;
  });

  // Sort filtered tasks based on current sort method
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "Priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === "Alphabetical") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "Due Date") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const taskBgColor = useColorModeValue("white", "gray.600");

  // Calculate completion percentage for progress bar
  const completionPercentage =
    (tasks.filter((task) => task.completed).length / tasks.length) * 100 || 0;

  return (
    <Container maxW="container.md" p={5}>
      <Box bg={bgColor} p={5} borderRadius="lg" boxShadow="md">
        <Heading mb={6}>Task Manager</Heading>

        {/* Progress Bar */}
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

        {/* Task Input Form */}
        <VStack spacing={4} align="stretch" mb={6}>
          <Input
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            disabled={editTaskId !== null}
          />
          <Textarea
            placeholder="Enter task description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            disabled={editTaskId !== null}
          />
          <Input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            disabled={editTaskId !== null}
          />
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={editTaskId !== null}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={handleAddTask}
            disabled={editTaskId !== null}
          >
            Add Task
          </Button>
        </VStack>

        {/* Filter and Sort Controls */}
        <Flex mb={4}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Filter: {filter}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setFilter("All")}>All</MenuItem>
              <MenuItem onClick={() => setFilter("Completed")}>
                Completed
              </MenuItem>
              <MenuItem onClick={() => setFilter("Incomplete")}>
                Incomplete
              </MenuItem>
              <MenuItem onClick={() => setFilter("High")}>
                High Priority
              </MenuItem>
              <MenuItem onClick={() => setFilter("Medium")}>
                Medium Priority
              </MenuItem>
              <MenuItem onClick={() => setFilter("Low")}>Low Priority</MenuItem>
            </MenuList>
          </Menu>
          <Spacer />
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Sort by: {sortBy}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setSortBy("Priority")}>
                Priority
              </MenuItem>
              <MenuItem onClick={() => setSortBy("Alphabetical")}>
                Alphabetical
              </MenuItem>
              <MenuItem onClick={() => setSortBy("Due Date")}>
                Due Date
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* Task List */}
        <VStack spacing={3} align="stretch">
          {sortedTasks.map((task) => (
            <Box
              key={task.id}
              p={3}
              bg={taskBgColor}
              borderRadius="md"
              boxShadow="sm"
              opacity={task.completed ? 0.5 : 1}
            >
              <HStack justify="space-between">
                {editTaskId === task.id ? (
                  // Edit Mode
                  <VStack spacing={2} align="stretch" flex={1}>
                    <Input
                      value={editTaskTitle}
                      onChange={(e) => setEditTaskTitle(e.target.value)}
                    />
                    <Textarea
                      value={editTaskDescription}
                      onChange={(e) => setEditTaskDescription(e.target.value)}
                    />
                    <Input
                      type="date"
                      value={editTaskDueDate}
                      onChange={(e) => setEditTaskDueDate(e.target.value)}
                    />
                    <Select
                      value={editTaskPriority}
                      onChange={(e) => setEditTaskPriority(e.target.value)}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </Select>
                  </VStack>
                ) : (
                  // View Mode
                  <HStack flex={1}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                    />
                    <Badge
                      colorScheme={getBadgeColor(task.priority)}
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {task.priority}
                    </Badge>
                    <Text as={task.completed ? "s" : "span"}>{task.title}</Text>
                    <Spacer />
                    <Text fontSize="sm" color="gray.500">
                      Due: {task.dueDate}
                    </Text>
                  </HStack>
                )}
                <HStack>
                  {editTaskId === task.id ? (
                    // Save Button (Edit Mode)
                    <IconButton
                      icon={<CheckIcon />}
                      colorScheme="green"
                      onClick={handleSaveTask}
                      aria-label="Save task"
                    />
                  ) : (
                    // Action Buttons (View Mode)
                    <>
                      <IconButton
                        icon={
                          expandedTaskId === task.id ? (
                            <ChevronUpIcon />
                          ) : (
                            <ChevronRightIcon />
                          )
                        }
                        onClick={() => handleToggleExpand(task.id)}
                        aria-label="Toggle description"
                      />
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
                    </>
                  )}
                </HStack>
              </HStack>
              {/* Collapsible Description */}
              <Collapse in={expandedTaskId === task.id} animateOpacity>
                <Box mt={2}>
                  <Text fontSize="sm">{task.description}</Text>
                </Box>
              </Collapse>
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this task?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDeleteTask}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Tasks;
