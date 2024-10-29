import React from "react";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
import TaskRow from "./TaskRow";
import { sections } from "./Tasks";
import SubtaskRow from "./SubTaskRow";

const ProjectView = () => {
  const TableHead = [
    "Task",
    "Description",
    "Assignee",
    "Start",
    "End",
    "Priority",
    "Status",
  ];

  return (
    <Box bg="gray.50" minH="100vh">
      <Flex
        borderBottom="1px"
        borderColor="gray.200"
        bg="white"
        px={6}
        py={3}
        position="sticky"
        top={0}
        zIndex={1}
      >
        <Text fontSize="xl" fontWeight="semibold" color="gray.900">
          Projects / Asana Clone
        </Text>
      </Flex>

      <Box p={6}>
        {sections.map((section) => (
          <Box key={section.title} mb={6}>
            <Button
              leftIcon={<ChevronDownIcon />}
              variant="ghost"
              bg="gray.100"
              mb={2}
              py={1}
              px={2}
              bgColor={
                section.title === "TO DO"
                  ? "gray.200"
                  : section.title === "IN PROGRESS"
                  ? "blue.100"
                  : "green.100"
              }
              height="auto"
              _hover={{ bg: "gray.200" }}
              fontWeight="semibold"
              color="gray.700"
              fontSize="sm"
            >
              {section.title}
            </Button>

            <Box
              bg="white"
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Table variant="simple">
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
                <Tbody>
                  {section.tasks.map((task) => (
                    <TaskRow key={task.id} task={task} />
                  ))}
                  <Tr>
                    <Td colSpan={7} py={2} border={"none"}>
                      <Button
                        leftIcon={<AddIcon w={3} h={3} />}
                        variant="ghost"
                        size="sm"
                        color="gray.500"
                        fontWeight="normal"
                        _hover={{ bg: "transparent", color: "gray.700" }}
                      >
                        Add Task
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectView;
