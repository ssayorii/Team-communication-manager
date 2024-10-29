import React from "react";
import { Badge } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
const AssigneeBadge = ({ assignee }) => (
  <Flex
    bg="blue.500"
    color="white"
    borderRadius="full"
    px={2}
    py={0.5}
    fontSize="xs"
    alignItems="center"
    justifyContent="center"
    w="fit-content"
  >
    {assignee}
  </Flex>
);
export default AssigneeBadge;
