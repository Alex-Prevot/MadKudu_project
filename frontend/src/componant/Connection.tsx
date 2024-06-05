import {
  Box,
  Grid,
  Text,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

const Connection = () => {
    return (
        <Box textAlign="center" fontSize="xl">
            <Grid minH="10vh" p={3}>
                <ColorModeSwitcher justifySelf="flex-end" />
                <Text>You are connected</Text>
                <Box maxW="md" mx="auto" mt={10} p={5}>
                </Box>
            </Grid>
        </Box>
    );
};

export default Connection;
