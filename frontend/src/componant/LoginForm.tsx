import * as React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Grid,
  useToast,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import {useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loginUser } = useUser();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      toast({
        title: "Login successful.",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate('/menu');
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed.",
        description: error.response?.data?.message || "Unable to register.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
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
            <Button mt={4} colorScheme="teal" type="submit">
              Login
            </Button>
          </form>
        </Box>
      </Grid>
    </Box>
  );
};

export default LoginForm;
