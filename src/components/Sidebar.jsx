import { Box, Button, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      width="200px"
      bg={"gray.700"}
      color={"white"}
      padding="1rem"
      height={"100vh"}
    >
      <VStack spacing={"4"}>
        <Button
          as={Link}
          to="/dashboard"
          variant="link"
          colorScheme="whiteAlpha"
        >
          Dashboard
        </Button>
        <Button as={Link} to="/tasks" variant="link" colorScheme="whiteAlpha">
          Tasks
        </Button>
        <Button
          as={Link}
          to="/projects"
          variant="link"
          colorScheme="whiteAlpha"
        >
          Projects
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
