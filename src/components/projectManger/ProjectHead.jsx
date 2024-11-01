import React from "react";
import { Thead, Tr, Th } from "@chakra-ui/react";

const ProjectHead = () => {
  const TableHead = [
    "Project",
    "Color",
    "Assignee",
    "Start",
    "End",
    "Priority",
    "Progress",
  ];

  return (
    <Thead bg="gray.50">
      <Tr>
        {TableHead.map((head) => (
          <Th
            borderBottomWidth="1px"
            borderColor="gray.200"
            color="gray.600"
            fontSize="xs"
            textTransform="none"
            key={head}
          >
            {head}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
};

export default ProjectHead;
