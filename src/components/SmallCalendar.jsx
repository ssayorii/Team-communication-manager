import { SimpleGrid, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";

const isLoading = false;
const Loading = () => {
  if (isLoading) return <p>sad</p>;
};

const SmallCalendar = ({ completedTasks }) => {
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");

    const daysArray = [];
    const day = startOfMonth;

    while (day <= endOfMonth) {
      daysArray.push(day.clone());
      day.add(1, "day");
    }
    setDaysInMonth(daysArray);
  }, []);

  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dayiscompleted = (day) => {
    const formattedDay = day.format("YYYY-MM-DD");
    const taskCount = completedTasks.filter((t) => t === formattedDay).length;

    if (taskCount >= 6) return "green.600";
    if (taskCount >= 4) return "green.400";
    if (taskCount >= 2) return "green.200";
    if (taskCount >= 1) return "green.100";
    return "gray.100";
  };

  return (
    <SimpleGrid columns={7} spacing={1}>
      {week.map((day, index) => (
        <Text key={index} textAlign="center">
          {day}
        </Text>
      ))}
      {daysInMonth.map((day, index) => (
        <Text
          key={index}
          borderRadius={5}
          textAlign="center"
          padding={2}
          bg={dayiscompleted(day)}
        >
          {day.date()}
        </Text>
      ))}
    </SimpleGrid>
  );
};

export default SmallCalendar;
