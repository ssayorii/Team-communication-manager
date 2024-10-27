import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../CalendarStyles.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    start: moment("2024-10-26").toDate(),
    end: moment("2024-10-29").toDate(),
    title: "Project Deadline",
    projectId: 1,
  },
  {
    start: moment("2024-10-26").toDate(),
    end: moment("2024-10-29").toDate(),
    title: "Team Meeting",
    projectId: 2,
  },
];

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const goToToday = () => {
    toolbar.onNavigate("TODAY");
  };

  const handleViewChange = (view) => {
    toolbar.onView(view);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
      color="black"
      borderRadius="md"
    >
      <Flex alignItems="center">
        <Button color="black" onClick={goToToday} fontSize="md">
          Today
        </Button>
        <IconButton
          ml={4}
          icon={<ChevronLeftIcon />}
          onClick={goToBack}
          aria-label="Previous"
          colorScheme="black"
          size="xl"
        />

        <IconButton
          icon={<ChevronRightIcon />}
          onClick={goToNext}
          aria-label="Next"
          colorScheme="black"
          size="lg"
        />
        <Heading size="md" color="black">
          {toolbar.label}
        </Heading>
      </Flex>

      <Menu>
        <MenuButton as={IconButton} color="black" fontSize="md" ml={4}>
          {toolbar.view}
          <ChevronDownIcon />
        </MenuButton>
        <MenuList zIndex="1000" bg="white">
          <MenuItem
            bg="white"
            _hover={{ bg: "#ddd" }}
            onClick={() => handleViewChange("month")}
          >
            Month
          </MenuItem>
          <MenuItem
            bg="white"
            _hover={{ bg: "#ddd" }}
            onClick={() => handleViewChange("week")}
          >
            Week
          </MenuItem>
          <MenuItem
            bg="white"
            _hover={{ bg: "#ddd" }}
            onClick={() => handleViewChange("day")}
          >
            Day
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

const EventCalendar = () => {
  const handleSelectEvent = (event) => {
    console.log(event.projectId);
  };
  return (
    <Box color="black" borderRadius="8px">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="month"
        views={["month", "week", "day"]}
        onSelectEvent={handleSelectEvent}
        components={{
          toolbar: CustomToolbar,
        }}
        style={{ height: "80vh", color: "black" }}
      />
    </Box>
  );
};

export default EventCalendar;
