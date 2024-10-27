import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const Sidebar = () => {
  const routes = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/tasks", label: "Tasks" },
    { path: "/projects", label: "Projects" },
    { path: "/projectview", label: "ProjectView" },
  ];
  const location = useLocation();

  return (
    <Box
      width="200px"
      bg={"gray.700"}
      color={"white"}
      padding="1rem"
      height={"100vh"}
    >
      <VStack>
        {routes.map((route) => (
          <Button
            bg={location.pathname == route.path ? "#1a202c" : ""}
            padding={2}
            width="100%"
            textAlign="left"
            as={Link}
            to={route.path}
            variant="link"
            colorScheme="white"
            key={route.label}
          >
            {route.label}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
