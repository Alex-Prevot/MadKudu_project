import { Box, Image, Text, VStack, Heading, useColorModeValue } from '@chakra-ui/react';

interface Antelope {
  name: string;
  continent: string;
  weight: number;
  height: number;
  horns: string;
  picture: string;
}

interface AntelopeCardProps {
  antelope: Antelope;
  onClick: () => void;
  isSelected: boolean;
}

const AntelopeCard = ({ antelope, onClick, isSelected }: AntelopeCardProps) => {
  const bg = useColorModeValue("white", "gray.800");
  const selectedBg = useColorModeValue("blue.100", "blue.700");

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} boxShadow="lg"
         bg={isSelected ? selectedBg : bg} cursor="pointer" onClick={onClick}>
      <Image src={antelope.picture} alt={antelope.name} boxSize="300px" objectFit="cover" />
      <VStack align="stretch" mt={4}>
        <Heading fontSize="xl">{antelope.name}</Heading>
        <Text><strong>Continent:</strong> {antelope.continent}</Text>
        <Text><strong>Weight:</strong> {antelope.weight} kg</Text>
        <Text><strong>Height:</strong> {antelope.height} cm</Text>
        <Text><strong>Horns:</strong> {antelope.horns}</Text>
      </VStack>
    </Box>
  );
};

export default AntelopeCard;
