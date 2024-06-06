import {
  Box,
  Grid,
  Text,
  SimpleGrid,
  Button,
  Flex,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AntelopeCard from "./AntelopeCard";
import { useUser } from "./UserContext";

interface Antelope {
  name: string;
  continent: string;
  weight: number;
  height: number;
  horns: string;
  picture: string;
}

const AntelopeMyCollection = () => {
  const [antelopes, setAntelopes] = useState<Antelope[]>([]);
  const [selectedAntelopes, setSelectedAntelopes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterContinent, setFilterContinent] = useState("");
  const [filterHorns, setFilterHorns] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchAntelopes = async () => {
      try {
        const url: string = `http://localhost:8080/antelope/collection/${user?.id}`;
        const response = await axios.get(url);
        setAntelopes(response.data);
      } catch (error) {
        console.error("Failed to fetch antelopes:", error);
      }
    };
    fetchAntelopes();
  }, []);

  const handleAntelopeClick = (name: string) => {
    const newSelection = selectedAntelopes.includes(name)
      ? selectedAntelopes.filter((n) => n !== name)
      : [...selectedAntelopes, name];
    setSelectedAntelopes(newSelection);
  };

  const filteredAntelopes = antelopes.filter(
    (antelope) =>
      antelope.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterContinent ? antelope.continent === filterContinent : true) &&
      (filterHorns ? antelope.horns === filterHorns : true)
  );

  const handleDeletedToCollection = async (userId: string) => {
    try {
      await axios.delete(
        `http://localhost:8080/antelope/collection/${userId}`,
        {
          data: {
            antelopes: selectedAntelopes,
          },
        }
      );
      setAntelopes((currentAntelopes) =>
        currentAntelopes.filter(
          (antelope) => !selectedAntelopes.includes(antelope.name)
        )
      );
      toast({
        title: "Deleted from your collection successfully.",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/my-collection");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Failed to delete from your collection.",
        description: `Error: ${error.response?.data?.message || error.message}`,
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
        <Flex align="center" justify="space-between" width="full">
          <Button as={RouterLink} to="/menu">
            <Text>Back to Menu</Text>
          </Button>
          <ColorModeSwitcher />
        </Flex>
        <Flex justify="space-around" mt={4} mb={4}>
          <Input
            placeholder="Search by name..."
            onChange={(e) => setSearchTerm(e.target.value)}
            width="30%"
          />
          <Select
            placeholder="Filter by continent"
            onChange={(e) => setFilterContinent(e.target.value)}
            width="30%"
          >
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Australia">Australia</option>
          </Select>
          <Select
            placeholder="Filter by horns"
            onChange={(e) => setFilterHorns(e.target.value)}
            width="30%"
          >
            <option value="Straight">Straight</option>
            <option value="Curved">Curved</option>
            <option value="Spiraled">Spiraled</option>
          </Select>
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3 }}
          spacing={5}
          maxW="full"
          mx="auto"
          mt={10}
          p={5}
        >
          {filteredAntelopes.map((antelope) => (
            <AntelopeCard
              key={antelope.name}
              antelope={antelope}
              onClick={() => handleAntelopeClick(antelope.name)}
              isSelected={selectedAntelopes.includes(antelope.name)}
            />
          ))}
        </SimpleGrid>
        <Button
          onClick={() => handleDeletedToCollection(user?.id?.toString() || "")}
        >
          <Text>Delete</Text>
        </Button>
      </Grid>
    </Box>
  );
};

export default AntelopeMyCollection;
