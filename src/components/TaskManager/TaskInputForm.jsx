import React, { useState } from "react";
import {
  VStack,
  Input,
  Textarea,
  Select,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";

const TaskInputForm = ({ onAddTask, users }) => {
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [taskNameError, setTaskNameError] = useState(false);

  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      setTaskNameError(true);
      return;
    }

    onAddTask({
      title: newTask,
      description: newDescription,
      dueDate: newDueDate,
      priority: priority,
      assignees: selectedAssignees,
    });

    // Reset input fields
    setNewTask("");
    setNewDescription("");
    setNewDueDate("");
    setPriority("Medium");
    setSelectedAssignees([]);
    setTaskNameError(false);
  };

  const handleAssigneeChange = (assignee) => {
    setSelectedAssignees((prev) =>
      prev.includes(assignee)
        ? prev.filter((a) => a !== assignee)
        : [...prev, assignee]
    );
  };

  return (
    <VStack
      spacing={4}
      align="stretch"
      mb={6}
      bg={bgColor}
      p={4}
      borderRadius="md"
      boxShadow="sm"
      borderColor={borderColor}
      borderWidth={1}
    >
      <FormControl isInvalid={taskNameError}>
        <FormLabel>Task Title</FormLabel>
        <Input
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
            setTaskNameError(false);
          }}
          errorBorderColor="red.500"
          focusBorderColor={taskNameError ? "red.500" : "blue.500"}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Enter task description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </FormControl>
      <HStack>
        <FormControl>
          <FormLabel>Due Date</FormLabel>
          <Input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Priority</FormLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </FormControl>
      </HStack>
      <FormControl>
        <FormLabel>Assignees</FormLabel>
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="100%">
            Select Assignees
          </MenuButton>
          <MenuList>
            {users.map((user) => (
              <MenuItem
                key={user.id}
                onClick={() => handleAssigneeChange(user.name)}
              >
                <Checkbox
                  isChecked={selectedAssignees.includes(user.name)}
                  onChange={() => handleAssigneeChange(user.name)}
                >
                  {user.name}
                </Checkbox>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </FormControl>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="blue"
        onClick={handleAddTask}
        width="100%"
      >
        Add Task
      </Button>
    </VStack>
  );
};

export default TaskInputForm;
