// SubtaskRow.js
import React, { useState, useRef, useEffect } from "react";
import {
  Tr,
  Td,
  Flex,
  Text,
  Checkbox,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import AssigneeBadge from "./AssigneeBadge";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import { PRIORITY_OPTIONS } from "./TaskRow";
import { STATUS_OPTIONS } from "./TaskRow";

const textCellStyles = {
  maxWidth: "200px",
  whiteSpace: "normal",
  wordwrap: "break-word",
  color: "gray.700",
};

const SubtaskRow = ({ subtask, onUpdate }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newName, setNewName] = useState(subtask.name);
  const [newDescription, setNewDescription] = useState(subtask.description);
  const inputRef = useRef(null);

  const handleSubtaskUpdate = (updates) => {
    onUpdate({
      ...subtask,
      ...updates,
    });
  };

  useEffect(() => {
    if (isEditingName || isEditingDescription) {
      inputRef.current?.focus();
    }
  }, [isEditingName, isEditingDescription]);

  return (
    <Tr bg="gray.50" _hover={{ bg: "gray.100" }}>
      <Td py={2} pl={12} borderColor={"gray.300"}>
        <Flex align="center" gap={2}>
          <Checkbox
            borderColor="gray.300"
            isChecked={subtask.completed}
            colorScheme="green"
            size="sm"
            onChange={(e) =>
              handleSubtaskUpdate({ completed: e.target.checked })
            }
          />
          {isEditingName ? (
            <Input
              ref={inputRef}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={() => {
                handleSubtaskUpdate({ name: newName });
                setIsEditingName(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubtaskUpdate({ name: newName });
                  setIsEditingName(false);
                }
              }}
              size="sm"
              borderColor="gray.300"
              {...textCellStyles}
            />
          ) : (
            <Text
              fontSize="sm"
              color="gray.700"
              textDecoration={subtask.completed ? "line-through" : "none"}
              onClick={() => setIsEditingName(true)}
              cursor="pointer"
              {...textCellStyles}
            >
              {subtask.name || "Untitled Subtask"}
            </Text>
          )}
        </Flex>
      </Td>
      <Td py={2} borderColor={"gray.300"}>
        {isEditingDescription ? (
          <Input
            ref={inputRef}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onBlur={() => {
              handleSubtaskUpdate({ description: newDescription });
              setIsEditingDescription(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubtaskUpdate({ description: newDescription });
                setIsEditingDescription(false);
              }
            }}
            size="sm"
            borderColor="gray.300"
            {...textCellStyles}
          />
        ) : (
          <Text
            fontSize="sm"
            color="gray.600"
            onClick={() => setIsEditingDescription(true)}
            cursor="pointer"
            {...textCellStyles}
          >
            {subtask.description || "No description"}
          </Text>
        )}
      </Td>
      <Td py={2} borderColor={"gray.300"}>
        <AssigneeBadge assignee={subtask.assignee} />
      </Td>
      <Td py={2} fontSize="sm" color="gray.600" borderColor={"gray.300"}>
        <Text {...textCellStyles}>{subtask.start}</Text>
      </Td>
      <Td py={2} fontSize="sm" color="gray.600" borderColor={"gray.300"}>
        <Text {...textCellStyles}>{subtask.end}</Text>
      </Td>
      <Td py={2} borderColor={"gray.300"}>
        <Menu>
          <MenuButton as={Box}>
            <PriorityBadge priority={subtask.priority} />
          </MenuButton>
          <MenuList>
            {PRIORITY_OPTIONS.map((priority) => (
              <MenuItem
                key={priority}
                onClick={() => handleSubtaskUpdate({ priority })}
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
            <StatusBadge status={subtask.status} />
          </MenuButton>
          <MenuList>
            {STATUS_OPTIONS.map((status) => (
              <MenuItem
                key={status}
                onClick={() => handleSubtaskUpdate({ status })}
              >
                <StatusBadge status={status} />
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};

export default SubtaskRow;
