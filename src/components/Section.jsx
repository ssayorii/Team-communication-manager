import React from "react";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
import TaskRow from "./TaskRow";

const Section = ({ title, tasks }) => {
  const tableHeaders = [
    "Task",
    "Description",
    "Assignee",
    "Start",
    "End",
    "Priority",
    "Status",
  ];

  return (
    <Box mb={6}>
      <Button
        leftIcon={<ChevronDownIcon />}
        variant="ghost"
        bg="gray.100"
        mb={2}
        py={1}
        px={2}
        bgColor={
          title === "TO DO"
            ? "gray.200"
            : title === "IN PROGRESS"
            ? "blue.100"
            : "green.100"
        }
        fontWeight="semibold"
        color="gray.700"
        fontSize="sm"
      >
        {title}
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
              {tableHeaders.map((head) => (
                <Th key={head} fontSize="xs" color="gray.600">
                  {head}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map((task) => (
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
                >
                  Add Task
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Section;
