import React, { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
import TaskRow from "./TaskRow";
import { sections } from "./Tasks";

const ProjectView = () => {
  const [sectionsList, setSectionsList] = useState(sections);
  const [expandedSections, setExpandedSections] = useState(
    sections.reduce(
      (acc, section) => ({
        ...acc,
        [section.title]: true,
      }),
      {}
    )
  );
  const toast = useToast();

  const columnConfigs = [
    { name: "Task", width: "20%" },
    { name: "Description", width: "30%" },
    { name: "Assignee", width: "10%" },
    { name: "Start", width: "10%" },
    { name: "End", width: "10%" },
    { name: "Priority", width: "10%" },
    { name: "Status", width: "10%" },
  ];

  const handleAddTask = (sectionTitle) => {
    setSectionsList((prevSections) =>
      prevSections.map((section) => {
        if (section.title === sectionTitle) {
          return {
            ...section,
            tasks: [
              ...section.tasks,
              {
                id: `task-${Date.now()}`,
                name: "",
                description: "",
                assignee: null,
                start: "",
                end: "",
                priority: "low",
                status: section.title,
                subtasks: [],
              },
            ],
          };
        }
        return section;
      })
    );

    toast({
      title: "New task added",
      status: "success",
      duration: 1500,
      isClosable: true,
    });
  };

  const toggleSection = (sectionTitle) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Flex px={6} py={3} top={0} zIndex={1}>
        <Text fontSize={"xx-large"} fontWeight="bold" color="gray.900">
          Projects / Asana Clone
        </Text>
      </Flex>

      <Box p={6}>
        {sectionsList.map((section) => (
          <Box key={section.title} mb={6}>
            <Button
              leftIcon={
                <ChevronDownIcon
                  transform={
                    expandedSections[section.title] ? "rotate(180deg)" : "none"
                  }
                  transition="transform 0.2s"
                />
              }
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
              onClick={() => toggleSection(section.title)}
            >
              {section.title} ({section.tasks.length})
            </Button>

            <Box
              bg="white"
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
              boxShadow={"sm"}
              overflow="hidden"
              marginBottom={"3.5rem"}
              display={expandedSections[section.title] ? "block" : "none"}
            >
              <Table variant="simple">
                <Thead bg="gray.50">
                  <Tr>
                    {columnConfigs.map((config) => (
                      <Th
                        key={config.name}
                        borderBottomWidth="1px"
                        borderColor="gray.200"
                        color="gray.600"
                        fontSize="xs"
                        textTransform="none"
                        width={config.width}
                        style={{ minWidth: config.width }}
                      >
                        {config.name}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {section.tasks.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      onUpdate={(updatedTask) => {
                        setSectionsList((prevSections) =>
                          prevSections.map((s) => ({
                            ...s,
                            tasks: s.tasks.map((t) =>
                              t.id === updatedTask.id ? updatedTask : t
                            ),
                          }))
                        );
                      }}
                    />
                  ))}
                  <Tr>
                    <Td colSpan={7} py={2} border={"none"}>
                      <Button
                        leftIcon={<AddIcon w={3} h={3} />}
                        variant="ghost"
                        size="sm"
                        color="gray.500"
                        fontWeight="semibold"
                        _hover={{ bg: "transparent", color: "gray.700" }}
                        onClick={() => handleAddTask(section.title)}
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
