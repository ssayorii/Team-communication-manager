import React from "react";
import { Badge } from "@chakra-ui/react";

const PriorityBadge = ({ priority }) => {
  const colorScheme = {
    High: "red",
    Medium: "orange",
    Low: "blue",
  }[priority];

  return (
    <Badge
      px={2}
      py={0.5}
      borderRadius="full"
      fontSize="xs"
      bg={
        priority === "High"
          ? "red.100"
          : priority === "Medium"
          ? "orange.100"
          : "blue.100"
      }
      color={
        priority === "High"
          ? "red.500"
          : priority === "Medium"
          ? "orange.500"
          : "blue.500"
      }
      fontWeight="semibold"
    >
      {priority}
    </Badge>
  );
};

export default PriorityBadge;
