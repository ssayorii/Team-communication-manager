import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const OverviewCard = ({ total, completed, inProgress, title }) => {
  const percentage = (completed / total) * 100;
  return (
    <Flex
      boxShadow="md"
      borderRadius={10}
      alignItems="center"
      p={5}
      justifyContent="space-between"
    >
      <VStack spacing={4} alignItems="start">
        <Heading fontSize="2xl" mb={4}>
          {title} Overview
        </Heading>
        <Text fontSize="lg">
          Total {title}: {total}
        </Text>
        <Text fontSize="lg">
          {title} In progress: {inProgress}
        </Text>
        <Text fontSize="lg">
          {title} Completed: {completed}
        </Text>
      </VStack>
      <CircularProgress color="green" value={percentage} size={140}>
        <CircularProgressLabel>{percentage}%</CircularProgressLabel>
      </CircularProgress>
    </Flex>
  );
};

export default OverviewCard;
