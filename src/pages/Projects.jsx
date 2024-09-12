import { DeleteIcon } from "@chakra-ui/icons";
import {
  Container,
  Heading,
  Box,
  useColorModeValue,
  VStack,
  HStack,
  Badge,
  Text,
  IconButton,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AddIcon } from "@chakra-ui/icons";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [taskForProject, setTaskForProject] = useState("");

  const handleAddProject = () => {
    if (newProject.trim() !== "") {
      setProjects([
        ...projects,
        { id: uuidv4(), title: newProject, tasks: [] },
      ]);
      setNewProject("");
    }
  };

  const handleAddTaskToProject = (projectId) => {
    if (taskForProject[projectId].trim()) {
      const updatedProjects = projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: [
              ...project.tasks,
              { id: uuidv4(), title: taskForProject[projectId] },
            ],
          };
        }
        return project;
      });

      setProjects(updatedProjects);
      setTaskForProject((prevTaskForProject) => ({
        ...prevTaskForProject,
        [projectId]: "",
      }));
    }
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleDeleteTask = (projectId, taskId) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.filter((task) => task.id !== taskId);
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const bgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Container maxW="container.md" pd={5}>
      <Box bg={bgColor} p={5} borderRadius="lg" boxShadow={"md"}>
        <Heading mb={6}>Projects</Heading>
        <VStack spacing={4} align={"stretch"} mb={6}>
          <Input
            placeholder="Enter a new project"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
          />
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={handleAddProject}
          >
            Add Project
          </Button>
        </VStack>

        <VStack spacing={3} align={"stretch"}>
          {projects.map((project) => (
            <Box
              key={project.id}
              bg={bgColor}
              p={3}
              borderRadius="md"
              boxShadow={"md"}
            >
              <HStack justify={"space-between"}>
                <HStack>
                  <Badge colorScheme="blue" p={2} py={1} borderRadius="full">
                    {project.title}
                  </Badge>
                  <Text>{project.title}</Text>
                </HStack>
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteProject(project.id)}
                />
              </HStack>

              <VStack spacing={3} align={"stretch"} mt={4}>
                <Input
                  placeholder="Enter a task"
                  value={taskForProject[project.id]}
                  onChange={(e) =>
                    setTaskForProject((prev) => ({
                      ...prev,
                      [project.id]: e.target.value,
                    }))
                  }
                />
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="blue"
                  onClick={() => handleAddTaskToProject(project.id)}
                >
                  {" "}
                  Add Task to {project.title}
                </Button>
              </VStack>

              <VStack spacing={2} align={"stretch"} mt={4}>
                {project.tasks.map((task) => (
                  <HStack
                    key={task.id}
                    justify={"space-between"}
                    p={3}
                    bg={bgColor}
                    borderRadius="md"
                    boxShadow={"md"}
                  >
                    <Text>{task.title}</Text>
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteTask(project.id, task.id)}
                    />
                  </HStack>
                ))}
              </VStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Container>
  );
};

export default Projects;
