import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Table,
  Tag,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  VStack,
  Icon,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import React from "react";

const ProjectView = () => {
  const textColor = "gray.700";
  return (
    <Box w="80%" p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4} color={textColor}>
        Projects / Asana Clone
      </Text>

      {/* <Accordion
          bg="gray.200"
          boxShadow={"lg"}
          borderRadius={10}
          marginTop={8}
          allowToggle
          defaultIndex={[0]}
        >
          <AccordionItem>
            <AccordionButton>
              <Box
                flex={"1"}
                textAlign={"left"}
                fontWeight={"bold"}
                color={"gray.500"}
                fontSize={20}
                _hover={"none"}
              >
                TODO
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel> */}
      <Badge
        colorScheme="gray.600"
        color={textColor}
        fontSize={20}
        fontWeight="bold"
        paddingRight={30}
        borderRadius={5}
        marginTop={30}
      >
        <Flex>
          <Icon marginTop={1.5} as={ChevronDownIcon} />
          <Text>TODO</Text>
        </Flex>
      </Badge>
      <Box
        bg="gray.200"
        boxShadow={"lg"}
        borderRadius={10}
        marginTop={7}
        flex={"1"}
        textAlign={"left"}
        fontWeight={"bold"}
        color={"gray.500"}
        fontSize={20}
        _hover={"none"}
      >
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th>Task</Th>
              <Th>Description</Th>
              <Th>Assignee</Th>
              <Th>Start</Th>
              <Th>End</Th>
              <Th>Priority</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr fontWeight={"semibold"} fontSize={15}>
              <Td paddingRight={5}>Task1</Td>
              <Td>Complete the homepage layout.</Td>
              <Td>john doe</Td>
              <Td>Oct 20</Td>
              <Td>Oct 25</Td>
              <Td>
                <Badge colorScheme="red" marginLeft={3}>
                  High
                </Badge>
              </Td>
              <Td>
                <Badge colorScheme="green">Completed</Badge>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      {/* </AccordionPanel>
          </AccordionItem>
        </Accordion> */}
    </Box>
  );
};

export default ProjectView;
