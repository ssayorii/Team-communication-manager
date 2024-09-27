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
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  CheckIcon,
  ChevronUpIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

const TaskItem = ({ task, onDeleteTask, onEditTask, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isExpanded, setIsExpanded] = useState(false);

  const taskBgColor = useColorModeValue("white", "gray.600");

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

  return (
    <Box
      p={3}
      bg={taskBgColor}
      borderRadius="md"
      boxShadow="sm"
      opacity={task.completed ? 0.5 : 1}
    >
      <HStack justify="space-between">
        {isEditing ? (
          <VStack spacing={2} align="stretch" flex={1}>
            <Input
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
            />
            <Textarea
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            />
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
          </VStack>
        ) : (
          <HStack flex={1}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
            />
            <Badge
              colorScheme={getBadgeColor(task.priority)}
              px={2}
              py={1}
              borderRadius="full"
            >
              {task.priority}
            </Badge>
            <Text as={task.completed ? "s" : "span"}>{task.title}</Text>
            <Spacer />
            <HStack wrap="wrap" spacing={2}>
              {task.assignees?.map((assignee, index) => (
                <Tag
                  key={index}
                  size="md"
                  borderRadius="full"
                  colorScheme="blue"
                >
                  <TagLabel>{assignee}</TagLabel>
                </Tag>
              ))}
            </HStack>
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
              <IconButton
                icon={isExpanded ? <ChevronUpIcon /> : <ChevronRightIcon />}
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label="Toggle description"
              />
              <IconButton
                icon={<EditIcon />}
                colorScheme="blue"
                onClick={() => setIsEditing(true)}
                aria-label="Edit task"
              />
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => onDeleteTask(task.id)}
                aria-label="Delete task"
              />
            </>
          )}
        </HStack>
      </HStack>
      <Collapse in={isExpanded} animateOpacity>
        <Box mt={2}>
          <Text fontSize="sm">{task.description}</Text>
        </Box>
      </Collapse>
    </Box>
  );
};

export default TaskItem;
