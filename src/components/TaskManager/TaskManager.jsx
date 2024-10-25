import React, { useState } from "react";
import {
  Box,
  Heading,
  Container,
  useColorModeValue,
  Progress,
  Text,
  VStack,
  useToast,
  Button,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import TaskInputForm from "./TaskInputForm";
import TaskList from "./TaskList";
import { v4 as uuidv4 } from "uuid";
import { dummyUsers } from "../../users/dummyUsers";
import CalendarView from "../CalendarView";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Priority");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const toast = useToast();

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");

  const handleAddTask = (newTaskData) => {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        ...newTaskData,
        completed: false,
      },
    ]);
    toast({
      title: "Task added",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id));
    toast({
      title: "Task deleted",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEditTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
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

  const handleSelectTask = (id) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    setTasks(tasks.filter((task) => !selectedTasks.includes(task.id)));
    setSelectedTasks([]);
    toast({
      title: `${selectedTasks.length} tasks deleted`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleBulkComplete = () => {
    setTasks(
      tasks.map((task) =>
        selectedTasks.includes(task.id) ? { ...task, completed: true } : task
      )
    );
    setSelectedTasks([]);
    toast({
      title: `${selectedTasks.length} tasks marked as complete`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const completionPercentage =
    (tasks.filter((task) => task.completed).length / tasks.length) * 100 || 0;

  return (
    <Container maxW="container.lg" p={5}>
      <Box
        bg={bgColor}
        p={5}
        borderRadius="lg"
        boxShadow="md"
        color={textColor}
      >
        <Heading mb={6}>Task Manager</Heading>

        <Box mb={6}>
          <Text mb={2} fontWeight="bold">
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

        <TaskInputForm onAddTask={handleAddTask} users={dummyUsers} />
        <Tabs isFitted variant="enclosed" mt={6}>
          <TabList mb="1em">
            <Tab>List View</Tab>
            <Tab>Calendar View</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {selectedTasks.length > 0 && (
                <HStack mb={4} spacing={4}>
                  <Button onClick={handleBulkDelete} colorScheme="red">
                    Delete Selected ({selectedTasks.length})
                  </Button>
                  <Button onClick={handleBulkComplete} colorScheme="green">
                    Mark Selected as Complete ({selectedTasks.length})
                  </Button>
                </HStack>
              )}
              <TaskList
                tasks={tasks}
                filter={filter}
                setFilter={setFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
                onToggleComplete={handleToggleComplete}
                onSelectTask={handleSelectTask}
                selectedTasks={selectedTasks}
                users={dummyUsers}
              />
            </TabPanel>
            <TabPanel>
              <CalendarView tasks={tasks} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default TaskManager;
