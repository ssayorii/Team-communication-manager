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
} from "@chakra-ui/react";
import { ChevronRightIcon, EditIcon } from "@chakra-ui/icons";
import AssigneeBadge from "./AssigneeBadge";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import SubtaskRow from "./SubTaskRow";

const TaskRow = ({ task }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.name);
  const [newTaskDescription, setNewTaskDescription] = useState(
    task.description
  );
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditingName || isEditingDescription) {
      inputRef.current.focus();
    }
  }, [isEditingName || isEditingDescription]);
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
              _hover={{ bg: "transparent", color: "gray.600" }}
            />
            {isEditingName ? (
              <Input
                ref={inputRef}
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onSubmit={() => setIsEditingName(false)}
                onBlur={() => {
                  task.name = newTaskName;
                  setIsEditingName(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    task.name = newTaskName; // Save the value
                    setIsEditingName(false); // Exit editing mode
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
        >
          {" "}
          {isEditingDescription ? (
            <Input
              ref={inputRef}
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              onSubmit={() => setIsEditingDescription(false)}
              onBlur={() => {
                task.name = newTaskDescription;
                setIsEditingDescription(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  task.description = newTaskDescription; // Save the value
                  setIsEditingDescription(false); // Exit editing mode
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
            >
              {!task.description ? "Untitled Task" : task.description}
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
        >
          {task.start}
        </Td>
        <Td
          py={2}
          fontSize="sm"
          color="gray.600"
          fontWeight={"bold"}
          borderColor={"gray.300"}
        >
          {task.end}
        </Td>
        <Td py={2} borderColor={"gray.300"}>
          <PriorityBadge priority={task.priority} />
        </Td>
        <Td py={2} borderColor={"gray.300"}>
          <StatusBadge status={task.status} />
        </Td>
      </Tr>
      {task.subtasks?.map((subtask, index) => (
        <SubtaskRow key={`${task.id}-${index}`} subtask={subtask} />
      ))}
    </>
  );
};

export default TaskRow;
