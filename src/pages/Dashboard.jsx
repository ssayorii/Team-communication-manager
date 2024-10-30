import { Heading, Box, SimpleGrid, GridItem } from "@chakra-ui/react";
import OverviewCard from "../components/OverviewCard";
import dummyTasks from "../users/dummyTasks";
import dummyProjects from "../users/dummyProjects";
import SmallCalendar from "../components/SmallCalendar";
import TasksCard from "../components/TasksCard";

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

const today = new Date().toISOString().split("T")[0];
const dailyTasks = [];
dummyTasks.forEach((t) => t.start == today && dailyTasks.push(t));

const completedTasks = [];
dummyTasks.forEach(
  (t) => t.status == "COMPLETED" && completedTasks.push(t.end)
);

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
        <GridItem boxShadow="md" padding={5} borderRadius={7}>
          <Heading fontSize="2xl" mb={7}>
            Daily Tasks
          </Heading>
          {dailyTasks.map((daily) => (
            <TasksCard
              task={daily.task}
              project={daily.project}
              priority={daily.priority}
              status={daily.status}
              id={daily.id}
              key={daily.id}
            />
          ))}
        </GridItem>
        <GridItem boxShadow="md" padding={5} borderRadius={7}>
          <Heading fontSize="2xl" mb={7}>
            Calendar
          </Heading>
          <SmallCalendar completedTasks={completedTasks} />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
