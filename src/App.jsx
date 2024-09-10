import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div>
      <Navbar />
      <Flex>
        <Sidebar />
        <Box flex="1" padding={"2rem"}></Box>
      </Flex>
    </div>
  );
}

export default App;
