import { Box, Flex } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TaskManager from "./components/TaskManager/TaskManager";
import Dashboard from "./pages/Dashboard";
import EventCalendar from "./pages/EventCalendar";
import Home from "./pages/Home";
import ProjectView from "./components/ProjectView";

function App() {
  return (
    <Router>
      <Flex>
        <Sidebar />
        <Box flex="1" padding="2rem" bg="white" color="black">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasksManager" element={<TaskManager />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projectview" element={<ProjectView />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
}

export default App;
