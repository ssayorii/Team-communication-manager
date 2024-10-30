// TaskRow.js
import React from "react";
import {
  Tr,
  Td,
  Flex,
  Text,
  IconButton,
  Checkbox,
  Box,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import AssigneeBadge from "./AssigneeBadge";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import SubtaskRow from "./SubTaskRow";

const TaskRow = ({ task }) => (
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
          <Text fontSize="sm" fontWeight={"semibold"} color="gray.700">
            {task.name}
          </Text>
        </Flex>
      </Td>
      <Td
        py={2}
        fontSize="sm"
        color="gray.600"
        fontWeight={"medium"}
        borderColor={"gray.300"}
      >
        {task.description}
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

export default TaskRow;
