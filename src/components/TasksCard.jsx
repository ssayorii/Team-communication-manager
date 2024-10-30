import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const TasksCard = (props) => {
  const [checked, setChecked] = useState(props.status ? true : false);
  const [currentPriority, setPriority] = useState(props.priority);

  const priorityColor = (priority) =>
    priority == "High" ? "red" : priority == "Medium" ? "blue" : "green";

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" key={props.id}>
        <Box display="flex" alignItems="center" mb={3}>
          <Checkbox
            onChange={() => setChecked(!checked)}
            isChecked={checked}
            size="lg"
            border="black"
            colorScheme="green"
          ></Checkbox>
          <Box ml={3}>
            <Text>{props.task}</Text>
            <Text>{props.project}</Text>
          </Box>
        </Box>
        <Menu>
          <MenuButton
            border="1px"
            color={priorityColor(currentPriority)}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {currentPriority}
          </MenuButton>
          <MenuList bg="white">
            <MenuItem
              value={props.priority}
              onClick={() => setPriority("Low")}
              color={priorityColor("Low")}
              bg="white"
              _hover={{ bg: "#ddd" }}
            >
              Low
            </MenuItem>
            <MenuItem
              value={props.priority}
              onClick={() => setPriority("Medium")}
              color={priorityColor("Medium")}
              bg="white"
              _hover={{ bg: "#ddd" }}
            >
              Medium
            </MenuItem>
            <MenuItem
              value={props.priority}
              onClick={() => setPriority("High")}
              color={priorityColor("High")}
              bg="white"
              _hover={{ bg: "#ddd" }}
            >
              High
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default TasksCard;
