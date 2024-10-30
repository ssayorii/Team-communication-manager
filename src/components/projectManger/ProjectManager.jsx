import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { AbsoluteCenter, Center, Radio, RadioGroup } from "@chakra-ui/react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Progress,
  AvatarGroup,
  Avatar,
  Checkbox,
  Button,
  Icon,
  IconButton,
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
  Stack,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const ProjectManager = () => {
  const [projects, setProjects] = useState([
    {
      id: uuidv4(),
      title: "Asana Clone",
      colorScheme: "red",
      assignees: ["John", "Doe", "Smith"],
      start: "Oct 20",
      end: "Oct 25",
      priority: "High",
      tasks: 3,
      completeTasks: 2,
    },
    {
      id: uuidv4(),
      title: "Asana Clone",
      colorScheme: "blue",
      assignees: ["John", "Doe", "Smith"],
      start: "Oct 20",
      end: "Oct 25",
      priority: "High",
      tasks: 3,
      completeTasks: 1,
    },
    {
      id: uuidv4(),
      title: "Project 1",
      colorScheme: "gray",
      assignees: ["John", "Doe", "Smith"],
      start: "Oct 20",
      end: "Oct 25",
      priority: "High",
      tasks: 5,
      completeTasks: 3,
    },
    {
      id: uuidv4(),
      title: "Project 1",
      colorScheme: "gray",
      assignees: ["John", "Doe", "Smith"],
      start: "Oct 20",
      end: "Oct 25",
      priority: "Medium",
      tasks: 5,
      completeTasks: 3,
    },
  ]);
  const [selection, setSelection] = useState([]);
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
              <FormControl isRequired>
                Title
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Project Title"
                />
                <FormControl isRequired>
                  Color
                  <Select
                    name="colorScheme"
                    value={formData.colorScheme}
                    onChange={handleInputChange}
                  >
                    <option value="red">red</option>
                    <option value="blue">blue</option>
                    <option value="red">red</option>
                    <option value="green">green</option>
                    <option value="gray">gray</option>
                  </Select>
                </FormControl>
              </FormControl>
              <FormControl isRequired>
                Priority
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
              <FormControl isRequired>
                Start Date
                <Input
                  name="start"
                  type="date"
                  value={formData.start}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                End Date
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
  const rows = projects.map((project) => (
    <Tr
      key={project.id}
      data-selected={selection.includes(project.id) ? "" : undefined}
      h="30px"
    >
      <Td p={2} fontSize="ml">
        <Checkbox marginRight={3} borderRadius="50%"></Checkbox>
        {project.title}

        <IconButton
          icon={<EditIcon />}
          variant="ghost"
          size="sm"
          onClick={() => handleEdit(project)}
          mr={2}
        />
      </Td>
      <Td p={2}>
        <Badge colorScheme={project.colorScheme} p={1} width="100%"></Badge>
      </Td>

      <Td p={2}>
        <AvatarGroup size="xs" max={2}>
          {project.assignees.map((assignee, index) => (
            <Avatar key={index} name={assignee} />
          ))}
        </AvatarGroup>
      </Td>
      <Td p={2} fontSize="sm">{`${project.start} - ${project.end}`}</Td>

      <Td p={2} fontSize="sm">
        <Button
          size="sm"
          colorScheme={
            project.priority == "High"
              ? "red"
              : project.priority == "Medium"
              ? "blue"
              : "green"
          }
          variant="outline"
        >
          {project.priority}
        </Button>
      </Td>

      <Td p={2}>
        {project.tasks}
        <Progress
          value={(project.completeTasks / project.tasks) * 100}
          size="xs"
          colorScheme="blue"
        />
      </Td>
    </Tr>
  ));

  return (
    <Box>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Project</Th>
            <Th>Color</Th>
            <Th>Assignee</Th>
            <Th>Start&End</Th>
            <Th>Priority</Th>
            <Th>Progress</Th>
          </Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
      </Table>
      <Button
        mt={2}
        size="sm"
        variant="ghost"
        colorScheme="gray"
        leftIcon={
          <Icon viewBox="0 0 20 20" boxSize={3} fill="gray.400">
            <path
              fillRule="evenodd"
              d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </Icon>
        }
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
