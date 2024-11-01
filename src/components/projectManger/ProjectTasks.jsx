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
import dummyTasks from "../../users/dummyTasks";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import TasksCard from "../TasksCard";
import SmallCalendar from "../SmallCalendar";

const ProjectTasks = () => {
  const urgentTasks = [];
  dummyTasks.forEach((t) => t.priority == "High" && urgentTasks.push(t));

  return (
    <Box color="black">
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
    </Box>
  );
};

export default ProjectTasks;
