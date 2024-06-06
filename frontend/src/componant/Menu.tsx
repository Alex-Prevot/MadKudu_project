import { Box, VStack, Text, Button, Heading } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Link as RouterLink } from "react-router-dom";
import { useUser } from "./UserContext";

const Menu = () => {
  const { user } = useUser();
  const { logoutUser } = useUser();

  return (
    <Box textAlign="center" fontSize="xl" p={5}>
      <VStack spacing={4}>
        <Heading as="h1" size="xl" mb={4}>
          Welcome to the Antelope Collection
        </Heading>
        <Text size='xl'>{user?.email}</Text>
        <ColorModeSwitcher justifySelf="flex-end" alignSelf="flex-end" />
        <Button 
          as={RouterLink} 
          to="/my-collection" 
          colorScheme="teal" 
          size="lg"
          width="full"
        >
          <Text>My Collection</Text>
        </Button>
        <Button 
          as={RouterLink} 
          to="/all-collection" 
          colorScheme="orange" 
          size="lg"
          width="full"
        >
          <Text>All Collection</Text>
        </Button>
        <Button colorScheme="red" 
          size="lg"
          width="full">
          <Text onClick={logoutUser} as={RouterLink} 
          to="/" >Logout</Text>
        </Button>
      </VStack>
    </Box>
  );
};

export default Menu;
