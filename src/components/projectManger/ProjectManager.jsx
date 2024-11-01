import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Table,
  Button,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ProjectHead from "./ProjectHead";
import ProjectBody from "./ProjectBody";
import ProjectEdit from "./ProjectEdit";

const ProjectManager = () => {
  const [selection, setSelection] = useState([]);
  const [projects, setProjects] = useState([
    {
      id: uuidv4(),
      title: "Asana Clone",
      colorScheme: "red",
      assignees: ["John", "Doe", "Smith"],
      start: "2024-10-20",
      end: "2024-10-25",
      priority: "High",
      tasks: 3,
      completeTasks: 2,
    },
    {
      id: uuidv4(),
      title: "Project 1",
      colorScheme: "blue",
      assignees: ["Alice", "Bob"],
      start: "2024-10-21",
      end: "2024-10-30",
      priority: "Medium",
      tasks: 5,
      completeTasks: 3,
    },
  ]);
  const [editingProject, setEditingProject] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleEdit = (project) => {
    setEditingProject(project);
    onOpen();
  };

  const handleSave = (formData) => {
    if (editingProject) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id
            ? { ...project, ...formData }
            : project
        )
      );
      toast({
        title: "Project updated.",
        description: "The project has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setProjects((prev) => [...prev, { ...formData, id: uuidv4() }]);
    }
    onClose();
  };

  return (
    <Box
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow={"sm"}
      overflow="hidden"
      marginBottom={"3.5rem"}
    >
      <Table variant="simple">
        <ProjectHead />
        <ProjectBody
          projects={projects}
          setProjects={setProjects}
          selection={selection}
          setSelection={setSelection}
          handleEdit={handleEdit}
        />
      </Table>
      <Button
        mt={2}
        variant="ghost"
        size="sm"
        color="gray.500"
        fontWeight="semibold"
        leftIcon={<AddIcon w={3} h={3} />}
        w="full"
        justifyContent="start"
        onClick={() => {
          setEditingProject(null);
          onOpen();
        }}
      >
        Add Project
      </Button>
      <ProjectEdit
        isOpen={isOpen}
        onClose={onClose}
        handleSave={handleSave}
        editingProject={editingProject}
      />
    </Box>
  );
};

export default ProjectManager;
