import { Heading, Box, SimpleGrid } from "@chakra-ui/react";
import OverviewCard from "../components/OverviewCard";
import dummyTasks from "../users/dummyTasks";

const totalTasks = dummyTasks.length;
const tasksInProgress = dummyTasks.filter(
  (t) => t.status == "In Progress"
).length;
const tasksCompleted = dummyTasks.filter((t) => t.status == "COMPLETED").length;

const Dashboard = () => {
  return (
    <Box>
      <Heading mb={7}>Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
        <OverviewCard
          total={totalTasks}
          completed={tasksCompleted}
          inProgress={tasksInProgress}
          title="Tasks"
        />
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
