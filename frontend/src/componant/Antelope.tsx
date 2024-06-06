import { Box, Grid, Text, SimpleGrid, Button, Flex, Input, Select, useToast, Stat, StatLabel, StatNumber, StatGroup } from "@chakra-ui/react";
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

const Antelope = () => {
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
        const url: string = "http://localhost:8080/antelope";
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
      ? selectedAntelopes.filter(n => n !== name)
      : [...selectedAntelopes, name];
    setSelectedAntelopes(newSelection);
  };

  const filteredAntelopes = antelopes.filter(antelope =>
    (antelope.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterContinent ? antelope.continent === filterContinent : true) &&
    (filterHorns ? antelope.horns === filterHorns : true)
  );

  const continentCounts: any = filteredAntelopes.reduce((counts: any, antelope) => {
    counts[antelope.continent] = (counts[antelope.continent] || 0) + 1;
    return counts;
  }, {});

  const hornCounts: any = filteredAntelopes.reduce((counts: any, antelope) => {
    counts[antelope.horns] = (counts[antelope.horns] || 0) + 1;
    return counts;
  }, {});

  const handleAddToCollection = async (userId: string) => {
    try {
      await axios.post(`http://localhost:8080/antelope/collection/${userId}`, {
        antelopes: selectedAntelopes,
      });
      toast({
        title: "Added to your collection successful.",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate('/menu');
    } catch (error) {
      console.error(error);
    }
  }

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
            <option value="">All Continents</option>
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
            <option value="">All Horn Types</option>
            <option value="Twisted">Twisted</option>
            <option value="Straight">Straight</option>
            <option value="Spiky">Spiky</option>
            <option value="Spiraled">Spiraled</option>
            <option value="Lyre-shaped">Lyre-shaped</option>
            <option value="Curved">Curved</option>
          </Select>
        </Flex>
        <StatGroup mt={4}>
          {Object.keys(continentCounts).map(continent => (
            <Stat key={continent}>
              <StatLabel>{continent} (Continent)</StatLabel>
              <StatNumber>{continentCounts[continent]}</StatNumber>
            </Stat>
          ))}
          {Object.keys(hornCounts).map(hornType => (
            <Stat key={hornType}>
              <StatLabel>{hornType} (Horn)</StatLabel>
              <StatNumber>{hornCounts[hornType]}</StatNumber>
            </Stat>
          ))}
        </StatGroup>
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
        <Button onClick={() => handleAddToCollection(user?.id?.toString() || "")}>
          <Text>Add to my collection</Text>
        </Button>
      </Grid>
    </Box>
  );
};

export default Antelope;
