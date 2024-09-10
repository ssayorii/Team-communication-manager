import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";

const Navbar = () => {
  return (
    <Flex as="nav" padding="1rem" bg="gray.800" color="white">
      <Heading size={"md"}>Team Manager</Heading>
      <Spacer />
      <Button colorScheme="teal">Login</Button>
    </Flex>
  );
};

export default Navbar;
