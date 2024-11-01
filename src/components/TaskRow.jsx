// TaskRow.js
import React, { useEffect, useRef, useState } from "react";
import {
  Tr,
  Td,
  Flex,
  Text,
  IconButton,
  Checkbox,
  Box,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronRightIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import AssigneeBadge from "./AssigneeBadge";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import SubtaskRow from "./SubTaskRow";

export const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

export const STATUS_OPTIONS = ["TO DO", "IN PROGRESS", "COMPLETED"];

const TaskRow = ({ task, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.name);
  const [newTaskDescription, setNewTaskDescription] = useState(
    task.description
  );
  const inputRef = useRef(null);

  const textCellStyles = {
    maxWidth: "200px",
    whiteSpace: "normal",
    wordwrap: "break-word",
  };

  const handleTaskUpdate = (updates) => {
    onUpdate({
      ...task,
      ...updates,
    });
  };

  const handleAddSubtask = () => {
    const newSubtask = {
      id: `subtask-${Date.now()}`,
      name: "",
      description: "",
      assignee: null,
      start: "",
      end: "",
      priority: "Low",
      status: "TO DO",
      completed: false,
    };

    handleTaskUpdate({
      subtasks: [...(task.subtasks || []), newSubtask],
    });
  };

  useEffect(() => {
    if (isEditingName || isEditingDescription) {
      inputRef.current?.focus();
    }
  }, [isEditingName, isEditingDescription]);

  return (
    <>
      <Tr
        _hover={{ bg: "gray.50" }}
        borderBottomWidth={"1px"}
        borderColor="gray.100"
      >
        <Td py={2} borderColor={"gray.300"}>
          <Flex align="center" gap={2}>
            <IconButton
              icon={<ChevronRightIcon />}
              variant="ghost"
              size="sm"
              p={0}
              minW="auto"
              h="auto"
              color="gray.400"
              transform={isExpanded ? "rotate(90deg)" : "none"}
              transition="transform 0.2s"
              _hover={{ bg: "transparent", color: "gray.600" }}
              onClick={() => setIsExpanded(!isExpanded)}
            />
            {isEditingName ? (
              <Input
                ref={inputRef}
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onBlur={() => {
                  handleTaskUpdate({ name: newTaskName });
                  setIsEditingName(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTaskUpdate({ name: newTaskName });
                    setIsEditingName(false);
                  }
                }}
                size="sm"
                borderColor="gray.300"
                color={"black"}
                fontWeight={"semibold"}
              />
            ) : (
              <Text
                fontSize="sm"
                fontWeight={"semibold"}
                color="gray.700"
                onClick={() => setIsEditingName(true)}
                cursor="pointer"
                {...textCellStyles}
              >
                {!task.name ? "Untitled Task" : task.name}
              </Text>
            )}
          </Flex>
        </Td>

        <Td
          py={2}
          fontSize="sm"
          color="gray.600"
          fontWeight={"medium"}
          borderColor={"gray.300"}
          w={"20%"}
        >
          {isEditingDescription ? (
            <Input
              ref={inputRef}
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              onBlur={() => {
                handleTaskUpdate({ description: newTaskDescription });
                setIsEditingDescription(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTaskUpdate({ description: newTaskDescription });
                  setIsEditingDescription(false);
                }
              }}
              size="sm"
              borderColor="gray.300"
              color={"black"}
              fontWeight={"semibold"}
            />
          ) : (
            <Text
              fontSize="sm"
              fontWeight={"semibold"}
              color="gray.700"
              onClick={() => setIsEditingDescription(true)}
              cursor="pointer"
              {...textCellStyles}
            >
              {!task.description ? "No description" : task.description}
            </Text>
          )}
        </Td>
        <Td py={2} borderColor={"gray.300"}>
          <AssigneeBadge assignee={task.assignee} />
        </Td>
        <Td
          py={2}
          fontSize="sm"
          color="gray.600"
          fontWeight={"bold"}
          borderColor={"gray.300"}
          {...textCellStyles}
        >
          {task.start}
        </Td>
        <Td
          py={2}
          fontSize="sm"
          color="gray.600"
          fontWeight={"bold"}
          borderColor={"gray.300"}
          {...textCellStyles}
        >
          {task.end}
        </Td>
        <Td py={2} borderColor={"gray.300"}>
          <Menu>
            <MenuButton as={Box}>
              <PriorityBadge priority={task.priority} />
            </MenuButton>
            <MenuList bg={"gray.100"}>
              {PRIORITY_OPTIONS.map((priority) => (
                <MenuItem
                  bg={"gray.100"}
                  _hover={{ bg: "gray.200" }}
                  key={priority}
                  onClick={() => handleTaskUpdate({ priority })}
                >
                  <PriorityBadge priority={priority} />
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Td>
        <Td py={2} borderColor={"gray.300"}>
          <Menu>
            <MenuButton as={Box}>
              <StatusBadge status={task.status} />
            </MenuButton>
            <MenuList bg={"gray.100"} height={"fit-content"}>
              {STATUS_OPTIONS.map((status) => (
                <MenuItem
                  bg={"gray.100"}
                  _hover={{ bg: "gray.200" }}
                  key={status}
                  onClick={() => handleTaskUpdate({ status })}
                >
                  <StatusBadge status={status} />
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Td>
      </Tr>
      {/* MODIFIED: Conditional rendering of subtasks based on expansion state */}
      {isExpanded && (
        <>
          {task.subtasks?.map((subtask, index) => (
            <SubtaskRow
              key={`${task.id}-${index}`}
              subtask={subtask}
              onUpdate={(updatedSubtask) => {
                const newSubtasks = [...task.subtasks];
                newSubtasks[index] = updatedSubtask;
                handleTaskUpdate({ subtasks: newSubtasks });
              }}
            />
          ))}

          <Tr>
            <Td colSpan={7} py={2} pl={12} borderColor={"gray.300"}>
              <Button
                leftIcon={<AddIcon w={3} h={3} />}
                variant="ghost"
                size="sm"
                color="gray.500"
                fontWeight="semibold"
                _hover={{ bg: "transparent", color: "gray.700" }}
                onClick={handleAddSubtask}
              >
                Add Subtask
              </Button>
            </Td>
          </Tr>
        </>
      )}
    </>
  );
};

export default TaskRow;
