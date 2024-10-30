import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import TaskManager from "./components/TaskManager/TaskManager";
import ProjectManager from "./components/projectManger/ProjectManager";

import Home from "./pages/Home";
import ProjectView from "./components/ProjectView";
import EventCalendar from "./pages/EventCalendar";
function App() {
  return (
    <Router>
      <Navbar />
      <Flex>
        <Sidebar />
        <Box flex="1" padding="2rem" bg="gray.50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasksManager" element={<TaskManager />} />
            <Route path="/projects" element={<ProjectManager />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/calendar" element={<EventCalendar />} />
            <Route path="/projectview" element={<ProjectView />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
}

export default App;
