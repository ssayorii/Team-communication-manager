import React from "react";
import {
  VStack,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Spacer,
  Checkbox,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  filter,
  setFilter,
  sortBy,
  setSortBy,
  onDeleteTask,
  onEditTask,
  onToggleComplete,
  onSelectTask,
  selectedTasks,
  users,
}) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return task.priority === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "Priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === "Alphabetical") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "Due Date") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  return (
    <>
      <Flex mb={4}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Filter: {filter}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setFilter("All")}>All</MenuItem>
            <MenuItem onClick={() => setFilter("Completed")}>
              Completed
            </MenuItem>
            <MenuItem onClick={() => setFilter("Incomplete")}>
              Incomplete
            </MenuItem>
            <MenuItem onClick={() => setFilter("High")}>High Priority</MenuItem>
            <MenuItem onClick={() => setFilter("Medium")}>
              Medium Priority
            </MenuItem>
            <MenuItem onClick={() => setFilter("Low")}>Low Priority</MenuItem>
          </MenuList>
        </Menu>
        <Spacer />
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Sort by: {sortBy}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSortBy("Priority")}>Priority</MenuItem>
            <MenuItem onClick={() => setSortBy("Alphabetical")}>
              Alphabetical
            </MenuItem>
            <MenuItem onClick={() => setSortBy("Due Date")}>Due Date</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <VStack spacing={3} align="stretch" width="100%">
        {sortedTasks.map((task) => (
          <Flex key={task.id} align="center" width="100%">
            <Checkbox
              mr={2}
              isChecked={selectedTasks.includes(task.id)}
              onChange={() => onSelectTask(task.id)}
            />
            <TaskItem
              task={task}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              onToggleComplete={onToggleComplete}
              users={users}
            />
          </Flex>
        ))}
      </VStack>
    </>
  );
};

export default TaskList;
