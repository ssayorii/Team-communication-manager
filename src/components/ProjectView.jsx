import React from "react";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Icon,
  Checkbox,
  IconButton,
  Button,
  Container,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  AddIcon,
  EditIcon,
  CheckIcon,
} from "@chakra-ui/icons";

const ProjectView = () => {
  const sections = [
    {
      title: "TO DO",
      tasks: [
        {
          id: 1,
          name: "Task 1",
          description: "lorem ipsumlorem ipsum",
          assignee: "DDD",
          start: "Oct 20",
          end: "Oct 25",
          priority: "High",
          status: "TO DO",
          subtasks: [
            {
              name: "Sub Task 1",
              description: "lorem ipsumlorem ipsum",
              assignee: "DDD",
              start: "Oct 20",
              end: "Oct 25",
              priority: "High",
              status: "TO DO",
            },
            {
              name: "Sub Task 2",
              description: "lorem ipsumlorem ipsum",
              assignee: "DDD",
              start: "Oct 20",
              end: "Oct 25",
              priority: "High",
              status: "COMPLETED",
              completed: true,
            },
          ],
        },
        {
          id: 2,
          name: "Task 2",
          description: "lorem ipsumlorem ipsum",
          assignee: "DDD",
          start: "Oct 20",
          end: "Oct 25",
          priority: "Medium",
          status: "TO DO",
        },
      ],
    },
    {
      title: "IN PROGRESS",
      tasks: [
        {
          id: 3,
          name: "Task 2",
          description: "lorem ipsumlorem ipsum",
          assignee: "DDD",
          start: "Oct 20",
          end: "Oct 25",
          priority: "Low",
          status: "IN PROGRESS",
        },
      ],
    },
    {
      title: "COMPLETED",
      tasks: [
        {
          id: 4,
          name: "Task 2",
          description: "lorem ipsumlorem ipsum",
          assignee: "DDD",
          start: "Oct 20",
          end: "Oct 25",
          priority: "High",
          status: "COMPLETED",
        },
      ],
    },
  ];

  const TableHead = [
    "Task",
    "Description",
    "Assignee",
    "Start",
    "End",
    "Priority",
    "Status",
  ];
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
        fontWeight="medium"
      >
        {priority}
      </Badge>
    );
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      "TO DO": {
        bg: "gray.100",
        color: "gray.600",
      },
      "IN PROGRESS": {
        bg: "blue.100",
        color: "blue.500",
      },
      COMPLETED: {
        bg: "green.100",
        color: "green.500",
      },
    }[status];

    return (
      <Badge
        px={2}
        py={0.5}
        borderRadius="md"
        fontSize="xs"
        {...styles}
        display="flex"
        alignItems="center"
        gap={1}
      >
        {status === "IN PROGRESS" && (
          <Box w={2} h={2} borderRadius="full" bg="blue.500" />
        )}
        {status === "COMPLETED" && <Icon as={CheckIcon} />}
        {status}
      </Badge>
    );
  };

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
                    <React.Fragment key={task.id}>
                      <Tr
                        _hover={{ bg: "gray.50" }}
                        borderBottomWidth={"1px"}
                        borderColor="gray.100"
                      >
                        <Td py={2} borderColor={"gray.300"}>
                          <Flex align="center" gap={2}>
                            <IconButton
                              icon={<ChevronRightIcon />}
                              variant="ghost"
                              size="sm"
                              p={0}
                              minW="auto"
                              h="auto"
                              color="gray.400"
                              _hover={{ bg: "transparent", color: "gray.600" }}
                            />
                            <Text fontSize="sm" color="gray.700">
                              {task.name}
                            </Text>
                          </Flex>
                        </Td>
                        <Td
                          py={2}
                          fontSize="sm"
                          color="gray.600"
                          borderColor={"gray.300"}
                        >
                          {task.description}
                        </Td>
                        <Td py={2} borderColor={"gray.300"}>
                          <AssigneeBadge assignee={task.assignee} />
                        </Td>
                        <Td
                          py={2}
                          fontSize="sm"
                          color="gray.600"
                          borderColor={"gray.300"}
                        >
                          {task.start}
                        </Td>
                        <Td
                          py={2}
                          fontSize="sm"
                          color="gray.600"
                          borderColor={"gray.300"}
                        >
                          {task.end}
                        </Td>
                        <Td py={2} borderColor={"gray.300"}>
                          <PriorityBadge priority={task.priority} />
                        </Td>
                        <Td py={2} borderColor={"gray.300"}>
                          <StatusBadge status={task.status} />
                        </Td>
                      </Tr>
                      {task.subtasks?.map((subtask, index) => (
                        <Tr
                          key={`${task.id}-${index}`}
                          bg="gray.50"
                          _hover={{ bg: "gray.100" }}
                        >
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
                                textDecoration={
                                  subtask.completed ? "line-through" : "none"
                                }
                              >
                                {subtask.name}
                              </Text>
                            </Flex>
                          </Td>
                          <Td
                            py={2}
                            fontSize="sm"
                            color="gray.600"
                            borderColor={"gray.300"}
                          >
                            {subtask.description}
                          </Td>
                          <Td py={2} borderColor={"gray.300"}>
                            <AssigneeBadge assignee={subtask.assignee} />
                          </Td>
                          <Td
                            py={2}
                            fontSize="sm"
                            color="gray.600"
                            borderColor={"gray.300"}
                          >
                            {subtask.start}
                          </Td>
                          <Td
                            py={2}
                            fontSize="sm"
                            color="gray.600"
                            borderColor={"gray.300"}
                          >
                            {subtask.end}
                          </Td>
                          <Td py={2} borderColor={"gray.300"}>
                            <PriorityBadge priority={subtask.priority} />
                          </Td>
                          <Td py={2} borderColor={"gray.300"}>
                            <StatusBadge status={subtask.status} />
                          </Td>
                        </Tr>
                      ))}
                    </React.Fragment>
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
