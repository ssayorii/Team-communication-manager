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
import { ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
import TaskRow from "../TaskRow";
import { sections } from "../Tasks";
import SubtaskRow from "../SubTaskRow";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const ProjectManager = () => {
  const TableHead = [
    "Project",
    "Color",
    "Assignee",
    "Start",
    "End",
    "Priority",
    "Progress",
  ];
  const [projects, setProjects] = useState([
    {
      id: uuidv4(),
      title: "Asana Clone",
      colorScheme: "red",
      assignees: ["John", "Doe", "Smith"],
      start: "2024-10-20 ",
      end: "2024-10-25",
      priority: "High",
      tasks: 3,
      completeTasks: 2,
    },
    {
      id: uuidv4(),
      title: "Asana Clone",
      colorScheme: "blue",
      assignees: ["John", "Doe", "Smith"],
      start: "2024-10-20 ",
      end: "2024-10-25",
      priority: "High",
      tasks: 3,
      completeTasks: 1,
    },
    {
      id: uuidv4(),
      title: "Project 1",
      colorScheme: "gray",
      assignees: ["John", "Doe", "Smith"],
      start: "2024-10-20 ",
      end: "2024-10-25",
      priority: "High",
      tasks: 5,
      completeTasks: 3,
    },
    {
      id: uuidv4(),
      title: "Project 1",
      colorScheme: "gray",
      assignees: ["John", "Doe", "Smith"],
      start: "2024-10-20 ",
      end: "2024-10-25",
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
              <FormControl fontWeight="semibold" isRequired>
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
      <Td p={2} fontSize="ml" fontWeight="semibold">
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
        <Badge bg={`${project.colorScheme}.500`} p={1} width="100%"></Badge>
      </Td>

      <Td p={2}>
        <AvatarGroup size="xs" max={2}>
          {project.assignees.map((assignee, index) => (
            <Avatar key={index} name={assignee} />
          ))}
        </AvatarGroup>
      </Td>
      <Td p={2} fontSize="sm" fontWeight="semibold">{`${project.start} `}</Td>
      <Td p={2} fontSize="sm" fontWeight="semibold">{`${project.end}`}</Td>

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
        <Thead bg="gray.50">
          <Tr>
            {TableHead.map((head) => (
              <Th
                borderBottomWidth="1px"
                borderColor="gray.200"
                color="gray.600"
                fontSize="xs"
                textTransform="none"
                key={head}
              >
                {head}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
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
