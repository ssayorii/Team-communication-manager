import { Badge, Icon, Box } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
const StatusBadge = ({ status }) => {
  const styles = {
    "TO DO": {
      bg: "gray.100",
      color: "gray.600",
    },
    "IN PROGRESS": {
      bg: "blue.100",
      color: "blue.500",
    },
    COMPLETED: {
      bg: "green.100",
      color: "green.500",
    },
  }[status];

  return (
    <Badge
      px={2}
      py={0.5}
      borderRadius="md"
      fontSize="xs"
      {...styles}
      display="flex"
      alignItems="center"
      gap={1}
    >
      {status === "IN PROGRESS" && (
        <Box w={2} h={2} borderRadius="full" bg="blue.500" />
      )}
      {status === "COMPLETED" && <Icon as={CheckIcon} />}
      {status}
    </Badge>
  );
};
export default StatusBadge;
