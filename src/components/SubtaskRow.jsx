// SubtaskRow.js
import React from "react";
import { Tr, Td, Flex, Text, Checkbox } from "@chakra-ui/react";
import AssigneeBadge from "./AssigneeBadge";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

const SubtaskRow = ({ subtask }) => (
  <Tr bg="gray.50" _hover={{ bg: "gray.100" }}>
    <Td py={2} pl={12} borderColor={"gray.300"}>
      <Flex align="center" gap={2}>
        <Checkbox
          borderColor="gray.300"
          isChecked={subtask.completed}
          colorScheme="green"
          size="sm"
        />
        <Text
          fontSize="sm"
          color="gray.700"
          textDecoration={subtask.completed ? "line-through" : "none"}
        >
          {subtask.name}
        </Text>
      </Flex>
    </Td>
    <Td py={2} fontSize="sm" color="gray.600" borderColor={"gray.300"}>
      {subtask.description}
    </Td>
    <Td py={2} borderColor={"gray.300"}>
      <AssigneeBadge assignee={subtask.assignee} />
    </Td>
    <Td py={2} fontSize="sm" color="gray.600" borderColor={"gray.300"}>
      {subtask.start}
    </Td>
    <Td py={2} fontSize="sm" color="gray.600" borderColor={"gray.300"}>
      {subtask.end}
    </Td>
    <Td py={2} borderColor={"gray.300"}>
      <PriorityBadge priority={subtask.priority} />
    </Td>
    <Td py={2} borderColor={"gray.300"}>
      <StatusBadge status={subtask.status} />
    </Td>
  </Tr>
);

export default SubtaskRow;
