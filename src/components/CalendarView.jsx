// CalendarView.jsx
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, useColorModeValue } from "@chakra-ui/react";

const localizer = momentLocalizer(moment);

const CalendarView = ({ tasks }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");

  const events = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    allDay: true,
    resource: task,
  }));

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.resource.completed ? "#48BB78" : "#4299E1",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style,
    };
  };

  return (
    <Box bg={bgColor} color={textColor} p={4} borderRadius="md" boxShadow="sm">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
      />
    </Box>
  );
};

export default CalendarView;
