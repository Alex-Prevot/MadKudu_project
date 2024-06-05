import * as React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Grid,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="10vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Box maxW="md" mx="auto" mt={10} p={5}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit" as={RouterLink} to="/connection">
              Login
            </Button>
          </form>
        </Box>
      </Grid>
    </Box>
  );
};

export default LoginForm;
