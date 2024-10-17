import React from "react";
import { Box, VStack, HStack, Text, Badge } from "@chakra-ui/react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";

const CalendarView = ({
  tasks,
  onEditTask,
  onDeleteTask,
  onToggleComplete,
}) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTasksForDate = (date) => {
    return tasks.filter((task) => isSameDay(new Date(task.dueDate), date));
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {format(today, "MMMM yyyy")}
      </Text>
      <VStack spacing={2}>
        {daysInMonth.map((date) => (
          <HStack key={date.toString()} w="100%" alignItems="flex-start">
            <Box w="100px" textAlign="center">
              <Text
                fontWeight={isSameDay(date, today) ? "bold" : "normal"}
                color={!isSameMonth(date, today) ? "gray.500" : "inherit"}
              >
                {format(date, "EEE, MMM d")}
              </Text>
            </Box>
            <VStack align="stretch" flex={1} spacing={1}>
              {getTasksForDate(date).map((task) => (
                <Box
                  key={task.id}
                  p={2}
                  bg={task.completed ? "green.100" : "gray.100"}
                  borderRadius="md"
                >
                  <HStack justify="space-between">
                    <Text>{task.title}</Text>
                    <Badge
                      colorScheme={
                        task.priority === "High"
                          ? "red"
                          : task.priority === "Medium"
                          ? "yellow"
                          : "green"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default CalendarView;
