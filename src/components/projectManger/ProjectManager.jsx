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

  const ProjectModal = () => {
    const [formData, setFormData] = useState({
      title: "",
      priority: "Medium",
      start: "",
      end: "",
      colorScheme: "",
      assignees: [],
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
      handleSave(formData);
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingProject ? "Edit Project" : "Add New Project"}
          </ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Project Title"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Color</FormLabel>
                <Select
                  name="colorScheme"
                  value={formData.colorScheme}
                  onChange={handleInputChange}
                >
                  <option value="blue">blue</option>
                  <option value="red">red</option>
                  <option value="green">green</option>
                  <option value="gray">gray</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Priority</FormLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input
                  name="start"
                  type="date"
                  value={formData.start}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input
                  name="end"
                  type="date"
                  value={formData.end}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
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
      <ProjectModal />
    </Box>
  );
};

export default ProjectManager;
