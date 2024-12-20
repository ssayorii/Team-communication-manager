import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";

const ProjectEdit = ({ isOpen, onClose, handleSave, editingProject }) => {
  const [formData, setFormData] = useState({
    title: "",
    priority: "Medium",
    start: "",
    end: "",
    colorScheme: "gray",
    assignees: [],
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      setError("error");
      return;
    }

    setError("");
    handleSave(formData);
    onClose();
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
            <FormControl isInvalid={error}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Project Title"
              />
              {error && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {error}
                </Text>
              )}
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
              {error && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {error}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input
                name="start"
                type="date"
                value={formData.start}
                onChange={handleInputChange}
              />
              {error && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {error}
                </Text>
              )}
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

export default ProjectEdit;
