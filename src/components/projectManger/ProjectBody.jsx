import React, { useState } from "react";
import {
  Tr,
  Td,
  Checkbox,
  Text,
  Badge,
  AvatarGroup,
  Avatar,
  Button,
  Progress,
  IconButton,
  Tbody,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const ProjectBody = ({
  projects,
  setProjects,
  selection,
  setSelection,
  handleEdit,
}) => {
  const handleCheck = (projectId) => {
    setSelection((prevSelection) =>
      prevSelection.includes(projectId)
        ? prevSelection.filter((id) => id !== projectId)
        : [...prevSelection, projectId]
    );
  };

  const isChecked = (projectId) => selection.includes(projectId);

  const rows = projects.map((project) => (
    <Tr key={project.id} data-selected={isChecked(project.id) ? "" : undefined}>
      <Td
        p={2}
        fontSize="ml"
        fontWeight="semibold"
        display="flex"
        alignItems="center"
      >
        <Checkbox
          colorScheme="green"
          marginRight={3}
          borderRadius="50%"
          onChange={() => handleCheck(project.id)}
          isChecked={isChecked(project.id)}
        />
        <Text
          textDecoration={isChecked(project.id) ? "line-through" : "none"}
          marginRight={3}
        >
          {project.title}
        </Text>
        <IconButton
          icon={<EditIcon />}
          variant="ghost"
          size="sm"
          onClick={() => handleEdit(project)}
        />
      </Td>
      <Td p={2}>
        <Badge bg={`${project.colorScheme}.500`} p={1} width="100%"></Badge>
      </Td>
      <Td p={2}>
        <AvatarGroup size="xs" max={2}>
          {project.assignees.map((assignee, index) => (
            <Avatar key={index} name={assignee} />
          ))}
        </AvatarGroup>
      </Td>
      <Td p={2} fontSize="sm" fontWeight="semibold">{`${project.start}`}</Td>
      <Td p={2} fontSize="sm" fontWeight="semibold">{`${project.end}`}</Td>
      <Td p={2} fontSize="sm">
        <Button
          size="sm"
          colorScheme={
            project.priority === "High"
              ? "red"
              : project.priority === "Medium"
              ? "blue"
              : "green"
          }
          variant="outline"
        >
          {project.priority}
        </Button>
      </Td>
      <Td p={2}>
        {project.tasks}
        <Progress
          value={(project.completeTasks / project.tasks) * 100}
          size="xs"
          colorScheme="blue"
        />
      </Td>
    </Tr>
  ));

  return <Tbody>{rows}</Tbody>;
};

export default ProjectBody;
