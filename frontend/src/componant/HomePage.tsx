import { Box, VStack, Button, Grid } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Link as RouterLink } from "react-router-dom";
import { Logo } from "../Logo";

const Menu = () => {
  return (
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
  );
};

export default Menu;
