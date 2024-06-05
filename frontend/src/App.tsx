import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  Button,
  theme,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import RegisterForm from "./componant/RegisterForm";
import LoginForm from "./componant/LoginForm";
import Connection from "./componant/Connection";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={
          <Box textAlign="center" fontSize="xl">
            <Grid minH="50vh" p={3}>
              <ColorModeSwitcher justifySelf="flex-end" />
              <VStack spacing={8}>
                <Logo h="40vmin" pointerEvents="none" />
                <Button colorScheme="teal" as={RouterLink} to="/register">
                  Go to Register
                </Button>
                <Button colorScheme="teal" as={RouterLink} to="/login">
                  Go to Login
                </Button>
              </VStack>
            </Grid>
          </Box>
        } />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/connection" element={<Connection/>} />
      </Routes>
    </Router>
  </ChakraProvider>
);
