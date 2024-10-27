import {
  SimpleGrid,
  Box,
  Heading,
  GridItem,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import dummyTasks from "../users/dummyTasks";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import TasksCard from "../components/TasksCard";
import SmallCalendar from "../components/SmallCalendar";

const Home = () => {
  const today = new Date().toISOString().split("T")[0];
  const priorityColor = (priority) =>
    priority == "High" ? "red" : priority == "Medium" ? "blue" : "green";

  const dailyTasks = [];
  dummyTasks.forEach((t) => t.start !== today && dailyTasks.push(t));

  const urgentTasks = [];
  dummyTasks.forEach((t) => t.priority == "High" && urgentTasks.push(t));

  const completedTasks = [
    "2024-10-05",
    "2024-10-10",
    "2024-10-10",
    "2024-10-15",
  ];

  return (
    <Box color="black">
      <Heading mb="1rem">Welcome John Doe</Heading>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
        <GridItem
          bg="white"
          boxShadow="md"
          color="black"
          padding={5}
          borderRadius={10}
        >
          <Heading fontSize="2xl" mb={7}>
            Urgent Tasks
          </Heading>
          {urgentTasks.map((urgent) => (
            <TasksCard
              task={urgent.task}
              project={urgent.project}
              priority={urgent.priority}
              id={urgent.id}
              key={urgent.id}
            />
          ))}
        </GridItem>
        <GridItem
          bg="white"
          boxShadow="md"
          color="black"
          padding={5}
          borderRadius={7}
        >
          <Heading fontSize="2xl" mb={7}>
            Daily Tasks
          </Heading>
          {dailyTasks.map((daily) => (
            <TasksCard
              task={daily.task}
              project={daily.project}
              priority={daily.priority}
              id={daily.id}
              key={daily.id}
            />
          ))}
        </GridItem>
        <GridItem
          bg="white"
          boxShadow="md"
          color="black"
          padding={5}
          borderRadius={7}
        >
          <Heading fontSize="2xl" mb={7}>
            Calendar
          </Heading>
          <SmallCalendar completedTasks={completedTasks} />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default Home;
