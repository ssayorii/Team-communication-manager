import {
  AvatarBadge,
  Badge,
  Box,
  Flex,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";
const AssigneeBadge = ({ assignee }) => {
  if (!Array.isArray(assignee)) return null;
  return (
    <AvatarGroup size="sm" max={3}>
      {assignee.map((a, index) => (
        <Avatar
          border={"none"}
          key={a}
          name={a} // This will show the first letter of each assignee
          bg="blue.500"
          color="white"
          shadow="2px 2px 2px 1px rgba(0, 0, 0, 0.2)"
        />
      ))}
    </AvatarGroup>
  );
};
export default AssigneeBadge;
