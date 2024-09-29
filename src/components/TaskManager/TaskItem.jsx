import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Badge,
  IconButton,
  Input,
  Textarea,
  Select,
  Spacer,
  useColorModeValue,
  Collapse,
  Tag,
  TagLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  CheckIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";

const TaskItem = ({
  task,
  onDeleteTask,
  onEditTask,
  onToggleComplete,
  users,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isExpanded, setIsExpanded] = useState(false);

  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");

  const handleSaveEdit = () => {
    onEditTask(task.id, editedTask);
    setIsEditing(false);
  };

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

  const handleAssigneeChange = (assignee) => {
    setEditedTask((prevTask) => {
      const updatedAssignees = prevTask.assignees.includes(assignee)
        ? prevTask.assignees.filter((a) => a !== assignee)
        : [...prevTask.assignees, assignee];
      return { ...prevTask, assignees: updatedAssignees };
    });
  };

  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius="md"
      boxShadow="sm"
      opacity={task.completed ? 0.5 : 1}
      transition="all 0.2s"
      _hover={{ boxShadow: "md" }}
      borderColor={borderColor}
      borderWidth={1}
      color={textColor}
    >
      <HStack justify="space-between" mb={2}>
        {isEditing ? (
          <VStack spacing={3} align="stretch" flex={1}>
            <Input
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              fontWeight="bold"
            />
            <Textarea
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            />
            <HStack>
              <Input
                type="date"
                value={editedTask.dueDate}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, dueDate: e.target.value })
                }
              />
              <Select
                value={editedTask.priority}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, priority: e.target.value })
                }
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Select>
            </HStack>
            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                width="100%"
              >
                Edit Assignees
              </MenuButton>
              <MenuList>
                {users.map((user) => (
                  <MenuItem
                    key={user.id}
                    onClick={() => handleAssigneeChange(user.name)}
                  >
                    <Checkbox
                      isChecked={editedTask.assignees.includes(user.name)}
                      onChange={() => handleAssigneeChange(user.name)}
                    >
                      {user.name}
                    </Checkbox>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <HStack wrap="wrap" spacing={2}>
              {editedTask.assignees.map((assignee, index) => (
                <Tag
                  key={index}
                  size="md"
                  borderRadius="full"
                  colorScheme="blue"
                  variant="solid"
                >
                  <TagLabel>{assignee}</TagLabel>
                </Tag>
              ))}
            </HStack>
          </VStack>
        ) : (
          <HStack flex={1}>
            <Checkbox
              isChecked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              size="lg"
              colorScheme="green"
            />
            <Badge
              colorScheme={getBadgeColor(task.priority)}
              px={2}
              py={1}
              borderRadius="full"
            >
              {task.priority}
            </Badge>
            <Text fontWeight="bold" as={task.completed ? "s" : "span"}>
              {task.title}
            </Text>
            <Spacer />
            {task.dueDate && (
              <Text fontSize="sm" color="gray.500">
                Due: {task.dueDate}
              </Text>
            )}
          </HStack>
        )}
        <HStack>
          {isEditing ? (
            <IconButton
              icon={<CheckIcon />}
              colorScheme="green"
              onClick={handleSaveEdit}
              aria-label="Save task"
            />
          ) : (
            <>
              {task.description && (
                <IconButton
                  icon={isExpanded ? <ChevronUpIcon /> : <ChevronRightIcon />}
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label="Toggle description"
                  variant="ghost"
                />
              )}
              <IconButton
                icon={<EditIcon />}
                colorScheme="blue"
                onClick={() => setIsEditing(true)}
                aria-label="Edit task"
                variant="ghost"
              />
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => onDeleteTask(task.id)}
                aria-label="Delete task"
                variant="ghost"
              />
            </>
          )}
        </HStack>
      </HStack>
      {!isEditing && (
        <HStack wrap="wrap" spacing={2} mt={2}>
          {task.assignees?.map((assignee, index) => (
            <Tag
              key={index}
              size="md"
              borderRadius="full"
              colorScheme="blue"
              variant="solid"
            >
              <TagLabel>{assignee}</TagLabel>
            </Tag>
          ))}
        </HStack>
      )}
      <Collapse in={isExpanded} animateOpacity>
        <Box mt={2}>
          <Text fontSize="sm">{task.description}</Text>
        </Box>
      </Collapse>
    </Box>
  );
};

export default TaskItem;
