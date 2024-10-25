// CalendarView.jsx
import React, { useState, useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  useColorModeValue,
  Text,
  Flex,
  Badge,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

const localizer = momentLocalizer(moment);

const CalendarView = ({ tasks }) => {
  const [view, setView] = useState(Views.MONTH);
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const todayBgColor = useColorModeValue("blue.50", "blue.900");
  const todayColor = useColorModeValue("blue.600", "blue.200");

  const events = useMemo(
    () =>
      tasks.map((task) => ({
        id: task.id,
        title: task.title,
        start: new Date(task.dueDate),
        end: moment(task.dueDate).add(task.estimatedTime, "hours").toDate(),
        resource: task,
      })),
    [tasks]
  );

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.resource.completed
        ? "#48BB78"
        : getPriorityColor(event.resource.priority),
      color: "white",
      border: "none",
      borderRadius: "4px",
    };
    return { style };
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#E53E3E";
      case "Medium":
        return "#DD6B20";
      case "Low":
        return "#3182CE";
      default:
        return "#4299E1";
    }
  };

  const customDayPropGetter = (date) => {
    if (moment(date).isSame(moment(), "day")) {
      return {
        style: {
          backgroundColor: todayBgColor,
          color: todayColor,
        },
      };
    }
    return {};
  };

  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() - 1);
      toolbar.onNavigate("prev");
    };

    const goToNext = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() + 1);
      toolbar.onNavigate("next");
    };

    const goToCurrent = () => {
      const now = new Date();
      toolbar.date.setMonth(now.getMonth());
      toolbar.date.setYear(now.getFullYear());
      toolbar.onNavigate("current");
    };

    const label = () => {
      const date = moment(toolbar.date);
      return <span>{date.format("MMMM YYYY")}</span>;
    };

    return (
      <Flex justifyContent="space-between" mb={4} alignItems="center">
        <Box>
          <button onClick={goToBack}>&#8249;</button>
          <button onClick={goToCurrent}>Today</button>
          <button onClick={goToNext}>&#8250;</button>
        </Box>
        <Text fontSize="xl" fontWeight="bold">
          {label()}
        </Text>
        <Box>
          <button onClick={() => toolbar.onView(Views.MONTH)}>Month</button>
          <button onClick={() => toolbar.onView(Views.WEEK)}>Week</button>
          <button onClick={() => toolbar.onView(Views.DAY)}>Day</button>
          <button onClick={() => toolbar.onView(Views.AGENDA)}>Agenda</button>
        </Box>
      </Flex>
    );
  };

  const CustomEvent = ({ event }) => (
    <Tooltip
      label={
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">{event.title}</Text>
          <Text>Due: {moment(event.start).format("MMM D, YYYY")}</Text>
          <Text>Estimated time: {event.resource.estimatedTime}h</Text>
          <Badge colorScheme={event.resource.completed ? "green" : "blue"}>
            {event.resource.completed ? "Completed" : "Pending"}
          </Badge>
        </VStack>
      }
    >
      <Box>
        <Text fontSize="sm" fontWeight="bold" isTruncated>
          {event.title}
        </Text>
        {view !== Views.MONTH && (
          <Text fontSize="xs">{event.resource.estimatedTime}h</Text>
        )}
      </Box>
    </Tooltip>
  );

  return (
    <Box bg={bgColor} color={textColor} p={4} borderRadius="md" boxShadow="sm">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={customDayPropGetter}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        view={view}
        onView={setView}
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
        }}
      />
    </Box>
  );
};

export default CalendarView;
