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
} from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { dummyUsers } from "../../users/dummyUsers";

const TaskInputForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [taskNameError, setTaskNameError] = useState(false);

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
    <VStack spacing={4} align="stretch" mb={6}>
      <Input
        placeholder="Enter a new task"
        value={newTask}
        onChange={(e) => {
          setNewTask(e.target.value);
          setTaskNameError(false);
        }}
        isInvalid={taskNameError}
        errorBorderColor="red.500"
        focusBorderColor={taskNameError ? "red.500" : "blue.500"}
      />
      <Textarea
        placeholder="Enter task description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <Input
        type="date"
        value={newDueDate}
        onChange={(e) => setNewDueDate(e.target.value)}
      />
      <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </Select>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Assign to
        </MenuButton>
        <MenuList>
          {dummyUsers.map((user) => (
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
      <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={handleAddTask}>
        Add Task
      </Button>
    </VStack>
  );
};

export default TaskInputForm;
