import { Heading, Box, SimpleGrid, GridItem } from "@chakra-ui/react";
import OverviewCard from "../components/OverviewCard";
import dummyTasks from "../users/dummyTasks";
import dummyProjects from "../users/dummyProjects";

const totalTasks = dummyTasks.length;
const tasksInProgress = dummyTasks.filter(
  (t) => t.status == "In Progress"
).length;
const tasksCompleted = dummyTasks.filter((t) => t.status == "COMPLETED").length;

const totalProjects = dummyProjects.length;
const projectsInProgress = dummyProjects.filter(
  (t) => t.status == "In Progress"
).length;
const projectsCompleted = dummyProjects.filter(
  (t) => t.status == "Completed"
).length;

const Dashboard = () => {
  return (
    <Box>
      <Heading mb={7}>Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
        <GridItem>
          <OverviewCard
            total={totalTasks}
            completed={tasksCompleted}
            inProgress={tasksInProgress}
            title="Tasks"
          />
        </GridItem>
        <GridItem>
          <OverviewCard
            total={totalProjects}
            completed={projectsCompleted}
            inProgress={projectsInProgress}
            title="Projects"
          />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
