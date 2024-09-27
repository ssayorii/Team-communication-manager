import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Button,
  Box,
} from "@chakra-ui/react";

const AssigneeDropdown = () => {
  const [assignees, setAssignees] = useState([
    { name: "John Doe", selected: false },
    { name: "Jane Smith", selected: false },
    { name: "Mike Lee", selected: false },
  ]);

  const handleCheck = (index) => {
    setAssignees((prev) =>
      prev.map((assignee, i) =>
        i === index ? { ...assignee, selected: !assignee.selected } : assignee
      )
    );
  };

  return (
    <Box>
      <Menu>
        <MenuButton as={Button} colorScheme="blue">
          Assign To
        </MenuButton>
        <MenuList>
          {assignees.map((assignee, index) => (
            <MenuItem key={index}>
              <Checkbox
                isChecked={assignee.selected}
                onChange={() => handleCheck(index)}
              >
                {assignee.name}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Box mt={4}>
        Selected Assignees:{" "}
        {assignees
          .filter((a) => a.selected)
          .map((a) => a.name)
          .join(", ") || "None"}
      </Box>
    </Box>
  );
};

export default AssigneeDropdown;
