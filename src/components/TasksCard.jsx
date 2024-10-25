import { Box, Flex, Text, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

const TasksCard = (props) => {
  const priorityColor = (priority) =>
    priority == "High" ? "red" : priority == "Medium" ? "blue" : "green";

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" key={props.id}>
        <Box display="flex" alignItems="center" mb={3}>
          <FontAwesomeIcon size="lg" icon={faSquare} />
          <Box ml={3}>
            <Text>{props.task}</Text>
            <Text>{props.project}</Text>
          </Box>
        </Box>
        <Button
          color={priorityColor(props.priority)}
          border="1px solid"
          borderRadius="10"
        >
          {props.priority}
        </Button>
      </Flex>
    </Box>
  );
};

export default TasksCard;
